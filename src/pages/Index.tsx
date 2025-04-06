
import { useState, useEffect } from 'react';
import { Navbar } from '@/components/Navbar';
import { FileUploader } from '@/components/FileUploader';
import { ResultDisplay } from '@/components/ResultDisplay';
import { PricingSection } from '@/components/PricingSection';
import { Footer } from '@/components/Footer';
import { Toaster } from '@/components/ui/toaster';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/components/ui/use-toast';
import { Header } from '@/components/Header';

const Index = () => {
  const { user, checkSubscription } = useAuth();
  const [userPlan, setUserPlan] = useState<'free' | 'premium'>('free');
  const [extractedText, setExtractedText] = useState('');
  const [extractionCount, setExtractionCount] = useState(0);
  const { toast } = useToast();

  useEffect(() => {
    const fetchUserPlan = async () => {
      if (user) {
        try {
          // First check direct profile data as it should be most up-to-date
          const { data: profile } = await supabase
            .from('profiles')
            .select('plan')
            .eq('id', user.id)
            .single();
          
          if (profile && profile.plan === 'premium') {
            setUserPlan('premium');
            return;
          }
          
          // If not premium in profile, verify with Stripe via the function
          const hasActiveSubscription = await checkSubscription();
          
          if (hasActiveSubscription) {
            setUserPlan('premium');
          } else {
            setUserPlan('free');
          }
        } catch (error) {
          console.error('Error fetching user plan:', error);
        }
      }
    };
    
    const fetchExtractionCount = async () => {
      if (user) {
        try {
          const currentMonth = new Date().getMonth() + 1;
          const currentYear = new Date().getFullYear();
          
          const { data, error } = await supabase
            .from('extraction_counts')
            .select('count')
            .eq('user_id', user.id)
            .eq('month', currentMonth)
            .eq('year', currentYear)
            .single();
          
          if (error && error.code !== 'PGRST116') {
            console.error('Error fetching extraction count:', error);
            return;
          }
          
          if (data) {
            setExtractionCount(data.count);
          } else {
            setExtractionCount(0);
          }
        } catch (error) {
          console.error('Error fetching extraction count:', error);
        }
      }
    };

    fetchUserPlan();
    fetchExtractionCount();
  }, [user, checkSubscription]);

  const handleSuccessfulExtraction = async () => {
    if (user) {
      const currentMonth = new Date().getMonth() + 1;
      const currentYear = new Date().getFullYear();
      
      const maxExtractions = userPlan === 'premium' ? 1000 : 10;
      
      if (extractionCount >= maxExtractions) {
        toast({
          title: 'Extraction Limit Reached',
          description: `You have reached the maximum number of extractions (${maxExtractions}) for this month.`,
          variant: 'destructive',
        });
        return;
      }

      try {
        const { data, error } = await supabase
          .from('extraction_counts')
          .upsert(
            { 
              user_id: user.id, 
              month: currentMonth, 
              year: currentYear, 
              count: extractionCount + 1 
            },
            { 
              onConflict: 'user_id,month,year',
              ignoreDuplicates: false
            }
          );
        
        if (error) {
          console.error('Error updating extraction count:', error);
          return;
        }

        setExtractionCount(prev => prev + 1);
      } catch (error) {
        console.error('Error updating extraction count:', error);
      }
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-white to-purple-50">
      <Navbar />
      <Header />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <div id="file-uploader" className="scroll-mt-16">
          <FileUploader 
            isLoggedIn={!!user} 
            userPlan={userPlan} 
            onExtractedText={setExtractedText}
          />
        </div>
        
        {extractedText && <ResultDisplay text={extractedText} />}
        
        <PricingSection 
          onUpgrade={() => setUserPlan('premium')} 
          userPlan={userPlan} 
        />
      </main>
      
      <Footer />
      <Toaster />
    </div>
  );
};

export default Index;
