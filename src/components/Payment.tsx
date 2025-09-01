import React, { useState } from 'react';
import { Navigation } from './Navigation';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import { Separator } from './ui/separator';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { toast } from 'sonner@2.0.3';
import { 
  Crown, 
  Star, 
  Check, 
  CreditCard, 
  Smartphone, 
  Shield, 
  Zap, 
  Heart, 
  MessageCircle, 
  Eye, 
  Users, 
  ArrowLeft,
  Gift,
  Clock,
  Percent,
  X
} from 'lucide-react';

interface PaymentProps {
  onBack?: () => void;
}

export function Payment({ onBack }: PaymentProps) {
  const [selectedPlan, setSelectedPlan] = useState<'basic' | 'premium' | 'vip'>('premium');
  const [selectedDuration, setSelectedDuration] = useState<'1' | '3' | '6' | '12'>('3');
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'bkash' | 'nagad' | 'rocket'>('bkash');
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [cardDetails, setCardDetails] = useState({
    number: '',
    expiry: '',
    cvv: '',
    name: ''
  });
  const [mobilePaymentDetails, setMobilePaymentDetails] = useState({
    number: '',
    pin: ''
  });

  const plans = {
    basic: {
      name: 'Basic',
      icon: Users,
      color: 'bg-gray-500',
      originalPrice: { 1: 999, 3: 2499, 6: 4499, 12: 7999 },
      discountedPrice: { 1: 799, 3: 1999, 6: 3599, 12: 6399 },
      features: [
        'View up to 50 profiles per day',
        'Send up to 10 interests per day',
        'Basic search filters',
        'Customer support via email',
        'Profile verification badge'
      ],
      limitations: [
        'Limited profile views',
        'No priority in search',
        'Basic matching algorithm'
      ]
    },
    premium: {
      name: 'Premium',
      icon: Star,
      color: 'bg-ghotok-muted-green',
      originalPrice: { 1: 1999, 3: 4999, 6: 8999, 12: 15999 },
      discountedPrice: { 1: 1599, 3: 3999, 6: 7199, 12: 12799 },
      features: [
        'Unlimited profile views',
        'Send unlimited interests',
        'Advanced search filters',
        'Priority customer support',
        'Enhanced profile visibility',
        'Read receipts for messages',
        'See who viewed your profile',
        'Advanced matching algorithm'
      ],
      popular: true
    },
    vip: {
      name: 'VIP',
      icon: Crown,
      color: 'bg-yellow-500',
      originalPrice: { 1: 2999, 3: 7499, 6: 13499, 12: 23999 },
      discountedPrice: { 1: 2399, 3: 5999, 6: 10799, 12: 19199 },
      features: [
        'Everything in Premium',
        'Top position in search results',
        'Dedicated relationship manager',
        'Personal matchmaker consultation',
        'Video call feature',
        'Priority profile verification',
        'Exclusive VIP events access',
        'Success story feature eligibility',
        '24/7 premium support'
      ],
      premium: true
    }
  };

  const paymentMethods = [
    {
      id: 'bkash',
      name: 'bKash',
      icon: '💰',
      description: 'Pay with bKash mobile banking',
      popular: true
    },
    {
      id: 'nagad',
      name: 'Nagad',
      icon: '📱',
      description: 'Pay with Nagad mobile banking'
    },
    {
      id: 'rocket',
      name: 'Rocket',
      icon: '🚀',
      description: 'Pay with Rocket mobile banking'
    },
    {
      id: 'card',
      name: 'Credit/Debit Card',
      icon: '💳',
      description: 'Visa, Mastercard accepted'
    }
  ];

  const currentPlan = plans[selectedPlan];
  const originalPrice = currentPlan.originalPrice[selectedDuration];
  const discountedPrice = currentPlan.discountedPrice[selectedDuration];
  const savings = originalPrice - discountedPrice;
  const discountPercentage = Math.round((savings / originalPrice) * 100);

  const durationLabels = {
    '1': '1 Month',
    '3': '3 Months',
    '6': '6 Months',
    '12': '12 Months'
  };

  const handlePayment = () => {
    if (paymentMethod === 'card') {
      if (!cardDetails.number || !cardDetails.expiry || !cardDetails.cvv || !cardDetails.name) {
        toast('Please fill in all card details', { description: 'All fields are required' });
        return;
      }
    } else {
      if (!mobilePaymentDetails.number || !mobilePaymentDetails.pin) {
        toast('Please fill in all payment details', { description: 'Phone number and PIN are required' });
        return;
      }
    }

    // Simulate payment processing
    toast('Processing payment...', { description: 'Please wait while we process your payment' });
    
    setTimeout(() => {
      toast('Payment successful!', { 
        description: `Welcome to ${currentPlan.name}! Your subscription is now active.` 
      });
      setShowPaymentModal(false);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-ghotok-warm-beige pb-16 md:pb-0">
      <Navigation currentPage="premium" userAuthenticated={true} />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Header */}
        <div className="text-center mb-8">
          {onBack && (
            <Button variant="ghost" className="mb-4" onClick={onBack}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
          )}
          <h1 className="text-3xl font-bold text-ghotok-dark-gray mb-4">
            Choose Your Subscription Plan
          </h1>
          <p className="text-lg text-muted-foreground mb-2">
            আপনার সাবস্ক্রিপশন প্ল্যান বেছে নিন
          </p>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Unlock premium features and find your perfect match faster with our subscription plans.
          </p>
        </div>

        {/* Special Offer Banner */}
        <Card className="mb-8 border-2 border-yellow-400 bg-gradient-to-r from-yellow-50 to-orange-50">
          <CardContent className="p-6 text-center">
            <div className="flex items-center justify-center space-x-2 mb-2">
              <Gift className="w-6 h-6 text-yellow-600" />
              <h3 className="text-xl font-bold text-yellow-800">Limited Time Offer!</h3>
            </div>
            <p className="text-yellow-700 mb-2">
              Get up to 20% off on all plans. Offer valid until December 31, 2024!
            </p>
            <Badge className="bg-yellow-500 text-black">
              <Percent className="w-3 h-3 mr-1" />
              Save up to ৳4,800
            </Badge>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Plans Selection */}
          <div className="lg:col-span-2">
            {/* Plan Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              {(Object.keys(plans) as Array<keyof typeof plans>).map((planKey) => {
                const plan = plans[planKey];
                const Icon = plan.icon;
                const isSelected = selectedPlan === planKey;
                
                return (
                  <Card 
                    key={planKey}
                    className={`cursor-pointer transition-all duration-300 relative ${
                      isSelected 
                        ? 'border-2 border-ghotok-muted-green shadow-lg' 
                        : 'border border-ghotok-light-gray hover:shadow-md'
                    } ${plan.popular ? 'ring-2 ring-ghotok-muted-green' : ''}`}
                    onClick={() => setSelectedPlan(planKey)}
                  >
                    {plan.popular && (
                      <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                        <Badge className="bg-ghotok-muted-green text-white">
                          Most Popular
                        </Badge>
                      </div>
                    )}
                    
                    {plan.premium && (
                      <div className="absolute -top-3 right-3">
                        <Badge className="bg-yellow-500 text-black">
                          <Crown className="w-3 h-3 mr-1" />
                          VIP
                        </Badge>
                      </div>
                    )}

                    <CardHeader className="text-center pb-4">
                      <div className={`w-16 h-16 ${plan.color} rounded-full flex items-center justify-center mx-auto mb-4`}>
                        <Icon className="w-8 h-8 text-white" />
                      </div>
                      <CardTitle className="text-xl text-ghotok-dark-gray">
                        {plan.name}
                      </CardTitle>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-ghotok-dark-gray">
                          ৳{plan.discountedPrice[selectedDuration].toLocaleString()}
                        </div>
                        <div className="text-sm text-muted-foreground line-through">
                          ৳{plan.originalPrice[selectedDuration].toLocaleString()}
                        </div>
                        <div className="text-xs text-ghotok-muted-green">
                          for {durationLabels[selectedDuration]}
                        </div>
                      </div>
                    </CardHeader>

                    <CardContent>
                      <ul className="space-y-2 mb-4">
                        {plan.features.slice(0, 4).map((feature, index) => (
                          <li key={index} className="flex items-start space-x-2 text-sm">
                            <Check className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                            <span>{feature}</span>
                          </li>
                        ))}
                        {plan.features.length > 4 && (
                          <li className="text-sm text-muted-foreground">
                            +{plan.features.length - 4} more features
                          </li>
                        )}
                      </ul>

                      {isSelected && (
                        <div className="mt-4 p-3 bg-ghotok-light-gray/30 rounded-lg">
                          <div className="flex items-center text-sm text-ghotok-muted-green">
                            <Check className="w-4 h-4 mr-2" />
                            Selected Plan
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                );
              })}
            </div>

            {/* Duration Selection */}
            <Card className="mb-8 border-0 bg-white shadow-sm">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Clock className="w-5 h-5 mr-2" />
                  Subscription Duration
                </CardTitle>
              </CardHeader>
              <CardContent>
                <RadioGroup 
                  value={selectedDuration} 
                  onValueChange={setSelectedDuration}
                  className="grid grid-cols-2 md:grid-cols-4 gap-4"
                >
                  {Object.entries(durationLabels).map(([value, label]) => {
                    const price = currentPlan.discountedPrice[value as keyof typeof currentPlan.discountedPrice];
                    const originalPrice = currentPlan.originalPrice[value as keyof typeof currentPlan.originalPrice];
                    const monthlyPrice = Math.round(price / parseInt(value));
                    const savings = originalPrice - price;
                    
                    return (
                      <div key={value} className="relative">
                        <RadioGroupItem value={value} id={value} className="peer sr-only" />
                        <Label
                          htmlFor={value}
                          className="flex flex-col items-center justify-center p-4 border-2 border-ghotok-light-gray rounded-lg cursor-pointer peer-checked:border-ghotok-muted-green peer-checked:bg-ghotok-light-gray/30 hover:bg-ghotok-light-gray/20 transition-colors"
                        >
                          <div className="font-semibold text-ghotok-dark-gray">{label}</div>
                          <div className="text-sm text-muted-foreground">৳{monthlyPrice}/month</div>
                          {savings > 0 && (
                            <Badge variant="secondary" className="mt-2 text-xs bg-green-100 text-green-700">
                              Save ৳{savings}
                            </Badge>
                          )}
                        </Label>
                        {value === '12' && (
                          <div className="absolute -top-2 -right-2">
                            <Badge className="bg-red-500 text-white text-xs">
                              Best Value
                            </Badge>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </RadioGroup>
              </CardContent>
            </Card>

            {/* Feature Comparison */}
            <Card className="border-0 bg-white shadow-sm">
              <CardHeader>
                <CardTitle>What you get with {currentPlan.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {currentPlan.features.map((feature, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <div className="w-6 h-6 bg-ghotok-muted-green rounded-full flex items-center justify-center flex-shrink-0">
                        <Check className="w-4 h-4 text-white" />
                      </div>
                      <span className="text-sm">{feature}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Order Summary & Payment */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <Card className="border-0 bg-white shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Shield className="w-5 h-5 mr-2" />
                    Order Summary
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Selected Plan */}
                  <div className="flex items-center justify-between p-3 bg-ghotok-light-gray/30 rounded-lg">
                    <div>
                      <div className="font-semibold text-ghotok-dark-gray">
                        {currentPlan.name} Plan
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {durationLabels[selectedDuration]}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-ghotok-dark-gray">
                        ৳{discountedPrice.toLocaleString()}
                      </div>
                      <div className="text-xs text-muted-foreground line-through">
                        ৳{originalPrice.toLocaleString()}
                      </div>
                    </div>
                  </div>

                  <Separator />

                  {/* Pricing Breakdown */}
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Subtotal</span>
                      <span>৳{originalPrice.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-green-600">
                      <span>Discount ({discountPercentage}%)</span>
                      <span>-৳{savings.toLocaleString()}</span>
                    </div>
                    <Separator />
                    <div className="flex justify-between font-bold text-lg">
                      <span>Total</span>
                      <span>৳{discountedPrice.toLocaleString()}</span>
                    </div>
                  </div>

                  {/* Payment Method Selection */}
                  <div className="space-y-3">
                    <Label className="text-sm font-semibold">Payment Method</Label>
                    <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
                      {paymentMethods.map((method) => (
                        <div key={method.id} className="flex items-center space-x-3">
                          <RadioGroupItem value={method.id} id={method.id} />
                          <Label htmlFor={method.id} className="flex items-center space-x-3 flex-1 cursor-pointer">
                            <span className="text-lg">{method.icon}</span>
                            <div>
                              <div className="font-medium">{method.name}</div>
                              <div className="text-xs text-muted-foreground">
                                {method.description}
                              </div>
                            </div>
                            {method.popular && (
                              <Badge variant="secondary" className="text-xs">
                                Popular
                              </Badge>
                            )}
                          </Label>
                        </div>
                      ))}
                    </RadioGroup>
                  </div>

                  {/* Subscribe Button */}
                  <Dialog open={showPaymentModal} onOpenChange={setShowPaymentModal}>
                    <DialogTrigger asChild>
                      <Button className="w-full h-12 bg-ghotok-muted-green hover:bg-ghotok-muted-green/90 text-lg">
                        <CreditCard className="w-5 h-5 mr-2" />
                        Subscribe Now
                      </Button>
                    </DialogTrigger>
                    
                    <DialogContent className="sm:max-w-md">
                      <DialogHeader>
                        <DialogTitle className="flex items-center">
                          <Shield className="w-5 h-5 mr-2" />
                          Complete Payment
                        </DialogTitle>
                      </DialogHeader>
                      
                      <div className="space-y-4">
                        {/* Payment Summary */}
                        <div className="p-4 bg-ghotok-light-gray/30 rounded-lg">
                          <div className="text-center">
                            <div className="font-bold text-xl text-ghotok-dark-gray">
                              ৳{discountedPrice.toLocaleString()}
                            </div>
                            <div className="text-sm text-muted-foreground">
                              {currentPlan.name} - {durationLabels[selectedDuration]}
                            </div>
                          </div>
                        </div>

                        {/* Payment Form */}
                        {paymentMethod === 'card' ? (
                          <div className="space-y-3">
                            <div>
                              <Label htmlFor="cardName">Cardholder Name</Label>
                              <Input
                                id="cardName"
                                value={cardDetails.name}
                                onChange={(e) => setCardDetails(prev => ({ ...prev, name: e.target.value }))}
                                placeholder="Enter cardholder name"
                              />
                            </div>
                            <div>
                              <Label htmlFor="cardNumber">Card Number</Label>
                              <Input
                                id="cardNumber"
                                value={cardDetails.number}
                                onChange={(e) => setCardDetails(prev => ({ ...prev, number: e.target.value }))}
                                placeholder="1234 5678 9012 3456"
                                maxLength={19}
                              />
                            </div>
                            <div className="grid grid-cols-2 gap-3">
                              <div>
                                <Label htmlFor="cardExpiry">Expiry</Label>
                                <Input
                                  id="cardExpiry"
                                  value={cardDetails.expiry}
                                  onChange={(e) => setCardDetails(prev => ({ ...prev, expiry: e.target.value }))}
                                  placeholder="MM/YY"
                                  maxLength={5}
                                />
                              </div>
                              <div>
                                <Label htmlFor="cardCvv">CVV</Label>
                                <Input
                                  id="cardCvv"
                                  value={cardDetails.cvv}
                                  onChange={(e) => setCardDetails(prev => ({ ...prev, cvv: e.target.value }))}
                                  placeholder="123"
                                  maxLength={3}
                                />
                              </div>
                            </div>
                          </div>
                        ) : (
                          <div className="space-y-3">
                            <div>
                              <Label htmlFor="mobileNumber">
                                {paymentMethod.charAt(0).toUpperCase() + paymentMethod.slice(1)} Number
                              </Label>
                              <Input
                                id="mobileNumber"
                                value={mobilePaymentDetails.number}
                                onChange={(e) => setMobilePaymentDetails(prev => ({ ...prev, number: e.target.value }))}
                                placeholder="01XXXXXXXXX"
                              />
                            </div>
                            <div>
                              <Label htmlFor="mobilePin">PIN</Label>
                              <Input
                                id="mobilePin"
                                type="password"
                                value={mobilePaymentDetails.pin}
                                onChange={(e) => setMobilePaymentDetails(prev => ({ ...prev, pin: e.target.value }))}
                                placeholder="Enter your PIN"
                                maxLength={5}
                              />
                            </div>
                          </div>
                        )}

                        {/* Security Notice */}
                        <div className="flex items-start space-x-2 text-xs text-muted-foreground">
                          <Shield className="w-4 h-4 mt-0.5 flex-shrink-0" />
                          <p>
                            Your payment information is encrypted and secure. 
                            We never store your payment details.
                          </p>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex space-x-3 pt-4">
                          <Button
                            variant="outline"
                            onClick={() => setShowPaymentModal(false)}
                            className="flex-1"
                          >
                            Cancel
                          </Button>
                          <Button
                            onClick={handlePayment}
                            className="flex-1 bg-ghotok-muted-green hover:bg-ghotok-muted-green/90"
                          >
                            Pay Now
                          </Button>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>

                  {/* Money-back Guarantee */}
                  <div className="text-center p-3 bg-green-50 border border-green-200 rounded-lg">
                    <div className="flex items-center justify-center space-x-2 text-green-700">
                      <Shield className="w-4 h-4" />
                      <span className="text-sm font-medium">30-Day Money-Back Guarantee</span>
                    </div>
                    <p className="text-xs text-green-600 mt-1">
                      Not satisfied? Get a full refund within 30 days.
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Customer Support */}
              <Card className="mt-6 border-0 bg-white shadow-sm">
                <CardContent className="p-4 text-center">
                  <h4 className="font-semibold text-ghotok-dark-gray mb-2">
                    Need Help?
                  </h4>
                  <p className="text-sm text-muted-foreground mb-3">
                    Our customer support team is here to help you.
                  </p>
                  <Button variant="outline" size="sm" className="w-full">
                    Contact Support
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}