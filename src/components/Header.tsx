
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

export function Header() {
  const { user } = useAuth();
  
  return (
    <div className="w-full bg-gradient-to-r from-blue-600 to-purple-700 py-24 px-4">
      <div className="container mx-auto text-center">
        <h1 className="text-4xl sm:text-6xl font-bold text-white mb-6 animate-fade-in">
          Welcome to DecryptImage
        </h1>
        <p className="text-xl text-white/90 max-w-3xl mx-auto mb-12 animate-fade-in" 
           style={{ animationDelay: '200ms' }}>
          A powerful tool to extract and analyze text from any image or PDF with advanced AI technology.
          Unlock insights from your documents instantly.
        </p>
        
        <div className="animate-fade-in" style={{ animationDelay: '400ms' }}>
          {!user ? (
            <Button 
              size="lg" 
              className="bg-white text-blue-700 hover:bg-white/90 font-medium px-8"
              asChild
            >
              <Link to="/auth">
                Get Started <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
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
