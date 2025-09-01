// src/components/PaymentFailure.tsx
import React, { useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { 
  XCircle, 
  Crown, 
  Heart, 
  RefreshCw, 
  ArrowLeft,
  CreditCard,
  HelpCircle
} from 'lucide-react';

interface PaymentFailureProps {
  errorMessage: string;
  onRetry: () => void;
  onContactSupport: () => void;
  onBack: () => void;
}

export function PaymentFailure({ 
  errorMessage, 
  onRetry, 
  onContactSupport,
  onBack
}: PaymentFailureProps) {
  const [retrying, setRetrying] = useState(false);

  const handleRetry = () => {
    setRetrying(true);
    // Simulate retry process
    setTimeout(() => {
      onRetry();
      setRetrying(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-ghotok-warm-beige flex items-center justify-center p-4">
      <div className="max-w-2xl w-full">
        {/* Failure Card */}
        <Card className="border-0 bg-white shadow-xl">
          <CardHeader className="text-center pb-4">
            <div className="mx-auto bg-red-100 rounded-full p-4 w-24 h-24 flex items-center justify-center mb-6">
              <XCircle className="w-16 h-16 text-red-500" />
            </div>
            
            <CardTitle className="text-2xl font-bold text-ghotok-dark-gray">
              Payment Failed
            </CardTitle>
            <p className="text-muted-foreground mt-2">
              We couldn't process your payment
            </p>
          </CardHeader>
          
          <CardContent className="space-y-6">
            {/* Error Message */}
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <h3 className="font-medium text-red-800 flex items-center">
                <HelpCircle className="w-5 h-5 mr-2" />
                Error Details
              </h3>
              <p className="text-red-700 mt-2 text-sm">
                {errorMessage || "Something went wrong during the payment process. Please try again or contact support."}
              </p>
            </div>

            {/* Possible Reasons */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Possible Reasons</h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <HelpCircle className="w-5 h-5 text-ghotok-muted-green mr-2 mt-0.5 flex-shrink-0" />
                  <span>Insufficient funds in your account</span>
                </li>
                <li className="flex items-start">
                  <HelpCircle className="w-5 h-5 text-ghotok-muted-green mr-2 mt-0.5 flex-shrink-0" />
                  <span>Incorrect card details or expired card</span>
                </li>
                <li className="flex items-start">
                  <HelpCircle className="w-5 h-5 text-ghotok-muted-green mr-2 mt-0.5 flex-shrink-0" />
                  <span>Network issues during payment processing</span>
                </li>
                <li className="flex items-start">
                  <HelpCircle className="w-5 h-5 text-ghotok-muted-green mr-2 mt-0.5 flex-shrink-0" />
                  <span>Payment gateway timeout</span>
                </li>
              </ul>
            </div>

            {/* Action Buttons */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-4">
              <Button 
                onClick={handleRetry}
                disabled={retrying}
                className="bg-ghotok-muted-green hover:bg-ghotok-muted-green/90"
              >
                {retrying ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin mr-2" />
                    Processing...
                  </>
                ) : (
                  <>
                    <CreditCard className="w-4 h-4 mr-2" />
                    Try Again
                  </>
                )}
              </Button>
              <Button 
                variant="outline"
                onClick={onContactSupport}
              >
                <HelpCircle className="w-4 h-4 mr-2" />
                Contact Support
              </Button>
            </div>

            <div className="pt-2">
              <Button 
                variant="ghost"
                onClick={onBack}
                className="w-full"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Subscription Plans
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Help Section */}
        <Card className="mt-6">
          <CardHeader>
            <CardTitle className="flex items-center">
              <HelpCircle className="w-5 h-5 mr-2 text-ghotok-muted-green" />
              Need Help?
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center p-4 border rounded-lg">
                <CreditCard className="w-8 h-8 text-ghotok-muted-green mx-auto mb-2" />
                <h4 className="font-medium">Payment Issues</h4>
                <p className="text-sm text-muted-foreground mt-1">
                  Check your card details and bank balance
                </p>
              </div>
              <div className="text-center p-4 border rounded-lg">
                <Crown className="w-8 h-8 text-ghotok-muted-green mx-auto mb-2" />
                <h4 className="font-medium">Subscription</h4>
                <p className="text-sm text-muted-foreground mt-1">
                  Questions about premium features
                </p>
              </div>
              <div className="text-center p-4 border rounded-lg">
                <Heart className="w-8 h-8 text-ghotok-muted-green mx-auto mb-2" />
                <h4 className="font-medium">General Support</h4>
                <p className="text-sm text-muted-foreground mt-1">
                  Contact our customer service team
                </p>
              </div>
            </div>
            
            <div className="mt-6 text-center">
              <p className="text-muted-foreground">
                Email: support@ghotokderbari.com | Phone: +880 XXX XXX XXX
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}