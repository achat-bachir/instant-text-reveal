
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { AuthModal } from '@/components/AuthModal';
import { useToast } from '@/components/ui/use-toast';
import { LogOut } from 'lucide-react';

interface NavbarProps {
  isLoggedIn: boolean;
  setIsLoggedIn: (value: boolean) => void;
  userPlan: 'free' | 'premium';
  setUserPlan: (value: 'free' | 'premium') => void;
}

export function Navbar({ isLoggedIn, setIsLoggedIn, userPlan, setUserPlan }: NavbarProps) {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const { toast } = useToast();

  const handleLogout = () => {
    // Note: Will implement with Supabase
    setIsLoggedIn(false);
    setUserPlan('free');
    toast({
      title: 'Logged out successfully',
      description: 'You have been logged out from your account.',
    });
  };

  const handleUpgradePlan = () => {
    // In a real implementation, this would redirect to a payment page
    // For now, we'll just simulate upgrading the plan
    setUserPlan('premium');
    toast({
      title: 'Plan upgraded successfully!',
      description: 'You now have access to the premium features.',
    });
  };

  return (
    <nav className="w-full py-4 px-6 sm:px-8 flex justify-between items-center border-b">
      <div className="flex items-center">
        <h1 className="text-xl font-bold purple-gradient-text">DecryptImage.com</h1>
      </div>
      
      <div className="flex items-center space-x-2">
        {isLoggedIn ? (
          <>
            {userPlan === 'free' && (
              <Button 
                variant="outline" 
                className="mr-2 text-brand-secondary border-brand-secondary hover:bg-brand-secondary hover:text-white"
                onClick={handleUpgradePlan}
              >
                Upgrade to Premium
              </Button>
            )}
            {userPlan === 'premium' && (
              <span className="mr-2 text-sm bg-brand-accent text-brand-tertiary px-3 py-1 rounded-full">
                Premium Plan
              </span>
            )}
            <Button variant="ghost" size="icon" onClick={handleLogout}>
              <LogOut className="h-5 w-5" />
            </Button>
          </>
        ) : (
          <>
            <Button 
              variant="ghost" 
              onClick={() => setIsAuthModalOpen(true)}
            >
              Login
            </Button>
            <Button 
              onClick={() => setIsAuthModalOpen(true)}
            >
              Sign Up
            </Button>
          </>
        )}
      </div>
      
      <AuthModal 
        isOpen={isAuthModalOpen} 
        onClose={() => setIsAuthModalOpen(false)} 
        onSuccess={() => setIsLoggedIn(true)}
      />
    </nav>
  );
}
