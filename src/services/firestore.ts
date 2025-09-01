import {
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  limit,
  startAfter,
  onSnapshot,
  increment,
  arrayUnion,
  arrayRemove,
  Timestamp,
  DocumentData,
  QueryDocumentSnapshot,
  serverTimestamp,
  writeBatch
} from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';
import { db, storage } from '../lib/firebase';
import { UserProfile } from '../contexts/AuthContext';

// Profile Service
export interface ProfileFilters {
  ageRange?: [number, number];
  heightRange?: [number, number];
  location?: string;
  education?: string[];
  profession?: string[];
  religion?: string;
  verifiedOnly?: boolean;
  onlineRecently?: boolean;
  hasPhotos?: boolean;
}

export interface Match {
  id: string;
  user1Id: string;
  user2Id: string;
  status: 'pending' | 'accepted' | 'declined' | 'mutual';
  matchPercentage: number;
  createdAt: Date;
  user1Profile?: UserProfile;
  user2Profile?: UserProfile;
}

export interface Message {
  id: string;
  conversationId: string;
  senderId: string;
  senderName: string;
  content: string;
  type: 'text' | 'image' | 'file';
  fileUrl?: string;
  fileName?: string;
  timestamp: Date;
  status: 'sent' | 'delivered' | 'read';
  reactions?: { [userId: string]: string };
}

export interface Conversation {
  id: string;
  participants: string[];
  participantProfiles?: UserProfile[];
  lastMessage?: Message;
  lastMessageTime: Date;
  unreadCount: { [userId: string]: number };
  isActive: boolean;
  createdAt: Date;
}

