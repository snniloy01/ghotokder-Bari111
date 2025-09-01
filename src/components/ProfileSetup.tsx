// src/components/ProfileSetup.tsx
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

interface ProfileSetupProps {
  onComplete: () => void;
  onBack: () => void;
}

export function ProfileSetup({ onComplete, onBack }: ProfileSetupProps) {
  const { currentUser, userProfile, updateUserProfile } = useAuth();
  const [loading, setLoading] = useState(false);
  
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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
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

  const validateForm = () => {
    return (
      formData.firstName &&
      formData.lastName &&
      formData.dateOfBirth &&
      formData.gender &&
      formData.city &&
      formData.state &&
      formData.profession &&
      formData.education
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      alert('Please complete all required fields');
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
      alert('Profile completed successfully!');
      onComplete();
    } catch (error) {
      alert('Profile update failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const commonInterests = [
    'Cooking', 'Traveling', 'Reading', 'Music', 
    'Sports', 'Movies', 'Gardening', 'Photography',
    'Dancing', 'Art', 'Technology', 'Volunteering'
  ];

  return (
    <div className="min-h-screen bg-ghotok-warm-beige flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        {/* Header */}
        <div className="text-center mb-8">
          <Button variant="ghost" className="mb-4" onClick={onBack}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Button>
          
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

        {/* Profile Setup Card */}
        <Card className="border-0 bg-white shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Profile Information</span>
              <span className="text-sm font-normal text-muted-foreground">
                All fields are required unless marked optional
              </span>
            </CardTitle>
          </CardHeader>
          
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Personal Information Section */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold flex items-center">
                  <User className="w-5 h-5 mr-2 text-ghotok-muted-green" />
                  Personal Information
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="firstName">First Name *</Label>
                    <Input
                      id="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      placeholder="Your first name"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="lastName">Last Name *</Label>
                    <Input
                      id="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      placeholder="Your last name"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                        required
                      />
                    </div>
                  </div>
                  
                  <div>
                    <Label>Gender *</Label>
                    <div className="grid grid-cols-3 gap-2 mt-2">
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
              </div>

              {/* Location Section */}
              <div className="space-y-4 pt-4">
                <h3 className="text-lg font-semibold flex items-center">
                  <MapPin className="w-5 h-5 mr-2 text-ghotok-muted-green" />
                  Location
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="city">City *</Label>
                    <Input
                      id="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      placeholder="e.g., Dhaka"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="state">State/Division *</Label>
                    <Input
                      id="state"
                      value={formData.state}
                      onChange={handleInputChange}
                      placeholder="e.g., Dhaka"
                      required
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

              {/* Professional Info Section */}
              <div className="space-y-4 pt-4">
                <h3 className="text-lg font-semibold flex items-center">
                  <Briefcase className="w-5 h-5 mr-2 text-ghotok-muted-green" />
                  Professional Information
                </h3>
                
                <div>
                  <Label htmlFor="profession">Profession *</Label>
                  <Input
                    id="profession"
                    value={formData.profession}
                    onChange={handleInputChange}
                    placeholder="e.g., Software Engineer"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="education">Education *</Label>
                  <Input
                    id="education"
                    value={formData.education}
                    onChange={handleInputChange}
                    placeholder="e.g., B.Sc. in Computer Science"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="bio">About Me (Optional)</Label>
                  <Textarea
                    id="bio"
                    value={formData.bio}
                    onChange={handleInputChange}
                    placeholder="Tell us about yourself..."
                    rows={3}
                  />
                </div>
              </div>

              {/* Interests Section */}
              <div className="space-y-4 pt-4">
                <h3 className="text-lg font-semibold flex items-center">
                  <Heart className="w-5 h-5 mr-2 text-ghotok-muted-green" />
                  Interests (Optional)
                </h3>
                
                <div>
                  <Label>Select your interests</Label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mt-2">
                    {commonInterests.map((interest) => (
                      <Button
                        key={interest}
                        type="button"
                        variant={formData.interests.includes(interest) ? "default" : "outline"}
                        onClick={() => handleInterestToggle(interest)}
                        className="capitalize text-xs h-10"
                      >
                        {interest}
                      </Button>
                    ))}
                  </div>
                </div>

                <div className="pt-2">
                  <Label htmlFor="customInterest">Add Custom Interest</Label>
                  <div className="flex gap-2 mt-1">
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
                      size="sm"
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

                <div className="pt-2">
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

              {/* Submit Button */}
              <div className="flex justify-between pt-6">
                <Button
                  type="button"
                  variant="outline"
                  onClick={onBack}
                  disabled={loading}
                >
                  Cancel
                </Button>
                
                <Button 
                  type="submit"
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
              </div>
            </form>
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