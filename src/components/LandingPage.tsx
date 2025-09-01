import React, { useState } from 'react';
import { Navigation } from './Navigation';
import { ProfileCard } from './ProfileCard';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { 
  Search, 
  Heart, 
  Users, 
  Shield, 
  Star,
  CheckCircle,
  ArrowRight,
  Play,
  Quote
} from 'lucide-react';

export function LandingPage() {
  const [searchFilters, setSearchFilters] = useState({
    lookingFor: '',
    ageFrom: '',
    ageTo: '',
    location: ''
  });

  // Mock data for featured profiles
  const featuredProfiles = [
    {
      id: '1',
      name: 'Fatima Rahman',
      age: 26,
      location: 'Dhaka, Bangladesh',
      profession: 'Software Engineer',
      education: 'Masters in Computer Science',
      photo: 'https://images.unsplash.com/photo-1494790108755-2616b9ff0db4?w=400&h=500&fit=crop',
      isVerified: true,
      isOnline: true,
      matchPercentage: 92,
      interests: ['Reading', 'Travel', 'Photography'],
      bio: 'Looking for a life partner who shares similar values and interests.'
    },
    {
      id: '2',
      name: 'Ahmed Hassan',
      age: 29,
      location: 'Chittagong, Bangladesh',
      profession: 'Doctor',
      education: 'MBBS, MD',
      photo: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=500&fit=crop',
      isVerified: true,
      isOnline: false,
      matchPercentage: 88,
      interests: ['Sports', 'Music', 'Cooking'],
      bio: 'Family-oriented person seeking a compatible life partner.'
    },
    {
      id: '3',
      name: 'Rashida Khan',
      age: 24,
      location: 'Sylhet, Bangladesh',
      profession: 'Teacher',
      education: 'Masters in English Literature',
      photo: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=500&fit=crop',
      isVerified: true,
      isOnline: true,
      matchPercentage: 85,
      interests: ['Literature', 'Art', 'Volunteering'],
      bio: 'Passionate about education and community service.'
    }
  ];

  const successStories = [
    {
      id: '1',
      coupleNames: 'Sadia & Karim',
      marriedDate: '2023',
      photo: 'https://images.unsplash.com/photo-1522673607200-164d1b6ce486?w=300&h=200&fit=crop',
      quote: 'We found our perfect match through GhotokderBari. Forever grateful!'
    },
    {
      id: '2',
      coupleNames: 'Nusrat & Tareq',
      marriedDate: '2024',
      photo: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=300&h=200&fit=crop',
      quote: 'The platform helped us connect despite being in different cities.'
    }
  ];

  const howItWorks = [
    {
      step: 1,
      title: 'Create Your Profile',
      titleBn: 'প্রোফাইল তৈরি করুন',
      description: 'Sign up and create a detailed profile with your preferences',
      icon: Users
    },
    {
      step: 2,
      title: 'Browse & Connect',
      titleBn: 'ব্রাউজ ও যোগাযোগ',
      description: 'Browse through verified profiles and send interests',
      icon: Search
    },
    {
      step: 3,
      title: 'Find Your Match',
      titleBn: 'আপনার সঙ্গী খুঁজুন',
      description: 'Connect with compatible matches and start your journey',
      icon: Heart
    }
  ];

  return (
    <div className="min-h-screen bg-ghotok-warm-beige">
      <Navigation currentPage="home" />
      
      {/* Hero Section */}
      <section className="relative py-12 md:py-20 lg:py-24 cultural-pattern">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-ghotok-dark-gray mb-4">
              Find Your Perfect Life Partner
            </h1>
            <h2 className="text-xl md:text-2xl lg:text-3xl font-medium text-ghotok-muted-green mb-6">
              আপনার নিখুঁত জীবনসঙ্গী খুঁজুন
            </h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-3xl mx-auto">
              Bangladesh's most trusted matchmaking platform connecting families 
              for meaningful relationships and marriages. Join thousands of success stories.
            </p>
            <p className="text-base text-muted-foreground mb-8 max-w-3xl mx-auto">
              বাংলাদেশের সবচেয়ে বিশ্বস্ত বিবাহ সেবা যা পরিবারগুলিকে অর্থপূর্ণ সম্পর্ক এবং বিবাহের জন্য সংযুক্ত করে।
            </p>
            
            {/* Trust Badges */}
            <div className="flex flex-wrap justify-center gap-4 mb-12">
              <Badge className="bg-white text-ghotok-dark-gray border border-ghotok-light-gray px-4 py-2">
                <Shield className="w-4 h-4 mr-2" />
                100% Verified Profiles
              </Badge>
              <Badge className="bg-white text-ghotok-dark-gray border border-ghotok-light-gray px-4 py-2">
                <Users className="w-4 h-4 mr-2" />
                50,000+ Members
              </Badge>
              <Badge className="bg-white text-ghotok-dark-gray border border-ghotok-light-gray px-4 py-2">
                <Heart className="w-4 h-4 mr-2" />
                2,500+ Success Stories
              </Badge>
            </div>
          </div>

          {/* Search Section */}
          <Card className="max-w-4xl mx-auto shadow-xl border-0 bg-white/95 backdrop-blur-sm">
            <CardContent className="p-6 md:p-8">
              <div className="text-center mb-6">
                <h3 className="text-xl font-semibold text-ghotok-dark-gray mb-2">
                  Start Your Search Today
                </h3>
                <p className="text-sm text-muted-foreground">
                  আজই আপনার অনুসন্ধান শুরু করুন
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                <Select value={searchFilters.lookingFor} onValueChange={(value) => setSearchFilters(prev => ({ ...prev, lookingFor: value }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="I'm looking for..." />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="bride">Bride / কনে</SelectItem>
                    <SelectItem value="groom">Groom / বর</SelectItem>
                  </SelectContent>
                </Select>
                
                <Select value={searchFilters.ageFrom} onValueChange={(value) => setSearchFilters(prev => ({ ...prev, ageFrom: value }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Age from..." />
                  </SelectTrigger>
                  <SelectContent>
                    {Array.from({ length: 20 }, (_, i) => i + 18).map(age => (
                      <SelectItem key={age} value={age.toString()}>{age} years</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                
                <Select value={searchFilters.ageTo} onValueChange={(value) => setSearchFilters(prev => ({ ...prev, ageTo: value }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Age to..." />
                  </SelectTrigger>
                  <SelectContent>
                    {Array.from({ length: 25 }, (_, i) => i + 25).map(age => (
                      <SelectItem key={age} value={age.toString()}>{age} years</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                
                <Select value={searchFilters.location} onValueChange={(value) => setSearchFilters(prev => ({ ...prev, location: value }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Location..." />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="dhaka">Dhaka</SelectItem>
                    <SelectItem value="chittagong">Chittagong</SelectItem>
                    <SelectItem value="sylhet">Sylhet</SelectItem>
                    <SelectItem value="rajshahi">Rajshahi</SelectItem>
                    <SelectItem value="khulna">Khulna</SelectItem>
                    <SelectItem value="barisal">Barisal</SelectItem>
                    <SelectItem value="rangpur">Rangpur</SelectItem>
                    <SelectItem value="mymensingh">Mymensingh</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Button className="flex-1 bg-ghotok-muted-green hover:bg-ghotok-muted-green/90 h-12">
                  <Search className="w-5 h-5 mr-2" />
                  Search Matches
                </Button>
                <Button variant="outline" className="h-12">
                  Advanced Search
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Featured Profiles Section */}
      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-ghotok-dark-gray mb-4">
              Featured Profiles
            </h2>
            <p className="text-base text-muted-foreground mb-2">
              বিশেষ প্রোফাইলসমূহ
            </p>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Discover compatible matches from our verified community of serious matrimony seekers.
            </p>
          </div>

          {/* Desktop Grid */}
          <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {featuredProfiles.map((profile) => (
              <ProfileCard
                key={profile.id}
                profile={profile}
                variant="featured"
                onLike={() => console.log('Liked', profile.name)}
                onMessage={() => console.log('Message', profile.name)}
                onViewProfile={() => console.log('View Profile', profile.name)}
              />
            ))}
          </div>

          {/* Mobile Carousel */}
          <div className="md:hidden">
            <div className="flex gap-4 overflow-x-auto pb-4 -mx-4 px-4 snap-x snap-mandatory">
              {featuredProfiles.map((profile) => (
                <div key={profile.id} className="w-64 flex-shrink-0 snap-center">
                  <ProfileCard
                    profile={profile}
                    variant="featured"
                    onLike={() => console.log('Liked', profile.name)}
                    onMessage={() => console.log('Message', profile.name)}
                    onViewProfile={() => console.log('View Profile', profile.name)}
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="text-center">
            <Button variant="outline" size="lg">
              View All Profiles
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 md:py-20 bg-ghotok-light-gray/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-ghotok-dark-gray mb-4">
              How It Works
            </h2>
            <p className="text-base text-muted-foreground mb-2">
              এটি কীভাবে কাজ করে
            </p>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Simple steps to find your life partner through our trusted platform.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {howItWorks.map((step, index) => {
              const Icon = step.icon;
              return (
                <div key={step.step} className="text-center group">
                  <div className="relative mb-6">
                    <div className="w-20 h-20 bg-ghotok-muted-green rounded-full flex items-center justify-center mx-auto group-hover:scale-110 transition-transform duration-300">
                      <Icon className="w-10 h-10 text-white" />
                    </div>
                    <div className="absolute -top-2 -right-2 w-8 h-8 bg-ghotok-pastel-pink rounded-full flex items-center justify-center border-4 border-white">
                      <span className="text-sm font-bold text-ghotok-dark-gray">{step.step}</span>
                    </div>
                  </div>
                  <h3 className="text-xl font-semibold text-ghotok-dark-gray mb-2">
                    {step.title}
                  </h3>
                  <p className="text-base font-medium text-ghotok-muted-green mb-3">
                    {step.titleBn}
                  </p>
                  <p className="text-muted-foreground">
                    {step.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Success Stories Section */}
      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-ghotok-dark-gray mb-4">
              Success Stories
            </h2>
            <p className="text-base text-muted-foreground mb-2">
              সাফল্যের গল্পসমূহ
            </p>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Real couples who found their happiness through GhotokderBari.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            {successStories.map((story) => (
              <Card key={story.id} className="overflow-hidden group hover:shadow-lg transition-shadow duration-300">
                <div className="aspect-video overflow-hidden">
                  <ImageWithFallback
                    src={story.photo}
                    alt={story.coupleNames}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-lg font-semibold text-ghotok-dark-gray">
                      {story.coupleNames}
                    </h3>
                    <Badge variant="secondary" className="bg-ghotok-light-gray text-ghotok-dark-gray">
                      Married {story.marriedDate}
                    </Badge>
                  </div>
                  <div className="flex items-start">
                    <Quote className="w-5 h-5 text-ghotok-muted-green mr-2 mt-0.5 flex-shrink-0" />
                    <p className="text-muted-foreground italic">
                      "{story.quote}"
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center">
            <Button variant="outline" size="lg">
              View More Stories
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-20 bg-ghotok-muted-green">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
            Ready to Find Your Life Partner?
          </h2>
          <p className="text-lg text-white/90 mb-2">
            আপনার জীবনসঙ্গী খুঁজে পেতে প্রস্তুত?
          </p>
          <p className="text-white/80 mb-8 max-w-2xl mx-auto">
            Join thousands of successful matches. Create your profile today and start your journey towards finding true love.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-white text-ghotok-muted-green hover:bg-white/90">
              Create Free Profile
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
            <Button variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-ghotok-muted-green">
              <Play className="w-4 h-4 mr-2" />
              Watch Video
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-ghotok-dark-gray text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="md:col-span-2">
              <div className="flex items-center mb-4">
                <Heart className="h-8 w-8 text-ghotok-muted-green mr-2" />
                <div className="text-xl font-bold">
                  <span className="text-ghotok-muted-green">Ghotok</span>
                  <span className="text-ghotok-pastel-pink">der</span>
                  <span className="text-white">Bari</span>
                </div>
              </div>
              <p className="text-white/80 mb-4 max-w-md">
                Bangladesh's most trusted matrimonial platform connecting hearts and families for meaningful relationships.
              </p>
              <p className="text-white/60 text-sm">
                বাংলাদেশের সবচেয়ে বিশ্বস্ত বিবাহ প্ল্যাটফর্ম।
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-white/80">
                <li><a href="#" className="hover:text-white transition-colors">About Us</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Success Stories</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-white/80">
                <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact Us</a></li>
                <li><a href="#" className="hover:text-white transition-colors">FAQ</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Safety Tips</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-white/20 mt-8 pt-8 text-center text-white/60">
            <p>&copy; 2024 GhotokderBari. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}