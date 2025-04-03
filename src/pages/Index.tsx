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
          // Prioritize checking subscription status
          const hasActiveSubscription = await checkSubscription();
          
          if (hasActiveSubscription) {
            setUserPlan('premium');
          } else {
            // Fallback to checking database profile
            const { data: profile } = await supabase
              .from('profiles')
              .select('plan')
              .eq('id', user.id)
              .single();
            
            if (profile) {
              setUserPlan(profile.plan as 'free' | 'premium');
            }
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
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <section className="text-center mb-12 pt-8">
          <h1 className="text-4xl sm:text-5xl font-bold mb-4 purple-gradient-text animate-fade-in">
            Extract Text from Any Image or PDF
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto animate-fade-in" style={{ animationDelay: '100ms' }}>
            Upload your files and instantly get all the text content with our powerful extraction tool
          </p>
        </section>
        
        <FileUploader 
          isLoggedIn={!!user} 
          userPlan={userPlan} 
          onExtractedText={setExtractedText}
          currentExtractionCount={extractionCount}
          onSuccessfulExtraction={handleSuccessfulExtraction}
        />
        
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
