
import { useState } from 'react';
import { Navbar } from '@/components/Navbar';
import { FileUploader } from '@/components/FileUploader';
import { ResultDisplay } from '@/components/ResultDisplay';
import { PricingSection } from '@/components/PricingSection';
import { Footer } from '@/components/Footer';
import { Toaster } from '@/components/ui/toaster';

const Index = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userPlan, setUserPlan] = useState<'free' | 'premium'>('free');
  const [extractedText, setExtractedText] = useState('');

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-white to-purple-50">
      <Navbar 
        isLoggedIn={isLoggedIn} 
        setIsLoggedIn={setIsLoggedIn} 
        userPlan={userPlan} 
        setUserPlan={setUserPlan} 
      />
      
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
          isLoggedIn={isLoggedIn} 
          userPlan={userPlan} 
          onExtractedText={setExtractedText}
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
