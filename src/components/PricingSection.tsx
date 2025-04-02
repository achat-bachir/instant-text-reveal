
import { Button } from '@/components/ui/button';
import { Check } from 'lucide-react';

interface PricingSectionProps {
  onUpgrade: () => void;
  userPlan: 'free' | 'premium';
}

export function PricingSection({ onUpgrade, userPlan }: PricingSectionProps) {
  return (
    <div className="w-full max-w-5xl mx-auto my-16 px-4">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold mb-4 purple-gradient-text">Simple, Transparent Pricing</h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Choose the plan that fits your needs. No hidden fees, no complicated tiers.
        </p>
      </div>
      
      <div className="grid md:grid-cols-2 gap-8">
        {/* Free Plan */}
        <div className={`rounded-xl p-6 shadow-md ${userPlan === 'free' ? 'border-2 border-brand-primary' : 'border border-gray-100'}`}>
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-2xl font-bold">Free</h3>
              <p className="text-gray-500 mt-1">For occasional use</p>
            </div>
            {userPlan === 'free' && (
              <span className="bg-brand-accent text-brand-primary text-xs py-1 px-3 rounded-full font-medium">
                Current Plan
              </span>
            )}
          </div>
          
          <div className="mt-6">
            <span className="text-4xl font-bold">$0</span>
            <span className="text-gray-500">/month</span>
          </div>
          
          <ul className="mt-6 space-y-4">
            <li className="flex items-start">
              <Check className="h-5 w-5 text-brand-primary mr-2 flex-shrink-0 mt-0.5" />
              <span>10 extractions per month</span>
            </li>
            <li className="flex items-start">
              <Check className="h-5 w-5 text-brand-primary mr-2 flex-shrink-0 mt-0.5" />
              <span>Max file size 1MB</span>
            </li>
            <li className="flex items-start">
              <Check className="h-5 w-5 text-brand-primary mr-2 flex-shrink-0 mt-0.5" />
              <span>Support for images & PDFs</span>
            </li>
            <li className="flex items-start">
              <Check className="h-5 w-5 text-brand-primary mr-2 flex-shrink-0 mt-0.5" />
              <span>Basic text extraction</span>
            </li>
          </ul>
          
          <Button 
            variant="outline" 
            className="w-full mt-8"
            disabled={true}
          >
            Free Plan
          </Button>
        </div>
        
        {/* Premium Plan */}
        <div className={`rounded-xl p-6 shadow-md bg-gradient-to-br from-brand-primary/10 to-brand-secondary/5 ${userPlan === 'premium' ? 'border-2 border-brand-primary' : 'border border-gray-100'}`}>
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-2xl font-bold">Premium</h3>
              <p className="text-gray-500 mt-1">For power users</p>
            </div>
            {userPlan === 'premium' && (
              <span className="bg-brand-accent text-brand-primary text-xs py-1 px-3 rounded-full font-medium">
                Current Plan
              </span>
            )}
          </div>
          
          <div className="mt-6">
            <span className="text-4xl font-bold">$9.90</span>
            <span className="text-gray-500">/month</span>
          </div>
          
          <ul className="mt-6 space-y-4">
            <li className="flex items-start">
              <Check className="h-5 w-5 text-brand-primary mr-2 flex-shrink-0 mt-0.5" />
              <span><strong>1,000 extractions</strong> per month</span>
            </li>
            <li className="flex items-start">
              <Check className="h-5 w-5 text-brand-primary mr-2 flex-shrink-0 mt-0.5" />
              <span><strong>Max file size 5MB</strong></span>
            </li>
            <li className="flex items-start">
              <Check className="h-5 w-5 text-brand-primary mr-2 flex-shrink-0 mt-0.5" />
              <span>Enhanced extraction quality</span>
            </li>
            <li className="flex items-start">
              <Check className="h-5 w-5 text-brand-primary mr-2 flex-shrink-0 mt-0.5" />
              <span>Priority processing</span>
            </li>
            <li className="flex items-start">
              <Check className="h-5 w-5 text-brand-primary mr-2 flex-shrink-0 mt-0.5" />
              <span>Email support</span>
            </li>
          </ul>
          
          <Button 
            className="w-full mt-8"
            onClick={onUpgrade}
            disabled={userPlan === 'premium'}
          >
            {userPlan === 'premium' ? 'Current Plan' : 'Upgrade to Premium'}
          </Button>
        </div>
      </div>
    </div>
  );
}
