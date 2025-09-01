import React, { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Separator } from './ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { useAuth } from '../contexts/AuthContext';
import { toast } from 'sonner@2.0.3';
import { 
  Heart, 
  Mail, 
  Lock, 
  Eye, 
  EyeOff, 
  User, 
  Phone,
  ArrowLeft,
  Loader2,
  CheckCircle,
  AlertCircle
} from 'lucide-react';

interface LoginProps {
  onBack?: () => void;
  onLoginSuccess?: () => void;
}

export function Login({ onBack, onLoginSuccess }: LoginProps) {
  const { login, signup, resetPassword } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [activeTab, setActiveTab] = useState<'login' | 'signup'>('login');

  // Login form state
  const [loginForm, setLoginForm] = useState({
    email: '',
    password: ''
  });

  // Signup form state
  const [signupForm, setSignupForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  // Reset password state
  const [resetEmail, setResetEmail] = useState('');
  const [showResetForm, setShowResetForm] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!loginForm.email || !loginForm.password) {
      toast('Please fill in all fields', { description: 'Email and password are required' });
      return;
    }

    setIsLoading(true);
    try {
      await login(loginForm.email, loginForm.password);
      onLoginSuccess?.();
    } catch (error) {
      // Error is handled in the auth context
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!signupForm.firstName || !signupForm.lastName || !signupForm.email || !signupForm.password) {
      toast('Please fill in all fields', { description: 'All fields are required' });
      return;
    }

    if (signupForm.password !== signupForm.confirmPassword) {
      toast('Passwords do not match', { description: 'Please ensure both password fields are identical' });
      return;
    }

    if (signupForm.password.length < 6) {
      toast('Password too short', { description: 'Password must be at least 6 characters long' });
      return;
    }

    setIsLoading(true);
    try {
      await signup(signupForm.email, signupForm.password, signupForm.firstName, signupForm.lastName);
      // Redirect to complete profile setup
      onLoginSuccess?.();
    } catch (error) {
      // Error is handled in the auth context
    } finally {
      setIsLoading(false);
    }
  };

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!resetEmail) {
      toast('Please enter your email address', { description: 'Email is required for password reset' });
      return;
    }

    setIsLoading(true);
    try {
      await resetPassword(resetEmail);
      setShowResetForm(false);
      setResetEmail('');
    } catch (error) {
      // Error is handled in the auth context
    } finally {
      setIsLoading(false);
    }
  };

  const handleDemoLogin = () => {
    setLoginForm({
      email: 'demo@ghotokderbari.com',
      password: 'demo123'
    });
    toast('Demo credentials filled', { 
      description: 'Click Sign In to continue with demo account' 
    });
  };

  return (
    <div className="min-h-screen bg-ghotok-warm-beige flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          {onBack && (
            <Button variant="ghost" className="mb-4" onClick={onBack}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
          )}
          
          <div className="flex items-center justify-center space-x-3 mb-4">
            <Heart className="h-10 w-10 text-ghotok-muted-green" />
            <div className="text-2xl font-bold">
              <span className="text-ghotok-muted-green">Ghotok</span>
              <span className="text-ghotok-pastel-pink">der</span>
              <span className="text-ghotok-dark-gray">Bari</span>
            </div>
          </div>
          
          <p className="text-muted-foreground">
            Welcome to Bangladesh's trusted matrimonial platform
          </p>
          <p className="text-sm text-muted-foreground">
            বাংলাদেশের বিশ্বস্ত বিয়ের পাত্র-পাত্রী খোঁজার প্ল্যাটফর্ম
          </p>
        </div>

        {showResetForm ? (
          /* Reset Password Form */
          <Card className="border-0 bg-white shadow-lg">
            <CardHeader className="text-center">
              <CardTitle className="flex items-center justify-center">
                <Mail className="w-5 h-5 mr-2" />
                Reset Password
              </CardTitle>
              <p className="text-sm text-muted-foreground">
                Enter your email address to receive password reset instructions
              </p>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleResetPassword} className="space-y-4">
                <div>
                  <Label htmlFor="resetEmail">Email Address</Label>
                  <Input
                    id="resetEmail"
                    type="email"
                    value={resetEmail}
                    onChange={(e) => setResetEmail(e.target.value)}
                    placeholder="Enter your email address"
                    disabled={isLoading}
                  />
                </div>

                <div className="flex space-x-3">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setShowResetForm(false)}
                    disabled={isLoading}
                    className="flex-1"
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    disabled={isLoading || !resetEmail}
                    className="flex-1 bg-ghotok-muted-green hover:bg-ghotok-muted-green/90"
                  >
                    {isLoading ? (
                      <Loader2 className="w-4 h-4 animate-spin mr-2" />
                    ) : (
                      <Mail className="w-4 h-4 mr-2" />
                    )}
                    Send Reset Link
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        ) : (
          /* Login/Signup Form */
          <Card className="border-0 bg-white shadow-lg">
            <CardHeader>
              <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="login">Sign In</TabsTrigger>
                  <TabsTrigger value="signup">Sign Up</TabsTrigger>
                </TabsList>
              </Tabs>
            </CardHeader>
            
            <CardContent>
              <Tabs value={activeTab} onValueChange={setActiveTab}>
                {/* Login Tab */}
                <TabsContent value="login">
                  <form onSubmit={handleLogin} className="space-y-4">
                    <div>
                      <Label htmlFor="email">Email Address</Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="email"
                          type="email"
                          value={loginForm.email}
                          onChange={(e) => setLoginForm(prev => ({ ...prev, email: e.target.value }))}
                          placeholder="Enter your email"
                          className="pl-10"
                          disabled={isLoading}
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="password">Password</Label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="password"
                          type={showPassword ? 'text' : 'password'}
                          value={loginForm.password}
                          onChange={(e) => setLoginForm(prev => ({ ...prev, password: e.target.value }))}
                          placeholder="Enter your password"
                          className="pl-10 pr-10"
                          disabled={isLoading}
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                          onClick={() => setShowPassword(!showPassword)}
                          disabled={isLoading}
                        >
                          {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </Button>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <Button
                        type="button"
                        variant="link"
                        className="px-0 text-ghotok-muted-green"
                        onClick={() => setShowResetForm(true)}
                        disabled={isLoading}
                      >
                        Forgot password?
                      </Button>
                    </div>

                    <Button
                      type="submit"
                      className="w-full bg-ghotok-muted-green hover:bg-ghotok-muted-green/90"
                      disabled={isLoading || !loginForm.email || !loginForm.password}
                    >
                      {isLoading ? (
                        <Loader2 className="w-4 h-4 animate-spin mr-2" />
                      ) : (
                        <CheckCircle className="w-4 h-4 mr-2" />
                      )}
                      Sign In
                    </Button>

                    <Separator />

                    <Button
                      type="button"
                      variant="outline"
                      className="w-full"
                      onClick={handleDemoLogin}
                      disabled={isLoading}
                    >
                      <User className="w-4 h-4 mr-2" />
                      Try Demo Account
                    </Button>
                  </form>
                </TabsContent>

                {/* Signup Tab */}
                <TabsContent value="signup">
                  <form onSubmit={handleSignup} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="firstName">First Name</Label>
                        <Input
                          id="firstName"
                          type="text"
                          value={signupForm.firstName}
                          onChange={(e) => setSignupForm(prev => ({ ...prev, firstName: e.target.value }))}
                          placeholder="First name"
                          disabled={isLoading}
                        />
                      </div>
                      <div>
                        <Label htmlFor="lastName">Last Name</Label>
                        <Input
                          id="lastName"
                          type="text"
                          value={signupForm.lastName}
                          onChange={(e) => setSignupForm(prev => ({ ...prev, lastName: e.target.value }))}
                          placeholder="Last name"
                          disabled={isLoading}
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="signupEmail">Email Address</Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="signupEmail"
                          type="email"
                          value={signupForm.email}
                          onChange={(e) => setSignupForm(prev => ({ ...prev, email: e.target.value }))}
                          placeholder="Enter your email"
                          className="pl-10"
                          disabled={isLoading}
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="signupPassword">Password</Label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="signupPassword"
                          type={showPassword ? 'text' : 'password'}
                          value={signupForm.password}
                          onChange={(e) => setSignupForm(prev => ({ ...prev, password: e.target.value }))}
                          placeholder="Create password (min 6 characters)"
                          className="pl-10 pr-10"
                          disabled={isLoading}
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                          onClick={() => setShowPassword(!showPassword)}
                          disabled={isLoading}
                        >
                          {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </Button>
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="confirmPassword">Confirm Password</Label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="confirmPassword"
                          type={showConfirmPassword ? 'text' : 'password'}
                          value={signupForm.confirmPassword}
                          onChange={(e) => setSignupForm(prev => ({ ...prev, confirmPassword: e.target.value }))}
                          placeholder="Confirm your password"
                          className="pl-10 pr-10"
                          disabled={isLoading}
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                          disabled={isLoading}
                        >
                          {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </Button>
                      </div>
                    </div>

                    {/* Password Requirements */}
                    <div className="text-xs text-muted-foreground space-y-1">
                      <div className={`flex items-center space-x-2 ${signupForm.password.length >= 6 ? 'text-green-600' : ''}`}>
                        {signupForm.password.length >= 6 ? 
                          <CheckCircle className="w-3 h-3" /> : 
                          <AlertCircle className="w-3 h-3" />
                        }
                        <span>At least 6 characters</span>
                      </div>
                      <div className={`flex items-center space-x-2 ${signupForm.password === signupForm.confirmPassword && signupForm.confirmPassword ? 'text-green-600' : ''}`}>
                        {signupForm.password === signupForm.confirmPassword && signupForm.confirmPassword ? 
                          <CheckCircle className="w-3 h-3" /> : 
                          <AlertCircle className="w-3 h-3" />
                        }
                        <span>Passwords match</span>
                      </div>
                    </div>

                    <Button
                      type="submit"
                      className="w-full bg-ghotok-muted-green hover:bg-ghotok-muted-green/90"
                      disabled={
                        isLoading || 
                        !signupForm.firstName || 
                        !signupForm.lastName || 
                        !signupForm.email || 
                        !signupForm.password || 
                        signupForm.password !== signupForm.confirmPassword ||
                        signupForm.password.length < 6
                      }
                    >
                      {isLoading ? (
                        <Loader2 className="w-4 h-4 animate-spin mr-2" />
                      ) : (
                        <User className="w-4 h-4 mr-2" />
                      )}
                      Create Account
                    </Button>
                  </form>
                </TabsContent>
              </Tabs>

              <div className="mt-6 text-center text-xs text-muted-foreground">
                <p>
                  By signing up, you agree to our{' '}
                  <button className="text-ghotok-muted-green underline">Terms of Service</button>
                  {' '}and{' '}
                  <button className="text-ghotok-muted-green underline">Privacy Policy</button>
                </p>
              </div>
            </CardContent>
          </Card>
        )}

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