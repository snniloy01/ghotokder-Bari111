// src/components/BrowseProfiles.tsx
import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Card, CardContent } from './ui/card';
import { 
  Search, 
  Filter, 
  Heart, 
  MapPin, 
  User, 
  Star,
  Crown,
  ArrowLeft,
  SlidersHorizontal
} from 'lucide-react';

interface Profile {
  id: string;
  firstName: string;
  lastName: string;
  age: number;
  location: {
    city: string;
    state: string;
  };
  profession: string;
  education: string;
  interests: string[];
  isPremium: boolean;
  isOnline: boolean;
  lastActive: string;
  profileImage?: string;
}

interface FilterOptions {
  minAge: number;
  maxAge: number;
  city: string;
  state: string;
  profession: string;
  interests: string[];
  showPremiumOnly: boolean;
}

export function BrowseProfiles({ onProfileClick }: { onProfileClick: (profileId: string) => void }) {
  const { userProfile } = useAuth();
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [filteredProfiles, setFilteredProfiles] = useState<Profile[]>([]);
  const [loading, setLoading] = useState(true);
  const [showFilters, setShowFilters] = useState(false);
  
  // Filter state
  const [filters, setFilters] = useState<FilterOptions>({
    minAge: 18,
    maxAge: 40,
    city: '',
    state: '',
    profession: '',
    interests: [],
    showPremiumOnly: false
  });

  // Mock data for demonstration
  useEffect(() => {
    // Simulate API call to fetch profiles
    const mockProfiles: Profile[] = [
      {
        id: '1',
        firstName: 'রহিমা',
        lastName: 'খাতুন',
        age: 26,
        location: { city: 'ঢাকা', state: 'ঢাকা' },
        profession: 'সফটওয়্যার ইঞ্জিনিয়ার',
        education: 'বিএসসি কম্পিউটার সায়েন্স',
        interests: ['Cooking', 'Reading', 'Traveling'],
        isPremium: true,
        isOnline: true,
        lastActive: '2 minutes ago'
      },
      {
        id: '2',
        firstName: 'ফারহানা',
        lastName: 'আক্তার',
        age: 24,
        location: { city: 'চট্টগ্রাম', state: 'চট্টগ্রাম' },
        profession: 'ডাক্তার',
        education: 'এমবিবিএস',
        interests: ['Music', 'Dancing'],
        isPremium: false,
        isOnline: false,
        lastActive: '1 hour ago'
      },
      {
        id: '3',
        firstName: 'সাবরিনা',
        lastName: 'ইসলাম',
        age: 27,
        location: { city: 'খুলনা', state: 'খুলনা' },
        profession: 'শিক্ষক',
        education: 'মাস্টার্স ইংরেজি',
        interests: ['Photography', 'Art'],
        isPremium: true,
        isOnline: true,
        lastActive: '5 minutes ago'
      },
      {
        id: '4',
        firstName: 'নাছরিন',
        lastName: 'আক্তার',
        age: 25,
        location: { city: 'রাজশাহী', state: 'রাজশাহী' },
        profession: 'গ্রাফিক ডিজাইনার',
        education: 'বিএফএ',
        interests: ['Design', 'Technology'],
        isPremium: false,
        isOnline: false,
        lastActive: '3 hours ago'
      },
      {
        id: '5',
        firstName: 'মাহফুজা',
        lastName: 'খান',
        age: 29,
        location: { city: 'সিলেট', state: 'সিলেট' },
        profession: 'ব্যাংকার',
        education: 'বিএসসি ফাইনান্স',
        interests: ['Movies', 'Traveling'],
        isPremium: true,
        isOnline: true,
        lastActive: '10 minutes ago'
      }
    ];

    setProfiles(mockProfiles);
    setFilteredProfiles(mockProfiles);
    setLoading(false);
  }, []);

  // Apply filters
  useEffect(() => {
    let result = [...profiles];
    
    // Age filter
    result = result.filter(profile => 
      profile.age >= filters.minAge && profile.age <= filters.maxAge
    );
    
    // Location filter
    if (filters.city) {
      result = result.filter(profile => 
        profile.location.city.toLowerCase().includes(filters.city.toLowerCase())
      );
    }
    
    if (filters.state) {
      result = result.filter(profile => 
        profile.location.state.toLowerCase().includes(filters.state.toLowerCase())
      );
    }
    
    // Profession filter
    if (filters.profession) {
      result = result.filter(profile => 
        profile.profession.toLowerCase().includes(filters.profession.toLowerCase())
      );
    }
    
    // Premium filter
    if (filters.showPremiumOnly) {
      result = result.filter(profile => profile.isPremium);
    }
    
    setFilteredProfiles(result);
  }, [filters, profiles]);

  const handleFilterChange = (key: keyof FilterOptions, value: any) => {
    setFilters(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const toggleInterest = (interest: string) => {
    setFilters(prev => {
      const interests = prev.interests.includes(interest)
        ? prev.interests.filter(i => i !== interest)
        : [...prev.interests, interest];
      
      return { ...prev, interests };
    });
  };

  const resetFilters = () => {
    setFilters({
      minAge: 18,
      maxAge: 40,
      city: '',
      state: '',
      profession: '',
      interests: [],
      showPremiumOnly: false
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-ghotok-warm-beige flex items-center justify-center">
        <div className="text-center">
          <Heart className="w-12 h-12 text-ghotok-muted-green animate-pulse mx-auto mb-4" />
          <p className="text-muted-foreground">Loading profiles...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-ghotok-warm-beige">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Button variant="ghost" size="icon" className="mr-2">
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
              <Button variant="outline" onClick={() => setShowFilters(!showFilters)}>
                <SlidersHorizontal className="h-4 w-4 mr-2" />
                Filters
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search Bar */}
        <div className="mb-8">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search by name, profession, or location..."
              className="pl-10 py-6 text-lg"
              onChange={(e) => {
                // In a real app, you would implement search here
                console.log('Searching for:', e.target.value);
              }}
            />
          </div>
        </div>

        {/* Filters Panel */}
        {showFilters && (
          <Card className="mb-8">
            <CardContent className="pt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {/* Age Range */}
                <div>
                  <Label>Age Range</Label>
                  <div className="flex items-center space-x-2 mt-2">
                    <Input
                      type="number"
                      min="18"
                      max="80"
                      value={filters.minAge}
                      onChange={(e) => handleFilterChange('minAge', parseInt(e.target.value) || 18)}
                      className="w-20"
                    />
                    <span>-</span>
                    <Input
                      type="number"
                      min="18"
                      max="80"
                      value={filters.maxAge}
                      onChange={(e) => handleFilterChange('maxAge', parseInt(e.target.value) || 40)}
                      className="w-20"
                    />
                  </div>
                </div>

                {/* Location */}
                <div>
                  <Label>City</Label>
                  <Input
                    type="text"
                    placeholder="e.g., Dhaka"
                    value={filters.city}
                    onChange={(e) => handleFilterChange('city', e.target.value)}
                    className="mt-2"
                  />
                </div>

                <div>
                  <Label>State/Division</Label>
                  <Input
                    type="text"
                    placeholder="e.g., Dhaka"
                    value={filters.state}
                    onChange={(e) => handleFilterChange('state', e.target.value)}
                    className="mt-2"
                  />
                </div>

                {/* Profession */}
                <div>
                  <Label>Profession</Label>
                  <Input
                    type="text"
                    placeholder="e.g., Engineer"
                    value={filters.profession}
                    onChange={(e) => handleFilterChange('profession', e.target.value)}
                    className="mt-2"
                  />
                </div>
              </div>

              {/* Premium Filter */}
              <div className="mt-4">
                <Label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={filters.showPremiumOnly}
                    onChange={(e) => handleFilterChange('showPremiumOnly', e.target.checked)}
                    className="mr-2"
                  />
                  Show Premium Members Only
                </Label>
              </div>

              {/* Reset Button */}
              <div className="mt-6">
                <Button variant="outline" onClick={resetFilters}>
                  Reset Filters
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Results Header */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">
            {filteredProfiles.length} Profiles Found
          </h2>
          <div className="text-sm text-muted-foreground">
            Showing {Math.min(filteredProfiles.length, 10)} of {filteredProfiles.length}
          </div>
        </div>

        {/* Profiles Grid */}
        {filteredProfiles.length === 0 ? (
          <div className="text-center py-12">
            <User className="mx-auto h-12 w-12 text-muted-foreground" />
            <h3 className="mt-2 text-sm font-medium">No profiles found</h3>
            <p className="mt-1 text-sm text-muted-foreground">
              Try adjusting your filters to find more matches
            </p>
            <div className="mt-6">
              <Button onClick={resetFilters}>
                Reset all filters
              </Button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProfiles.map((profile) => (
              <Card 
                key={profile.id} 
                className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
                onClick={() => onProfileClick(profile.id)}
              >
                <CardContent className="p-0">
                  {/* Profile Image Placeholder */}
                  <div className="relative">
                    <div className="bg-gray-200 border-2 border-dashed w-full h-48" />
                    {profile.isPremium && (
                      <div className="absolute top-2 right-2 bg-ghotok-pastel-pink text-white px-2 py-1 rounded-full text-xs flex items-center">
                        <Crown className="w-3 h-3 mr-1" />
                        Premium
                      </div>
                    )}
                    {profile.isOnline && (
                      <div className="absolute bottom-2 left-2 bg-green-500 text-white px-2 py-1 rounded-full text-xs">
                        Online
                      </div>
                    )}
                  </div>

                  {/* Profile Info */}
                  <div className="p-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-semibold text-lg">
                          {profile.firstName} {profile.lastName}
                          {profile.isPremium && (
                            <Star className="inline-block w-4 h-4 text-ghotok-pastel-pink ml-1" />
                          )}
                        </h3>
                        <p className="text-muted-foreground text-sm">
                          {profile.age} years old
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-muted-foreground flex items-center">
                          <MapPin className="w-4 h-4 mr-1" />
                          {profile.location.city}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {profile.lastActive}
                        </p>
                      </div>
                    </div>

                    <div className="mt-3">
                      <p className="text-sm font-medium">{profile.profession}</p>
                      <p className="text-xs text-muted-foreground mt-1">
                        {profile.education}
                      </p>
                    </div>

                    {/* Interests */}
                    <div className="mt-3 flex flex-wrap gap-1">
                      {profile.interests.slice(0, 3).map((interest, idx) => (
                        <span 
                          key={idx} 
                          className="text-xs bg-ghotok-muted-green/10 text-ghotok-muted-green px-2 py-1 rounded"
                        >
                          {interest}
                        </span>
                      ))}
                      {profile.interests.length > 3 && (
                        <span className="text-xs text-muted-foreground">
                          +{profile.interests.length - 3} more
                        </span>
                      )}
                    </div>

                    {/* Action Buttons */}
                    <div className="mt-4 flex space-x-2">
                      <Button size="sm" className="flex-1">
                        <Heart className="w-4 h-4 mr-1" />
                        Like
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="flex-1"
                        onClick={(e) => {
                          e.stopPropagation();
                          console.log('Send message to', profile.id);
                        }}
                      >
                        Message
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Load More Button */}
        {filteredProfiles.length > 0 && (
          <div className="mt-8 text-center">
            <Button variant="outline">
              Load More Profiles
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}