
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

export function Header() {
  const { user } = useAuth();
  
  return (
    <div className="w-full bg-gradient-to-r from-blue-600 to-purple-700 py-24 px-4">
      <div className="container mx-auto text-center">
        <h1 className="text-4xl sm:text-6xl font-bold text-white mb-6 animate-fade-in" data-seo-tag="main-heading">
          Extract Text From Images &amp; PDFs Instantly
        </h1>
        <h2 className="text-xl text-white/90 max-w-3xl mx-auto mb-6 animate-fade-in" 
           style={{ animationDelay: '200ms' }} data-seo-tag="sub-heading">
          Advanced AI-powered text recognition and extraction tool
        </h2>
        <p className="text-lg text-white/90 max-w-3xl mx-auto mb-12 animate-fade-in" 
           style={{ animationDelay: '200ms' }}>
          Convert photos, screenshots, scanned documents, and PDFs into editable text with our powerful OCR technology.
          Get started free today and extract text from up to 10 images per month.
        </p>
        
        <div className="animate-fade-in" style={{ animationDelay: '400ms' }}>
          {!user ? (
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button 
                size="lg" 
                className="bg-white text-blue-700 hover:bg-white/90 font-medium px-8"
                asChild
              >
                <Link to="/auth">
                  Get Started Free <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button 
                size="lg" 
                variant="outline"
                className="border-white text-white hover:bg-white/20 font-medium px-8"
                onClick={() => document.getElementById('file-uploader')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Try Demo
              </Button>
            </div>
          ) : (
            <Button 
              size="lg" 
              className="bg-white text-blue-700 hover:bg-white/90 font-medium px-8"
              onClick={() => document.getElementById('file-uploader')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Upload Image <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
