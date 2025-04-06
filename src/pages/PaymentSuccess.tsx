
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { CheckCircle } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

const PaymentSuccess = () => {
  const { checkSubscription } = useAuth();
  const { toast } = useToast();
  const [verified, setVerified] = useState(false);

  useEffect(() => {
    // Check subscription status and refresh profile immediately
    const verifySubscription = async () => {
      if (!verified) {
        try {
          // First force a direct update of the profile
          const { data: { user } } = await supabase.auth.getUser();
          if (user) {
            // Directly set profile to premium
            await supabase
              .from('profiles')
              .update({ plan: 'premium' })
              .eq('id', user.id);
          }
          
          // Then run the subscription check to ensure Stripe is in sync
          await checkSubscription();
          
          setVerified(true);
          toast({
            title: "Paiement réussi !",
            description: "Votre abonnement Premium est maintenant actif.",
          });
        } catch (error) {
          console.error('Erreur lors de la vérification de l\'abonnement:', error);
          setVerified(true); // Pour éviter de réessayer en boucle
        }
      }
    };

    verifySubscription();
  }, [checkSubscription, toast, verified]);

  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-b from-white to-purple-50">
      <div className="container mx-auto flex-1 px-4 py-12">
        <div className="mx-auto max-w-md rounded-lg border bg-white p-8 shadow-md">
          <div className="mb-6 flex justify-center">
            <CheckCircle className="h-16 w-16 text-green-500" />
          </div>
          
          <h1 className="mb-4 text-center text-2xl font-bold text-gray-800">Paiement réussi !</h1>
          
          <p className="mb-6 text-center text-gray-600">
            Félicitations ! Votre abonnement Premium est maintenant actif. Profitez de toutes les fonctionnalités avancées de DecryptImage.com.
          </p>
          
          <div className="flex justify-center">
            <Button asChild>
              <Link to="/">Retour à l'accueil</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccess;
