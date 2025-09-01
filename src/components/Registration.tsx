import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { 
  User, 
  Calendar, 
  MapPin, 
  Briefcase, 
  GraduationCap, 
  Heart, 
  ArrowLeft,
  Camera,
  Loader2,
  CheckCircle
} from 'lucide-react';
import { toast } from 'sonner';

interface RegistrationProps {
  onComplete: (userData: any) => void;
  onBack?: () => void;
}

export function Registration({ onComplete, onBack }: RegistrationProps) {
  const { currentUser, userProfile, updateUserProfile } = useAuth();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [profileImage, setProfileImage] = useState<string | null>(null);
  
  // Form state
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    dateOfBirth: '',
    gender: '',
    city: '',
    state: '',
    country: 'Bangladesh',
    profession: '',
    education: '',
    bio: '',
    interests: [] as string[],
  });

  // Initialize form with existing profile data
  useEffect(() => {
    if (userProfile) {
      setFormData({
        firstName: userProfile.firstName || '',
        lastName: userProfile.lastName || '',
        dateOfBirth: userProfile.dateOfBirth ? 
          new Date(userProfile.dateOfBirth).toISOString().split('T')[0] : '',
        gender: userProfile.gender || '',
        city: userProfile.location?.city || '',
        state: userProfile.location?.state || '',
        country: userProfile.location?.country || 'Bangladesh',
        profession: userProfile.profession || '',
        education: userProfile.education || '',
        bio: userProfile.bio || '',
        interests: userProfile.interests || [],
      });
    }
  }, [userProfile]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: value
    }));
  };

  const handleInterestToggle = (interest: string) => {
    setFormData(prev => {
      const interests = prev.interests.includes(interest)
        ? prev.interests.filter(i => i !== interest)
        : [...prev.interests, interest];
      
      return { ...prev, interests };
    });
  };

  const validateStep = (currentStep: number) => {
    switch (currentStep) {
      case 1:
        return formData.firstName && formData.lastName && formData.dateOfBirth && formData.gender;
      case 2:
        return formData.city && formData.state;
      case 3:
        return formData.profession && formData.education;
      default:
        return true;
    }
  };

  const handleNext = () => {
    if (validateStep(step)) {
      setStep(prev => prev + 1);
    } else {
      toast('Please complete all required fields', {
        description: 'All fields marked with * are required'
      });
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(prev => prev - 1);
    } else {
      onBack?.();
    }
  };

  const handleSubmit = async () => {
    if (!validateStep(step)) {
      toast('Please complete all required fields', {
        description: 'All fields marked with * are required'
      });
      return;
    }

    setLoading(true);
    try {
      const profileData = {
        ...formData,
        displayName: `${formData.firstName} ${formData.lastName}`,
        location: {
          city: formData.city,
          state: formData.state,
          country: formData.country
        },
        profileCompleted: true,
        updatedAt: new Date()
      };

      await updateUserProfile(profileData);
      toast('Profile completed successfully!', {
        description: 'Welcome to Ghotokder Bari'
      });
      onComplete(profileData);
    } catch (error) {
      toast('Profile update failed', {
        description: 'Please try again'
      });
    } finally {
      setLoading(false);
    }
  };

  const commonInterests = [
    'Cooking', 'Traveling', 'Reading', 'Music', 
    'Sports', 'Movies', 'Gardening', 'Photography',
    'Dancing', 'Art', 'Technology', 'Volunteering'
  ];

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <div className="mx-auto bg-ghotok-warm-beige rounded-full p-3 w-24 h-24 flex items-center justify-center mb-4">
                <User className="w-12 h-12 text-ghotok-muted-green" />
              </div>
              <h3 className="text-xl font-semibold">Personal Information</h3>
              <p className="text-muted-foreground">Tell us about yourself</p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="firstName">First Name *</Label>
                <Input
                  id="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  placeholder="Your first name"
                />
              </div>
              <div>
                <Label htmlFor="lastName">Last Name *</Label>
                <Input
                  id="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  placeholder="Your last name"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="dateOfBirth">Date of Birth *</Label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="dateOfBirth"
                  type="date"
                  value={formData.dateOfBirth}
                  onChange={handleInputChange}
                  className="pl-10"
                />
              </div>
            </div>

            <div>
              <Label>Gender *</Label>
              <div className="grid grid-cols-3 gap-3 mt-2">
                {['male', 'female', 'other'].map((gender) => (
                  <Button
                    key={gender}
                    type="button"
                    variant={formData.gender === gender ? "default" : "outline"}
                    onClick={() => setFormData(prev => ({ ...prev, gender }))}
                    className="capitalize"
                  >
                    {gender}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <div className="mx-auto bg-ghotok-warm-beige rounded-full p-3 w-24 h-24 flex items-center justify-center mb-4">
                <MapPin className="w-12 h-12 text-ghotok-muted-green" />
              </div>
              <h3 className="text-xl font-semibold">Location</h3>
              <p className="text-muted-foreground">Where are you from?</p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="city">City *</Label>
                <Input
                  id="city"
                  value={formData.city}
                  onChange={handleInputChange}
                  placeholder="e.g., Dhaka"
                />
              </div>
              <div>
                <Label htmlFor="state">State/Division *</Label>
                <Input
                  id="state"
                  value={formData.state}
                  onChange={handleInputChange}
                  placeholder="e.g., Dhaka"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="country">Country</Label>
              <Input
                id="country"
                value={formData.country}
                onChange={handleInputChange}
                disabled
              />
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <div className="mx-auto bg-ghotok-warm-beige rounded-full p-3 w-24 h-24 flex items-center justify-center mb-4">
                <Briefcase className="w-12 h-12 text-ghotok-muted-green" />
              </div>
              <h3 className="text-xl font-semibold">Professional Info</h3>
              <p className="text-muted-foreground">What do you do?</p>
            </div>

            <div>
              <Label htmlFor="profession">Profession *</Label>
              <Input
                id="profession"
                value={formData.profession}
                onChange={handleInputChange}
                placeholder="e.g., Software Engineer"
              />
            </div>

            <div>
              <Label htmlFor="education">Education *</Label>
              <Input
                id="education"
                value={formData.education}
                onChange={handleInputChange}
                placeholder="e.g., B.Sc. in Computer Science"
              />
            </div>

            <div>
              <Label htmlFor="bio">About Me</Label>
              <Textarea
                id="bio"
                value={formData.bio}
                onChange={handleInputChange}
                placeholder="Tell us about yourself..."
                rows={4}
              />
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <div className="mx-auto bg-ghotok-warm-beige rounded-full p-3 w-24 h-24 flex items-center justify-center mb-4">
                <Heart className="w-12 h-12 text-ghotok-muted-green" />
              </div>
              <h3 className="text-xl font-semibold">Interests</h3>
              <p className="text-muted-foreground">What do you enjoy doing?</p>
            </div>

            <div>
              <Label>Interests</Label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mt-2">
                {commonInterests.map((interest) => (
                  <Button
                    key={interest}
                    type="button"
                    variant={formData.interests.includes(interest) ? "default" : "outline"}
                    onClick={() => handleInterestToggle(interest)}
                    className="capitalize"
                  >
                    {interest}
                  </Button>
                ))}
              </div>
            </div>

            <div className="pt-4">
              <Label htmlFor="customInterest">Add Custom Interest</Label>
              <div className="flex gap-2 mt-2">
                <Input
                  id="customInterest"
                  placeholder="Enter your interest"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      const value = (e.target as HTMLInputElement).value.trim();
                      if (value && !formData.interests.includes(value)) {
                        handleInterestToggle(value);
                        (e.target as HTMLInputElement).value = '';
                      }
                    }
                  }}
                />
                <Button 
                  type="button"
                  onClick={(e) => {
                    const input = document.getElementById('customInterest') as HTMLInputElement;
                    if (input?.value && !formData.interests.includes(input.value)) {
                      handleInterestToggle(input.value);
                      input.value = '';
                    }
                  }}
                >
                  Add
                </Button>
              </div>
            </div>

            <div className="pt-4">
              <h4 className="font-medium mb-2">Selected Interests:</h4>
              <div className="flex flex-wrap gap-2">
                {formData.interests.length > 0 ? (
                  formData.interests.map((interest) => (
                    <span 
                      key={interest} 
                      className="bg-ghotok-muted-green/10 text-ghotok-muted-green px-3 py-1 rounded-full text-sm flex items-center"
                    >
                      {interest}
                      <button 
                        type="button"
                        onClick={() => handleInterestToggle(interest)}
                        className="ml-2 text-ghotok-muted-green/70 hover:text-ghotok-muted-green"
                      >
                        ×
                      </button>
                    </span>
                  ))
                ) : (
                  <p className="text-muted-foreground text-sm">No interests selected</p>
                )}
              </div>
            </div>
          </div>
        );

      case 5:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <div className="mx-auto bg-ghotok-warm-beige rounded-full p-3 w-24 h-24 flex items-center justify-center mb-4">
                <CheckCircle className="w-12 h-12 text-ghotok-muted-green" />
              </div>
              <h3 className="text-xl font-semibold">Complete Your Profile</h3>
              <p className="text-muted-foreground">Review your information</p>
            </div>

            <div className="bg-ghotok-warm-beige/50 rounded-lg p-4 space-y-3">
              <div className="flex justify-between border-b pb-2">
                <span className="font-medium">Name:</span>
                <span>{formData.firstName} {formData.lastName}</span>
              </div>
              <div className="flex justify-between border-b pb-2">
                <span className="font-medium">Date of Birth:</span>
                <span>{formData.dateOfBirth ? new Date(formData.dateOfBirth).toLocaleDateString() : 'Not set'}</span>
              </div>
              <div className="flex justify-between border-b pb-2">
                <span className="font-medium">Gender:</span>
                <span className="capitalize">{formData.gender || 'Not set'}</span>
              </div>
              <div className="flex justify-between border-b pb-2">
                <span className="font-medium">Location:</span>
                <span>{formData.city}, {formData.state}, {formData.country}</span>
              </div>
              <div className="flex justify-between border-b pb-2">
                <span className="font-medium">Profession:</span>
                <span>{formData.profession || 'Not set'}</span>
              </div>
              <div className="flex justify-between border-b pb-2">
                <span className="font-medium">Education:</span>
                <span>{formData.education || 'Not set'}</span>
              </div>
              <div className="flex justify-between border-b pb-2">
                <span className="font-medium">Interests:</span>
                <span>{formData.interests.join(', ') || 'None'}</span>
              </div>
            </div>

            <div className="text-center text-sm text-muted-foreground">
              <p>By completing your profile, you agree to our Terms of Service and Privacy Policy.</p>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-ghotok-warm-beige flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        {/* Header */}
        <div className="text-center mb-8">
          {onBack && step === 1 && (
            <Button variant="ghost" className="mb-4" onClick={onBack}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
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
          
          <h1 className="text-2xl font-bold">Complete Your Profile</h1>
          <p className="text-muted-foreground">
            আপনার প্রোফাইল সম্পূর্ণ করুন এবং আপনার জোড়া খুঁজুন
          </p>
        </div>

        {/* Progress Indicator */}
        <div className="mb-8">
          <div className="flex justify-between mb-2">
            {[1, 2, 3, 4, 5].map((s) => (
              <div 
                key={s} 
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium
                  ${step === s 
                    ? 'bg-ghotok-muted-green text-white' 
                    : step > s 
                      ? 'bg-ghotok-muted-green/20 text-ghotok-muted-green' 
                      : 'bg-gray-200 text-gray-500'}
                `}
              >
                {step > s ? '✓' : s}
              </div>
            ))}
          </div>
          <div className="text-center text-sm text-muted-foreground">
            Step {step} of 5
          </div>
        </div>

        {/* Registration Card */}
        <Card className="border-0 bg-white shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Profile Information</span>
              <span className="text-sm font-normal text-muted-foreground">
                {step === 1 && 'Personal Details'}
                {step === 2 && 'Location'}
                {step === 3 && 'Professional Info'}
                {step === 4 && 'Interests'}
                {step === 5 && 'Review'}
              </span>
            </CardTitle>
          </CardHeader>
          
          <CardContent>
            {renderStep()}

            {/* Navigation Buttons */}
            <div className="flex justify-between mt-8">
              <Button
                variant="outline"
                onClick={handleBack}
                disabled={loading}
              >
                {step === 1 ? 'Cancel' : 'Back'}
              </Button>
              
              {step < 5 ? (
                <Button 
                  onClick={handleNext}
                  disabled={loading}
                  className="bg-ghotok-muted-green hover:bg-ghotok-muted-green/90"
                >
                  Next
                </Button>
              ) : (
                <Button 
                  onClick={handleSubmit}
                  disabled={loading}
                  className="bg-ghotok-muted-green hover:bg-ghotok-muted-green/90"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin mr-2" />
                      Completing...
                    </>
                  ) : (
                    <>
                      <CheckCircle className="w-4 h-4 mr-2" />
                      Complete Profile
                    </>
                  )}
                </Button>
              )}
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