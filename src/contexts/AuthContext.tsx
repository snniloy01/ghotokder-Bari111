import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import {
  User,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  updateProfile,
  sendPasswordResetEmail,
  sendEmailVerification
} from 'firebase/auth';
import { doc, setDoc, getDoc, updateDoc, Timestamp } from 'firebase/firestore';
import { auth, db } from '../lib/firebase';
import { toast } from 'sonner@2.0.3';

export interface UserProfile {
  uid: string;
  email: string;
  firstName: string;
  lastName: string;
  displayName: string;
  photoURL?: string;
  age?: number;
  dateOfBirth?: Date;
  gender?: 'male' | 'female';
  location: {
    city: string;
    state: string;
    country: string;
  };
  profession?: string;
  education?: string;
  bio?: string;
  interests: string[];
  isVerified: boolean;
  isPremium: boolean;
  subscriptionType?: 'basic' | 'premium' | 'vip';
  subscriptionExpiry?: Date;
  profileCompleted: boolean;
  isActive: boolean;
  lastSeen: Date;
  createdAt: Date;
  updatedAt: Date;
  // Privacy settings
  privacy: {
    showOnlineStatus: boolean;
    showProfileViews: boolean;
    allowMessages: 'everyone' | 'premium' | 'matches';
  };
  // Profile statistics
  stats: {
    profileViews: number;
    totalLikes: number;
    totalMatches: number;
    messagesReceived: number;
  };
}

interface AuthContextType {
  currentUser: User | null;
  userProfile: UserProfile | null;
  loading: boolean;
  signup: (email: string, password: string, firstName: string, lastName: string) => Promise<User>;
  login: (email: string, password: string) => Promise<User>;
  logout: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  updateUserProfile: (data: Partial<UserProfile>) => Promise<void>;
  refreshUserProfile: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  const signup = async (email: string, password: string, firstName: string, lastName: string): Promise<User> => {
    try {
      const result = await createUserWithEmailAndPassword(auth, email, password);
      const user = result.user;

      // Update display name
      await updateProfile(user, {
        displayName: `${firstName} ${lastName}`
      });

      // Create user profile in Firestore
      const userProfile: UserProfile = {
        uid: user.uid,
        email: user.email!,
        firstName,
        lastName,
        displayName: `${firstName} ${lastName}`,
        location: {
          city: '',
          state: '',
          country: 'Bangladesh'
        },
        interests: [],
        isVerified: false,
        isPremium: false,
        profileCompleted: false,
        isActive: true,
        lastSeen: new Date(),
        createdAt: new Date(),
        updatedAt: new Date(),
        privacy: {
          showOnlineStatus: true,
          showProfileViews: true,
          allowMessages: 'everyone'
        },
        stats: {
          profileViews: 0,
          totalLikes: 0,
          totalMatches: 0,
          messagesReceived: 0
        }
      };

      await setDoc(doc(db, 'users', user.uid), {
        ...userProfile,
        createdAt: Timestamp.now(),
        updatedAt: Timestamp.now(),
        lastSeen: Timestamp.now()
      });

      // Send email verification
      await sendEmailVerification(user);
      
      toast('Account created successfully!', {
        description: 'Please check your email to verify your account.'
      });

      return user;
    } catch (error: any) {
      toast('Sign up failed', {
        description: error.message || 'Please try again'
      });
      throw error;
    }
  };

  const login = async (email: string, password: string): Promise<User> => {
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      
      // Update last seen
      if (result.user) {
        await updateDoc(doc(db, 'users', result.user.uid), {
          lastSeen: Timestamp.now(),
          isActive: true
        });
      }

      toast('Welcome back!', {
        description: 'Successfully signed in to your account.'
      });

      return result.user;
    } catch (error: any) {
      let errorMessage = 'Please try again';
      
      if (error.code === 'auth/user-not-found') {
        errorMessage = 'No account found with this email address';
      } else if (error.code === 'auth/wrong-password') {
        errorMessage = 'Incorrect password';
      } else if (error.code === 'auth/invalid-email') {
        errorMessage = 'Invalid email address';
      } else if (error.code === 'auth/user-disabled') {
        errorMessage = 'Account has been disabled';
      }

      toast('Sign in failed', { description: errorMessage });
      throw error;
    }
  };

  const logout = async (): Promise<void> => {
    try {
      // Update user status before logout
      if (currentUser) {
        await updateDoc(doc(db, 'users', currentUser.uid), {
          lastSeen: Timestamp.now(),
          isActive: false
        });
      }
      
      await signOut(auth);
      setUserProfile(null);
      
      toast('Signed out successfully', {
        description: 'You have been logged out of your account.'
      });
    } catch (error: any) {
      toast('Sign out failed', {
        description: error.message || 'Please try again'
      });
      throw error;
    }
  };

  const resetPassword = async (email: string): Promise<void> => {
    try {
      await sendPasswordResetEmail(auth, email);
      toast('Password reset email sent', {
        description: 'Check your email for password reset instructions.'
      });
    } catch (error: any) {
      let errorMessage = 'Please try again';
      
      if (error.code === 'auth/user-not-found') {
        errorMessage = 'No account found with this email address';
      } else if (error.code === 'auth/invalid-email') {
        errorMessage = 'Invalid email address';
      }

      toast('Password reset failed', { description: errorMessage });
      throw error;
    }
  };

  const updateUserProfile = async (data: Partial<UserProfile>): Promise<void> => {
    if (!currentUser) {
      throw new Error('No user logged in');
    }

    try {
      const userRef = doc(db, 'users', currentUser.uid);
      const updateData = {
        ...data,
        updatedAt: Timestamp.now()
      };

      await updateDoc(userRef, updateData);
      
      // Refresh user profile
      await refreshUserProfile();
      
      toast('Profile updated successfully', {
        description: 'Your changes have been saved.'
      });
    } catch (error: any) {
      toast('Profile update failed', {
        description: error.message || 'Please try again'
      });
      throw error;
    }
  };

  const refreshUserProfile = async (): Promise<void> => {
    if (!currentUser) return;

    try {
      const userDoc = await getDoc(doc(db, 'users', currentUser.uid));
      if (userDoc.exists()) {
        const data = userDoc.data();
        const profile: UserProfile = {
          ...data,
          createdAt: data.createdAt?.toDate() || new Date(),
          updatedAt: data.updatedAt?.toDate() || new Date(),
          lastSeen: data.lastSeen?.toDate() || new Date(),
          dateOfBirth: data.dateOfBirth?.toDate(),
          subscriptionExpiry: data.subscriptionExpiry?.toDate()
        } as UserProfile;
        
        setUserProfile(profile);
      }
    } catch (error) {
      console.error('Error fetching user profile:', error);
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setCurrentUser(user);
      
      if (user) {
        await refreshUserProfile();
      } else {
        setUserProfile(null);
      }
      
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  // Update online status periodically
  useEffect(() => {
    if (!currentUser) return;

    const updateOnlineStatus = () => {
      updateDoc(doc(db, 'users', currentUser.uid), {
        lastSeen: Timestamp.now(),
        isActive: true
      });
    };

    // Update immediately
    updateOnlineStatus();

    // Update every 5 minutes
    const interval = setInterval(updateOnlineStatus, 5 * 60 * 1000);

    // Update when user becomes active
    const handleVisibilityChange = () => {
      if (!document.hidden) {
        updateOnlineStatus();
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      clearInterval(interval);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [currentUser]);

  const value: AuthContextType = {
    currentUser,
    userProfile,
    loading,
    signup,
    login,
    logout,
    resetPassword,
    updateUserProfile,
    refreshUserProfile
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}