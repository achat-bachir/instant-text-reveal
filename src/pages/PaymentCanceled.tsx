
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { XCircle } from 'lucide-react';

const PaymentCanceled = () => {
  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-b from-white to-purple-50">
      <div className="container mx-auto flex-1 px-4 py-12">
        <div className="mx-auto max-w-md rounded-lg border bg-white p-8 shadow-md">
          <div className="mb-6 flex justify-center">
            <XCircle className="h-16 w-16 text-red-500" />
          </div>
          
          <h1 className="mb-4 text-center text-2xl font-bold text-gray-800">Paiement annulé</h1>
          
          <p className="mb-6 text-center text-gray-600">
            Votre paiement a été annulé. Si vous avez rencontré des problèmes ou si vous avez des questions, n'hésitez pas à nous contacter.
          </p>
          
          <div className="flex flex-col gap-4 md:flex-row md:justify-center">
            <Button asChild variant="outline">
              <Link to="/">Retour à l'accueil</Link>
            </Button>
            <Button asChild>
              <Link to="/pricing">Réessayer</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentCanceled;
