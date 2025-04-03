
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { AuthModal } from '@/components/AuthModal';
import { useToast } from '@/components/ui/use-toast';
import { LogOut } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';

export function Navbar() {
  const { user, signOut } = useAuth();
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const { toast } = useToast();
  const [userPlan, setUserPlan] = useState<'free' | 'premium'>('free');

  const handleLogout = async () => {
    await signOut();
    setUserPlan('free');
  };

  const handleUpgradePlan = async () => {
    if (!user) {
      setIsAuthModalOpen(true);
      return;
    }

    try {
      // Récupérer le token d'authentification pour l'API Supabase
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        throw new Error('Vous devez être connecté pour effectuer cette action');
      }

      // Appeler la fonction Supabase Edge Functions pour créer un checkout Stripe
      const { data, error } = await supabase.functions.invoke('create-checkout', {
        headers: {
          Authorization: `Bearer ${session.access_token}`,
        },
      });

      if (error) {
        throw error;
      }

      if (data.message) {
        toast({
          title: "Information",
          description: data.message,
        });
        return;
      }

      // Rediriger vers l'URL de paiement Stripe
      window.location.href = data.url;
    } catch (error: any) {
      toast({
        title: "Erreur",
        description: error.message || "Une erreur est survenue lors de la création du paiement.",
        variant: "destructive",
      });
    }
  };

  // Vérifier l'abonnement de l'utilisateur lors du chargement ou du changement d'utilisateur
  useState(() => {
    const checkUserPlan = async () => {
      if (user) {
        try {
          const { data: profile } = await supabase
            .from('profiles')
            .select('plan')
            .eq('id', user.id)
            .single();
          
          if (profile && profile.plan === 'premium') {
            setUserPlan('premium');
          }
        } catch (error) {
          console.error('Erreur lors de la vérification du plan:', error);
        }
      }
    };
    
    checkUserPlan();
  }, [user]);

  return (
    <nav className="w-full py-4 px-6 sm:px-8 flex justify-between items-center border-b">
      <div className="flex items-center">
        <Link to="/">
          <h1 className="text-xl font-bold purple-gradient-text">DecryptImage.com</h1>
        </Link>
      </div>
      
      <div className="flex items-center space-x-2">
        {user ? (
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
              asChild
            >
              <Link to="/auth">Login</Link>
            </Button>
            <Button asChild>
              <Link to="/auth">Sign Up</Link>
            </Button>
          </>
        )}
      </div>
      
      <AuthModal 
        isOpen={isAuthModalOpen} 
        onClose={() => setIsAuthModalOpen(false)} 
        onSuccess={() => {}}
      />
    </nav>
  );
}
