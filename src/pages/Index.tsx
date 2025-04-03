
import { useState, useEffect } from 'react';
import { Navbar } from '@/components/Navbar';
import { FileUploader } from '@/components/FileUploader';
import { ResultDisplay } from '@/components/ResultDisplay';
import { PricingSection } from '@/components/PricingSection';
import { Footer } from '@/components/Footer';
import { Toaster } from '@/components/ui/toaster';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';

const Index = () => {
  const { user, checkSubscription } = useAuth();
  const [userPlan, setUserPlan] = useState<'free' | 'premium'>('free');
  const [extractedText, setExtractedText] = useState('');
  const [extractionCount, setExtractionCount] = useState(0);

  useEffect(() => {
    const fetchUserPlan = async () => {
      if (user) {
        try {
          // Check if the user has an active subscription first
          const hasActiveSubscription = await checkSubscription();
          
          if (hasActiveSubscription) {
            setUserPlan('premium');
            return;
          }
          
          // If no active subscription, check the database as fallback
          const { data: profile } = await supabase
            .from('profiles')
            .select('plan')
            .eq('id', user.id)
            .single();
          
          if (profile) {
            setUserPlan(profile.plan as 'free' | 'premium');
          }
        } catch (error) {
          console.error('Erreur lors de la récupération du plan utilisateur :', error);
        }
      }
    };

    // Also fetch the user's extraction count
    const fetchExtractionCount = async () => {
      if (user) {
        try {
          const { data, error } = await supabase
            .from('extraction_counts')
            .select('count')
            .eq('user_id', user.id)
            .eq('month', new Date().getMonth() + 1)
            .eq('year', new Date().getFullYear())
            .single();
          
          if (error && error.code !== 'PGRST116') {
            console.error('Error fetching extraction count:', error);
            return;
          }
          
          if (data) {
            setExtractionCount(data.count);
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
      // Increment the extraction count in state
      setExtractionCount(prev => prev + 1);
      
      // Update the extraction count in the database
      try {
        const month = new Date().getMonth() + 1; // 1-12
        const year = new Date().getFullYear();
        
        const { data, error } = await supabase
          .from('extraction_counts')
          .upsert(
            { 
              user_id: user.id, 
              month, 
              year, 
              count: extractionCount + 1 
            },
            { 
              onConflict: 'user_id,month,year',
              ignoreDuplicates: false
            }
          );
        
        if (error) {
          console.error('Error updating extraction count:', error);
        }
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
        
        <PricingSection onUpgrade={() => setUserPlan('premium')} userPlan={userPlan} />
      </main>
      
      <Footer />
      <Toaster />
    </div>
  );
};

export default Index;
