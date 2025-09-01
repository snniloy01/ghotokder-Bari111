// src/App.tsx
import React, { useState } from 'react';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { LandingPage } from './components/LandingPage';
import { Dashboard } from './components/Dashboard';
import { ProfileDetails } from './components/ProfileDetails';
import { Chat } from './components/Chat';
import { BrowseProfiles } from './components/BrowseProfiles';
import { Registration } from './components/Registration';
import { Payment } from './components/Payment';
import { Login } from './components/Login';
import { HelpSupport } from './components/HelpSupport'; // Add this import
import { Settings } from './components/Settings'; // Add this import
import { Button } from './components/ui/button';
import { Badge } from './components/ui/badge';
import { Separator } from './components/ui/separator';
import { Card, CardContent } from './components/ui/card';
import { 
  Home, 
  Search, 
  MessageCircle, 
  User, 
  Heart,
  UserPlus,
  Layout,
  Eye,
  CreditCard,
  LogIn,
  LogOut,
  Loader2,
  Shield,
  Settings as SettingsIcon, // Rename to avoid conflict
  HelpCircle
} from 'lucide-react';

type PageType = 
  | 'landing' 
  | 'dashboard' 
  | 'browse' 
  | 'profile' 
  | 'chat' 
  | 'registration'
  | 'payment'
  | 'login'
  | 'help' // Add help page
  | 'settings'; // Add settings page

