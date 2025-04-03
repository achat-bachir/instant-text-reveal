
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/components/ui/use-toast';
import { Github, Mail, Loader2 } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export function AuthModal({ isOpen, onClose, onSuccess }: AuthModalProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const { signIn, signUp } = useAuth();

  const handleSubmit = async (type: 'login' | 'signup') => {
    setIsLoading(true);
    try {
      if (type === 'login') {
        await signIn(email, password);
      } else {
        await signUp(email, password);
      }
      onSuccess();
      onClose();
    } catch (error: any) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSocialAuth = async (provider: 'google' | 'github') => {
    setIsLoading(true);
    try {
      // Note : Cette fonctionnalité requiert une configuration supplémentaire dans Supabase
      toast({
        title: 'Fonctionnalité en cours de développement',
        description: `L'authentification via ${provider} sera bientôt disponible.`,
      });
    } catch (error: any) {
      toast({
        title: 'Erreur d\'authentification',
        description: "Une erreur est survenue lors de la connexion sociale.",
        variant: 'destructive',
      });
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px] animate-fade-in">
        <Tabs defaultValue="login" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="login">Connexion</TabsTrigger>
            <TabsTrigger value="signup">Inscription</TabsTrigger>
          </TabsList>
          
          <TabsContent value="login" className="mt-4">
            <DialogHeader>
              <DialogTitle>Bienvenue</DialogTitle>
              <DialogDescription>
                Connectez-vous à votre compte pour continuer à utiliser DecryptImage.com
              </DialogDescription>
            </DialogHeader>
            
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="email-login">Email</Label>
                <Input
                  id="email-login"
                  type="email"
                  placeholder="vous@exemple.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password-login">Mot de passe</Label>
                <Input
                  id="password-login"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>
            
            <DialogFooter className="flex flex-col gap-2">
              <Button 
                disabled={isLoading} 
                className="w-full" 
                onClick={() => handleSubmit('login')}
              >
                {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                Connexion
              </Button>
              <div className="relative w-full my-2">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-slate-200"></div>
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-background px-2 text-muted-foreground">ou</span>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <Button variant="outline" onClick={() => handleSocialAuth('google')} disabled={isLoading}>
                  <Mail className="mr-2 h-4 w-4" /> Google
                </Button>
                <Button variant="outline" onClick={() => handleSocialAuth('github')} disabled={isLoading}>
                  <Github className="mr-2 h-4 w-4" /> GitHub
                </Button>
              </div>
            </DialogFooter>
          </TabsContent>
          
          <TabsContent value="signup" className="mt-4">
            <DialogHeader>
              <DialogTitle>Créer un compte</DialogTitle>
              <DialogDescription>
                Inscrivez-vous pour commencer à utiliser DecryptImage.com
              </DialogDescription>
            </DialogHeader>
            
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="email-signup">Email</Label>
                <Input
                  id="email-signup"
                  type="email"
                  placeholder="vous@exemple.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password-signup">Mot de passe</Label>
                <Input
                  id="password-signup"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>
            
            <DialogFooter className="flex flex-col gap-2">
              <Button 
                disabled={isLoading} 
                className="w-full" 
                onClick={() => handleSubmit('signup')}
              >
                {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                S'inscrire
              </Button>
              <div className="relative w-full my-2">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-slate-200"></div>
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-background px-2 text-muted-foreground">ou</span>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <Button variant="outline" onClick={() => handleSocialAuth('google')} disabled={isLoading}>
                  <Mail className="mr-2 h-4 w-4" /> Google
                </Button>
                <Button variant="outline" onClick={() => handleSocialAuth('github')} disabled={isLoading}>
                  <Github className="mr-2 h-4 w-4" /> GitHub
                </Button>
              </div>
            </DialogFooter>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
