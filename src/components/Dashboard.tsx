// src/components/Dashboard.tsx
import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { 
  Heart, 
  Users, 
  MessageCircle, 
  Star, 
  Calendar,
  User,
  Search,
  Crown,
  Bell,
  Settings,
  LogOut
} from 'lucide-react';

export function Dashboard() {
  const { currentUser, userProfile, logout } = useAuth();
  const [activeTab, setActiveTab] = useState('matches');
  const [loading, setLoading] = useState(true);

  // Simulate loading user data
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  // Mock data for demonstration
  const mockMatches = [
    { id: 1, name: 'রহিমা খাতুন', age: 26, location: 'ঢাকা', interests: ['Cooking', 'Reading'] },
    { id: 2, name: 'ফারহানা আক্তার', age: 24, location: 'চট্টগ্রাম', interests: ['Music', 'Traveling'] },
    { id: 3, name: 'সাবরিনা ইসলাম', age: 27, location: 'খুলনা', interests: ['Dancing', 'Photography'] }
  ];

  const mockMessages = [
    { id: 1, name: 'রহিমা খাতুন', message: 'হ্যালো! আপনার প্রোফাইল দেখে ভালো লেগেছে...', time: '2 hours ago' },
    { id: 2, name: 'মোহাম্মদ আলী', message: 'আপনি কি আগামী সপ্তাহে ঢাকায় আসছেন?', time: '1 day ago' }
  ];

  const quickActions = [
    { icon: Search, label: 'Browse Profiles', action: () => console.log('Browse profiles') },
    { icon: Heart, label: 'My Matches', action: () => console.log('View matches') },
    { icon: Crown, label: 'Go Premium', action: () => console.log('Upgrade to premium') },
    { icon: Settings, label: 'Settings', action: () => console.log('Open settings') }
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-ghotok-warm-beige flex items-center justify-center">
        <div className="text-center">
          <Heart className="w-12 h-12 text-ghotok-muted-green animate-pulse mx-auto mb-4" />
          <p className="text-muted-foreground">Loading your dashboard...</p>
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
              <Heart className="h-8 w-8 text-ghotok-muted-green" />
              <div className="ml-2 text-xl font-bold">
                <span className="text-ghotok-muted-green">Ghotok</span>
                <span className="text-ghotok-pastel-pink">der</span>
                <span className="text-ghotok-dark-gray">Bari</span>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="icon">
                <Bell className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon">
                <Settings className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" onClick={handleLogout}>
                <LogOut className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-ghotok-dark-gray">
            Welcome back, {userProfile?.firstName || currentUser?.displayName || 'User'}!
          </h1>
          <p className="text-muted-foreground">
            Here's what's happening with your matches today
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center">
                <div className="p-3 rounded-full bg-ghotok-muted-green/10">
                  <Heart className="h-6 w-6 text-ghotok-muted-green" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-muted-foreground">New Matches</p>
                  <p className="text-2xl font-semibold">12</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center">
                <div className="p-3 rounded-full bg-ghotok-pastel-pink/10">
                  <MessageCircle className="h-6 w-6 text-ghotok-pastel-pink" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-muted-foreground">Messages</p>
                  <p className="text-2xl font-semibold">5</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center">
                <div className="p-3 rounded-full bg-ghotok-dark-gray/10">
                  <Users className="h-6 w-6 text-ghotok-dark-gray" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-muted-foreground">Profile Views</p>
                  <p className="text-2xl font-semibold">42</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center">
                <div className="p-3 rounded-full bg-ghotok-muted-green/10">
                  <Star className="h-6 w-6 text-ghotok-muted-green" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-muted-foreground">Subscription</p>
                  <p className="text-2xl font-semibold">
                    {userProfile?.isPremium ? 'Premium' : 'Free'}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold mb-4">Quick Actions</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {quickActions.map((action, index) => {
              const Icon = action.icon;
              return (
                <Button
                  key={index}
                  variant="outline"
                  className="h-auto py-4 flex flex-col items-center justify-center"
                  onClick={action.action}
                >
                  <Icon className="h-5 w-5 mb-2" />
                  <span className="text-xs">{action.label}</span>
                </Button>
              );
            })}
          </div>
        </div>

        {/* Main Content Area */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Matches Section */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="flex items-center">
                  <Heart className="mr-2 h-5 w-5 text-ghotok-muted-green" />
                  Your Matches
                </CardTitle>
                <Button variant="link" className="text-ghotok-muted-green">
                  View All
                </Button>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockMatches.map((match) => (
                    <div key={match.id} className="flex items-center p-4 border rounded-lg hover:bg-ghotok-warm-beige/50">
                      <div className="bg-gray-200 border-2 border-dashed rounded-xl w-16 h-16" />
                      <div className="ml-4 flex-1">
                        <h3 className="font-medium">{match.name}</h3>
                        <p className="text-sm text-muted-foreground">
                          {match.age} • {match.location}
                        </p>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {match.interests.map((interest, idx) => (
                            <span key={idx} className="text-xs bg-ghotok-muted-green/10 text-ghotok-muted-green px-2 py-1 rounded">
                              {interest}
                            </span>
                          ))}
                        </div>
                      </div>
                      <Button size="sm">View</Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Messages & Events */}
          <div className="space-y-6">
            {/* Messages */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="flex items-center">
                  <MessageCircle className="mr-2 h-5 w-5 text-ghotok-pastel-pink" />
                  Recent Messages
                </CardTitle>
                <Button variant="link" className="text-ghotok-pastel-pink">
                  View All
                </Button>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockMessages.map((msg) => (
                    <div key={msg.id} className="p-3 border rounded-lg hover:bg-ghotok-warm-beige/50">
                      <div className="flex justify-between">
                        <h4 className="font-medium">{msg.name}</h4>
                        <span className="text-xs text-muted-foreground">{msg.time}</span>
                      </div>
                      <p className="text-sm text-muted-foreground mt-1 truncate">
                        {msg.message}
                      </p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Upcoming Events */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="flex items-center">
                  <Calendar className="mr-2 h-5 w-5 text-ghotok-dark-gray" />
                  Upcoming Events
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-6">
                  <Calendar className="mx-auto h-12 w-12 text-muted-foreground" />
                  <p className="mt-2 text-sm text-muted-foreground">
                    No upcoming events
                  </p>
                  <Button variant="outline" size="sm" className="mt-4">
                    Browse Events
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}