function AppContent() {
  const { currentUser, userProfile, loading, logout } = useAuth();
  const [currentPage, setCurrentPage] = useState<PageType>('landing');
  const [selectedProfileId, setSelectedProfileId] = useState<string | null>(null);

  // Enhanced page router with authentication handling
  const handlePageChange = (page: PageType, profileId?: string) => {
    // Check authentication for protected routes
    const protectedRoutes: PageType[] = ['dashboard', 'browse', 'chat', 'profile', 'payment', 'settings'];
    
    if (protectedRoutes.includes(page) && !currentUser) {
      setCurrentPage('login');
      return;
    }
    
    if (page === 'profile' && profileId) {
      setSelectedProfileId(profileId);
    }
    
    setCurrentPage(page);
  };

  const handleLoginSuccess = () => {
    // Check if user profile is complete
    if (userProfile?.profileCompleted) {
      setCurrentPage('dashboard');
    } else {
      setCurrentPage('registration');
    }
  };

  const handleRegistrationComplete = () => {
    setCurrentPage('dashboard');
  };

  const handleLogout = async () => {
    try {
      await logout();
      setCurrentPage('landing');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  const handleProfileClick = (profileId: string) => {
    setSelectedProfileId(profileId);
    handlePageChange('profile');
  };

  // Back navigation handlers
  const handleBackFromProfile = () => handlePageChange('browse');
  const handleBackFromChat = () => handlePageChange('dashboard');
  const handleBackFromRegistration = () => handlePageChange('landing');
  const handleBackFromPayment = () => handlePageChange('dashboard');
  const handleBackFromHelp = () => handlePageChange('dashboard');
  const handleBackFromSettings = () => handlePageChange('dashboard');

  const demoNavItems = [
    {
      id: 'landing',
      label: 'Landing',
      icon: Home,
      description: 'Home page with hero section',
      requiresAuth: false
    },
    {
      id: 'login',
      label: 'Login',
      icon: LogIn,
      description: 'Authentication page',
      requiresAuth: false,
      hideWhenAuthenticated: true
    },
    {
      id: 'registration',
      label: 'Profile Setup',
      icon: UserPlus,
      description: 'Complete your profile',
      requiresAuth: true,
      showOnlyWhenIncomplete: true
    },
    {
      id: 'dashboard',
      label: 'Dashboard',
      icon: Layout,
      description: 'User dashboard with matches',
      requiresAuth: true
    },
    {
      id: 'browse',
      label: 'Browse',
      icon: Search,
      description: 'Browse and filter profiles',
      requiresAuth: true
    },
    {
      id: 'profile',
      label: 'Profile View',
      icon: Eye,
      description: 'Detailed profile view',
      requiresAuth: true
    },
    {
      id: 'chat',
      label: 'Messages',
      icon: MessageCircle,
      description: 'Chat with matches',
      requiresAuth: true
    },
    {
      id: 'payment',
      label: 'Premium',
      icon: CreditCard,
      description: 'Subscription plans',
      requiresAuth: true
    },
    {
      id: 'settings',
      label: 'Settings',
      icon: SettingsIcon,
      description: 'Account settings',
      requiresAuth: true
    },
    {
      id: 'help',
      label: 'Help',
      icon: HelpCircle,
      description: 'Support and FAQs',
      requiresAuth: false
    }
  ];

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'landing':
        return <LandingPage onLogin={() => handlePageChange('login')} />;
      case 'dashboard':
        return <Dashboard />;
      case 'browse':
        return (
          <BrowseProfiles 
            onProfileClick={handleProfileClick}
          />
        );
      case 'profile':
        return (
          <ProfileDetails 
            profileId={selectedProfileId || '1'}
            onBack={handleBackFromProfile}
          />
        );
      case 'chat':
        return (
          <Chat 
            onBack={handleBackFromChat}
          />
        );
      case 'registration':
        return (
          <Registration 
            onComplete={handleRegistrationComplete}
            onBack={handleBackFromRegistration}
          />
        );
      case 'payment':
        return (
          <Payment 
            onBack={handleBackFromPayment}
          />
        );
      case 'login':
        return (
          <Login 
            onBack={() => handlePageChange('landing')}
            onLoginSuccess={handleLoginSuccess}
          />
        );
      case 'help':
        return (
          <HelpSupport 
            onBack={handleBackFromHelp}
          />
        );
      case 'settings':
        return (
          <Settings 
            onBack={handleBackFromSettings}
          />
        );
      default:
        return <LandingPage onLogin={() => handlePageChange('login')} />;
    }
  };

  // Show loading spinner while Firebase initializes
  if (loading) {
    return (
      <div className="min-h-screen bg-ghotok-warm-beige flex items-center justify-center">
        <Card className="border-0 bg-white shadow-lg p-8">
          <CardContent className="flex flex-col items-center space-y-4">
            <div className="flex items-center space-x-3">
              <Heart className="h-8 w-8 text-ghotok-muted-green" />
              <div className="text-xl font-bold">
                <span className="text-ghotok-muted-green">Ghotok</span>
                <span className="text-ghotok-pastel-pink">der</span>
                <span className="text-ghotok-dark-gray">Bari</span>
              </div>
            </div>
            <Loader2 className="w-6 h-6 animate-spin text-ghotok-muted-green" />
            <p className="text-sm text-muted-foreground">Loading your profile...</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Demo Navigation Panel */}
      <div className="fixed top-4 right-4 z-50 bg-white rounded-xl shadow-xl border border-ghotok-light-gray p-4 max-w-sm">
        <div className="mb-4">
          <div className="flex items-center space-x-2 mb-2">
            <div className="w-6 h-6 bg-ghotok-muted-green rounded-full flex items-center justify-center">
              <Heart className="w-3 h-3 text-white" />
            </div>
            <span className="font-semibold text-sm text-ghotok-dark-gray">
              Ghotokder Bari
            </span>
          </div>
          <div className="flex items-center space-x-2 mb-2">
            <Badge 
              variant={currentUser ? "default" : "secondary"} 
              className="text-xs"
            >
              {currentUser ? 'Authenticated' : 'Guest'}
            </Badge>
            <Badge variant="outline" className="text-xs">
              {currentPage}
            </Badge>
          </div>
          
          {/* User Info */}
          {currentUser && userProfile && (
            <div className="text-xs space-y-1">
              <div className="flex items-center space-x-2">
                <Shield className="w-3 h-3" />
                <span className="truncate">{userProfile.displayName}</span>
              </div>
              <div className="text-muted-foreground">
                {userProfile.profileCompleted ? 'Profile Complete' : 'Setup Required'}
              </div>
            </div>
          )}
        </div>

        <Separator className="my-3" />

        <div className="space-y-2">
          {demoNavItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentPage === item.id;
            const isDisabled = item.requiresAuth && !currentUser;
            
            // Hide items based on authentication state
            if (item.hideWhenAuthenticated && currentUser) return null;
            if (item.showOnlyWhenIncomplete && currentUser && userProfile?.profileCompleted) return null;
            
            return (
              <div key={item.id}>
                <Button
                  size="sm"
                  variant={isActive ? 'default' : 'ghost'}
                  onClick={() => !isDisabled && handlePageChange(item.id as PageType)}
                  disabled={isDisabled}
                  className="w-full justify-start text-xs h-auto py-2 px-3"
                >
                  <Icon className="w-3 h-3 mr-2" />
                  <div className="text-left">
                    <div className="font-medium">{item.label}</div>
                    <div className="text-xs opacity-75 truncate">
                      {item.description}
                    </div>
                  </div>
                </Button>
                {isDisabled && (
                  <p className="text-xs text-muted-foreground ml-5 mt-1">
                    Login required
                  </p>
                )}
              </div>
            );
          })}
        </div>

        {/* Logout Button */}
        {currentUser && (
          <>
            <Separator className="my-3" />
            <Button
              size="sm"
              variant="outline"
              onClick={handleLogout}
              className="w-full justify-start text-xs h-auto py-2 px-3"
            >
              <LogOut className="w-3 h-3 mr-2" />
              <div className="text-left">
                <div className="font-medium">Sign Out</div>
                <div className="text-xs opacity-75 truncate">
                  Logout from account
                </div>
              </div>
            </Button>
          </>
        )}

        <Separator className="my-3" />

        <div className="text-xs text-muted-foreground space-y-1">
          <p><strong>Firebase Features:</strong></p>
          <ul className="list-disc list-inside space-y-0.5 ml-2">
            <li>Real authentication</li>
            <li>Firestore database</li>
            <li>Real-time messaging</li>
            <li>Profile management</li>
            <li>File uploads</li>
            <li>Security rules</li>
          </ul>
        </div>
      </div>

      {/* Main Content */}
      <div className="mr-80">
        {renderCurrentPage()}
      </div>
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}