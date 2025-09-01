// src/components/Settings.tsx
import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { 
  User, 
  Mail, 
  Lock, 
  Bell, 
  Shield, 
  Heart, 
  MapPin, 
  Briefcase, 
  GraduationCap, 
  Camera, 
  ArrowLeft,
  Save,
  Eye,
  EyeOff,
  LogOut,
  Trash2
} from 'lucide-react';

interface SettingsProps {
  onBack: () => void;
}

export function Settings({ onBack }: SettingsProps) {
  const { currentUser, userProfile, updateUserProfile, logout } = useAuth();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  
  // Profile form state
  const [profileForm, setProfileForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    city: '',
    state: '',
    country: 'Bangladesh',
    profession: '',
    education: '',
    bio: '',
  });

  // Password form state
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  // Notification settings
  const [notifications, setNotifications] = useState({
    messages: true,
    matches: true,
    likes: false,
    promotions: false
  });

  // Privacy settings
  const [privacy, setPrivacy] = useState({
    showOnlineStatus: true,
    showProfileViews: true,
    allowMessages: 'everyone' as 'everyone' | 'premium' | 'matches'
  });

  // Initialize form with user data
  useEffect(() => {
    if (userProfile && currentUser) {
      setProfileForm({
        firstName: userProfile.firstName || '',
        lastName: userProfile.lastName || '',
        email: currentUser.email || '',
        city: userProfile.location?.city || '',
        state: userProfile.location?.state || '',
        country: userProfile.location?.country || 'Bangladesh',
        profession: userProfile.profession || '',
        education: userProfile.education || '',
        bio: userProfile.bio || '',
      });
      
      setPrivacy({
        showOnlineStatus: userProfile.privacy?.showOnlineStatus ?? true,
        showProfileViews: userProfile.privacy?.showProfileViews ?? true,
        allowMessages: userProfile.privacy?.allowMessages || 'everyone'
      });
    }
  }, [userProfile, currentUser]);

  const handleProfileUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const updateData = {
        ...profileForm,
        displayName: `${profileForm.firstName} ${profileForm.lastName}`,
        location: {
          city: profileForm.city,
          state: profileForm.state,
          country: profileForm.country
        }
      };
      
      await updateUserProfile(updateData);
      alert('Profile updated successfully!');
    } catch (error) {
      alert('Failed to update profile. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      alert('New passwords do not match!');
      return;
    }
    
    if (passwordForm.newPassword.length < 6) {
      alert('Password must be at least 6 characters long!');
      return;
    }
    
    setLoading(true);
    
    try {
      // In a real app, you would call Firebase's updatePassword method
      // For now, we'll simulate the process
      await new Promise(resolve => setTimeout(resolve, 1500));
      alert('Password changed successfully!');
      setPasswordForm({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      });
    } catch (error) {
      alert('Failed to change password. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleNotificationChange = (key: keyof typeof notifications) => {
    setNotifications(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const handlePrivacyChange = (key: keyof typeof privacy, value: any) => {
    setPrivacy(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleSavePrivacy = async () => {
    setLoading(true);
    try {
      await updateUserProfile({
        privacy
      });
      alert('Privacy settings saved!');
    } catch (error) {
      alert('Failed to save privacy settings. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    if (window.confirm('Are you sure you want to logout?')) {
      try {
        await logout();
      } catch (error) {
        console.error('Logout failed:', error);
      }
    }
  };

  const handleDeleteAccount = async () => {
    if (window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      try {
        // In a real app, you would call your backend to delete the account
        // and then delete the Firebase user
        setLoading(true);
        await new Promise(resolve => setTimeout(resolve, 2000));
        alert('Account deletion requested. You will receive an email confirmation.');
        await logout();
      } catch (error) {
        alert('Failed to delete account. Please contact support.');
      } finally {
        setLoading(false);
      }
    }
  };

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
              <User className="h-8 w-8 text-ghotok-muted-green" />
              <div className="ml-2 text-xl font-bold">
                <span className="text-ghotok-muted-green">Ghotok</span>
                <span className="text-ghotok-pastel-pink">der</span>
                <span className="text-ghotok-dark-gray">Bari</span>
              </div>
            </div>
            
            <h1 className="text-lg font-semibold">Account Settings</h1>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar Navigation */}
          <div className="lg:col-span-1">
            <Card>
              <CardContent className="p-0">
                <nav className="space-y-1">
                  <a 
                    href="#profile" 
                    className="block px-4 py-3 text-sm font-medium bg-ghotok-warm-beige border-l-4 border-ghotok-muted-green"
                  >
                    Profile Information
                  </a>
                  <a 
                    href="#password" 
                    className="block px-4 py-3 text-sm font-medium text-muted-foreground hover:bg-ghotok-warm-beige"
                  >
                    Password & Security
                  </a>
                  <a 
                    href="#notifications" 
                    className="block px-4 py-3 text-sm font-medium text-muted-foreground hover:bg-ghotok-warm-beige"
                  >
                    Notifications
                  </a>
                  <a 
                    href="#privacy" 
                    className="block px-4 py-3 text-sm font-medium text-muted-foreground hover:bg-ghotok-warm-beige"
                  >
                    Privacy
                  </a>
                  <a 
                    href="#account" 
                    className="block px-4 py-3 text-sm font-medium text-muted-foreground hover:bg-ghotok-warm-beige"
                  >
                    Account Management
                  </a>
                </nav>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3 space-y-6">
            {/* Profile Information */}
            <Card id="profile">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <User className="w-5 h-5 mr-2 text-ghotok-muted-green" />
                  Profile Information
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleProfileUpdate} className="space-y-4">
                  <div className="flex items-center space-x-4 mb-6">
                    <div className="relative">
                      <div className="bg-gray-200 border-2 border-dashed rounded-full w-16 h-16" />
                      <Button 
                        size="sm" 
                        className="absolute bottom-0 right-0 rounded-full w-6 h-6 p-0"
                      >
                        <Camera className="w-3 h-3" />
                      </Button>
                    </div>
                    <div>
                      <h3 className="font-medium">Profile Photo</h3>
                      <p className="text-sm text-muted-foreground">JPG, GIF or PNG. Max size of 5MB</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="firstName">First Name</Label>
                      <Input
                        id="firstName"
                        value={profileForm.firstName}
                        onChange={(e) => setProfileForm({...profileForm, firstName: e.target.value})}
                      />
                    </div>
                    <div>
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input
                        id="lastName"
                        value={profileForm.lastName}
                        onChange={(e) => setProfileForm({...profileForm, lastName: e.target.value})}
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="email">Email Address</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="email"
                        type="email"
                        value={profileForm.email}
                        onChange={(e) => setProfileForm({...profileForm, email: e.target.value})}
                        className="pl-10"
                        disabled
                      />
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      Email can't be changed. Contact support for assistance.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="city">City</Label>
                      <div className="relative">
                        <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="city"
                          value={profileForm.city}
                          onChange={(e) => setProfileForm({...profileForm, city: e.target.value})}
                          className="pl-10"
                        />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="state">State/Division</Label>
                      <Input
                        id="state"
                        value={profileForm.state}
                        onChange={(e) => setProfileForm({...profileForm, state: e.target.value})}
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="country">Country</Label>
                    <Input
                      id="country"
                      value={profileForm.country}
                      onChange={(e) => setProfileForm({...profileForm, country: e.target.value})}
                      disabled
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="profession">Profession</Label>
                      <div className="relative">
                        <Briefcase className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="profession"
                          value={profileForm.profession}
                          onChange={(e) => setProfileForm({...profileForm, profession: e.target.value})}
                          className="pl-10"
                        />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="education">Education</Label>
                      <div className="relative">
                        <GraduationCap className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="education"
                          value={profileForm.education}
                          onChange={(e) => setProfileForm({...profileForm, education: e.target.value})}
                          className="pl-10"
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="bio">About Me</Label>
                    <Textarea
                      id="bio"
                      value={profileForm.bio}
                      onChange={(e) => setProfileForm({...profileForm, bio: e.target.value})}
                      rows={4}
                      placeholder="Tell us about yourself..."
                    />
                  </div>

                  <div className="flex justify-end">
                    <Button 
                      type="submit" 
                      disabled={loading}
                      className="bg-ghotok-muted-green hover:bg-ghotok-muted-green/90"
                    >
                      {loading ? (
                        <>
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                          Saving...
                        </>
                      ) : (
                        <>
                          <Save className="w-4 h-4 mr-2" />
                          Save Changes
                        </>
                      )}
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>

            {/* Password & Security */}
            <Card id="password">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Lock className="w-5 h-5 mr-2 text-ghotok-muted-green" />
                  Password & Security
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handlePasswordChange} className="space-y-4">
                  <div>
                    <Label htmlFor="currentPassword">Current Password</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="currentPassword"
                        type={showPassword ? "text" : "password"}
                        value={passwordForm.currentPassword}
                        onChange={(e) => setPasswordForm({...passwordForm, currentPassword: e.target.value})}
                        className="pl-10 pr-10"
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </Button>
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="newPassword">New Password</Label>
                    <Input
                      id="newPassword"
                      type="password"
                      value={passwordForm.newPassword}
                      onChange={(e) => setPasswordForm({...passwordForm, newPassword: e.target.value})}
                    />
                    <p className="text-xs text-muted-foreground mt-1">
                      Must be at least 6 characters long
                    </p>
                  </div>

                  <div>
                    <Label htmlFor="confirmPassword">Confirm New Password</Label>
                    <Input
                      id="confirmPassword"
                      type="password"
                      value={passwordForm.confirmPassword}
                      onChange={(e) => setPasswordForm({...passwordForm, confirmPassword: e.target.value})}
                    />
                  </div>

                  <div className="flex justify-end">
                    <Button 
                      type="submit" 
                      disabled={loading}
                      className="bg-ghotok-muted-green hover:bg-ghotok-muted-green/90"
                    >
                      {loading ? (
                        <>
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                          Updating...
                        </>
                      ) : (
                        <>
                          <Lock className="w-4 h-4 mr-2" />
                          Change Password
                        </>
                      )}
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>

            {/* Notifications */}
            <Card id="notifications">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Bell className="w-5 h-5 mr-2 text-ghotok-muted-green" />
                  Notification Preferences
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">Messages</h3>
                      <p className="text-sm text-muted-foreground">When someone sends you a message</p>
                    </div>
                    <Button
                      variant={notifications.messages ? "default" : "outline"}
                      onClick={() => handleNotificationChange('messages')}
                      className={notifications.messages ? "bg-ghotok-muted-green hover:bg-ghotok-muted-green/90" : ""}
                    >
                      {notifications.messages ? 'On' : 'Off'}
                    </Button>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">New Matches</h3>
                      <p className="text-sm text-muted-foreground">When you get a new match</p>
                    </div>
                    <Button
                      variant={notifications.matches ? "default" : "outline"}
                      onClick={() => handleNotificationChange('matches')}
                      className={notifications.matches ? "bg-ghotok-muted-green hover:bg-ghotok-muted-green/90" : ""}
                    >
                      {notifications.matches ? 'On' : 'Off'}
                    </Button>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">Profile Likes</h3>
                      <p className="text-sm text-muted-foreground">When someone likes your profile</p>
                    </div>
                    <Button
                      variant={notifications.likes ? "default" : "outline"}
                      onClick={() => handleNotificationChange('likes')}
                      className={notifications.likes ? "bg-ghotok-muted-green hover:bg-ghotok-muted-green/90" : ""}
                    >
                      {notifications.likes ? 'On' : 'Off'}
                    </Button>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">Promotions</h3>
                      <p className="text-sm text-muted-foreground">Special offers and updates</p>
                    </div>
                    <Button
                      variant={notifications.promotions ? "default" : "outline"}
                      onClick={() => handleNotificationChange('promotions')}
                      className={notifications.promotions ? "bg-ghotok-muted-green hover:bg-ghotok-muted-green/90" : ""}
                    >
                      {notifications.promotions ? 'On' : 'Off'}
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Privacy */}
            <Card id="privacy">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Shield className="w-5 h-5 mr-2 text-ghotok-muted-green" />
                  Privacy Settings
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">Show Online Status</h3>
                      <p className="text-sm text-muted-foreground">Let others see when you're online</p>
                    </div>
                    <Button
                      variant={privacy.showOnlineStatus ? "default" : "outline"}
                      onClick={() => handlePrivacyChange('showOnlineStatus', !privacy.showOnlineStatus)}
                      className={privacy.showOnlineStatus ? "bg-ghotok-muted-green hover:bg-ghotok-muted-green/90" : ""}
                    >
                      {privacy.showOnlineStatus ? 'On' : 'Off'}
                    </Button>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">Show Profile Views</h3>
                      <p className="text-sm text-muted-foreground">Let others see when you view their profile</p>
                    </div>
                    <Button
                      variant={privacy.showProfileViews ? "default" : "outline"}
                      onClick={() => handlePrivacyChange('showProfileViews', !privacy.showProfileViews)}
                      className={privacy.showProfileViews ? "bg-ghotok-muted-green hover:bg-ghotok-muted-green/90" : ""}
                    >
                      {privacy.showProfileViews ? 'On' : 'Off'}
                    </Button>
                  </div>

                  <div>
                    <h3 className="font-medium mb-2">Who Can Message You</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                      {(['everyone', 'premium', 'matches'] as const).map((option) => (
                        <Button
                          key={option}
                          variant={privacy.allowMessages === option ? "default" : "outline"}
                          onClick={() => handlePrivacyChange('allowMessages', option)}
                          className={`capitalize ${
                            privacy.allowMessages === option 
                              ? "bg-ghotok-muted-green hover:bg-ghotok-muted-green/90" 
                              : ""
                          }`}
                        >
                          {option}
                        </Button>
                      ))}
                    </div>
                  </div>

                  <div className="flex justify-end">
                    <Button 
                      onClick={handleSavePrivacy}
                      disabled={loading}
                      className="bg-ghotok-muted-green hover:bg-ghotok-muted-green/90"
                    >
                      {loading ? (
                        <>
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                          Saving...
                        </>
                      ) : (
                        <>
                          <Save className="w-4 h-4 mr-2" />
                          Save Privacy Settings
                        </>
                      )}
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Account Management */}
            <Card id="account">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Heart className="w-5 h-5 mr-2 text-ghotok-muted-green" />
                  Account Management
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <h3 className="font-medium">Logout</h3>
                      <p className="text-sm text-muted-foreground">Sign out of your account</p>
                    </div>
                    <Button 
                      variant="outline" 
                      onClick={handleLogout}
                      className="text-ghotok-muted-green border-ghotok-muted-green hover:bg-ghotok-muted-green/10"
                    >
                      <LogOut className="w-4 h-4 mr-2" />
                      Logout
                    </Button>
                  </div>

                  <div className="flex items-center justify-between p-4 border rounded-lg border-red-200 bg-red-50">
                    <div>
                      <h3 className="font-medium text-red-700">Delete Account</h3>
                      <p className="text-sm text-red-600">Permanently delete your account and all data</p>
                    </div>
                    <Button 
                      variant="outline" 
                      onClick={handleDeleteAccount}
                      className="text-red-700 border-red-700 hover:bg-red-100"
                    >
                      <Trash2 className="w-4 h-4 mr-2" />
                      Delete Account
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}