class FirestoreService {
  // Profile Methods
  async getProfiles(filters: ProfileFilters = {}, lastDoc?: QueryDocumentSnapshot<DocumentData>, limitCount = 20): Promise<{ profiles: UserProfile[], lastDoc?: QueryDocumentSnapshot<DocumentData> }> {
    try {
      let q = query(
        collection(db, 'users'),
        where('profileCompleted', '==', true),
        where('isActive', '==', true)
      );

      // Apply filters
      if (filters.verifiedOnly) {
        q = query(q, where('isVerified', '==', true));
      }

      if (filters.location) {
        q = query(q, where('location.city', '>=', filters.location), where('location.city', '<=', filters.location + '\uf8ff'));
      }

      if (filters.religion) {
        q = query(q, where('religion', '==', filters.religion));
      }

      // Add ordering and pagination
      q = query(q, orderBy('updatedAt', 'desc'), limit(limitCount));

      if (lastDoc) {
        q = query(q, startAfter(lastDoc));
      }

      const snapshot = await getDocs(q);
      const profiles: UserProfile[] = [];
      
      snapshot.forEach((doc) => {
        const data = doc.data();
        profiles.push({
          ...data,
          uid: doc.id,
          createdAt: data.createdAt?.toDate() || new Date(),
          updatedAt: data.updatedAt?.toDate() || new Date(),
          lastSeen: data.lastSeen?.toDate() || new Date(),
          dateOfBirth: data.dateOfBirth?.toDate(),
          subscriptionExpiry: data.subscriptionExpiry?.toDate()
        } as UserProfile);
      });

      // Apply client-side filters (for complex filters)
      let filteredProfiles = profiles;

      if (filters.ageRange) {
        filteredProfiles = filteredProfiles.filter(profile => {
          if (!profile.age) return false;
          return profile.age >= filters.ageRange![0] && profile.age <= filters.ageRange![1];
        });
      }

      if (filters.onlineRecently) {
        const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000);
        filteredProfiles = filteredProfiles.filter(profile => 
          profile.lastSeen && profile.lastSeen > oneHourAgo
        );
      }

      return {
        profiles: filteredProfiles,
        lastDoc: snapshot.docs[snapshot.docs.length - 1]
      };
    } catch (error) {
      console.error('Error fetching profiles:', error);
      throw error;
    }
  }

  async getProfile(userId: string): Promise<UserProfile | null> {
    try {
      const docRef = doc(db, 'users', userId);
      const docSnap = await getDoc(docRef);
      
      if (docSnap.exists()) {
        const data = docSnap.data();
        return {
          ...data,
          uid: docSnap.id,
          createdAt: data.createdAt?.toDate() || new Date(),
          updatedAt: data.updatedAt?.toDate() || new Date(),
          lastSeen: data.lastSeen?.toDate() || new Date(),
          dateOfBirth: data.dateOfBirth?.toDate(),
          subscriptionExpiry: data.subscriptionExpiry?.toDate()
        } as UserProfile;
      }
      
      return null;
    } catch (error) {
      console.error('Error fetching profile:', error);
      throw error;
    }
  }

  async updateProfileViews(viewedUserId: string, viewerUserId: string): Promise<void> {
    try {
      const batch = writeBatch(db);
      
      // Increment profile views
      const profileRef = doc(db, 'users', viewedUserId);
      batch.update(profileRef, {
        'stats.profileViews': increment(1)
      });

      // Record the view (for analytics and preventing spam)
      const viewRef = doc(db, 'profileViews', `${viewerUserId}_${viewedUserId}`);
      batch.set(viewRef, {
        viewerId: viewerUserId,
        viewedUserId,
        timestamp: Timestamp.now()
      });

      await batch.commit();
    } catch (error) {
      console.error('Error updating profile views:', error);
      throw error;
    }
  }

  // Match/Interest Methods
  async sendInterest(fromUserId: string, toUserId: string): Promise<void> {
    try {
      const interestId = `${fromUserId}_${toUserId}`;
      const reverseInterestId = `${toUserId}_${fromUserId}`;
      
      // Check if reverse interest exists
      const reverseInterestDoc = await getDoc(doc(db, 'interests', reverseInterestId));
      
      const batch = writeBatch(db);
      
      if (reverseInterestDoc.exists()) {
        // It's a mutual match!
        const matchId = `${Math.min(fromUserId, toUserId)}_${Math.max(fromUserId, toUserId)}`;
        
        batch.set(doc(db, 'matches', matchId), {
          user1Id: Math.min(fromUserId, toUserId),
          user2Id: Math.max(fromUserId, toUserId),
          status: 'mutual',
          matchPercentage: Math.floor(Math.random() * 20) + 80, // 80-100%
          createdAt: Timestamp.now()
        });

        // Update stats for both users
        batch.update(doc(db, 'users', fromUserId), {
          'stats.totalMatches': increment(1)
        });
        batch.update(doc(db, 'users', toUserId), {
          'stats.totalMatches': increment(1)
        });
      }
      
      // Create interest record
      batch.set(doc(db, 'interests', interestId), {
        fromUserId,
        toUserId,
        status: 'sent',
        createdAt: Timestamp.now()
      });

      // Update sender's stats
      batch.update(doc(db, 'users', fromUserId), {
        'stats.totalLikes': increment(1)
      });

      await batch.commit();
    } catch (error) {
      console.error('Error sending interest:', error);
      throw error;
    }
  }

  async getMatches(userId: string): Promise<Match[]> {
    try {
      const q1 = query(
        collection(db, 'matches'),
        where('user1Id', '==', userId),
        orderBy('createdAt', 'desc')
      );
      
      const q2 = query(
        collection(db, 'matches'),
        where('user2Id', '==', userId),
        orderBy('createdAt', 'desc')
      );

      const [snapshot1, snapshot2] = await Promise.all([getDocs(q1), getDocs(q2)]);
      
      const matches: Match[] = [];
      
      for (const doc of [...snapshot1.docs, ...snapshot2.docs]) {
        const data = doc.data();
        const match: Match = {
          id: doc.id,
          user1Id: data.user1Id,
          user2Id: data.user2Id,
          status: data.status,
          matchPercentage: data.matchPercentage,
          createdAt: data.createdAt?.toDate() || new Date()
        };
        
        // Fetch partner profile
        const partnerId = data.user1Id === userId ? data.user2Id : data.user1Id;
        const partnerProfile = await this.getProfile(partnerId);
        
        if (partnerProfile) {
          if (data.user1Id === userId) {
            match.user2Profile = partnerProfile;
          } else {
            match.user1Profile = partnerProfile;
          }
          matches.push(match);
        }
      }
      
      return matches;
    } catch (error) {
      console.error('Error fetching matches:', error);
      throw error;
    }
  }

  // Messaging Methods
  async getConversations(userId: string, callback: (conversations: Conversation[]) => void): () => void {
    const q = query(
      collection(db, 'conversations'),
      where('participants', 'array-contains', userId),
      orderBy('lastMessageTime', 'desc')
    );

    return onSnapshot(q, async (snapshot) => {
      const conversations: Conversation[] = [];
      
      for (const doc of snapshot.docs) {
        const data = doc.data();
        const conversation: Conversation = {
          id: doc.id,
          participants: data.participants,
          lastMessageTime: data.lastMessageTime?.toDate() || new Date(),
          unreadCount: data.unreadCount || {},
          isActive: data.isActive ?? true,
          createdAt: data.createdAt?.toDate() || new Date()
        };

        // Fetch participant profiles
        const participantProfiles: UserProfile[] = [];
        for (const participantId of data.participants) {
          if (participantId !== userId) {
            const profile = await this.getProfile(participantId);
            if (profile) {
              participantProfiles.push(profile);
            }
          }
        }
        conversation.participantProfiles = participantProfiles;

        // Fetch last message
        if (data.lastMessageId) {
          const messageDoc = await getDoc(doc(db, 'messages', data.lastMessageId));
          if (messageDoc.exists()) {
            const messageData = messageDoc.data();
            conversation.lastMessage = {
              ...messageData,
              id: messageDoc.id,
              timestamp: messageData.timestamp?.toDate() || new Date()
            } as Message;
          }
        }

        conversations.push(conversation);
      }
      
      callback(conversations);
    });
  }

  async getMessages(conversationId: string, callback: (messages: Message[]) => void): () => void {
    const q = query(
      collection(db, 'messages'),
      where('conversationId', '==', conversationId),
      orderBy('timestamp', 'asc')
    );

    return onSnapshot(q, (snapshot) => {
      const messages: Message[] = [];
      
      snapshot.forEach((doc) => {
        const data = doc.data();
        messages.push({
          ...data,
          id: doc.id,
          timestamp: data.timestamp?.toDate() || new Date()
        } as Message);
      });
      
      callback(messages);
    });
  }

  async sendMessage(conversationId: string, senderId: string, senderName: string, content: string, type: 'text' | 'image' | 'file' = 'text'): Promise<void> {
    try {
      const batch = writeBatch(db);
      
      // Add message
      const messageRef = doc(collection(db, 'messages'));
      const messageData = {
        conversationId,
        senderId,
        senderName,
        content,
        type,
        timestamp: Timestamp.now(),
        status: 'sent'
      };
      
      batch.set(messageRef, messageData);

      // Update conversation
      const conversationRef = doc(db, 'conversations', conversationId);
      batch.update(conversationRef, {
        lastMessageId: messageRef.id,
        lastMessageTime: Timestamp.now(),
        [`unreadCount.${senderId}`]: 0 // Reset sender's unread count
      });

      // Get conversation to update other participants' unread count
      const conversationDoc = await getDoc(conversationRef);
      if (conversationDoc.exists()) {
        const conversationData = conversationDoc.data();
        const participants = conversationData.participants as string[];
        
        participants.forEach(participantId => {
          if (participantId !== senderId) {
            batch.update(conversationRef, {
              [`unreadCount.${participantId}`]: increment(1)
            });
          }
        });
      }

      await batch.commit();
    } catch (error) {
      console.error('Error sending message:', error);
      throw error;
    }
  }

  async createConversation(participants: string[]): Promise<string> {
    try {
      const conversationRef = doc(collection(db, 'conversations'));
      const conversationData = {
        participants,
        lastMessageTime: Timestamp.now(),
        unreadCount: participants.reduce((acc, id) => ({ ...acc, [id]: 0 }), {}),
        isActive: true,
        createdAt: Timestamp.now()
      };
      
      await setDoc(conversationRef, conversationData);
      return conversationRef.id;
    } catch (error) {
      console.error('Error creating conversation:', error);
      throw error;
    }
  }

  async markMessagesAsRead(conversationId: string, userId: string): Promise<void> {
    try {
      const conversationRef = doc(db, 'conversations', conversationId);
      await updateDoc(conversationRef, {
        [`unreadCount.${userId}`]: 0
      });
    } catch (error) {
      console.error('Error marking messages as read:', error);
      throw error;
    }
  }

  // File Upload Methods
  async uploadFile(file: File, path: string): Promise<string> {
    try {
      const storageRef = ref(storage, path);
      const snapshot = await uploadBytes(storageRef, file);
      const downloadURL = await getDownloadURL(snapshot.ref);
      return downloadURL;
    } catch (error) {
      console.error('Error uploading file:', error);
      throw error;
    }
  }

  async uploadProfilePhoto(userId: string, file: File): Promise<string> {
    const timestamp = Date.now();
    const path = `profile-photos/${userId}/${timestamp}_${file.name}`;
    return await this.uploadFile(file, path);
  }

  async deleteFile(url: string): Promise<void> {
    try {
      const fileRef = ref(storage, url);
      await deleteObject(fileRef);
    } catch (error) {
      console.error('Error deleting file:', error);
      throw error;
    }
  }

  // Search Methods
  async searchProfiles(searchTerm: string, filters: ProfileFilters = {}): Promise<UserProfile[]> {
    try {
      // For now, we'll do a simple search. In production, you might want to use Algolia or similar
      const { profiles } = await this.getProfiles(filters, undefined, 100);
      
      const searchLower = searchTerm.toLowerCase();
      return profiles.filter(profile => 
        profile.firstName?.toLowerCase().includes(searchLower) ||
        profile.lastName?.toLowerCase().includes(searchLower) ||
        profile.displayName?.toLowerCase().includes(searchLower) ||
        profile.profession?.toLowerCase().includes(searchLower) ||
        profile.location.city?.toLowerCase().includes(searchLower)
      );
    } catch (error) {
      console.error('Error searching profiles:', error);
      throw error;
    }
  }

  // Analytics Methods
  async recordProfileInteraction(userId: string, targetUserId: string, action: 'view' | 'like' | 'message' | 'contact'): Promise<void> {
    try {
      const interactionRef = doc(collection(db, 'interactions'));
      await setDoc(interactionRef, {
        userId,
        targetUserId,
        action,
        timestamp: Timestamp.now()
      });
    } catch (error) {
      console.error('Error recording interaction:', error);
      throw error;
    }
  }
}

export const firestoreService = new FirestoreService();