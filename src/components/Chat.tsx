// src/components/Chat.tsx
import React, { useState, useEffect, useRef } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { 
  MessageCircle, 
  Send, 
  ArrowLeft, 
  MoreVertical, 
  Phone, 
  Video, 
  Heart,
  User,
  Paperclip,
  Smile,
  Check,
  CheckCheck
} from 'lucide-react';

interface Message {
  id: string;
  senderId: string;
  receiverId: string;
  text: string;
  timestamp: Date;
  read: boolean;
}

interface ChatPartner {
  id: string;
  name: string;
  isOnline: boolean;
  lastSeen: string;
  isPremium: boolean;
}

interface ChatProps {
  onBack: () => void;
}

export function Chat({ onBack }: ChatProps) {
  const { currentUser, userProfile } = useAuth();
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const [activeChat, setActiveChat] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Mock chat partners
  const [chatPartners] = useState<ChatPartner[]>([
    {
      id: '1',
      name: 'রহিমা খাতুন',
      isOnline: true,
      lastSeen: 'online',
      isPremium: true
    },
    {
      id: '2',
      name: 'ফারহানা আক্তার',
      isOnline: false,
      lastSeen: '2 hours ago',
      isPremium: false
    },
    {
      id: '3',
      name: 'সাবরিনা ইসলাম',
      isOnline: true,
      lastSeen: 'online',
      isPremium: true
    }
  ]);

  // Mock messages
  useEffect(() => {
    // Simulate loading messages
    const timer = setTimeout(() => {
      const mockMessages: Message[] = [
        {
          id: '1',
          senderId: '1',
          receiverId: currentUser?.uid || '',
          text: 'হ্যালো! আপনার প্রোফাইল দেখে ভালো লেগেছে। কি অবস্থা?',
          timestamp: new Date(Date.now() - 3600000), // 1 hour ago
          read: true
        },
        {
          id: '2',
          senderId: currentUser?.uid || '',
          receiverId: '1',
          text: 'অসম্ভব! আমিও আপনার প্রোফাইল দেখে খুব ভালো লেগেছে। আপনি কি ঢাকায় কাজ করেন?',
          timestamp: new Date(Date.now() - 3500000), // 58 minutes ago
          read: true
        },
        {
          id: '3',
          senderId: '1',
          receiverId: currentUser?.uid || '',
          text: 'হ্যাঁ, আমি ঢাকার একটি সফটওয়্যার কোম্পানিতে কাজ করি। আপনি কি ঢাকায় থাকেন?',
          timestamp: new Date(Date.now() - 3400000), // 57 minutes ago
          read: true
        },
        {
          id: '4',
          senderId: currentUser?.uid || '',
          receiverId: '1',
          text: 'হ্যাঁ, আমিও ঢাকায় থাকি। মাঝে মাঝে কফি করতে চান? আপনার সুবিধা মতো কোথাও মিট করতে পারি।',
          timestamp: new Date(Date.now() - 3300000), // 55 minutes ago
          read: true
        },
        {
          id: '5',
          senderId: '1',
          receiverId: currentUser?.uid || '',
          text: 'এটা একটা ভালো প্রস্তাব! আগামী শনিবার কি কফি করতে পারি? আপনার সুবিধা মতো কোথাও মিট করতে পারি।',
          timestamp: new Date(Date.now() - 1800000), // 30 minutes ago
          read: true
        }
      ];
      
      setMessages(mockMessages);
      setActiveChat('1');
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, [currentUser?.uid]);

  // Scroll to bottom of messages
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSendMessage = () => {
    if (newMessage.trim() === '' || !activeChat) return;

    const message: Message = {
      id: Date.now().toString(),
      senderId: currentUser?.uid || '',
      receiverId: activeChat,
      text: newMessage,
      timestamp: new Date(),
      read: false
    };

    setMessages(prev => [...prev, message]);
    setNewMessage('');
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const formatDate = (date: Date) => {
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    
    if (date.toDateString() === today.toDateString()) {
      return 'Today';
    } else if (date.toDateString() === yesterday.toDateString()) {
      return 'Yesterday';
    } else {
      return date.toLocaleDateString();
    }
  };

  // Group messages by date
  const groupMessagesByDate = () => {
    const groups: { [key: string]: Message[] } = {};
    
    messages.forEach(message => {
      const dateKey = formatDate(message.timestamp);
      if (!groups[dateKey]) {
        groups[dateKey] = [];
      }
      groups[dateKey].push(message);
    });
    
    return groups;
  };

  const groupedMessages = groupMessagesByDate();

  if (loading) {
    return (
      <div className="min-h-screen bg-ghotok-warm-beige flex items-center justify-center">
        <div className="text-center">
          <MessageCircle className="w-12 h-12 text-ghotok-muted-green animate-pulse mx-auto mb-4" />
          <p className="text-muted-foreground">Loading messages...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-ghotok-warm-beige flex flex-col">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="flex items-center justify-between h-16 px-4">
          <div className="flex items-center">
            <Button variant="ghost" size="icon" className="mr-2" onClick={onBack}>
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div className="flex items-center">
              <div className="relative">
                <div className="bg-gray-200 border-2 border-dashed rounded-xl w-10 h-10" />
                {chatPartners.find(p => p.id === activeChat)?.isOnline && (
                  <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                )}
              </div>
              <div className="ml-3">
                <h1 className="font-semibold">
                  {chatPartners.find(p => p.id === activeChat)?.name}
                </h1>
                <p className="text-xs text-muted-foreground">
                  {chatPartners.find(p => p.id === activeChat)?.isOnline 
                    ? 'Online' 
                    : `Last seen ${chatPartners.find(p => p.id === activeChat)?.lastSeen}`
                  }
                </p>
              </div>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="icon">
              <Phone className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon">
              <Video className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon">
              <MoreVertical className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Chat List Sidebar */}
        <div className="w-1/3 border-r bg-white hidden md:block">
          <div className="p-4 border-b">
            <h2 className="text-lg font-semibold">Messages</h2>
          </div>
          
          <div className="overflow-y-auto h-[calc(100vh-4rem)]">
            {chatPartners.map(partner => (
              <div 
                key={partner.id}
                className={`flex items-center p-4 border-b cursor-pointer hover:bg-ghotok-warm-beige/50 ${
                  activeChat === partner.id ? 'bg-ghotok-warm-beige' : ''
                }`}
                onClick={() => setActiveChat(partner.id)}
              >
                <div className="relative">
                  <div className="bg-gray-200 border-2 border-dashed rounded-xl w-12 h-12" />
                  {partner.isOnline && (
                    <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                  )}
                </div>
                <div className="ml-3 flex-1 min-w-0">
                  <div className="flex justify-between">
                    <h3 className="font-medium truncate">{partner.name}</h3>
                    {partner.isPremium && (
                      <Heart className="w-4 h-4 text-ghotok-pastel-pink flex-shrink-0 ml-1" />
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground truncate">
                    Last message preview...
                  </p>
                </div>
                <div className="text-xs text-muted-foreground ml-2">
                  10:30 AM
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Main Chat Area */}
        <div className="flex-1 flex flex-col">
          {/* Messages Container */}
          <div className="flex-1 overflow-y-auto p-4">
            {Object.entries(groupedMessages).map(([date, dateMessages]) => (
              <div key={date}>
                <div className="text-center my-4">
                  <span className="text-xs bg-ghotok-warm-beige text-muted-foreground px-3 py-1 rounded-full">
                    {date}
                  </span>
                </div>
                
                {dateMessages.map(message => (
                  <div 
                    key={message.id}
                    className={`flex mb-4 ${
                      message.senderId === currentUser?.uid ? 'justify-end' : 'justify-start'
                    }`}
                  >
                    {message.senderId !== currentUser?.uid && (
                      <div className="mr-2 flex-shrink-0">
                        <div className="bg-gray-200 border-2 border-dashed rounded-xl w-8 h-8" />
                      </div>
                    )}
                    
                    <div>
                      <div 
                        className={`max-w-xs md:max-w-md px-4 py-2 rounded-2xl ${
                          message.senderId === currentUser?.uid
                            ? 'bg-ghotok-muted-green text-white rounded-tr-none'
                            : 'bg-white border border-gray-200 rounded-tl-none'
                        }`}
                      >
                        <p>{message.text}</p>
                      </div>
                      <div 
                        className={`text-xs text-muted-foreground mt-1 flex items-center ${
                          message.senderId === currentUser?.uid ? 'justify-end' : 'justify-start'
                        }`}
                      >
                        <span>{formatTime(message.timestamp)}</span>
                        {message.senderId === currentUser?.uid && (
                          <>
                            {message.read ? (
                              <CheckCheck className="w-4 h-4 ml-1 text-ghotok-muted-green" />
                            ) : (
                              <Check className="w-4 h-4 ml-1" />
                            )}
                          </>
                        )}
                      </div>
                    </div>
                    
                    {message.senderId === currentUser?.uid && (
                      <div className="ml-2 flex-shrink-0">
                        <div className="bg-gray-200 border-2 border-dashed rounded-xl w-8 h-8" />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ))}
            
            <div ref={messagesEndRef} />
          </div>

          {/* Message Input */}
          <div className="border-t bg-white p-4">
            <div className="flex items-center">
              <Button variant="ghost" size="icon">
                <Paperclip className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon">
                <Smile className="h-5 w-5" />
              </Button>
              
              <div className="flex-1 mx-2">
                <Input
                  type="text"
                  placeholder="Type a message..."
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  className="w-full"
                />
              </div>
              
              <Button 
                onClick={handleSendMessage}
                disabled={!newMessage.trim()}
                className="bg-ghotok-muted-green hover:bg-ghotok-muted-green/90"
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}