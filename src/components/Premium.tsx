// src/components/Premium.tsx
import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { 
  Crown, 
  Check, 
  Star, 
  Heart, 
  Users, 
  Zap, 
  Shield, 
  ArrowLeft,
  CreditCard,
  Banknote,
  Smartphone
} from 'lucide-react';

interface SubscriptionPlan {
  id: string;
  name: string;
  price: number;
  duration: string;
  features: string[];
  popular?: boolean;
}

interface PremiumProps {
  onBack: () => void;
}

export function Premium({ onBack }: PremiumProps) {
  const { userProfile } = useAuth();
  const [selectedPlan, setSelectedPlan] = useState<string>('gold');
  const [paymentMethod, setPaymentMethod] = useState<'bkash' | 'nagad' | 'card'>('bkash');
  const [loading, setLoading] = useState(false);

  // Subscription plans
  const plans: SubscriptionPlan[] = [
    {
      id: 'gold',
      name: 'Gold',
      price: 499,
      duration: '1 Month',
      features: [
        'Unlimited profile views',
        'Unlimited likes & messages',
        'See who liked you',
        'Advanced search filters',
        'Priority customer support'
      ]
    },
    {
      id: 'platinum',
      name: 'Platinum',
      price: 1299,
      duration: '3 Months',
      features: [
        'All Gold features',
        'Boost your profile (5x visibility)',
        '1 free video call per month',
        'Priority in match suggestions',
        'Personal matchmaker support'
      ],
      popular: true
    },
    {
      id: 'diamond',
      name: 'Diamond',
      price: 1999,
      duration: '6 Months',
      features: [
        'All Platinum features',
        'Profile highlight in search',
        'Unlimited video calls',
        'Dedicated matchmaker',
        'Exclusive events access',
        'Personalized match recommendations'
      ]
    }
  ];

  const paymentMethods = [
    { id: 'bkash', name: 'bKash', icon: Smartphone },
    { id: 'nagad', name: 'Nagad', icon: Banknote },
    { id: 'card', name: 'Credit/Debit Card', icon: CreditCard }
  ];

  const handleSubscribe = async () => {
    setLoading(true);
    
    // In a real app, you would:
    // 1. Send request to your backend
    // 2. Initialize payment with selected gateway
    // 3. Redirect to payment page
    // 4. Handle success/failure callbacks
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // For demo purposes, show success
      alert(`Subscription to ${plans.find(p => p.id === selectedPlan)?.name} initiated!`);
      
      // In a real app, you would redirect to payment gateway
      console.log('Initiating payment with:', {
        plan: selectedPlan,
        method: paymentMethod
      });
    } catch (error) {
      alert('Subscription failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const selectedPlanData = plans.find(plan => plan.id === selectedPlan);

  return (
    <div className="min-h-screen bg-ghotok-warm-beige">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Button variant="ghost" size="icon" className="mr-2" onClick={onBack}>
                <ArrowLeft className="h-5 w-5" />
              </Button>
              <Crown className="h-8 w-8 text-ghotok-pastel-pink" />
              <div className="ml-2 text-xl font-bold">
                <span className="text-ghotok-muted-green">Ghotok</span>
                <span className="text-ghotok-pastel-pink">der</span>
                <span className="text-ghotok-dark-gray">Bari</span>
              </div>
            </div>
            
            <div className="text-sm text-muted-foreground">
              {userProfile?.isPremium ? (
                <span className="flex items-center">
                  <Star className="w-4 h-4 text-ghotok-pastel-pink mr-1" />
                  Premium Member
                </span>
              ) : (
                <span>Free Account</span>
              )}
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-ghotok-dark-gray mb-4">
            Unlock Premium Features
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Upgrade to Premium and get the best experience on Ghotokder Bari. 
            Find your perfect match faster with enhanced features.
          </p>
        </div>

        {/* Subscription Plans */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {plans.map((plan) => (
            <Card 
              key={plan.id}
              className={`relative overflow-hidden ${
                plan.popular 
                  ? 'border-2 border-ghotok-pastel-pink shadow-lg transform scale-105' 
                  : ''
              }`}
            >
              {plan.popular && (
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-ghotok-pastel-pink text-white px-4 py-1 rounded-full text-sm font-bold">
                  MOST POPULAR
                </div>
              )}
              
              <CardHeader>
                <CardTitle className="flex flex-col items-center">
                  <span className="text-2xl font-bold">{plan.name}</span>
                  <div className="mt-2 text-center">
                    <span className="text-3xl font-bold">৳{plan.price}</span>
                    <span className="text-muted-foreground">/{plan.duration}</span>
                  </div>
                </CardTitle>
              </CardHeader>
              
              <CardContent>
                <ul className="space-y-3 mb-6">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <Check className="h-5 w-5 text-ghotok-muted-green mr-2 mt-0.5 flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <Button
                  onClick={() => setSelectedPlan(plan.id)}
                  className={`w-full ${
                    selectedPlan === plan.id
                      ? 'bg-ghotok-pastel-pink hover:bg-ghotok-pastel-pink/90'
                      : 'bg-ghotok-muted-green hover:bg-ghotok-muted-green/90'
                  }`}
                >
                  {selectedPlan === plan.id ? 'Selected' : 'Select Plan'}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Payment Section */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center">
              <CreditCard className="w-5 h-5 mr-2 text-ghotok-muted-green" />
              Payment Method
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              {paymentMethods.map((method) => {
                const Icon = method.icon;
                return (
                  <Button
                    key={method.id}
                    variant={paymentMethod === method.id ? 'default' : 'outline'}
                    className={`flex flex-col items-center justify-center h-24 ${
                      paymentMethod === method.id
                        ? 'bg-ghotok-muted-green hover:bg-ghotok-muted-green/90'
                        : ''
                    }`}
                    onClick={() => setPaymentMethod(method.id as any)}
                  >
                    <Icon className="w-8 h-8 mb-2" />
                    <span>{method.name}</span>
                  </Button>
                );
              })}
            </div>

            {/* Payment Details */}
            <div className="bg-ghotok-warm-beige rounded-lg p-4 mb-6">
              <div className="flex justify-between items-center mb-2">
                <span>Selected Plan:</span>
                <span className="font-semibold">
                  {selectedPlanData?.name} (৳{selectedPlanData?.price})
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span>Total:</span>
                <span className="text-xl font-bold text-ghotok-pastel-pink">
                  ৳{selectedPlanData?.price}
                </span>
              </div>
            </div>

            {/* Subscribe Button */}
            <Button
              onClick={handleSubscribe}
              disabled={loading}
              className="w-full bg-ghotok-pastel-pink hover:bg-ghotok-pastel-pink/90 py-6 text-lg"
            >
              {loading ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  Processing...
                </>
              ) : (
                <>
                  <Crown className="w-5 h-5 mr-2" />
                  Subscribe Now
                </>
              )}
            </Button>
          </CardContent>
        </Card>

        {/* Features Comparison */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Zap className="w-5 h-5 mr-2 text-ghotok-muted-green" />
              Premium Features
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr>
                    <th className="text-left pb-4">Feature</th>
                    <th className="text-center pb-4">Free</th>
                    <th className="text-center pb-4">Gold</th>
                    <th className="text-center pb-4">Platinum</th>
                    <th className="text-center pb-4">Diamond</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="py-3 border-t">
                      <div className="flex items-center">
                        <Heart className="w-4 h-4 mr-2 text-ghotok-muted-green" />
                        <span>Unlimited Likes</span>
                      </div>
                    </td>
                    <td className="text-center border-t">✓</td>
                    <td className="text-center border-t">✓</td>
                    <td className="text-center border-t">✓</td>
                    <td className="text-center border-t">✓</td>
                  </tr>
                  <tr>
                    <td className="py-3 border-t">
                      <div className="flex items-center">
                        <Users className="w-4 h-4 mr-2 text-ghotok-muted-green" />
                        <span>See Who Liked You</span>
                      </div>
                    </td>
                    <td className="text-center border-t">✗</td>
                    <td className="text-center border-t">✓</td>
                    <td className="text-center border-t">✓</td>
                    <td className="text-center border-t">✓</td>
                  </tr>
                  <tr>
                    <td className="py-3 border-t">
                      <div className="flex items-center">
                        <Zap className="w-4 h-4 mr-2 text-ghotok-muted-green" />
                        <span>Profile Boost</span>
                      </div>
                    </td>
                    <td className="text-center border-t">✗</td>
                    <td className="text-center border-t">✗</td>
                    <td className="text-center border-t">✓</td>
                    <td className="text-center border-t">✓</td>
                  </tr>
                  <tr>
                    <td className="py-3 border-t">
                      <div className="flex items-center">
                        <Shield className="w-4 h-4 mr-2 text-ghotok-muted-green" />
                        <span>Priority Support</span>
                      </div>
                    </td>
                    <td className="text-center border-t">✗</td>
                    <td className="text-center border-t">✓</td>
                    <td className="text-center border-t">✓</td>
                    <td className="text-center border-t">✓</td>
                  </tr>
                  <tr>
                    <td className="py-3 border-t">
                      <div className="flex items-center">
                        <Star className="w-4 h-4 mr-2 text-ghotok-muted-green" />
                        <span>Personal Matchmaker</span>
                      </div>
                    </td>
                    <td className="text-center border-t">✗</td>
                    <td className="text-center border-t">✗</td>
                    <td className="text-center border-t">✗</td>
                    <td className="text-center border-t">✓</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Testimonials */}
        <div className="mt-12 text-center">
          <h3 className="text-xl font-semibold mb-6">What Our Premium Members Say</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-ghotok-pastel-pink fill-current" />
                  ))}
                </div>
                <p className="text-muted-foreground italic">
                  "Premium helped me find my perfect match in just 2 weeks! The profile boost feature really worked."
                </p>
                <p className="mt-4 font-medium">- রহিমা খাতুন</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-ghotok-pastel-pink fill-current" />
                  ))}
                </div>
                <p className="text-muted-foreground italic">
                  "The personal matchmaker support was incredible. I found someone who truly matches my values."
                </p>
                <p className="mt-4 font-medium">- মোহাম্মদ আলী</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-ghotok-pastel-pink fill-current" />
                  ))}
                </div>
                <p className="text-muted-foreground italic">
                  "Worth every penny! The video call feature helped me connect before meeting in person."
                </p>
                <p className="mt-4 font-medium">- ফারহানা আক্তার</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}