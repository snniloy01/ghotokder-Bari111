// src/components/ProfileDetails.tsx
import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { 
  Heart, 
  MessageCircle, 
  Phone, 
  Mail, 
  MapPin, 
  Calendar, 
  GraduationCap, 
  Briefcase, 
  User, 
  Crown,
  ArrowLeft,
  Share2,
  MoreHorizontal,
  Shield,
  Star
} from 'lucide-react';

interface Profile {
  id: string;
  firstName: string;
  lastName: string;
  age: number;
  dateOfBirth: string;
  gender: string;
  location: {
    city: string;
    state: string;
    country: string;
  };
  profession: string;
  education: string;
  bio: string;
  interests: string[];
  isPremium: boolean;
  isOnline: boolean;
  lastActive: string;
  profileCompleted: boolean;
  profileImage?: string;
}

interface ProfileDetailsProps {
  profileId: string;
  onBack: () => void;
}

export function ProfileDetails({ profileId, onBack }: ProfileDetailsProps) {
  const { userProfile } = useAuth();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [liked, setLiked] = useState(false);

  // Mock data for demonstration
  useEffect(() => {
    // Simulate API call to fetch profile details
    const mockProfile: Profile = {
      id: profileId,
      firstName: 'রহিমা',
      lastName: 'খাতুন',
      age: 26,
      dateOfBirth: '1997-05-15',
      gender: 'female',
      location: { 
        city: 'ঢাকা', 
        state: 'ঢাকা', 
        country: 'বাংলাদেশ' 
      },
      profession: 'সফটওয়্যার ইঞ্জিনিয়ার',
      education: 'বিএসসি কম্পিউটার সায়েন্স - ঢাকা বিশ্ববিদ্যালয়',
      bio: 'আমি একজন পেশাদার সফটওয়্যার ইঞ্জিনিয়ার এবং প্রযুক্তির প্রতি আমার গভীর আগ্রহ রয়েছে। আমি কোডিংয়ের পাশাপাশি গান শোনা, পড়া এবং ভ্রমণে আনন্দ পাই। একজন সংগীতপ্রিয় এবং সৃজনশীল জীবনসঙ্গী খুঁজছি।',
      interests: ['Cooking', 'Reading', 'Traveling', 'Photography', 'Technology'],
      isPremium: true,
      isOnline: true,
      lastActive: '2 minutes ago',
      profileCompleted: true
    };

    setTimeout(() => {
      setProfile(mockProfile);
      setLoading(false);
    }, 800);
  }, [profileId]);

  const handleLike = () => {
    setLiked(!liked);
    // In a real app, you would send this to your backend
    console.log('Liked profile:', profileId);
  };

  const handleSendMessage = () => {
    // In a real app, you would navigate to the chat screen
    console.log('Send message to:', profileId);
  };

  const calculateAge = (dateOfBirth: string) => {
    const dob = new Date(dateOfBirth);
    const today = new Date();
    let age = today.getFullYear() - dob.getFullYear();
    const monthDiff = today.getMonth() - dob.getMonth();
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < dob.getDate())) {
      age--;
    }
    
    return age;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-ghotok-warm-beige flex items-center justify-center">
        <div className="text-center">
          <Heart className="w-12 h-12 text-ghotok-muted-green animate-pulse mx-auto mb-4" />
          <p className="text-muted-foreground">Loading profile...</p>
        </div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="min-h-screen bg-ghotok-warm-beige flex items-center justify-center">
        <div className="text-center">
          <User className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-medium">Profile not found</h3>
          <p className="text-muted-foreground mt-2">The profile you're looking for doesn't exist</p>
          <Button onClick={onBack} className="mt-4">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Browse
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-ghotok-warm-beige">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Button variant="ghost" size="icon" className="mr-2" onClick={onBack}>
                <ArrowLeft className="h-5 w-5" />
              </Button>
              <Heart className="h-8 w-8 text-ghotok-muted-green" />
              <div className="ml-2 text-xl font-bold">
                <span className="text-ghotok-muted-green">Ghotok</span>
                <span className="text-ghotok-pastel-pink">der</span>
                <span className="text-ghotok-dark-gray">Bari</span>
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <Button variant="ghost" size="icon">
                <Share2 className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon">
                <MoreHorizontal className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Profile Header */}
        <Card className="mb-6 overflow-hidden">
          <div className="relative">
            {/* Profile Banner */}
            <div className="h-48 bg-gradient-to-r from-ghotok-muted-green to-ghotok-pastel-pink"></div>
            
            {/* Profile Info */}
            <div className="px-6 pb-6">
              <div className="flex flex-col md:flex-row md:items-end md:justify-between -mt-16">
                {/* Profile Image */}
                <div className="relative">
                  <div className="bg-gray-200 border-4 border-white rounded-full w-32 h-32" />
                  {profile.isPremium && (
                    <div className="absolute -top-2 -right-2 bg-ghotok-pastel-pink text-white p-1 rounded-full">
                      <Crown className="w-5 h-5" />
                    </div>
                  )}
                </div>
                
                {/* Profile Actions */}
                <div className="mt-4 md:mt-0 flex space-x-3">
                  <Button 
                    onClick={handleLike}
                    variant={liked ? "default" : "outline"}
                    className={liked ? "bg-ghotok-pastel-pink hover:bg-ghotok-pastel-pink/90" : ""}
                  >
                    <Heart className={`w-4 h-4 mr-2 ${liked ? "fill-current" : ""}`} />
                    {liked ? "Liked" : "Like"}
                  </Button>
                  <Button onClick={handleSendMessage} className="bg-ghotok-muted-green hover:bg-ghotok-muted-green/90">
                    <MessageCircle className="w-4 h-4 mr-2" />
                    Message
                  </Button>
                </div>
              </div>
              
              {/* Profile Name & Info */}
              <div className="mt-4">
                <div className="flex items-center">
                  <h1 className="text-2xl font-bold">
                    {profile.firstName} {profile.lastName}
                    {profile.isPremium && (
                      <Star className="inline-block w-5 h-5 text-ghotok-pastel-pink ml-2" />
                    )}
                  </h1>
                  {profile.isOnline && (
                    <span className="ml-3 bg-green-500 text-white text-xs px-2 py-1 rounded-full">
                      Online
                    </span>
                  )}
                </div>
                
                <div className="flex flex-wrap items-center mt-2 text-muted-foreground">
                  <span className="flex items-center mr-4">
                    <Calendar className="w-4 h-4 mr-1" />
                    {calculateAge(profile.dateOfBirth)} years old
                  </span>
                  <span className="flex items-center mr-4">
                    <MapPin className="w-4 h-4 mr-1" />
                    {profile.location.city}, {profile.location.state}
                  </span>
                  <span className="flex items-center">
                    <Shield className="w-4 h-4 mr-1" />
                    {profile.lastActive}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Profile Details Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* About Section */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <User className="w-5 h-5 mr-2 text-ghotok-muted-green" />
                  About Me
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-ghotok-dark-gray">
                  {profile.bio}
                </p>
              </CardContent>
            </Card>

            {/* Interests Section */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Heart className="w-5 h-5 mr-2 text-ghotok-pastel-pink" />
                  Interests
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {profile.interests.map((interest, index) => (
                    <span 
                      key={index} 
                      className="bg-ghotok-warm-beige text-ghotok-dark-gray px-3 py-1 rounded-full text-sm"
                    >
                      {interest}
                    </span>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Professional Info */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Briefcase className="w-5 h-5 mr-2 text-ghotok-muted-green" />
                  Professional Info
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div>
                    <p className="text-sm text-muted-foreground">Profession</p>
                    <p className="font-medium">{profile.profession}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Education</p>
                    <p className="font-medium">{profile.education}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Location Info */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <MapPin className="w-5 h-5 mr-2 text-ghotok-muted-green" />
                  Location
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div>
                    <p className="text-sm text-muted-foreground">City</p>
                    <p className="font-medium">{profile.location.city}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">State/Division</p>
                    <p className="font-medium">{profile.location.state}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Country</p>
                    <p className="font-medium">{profile.location.country}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Premium Benefits */}
            {profile.isPremium && (
              <Card className="border-ghotok-pastel-pink">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Crown className="w-5 h-5 mr-2 text-ghotok-pastel-pink" />
                    Premium Member
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    This member enjoys premium benefits including enhanced visibility, 
                    advanced search filters, and priority customer support.
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-8 flex justify-center space-x-4">
          <Button 
            onClick={handleLike}
            variant={liked ? "default" : "outline"}
            size="lg"
            className={`px-8 ${liked ? "bg-ghotok-pastel-pink hover:bg-ghotok-pastel-pink/90" : ""}`}
          >
            <Heart className={`w-5 h-5 mr-2 ${liked ? "fill-current" : ""}`} />
            {liked ? "Liked" : "Like Profile"}
          </Button>
          <Button 
            onClick={handleSendMessage}
            size="lg"
            className="px-8 bg-ghotok-muted-green hover:bg-ghotok-muted-green/90"
          >
            <MessageCircle className="w-5 h-5 mr-2" />
            Send Message
          </Button>
        </div>
      </div>
    </div>
  );
}