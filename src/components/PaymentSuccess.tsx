// src/components/PaymentSuccess.tsx
import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { 
  CheckCircle, 
  Crown, 
  Heart, 
  Star, 
  ArrowRight,
  Calendar,
  User
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface PaymentSuccessProps {
  planName: string;
  planPrice: number;
  planDuration: string;
  transactionId: string;
  onContinue: () => void;
}

export function PaymentSuccess({ 
  planName, 
  planPrice, 
  planDuration, 
  transactionId,
  onContinue 
}: PaymentSuccessProps) {
  const { userProfile } = useAuth();
  const [countdown, setCountdown] = useState(10);
  const navigate = useNavigate();

  // Countdown timer for automatic redirect
  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          onContinue();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [onContinue]);

  // In a real app, you would verify the payment with your backend
  // and update the user's subscription status

  return (
    <div className="min-h-screen bg-ghotok-warm-beige flex items-center justify-center p-4">
      <div className="max-w-2xl w-full">
        {/* Success Card */}
        <Card className="border-0 bg-white shadow-xl">
          <CardHeader className="text-center pb-4">
            <div className="mx-auto bg-ghotok-pastel-pink/10 rounded-full p-4 w-24 h-24 flex items-center justify-center mb-6">
              <CheckCircle className="w-16 h-16 text-ghotok-pastel-pink" />
            </div>
            
            <CardTitle className="text-2xl font-bold text-ghotok-dark-gray">
              Payment Successful!
            </CardTitle>
            <p className="text-muted-foreground mt-2">
              Thank you for upgrading to Premium
            </p>
          </CardHeader>
          
          <CardContent className="space-y-6">
            {/* Plan Details */}
            <div className="bg-ghotok-warm-beige rounded-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center">
                  <Crown className="w-6 h-6 text-ghotok-pastel-pink mr-2" />
                  <h3 className="text-xl font-bold">{planName} Plan</h3>
                </div>
                <span className="text-2xl font-bold text-ghotok-pastel-pink">
                  ৳{planPrice}
                </span>
              </div>
              
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-muted-foreground">Duration</p>
                  <p className="font-medium">{planDuration}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Transaction ID</p>
                  <p className="font-medium truncate">{transactionId}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Activation Date</p>
                  <p className="font-medium">{new Date().toLocaleDateString()}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Expiry Date</p>
                  <p className="font-medium">
                    {new Date(Date.now() + 30*24*60*60*1000).toLocaleDateString()}
                  </p>
                </div>
              </div>
            </div>

            {/* Benefits */}
            <div>
              <h3 className="text-lg font-semibold mb-4 flex items-center">
                <Star className="w-5 h-5 text-ghotok-muted-green mr-2" />
                Your Premium Benefits
              </h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-ghotok-muted-green mr-2 mt-0.5 flex-shrink-0" />
                  <span>Unlimited profile views and likes</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-ghotok-muted-green mr-2 mt-0.5 flex-shrink-0" />
                  <span>See who liked your profile</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-ghotok-muted-green mr-2 mt-0.5 flex-shrink-0" />
                  <span>Advanced search filters</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-ghotok-muted-green mr-2 mt-0.5 flex-shrink-0" />
                  <span>Priority in match suggestions</span>
                </li>
              </ul>
            </div>

            {/* User Info */}
            <div className="bg-ghotok-warm-beige/50 rounded-lg p-4">
              <div className="flex items-center">
                <div className="bg-gray-200 border-2 border-dashed rounded-xl w-12 h-12" />
                <div className="ml-3">
                  <h4 className="font-medium">{userProfile?.displayName}</h4>
                  <p className="text-sm text-muted-foreground">Premium Member</p>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 pt-4">
              <Button 
                onClick={onContinue}
                className="flex-1 bg-ghotok-muted-green hover:bg-ghotok-muted-green/90"
              >
                Continue to Dashboard
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
              <Button 
                variant="outline"
                onClick={() => window.print()}
              >
                Print Receipt
              </Button>
            </div>

            {/* Auto Redirect */}
            <div className="text-center text-sm text-muted-foreground">
              <p>Redirecting to dashboard in {countdown} seconds...</p>
            </div>
          </CardContent>
        </Card>

        {/* Features */}
        <div className="mt-8 grid grid-cols-3 gap-4 text-center">
          <div className="text-xs text-muted-foreground">
            <div className="w-8 h-8 bg-ghotok-muted-green rounded-full flex items-center justify-center mx-auto mb-2">
              <CheckCircle className="w-4 h-4 text-white" />
            </div>
            <span>Verified Profiles</span>
          </div>
          <div className="text-xs text-muted-foreground">
            <div className="w-8 h-8 bg-ghotok-muted-green rounded-full flex items-center justify-center mx-auto mb-2">
              <Heart className="w-4 h-4 text-white" />
            </div>
            <span>Trusted Platform</span>
          </div>
          <div className="text-xs text-muted-foreground">
            <div className="w-8 h-8 bg-ghotok-muted-green rounded-full flex items-center justify-center mx-auto mb-2">
              <User className="w-4 h-4 text-white" />
            </div>
            <span>Real Matches</span>
          </div>
        </div>
      </div>
    </div>
  );
}