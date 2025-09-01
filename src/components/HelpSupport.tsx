// src/components/HelpSupport.tsx
import React, { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Label } from './ui/label';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { 
  HelpCircle, 
  Mail, 
  Phone, 
  MessageCircle, 
  BookOpen, 
  Search, 
  ArrowLeft,
  User,
  Heart,
  Crown,
  CreditCard,
  Shield,
  FileText,
  ChevronRight,
  Send
} from 'lucide-react';

interface HelpSupportProps {
  onBack: () => void;
}

interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: string;
}

interface SupportTopic {
  id: string;
  title: string;
  icon: React.ReactNode;
  description: string;
}

export function HelpSupport({ onBack }: HelpSupportProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [supportForm, setSupportForm] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  // Support topics
  const supportTopics: SupportTopic[] = [
    {
      id: 'account',
      title: 'Account Management',
      icon: <User className="w-5 h-5" />,
      description: 'Login issues, profile updates, and account settings'
    },
    {
      id: 'matching',
      title: 'Finding Matches',
      icon: <Heart className="w-5 h-5" />,
      description: 'How the matching algorithm works and browsing profiles'
    },
    {
      id: 'premium',
      title: 'Premium Membership',
      icon: <Crown className="w-5 h-5" />,
      description: 'Subscription plans, benefits, and billing questions'
    },
    {
      id: 'payment',
      title: 'Payment Issues',
      icon: <CreditCard className="w-5 h-5" />,
      description: 'Payment methods, failed transactions, and refunds'
    },
    {
      id: 'privacy',
      title: 'Privacy & Safety',
      icon: <Shield className="w-5 h-5" />,
      description: 'Privacy settings, safety tips, and reporting users'
    },
    {
      id: 'general',
      title: 'General Questions',
      icon: <HelpCircle className="w-5 h-5" />,
      description: 'Platform features, terms of service, and other inquiries'
    }
  ];

  // FAQ items
  const faqs: FAQItem[] = [
    {
      id: '1',
      question: 'How do I create an account?',
      answer: 'To create an account, click on the "Sign Up" button on the homepage. Enter your email address, create a password, and complete your profile information. You\'ll receive a verification email to confirm your account.',
      category: 'account'
    },
    {
      id: '2',
      question: 'How does the matching algorithm work?',
      answer: 'Our matching algorithm considers your profile information, preferences, and interests to suggest compatible matches. Premium members get priority in match suggestions and access to advanced filters.',
      category: 'matching'
    },
    {
      id: '3',
      question: 'What are the benefits of Premium membership?',
      answer: 'Premium members enjoy unlimited likes, see who liked their profile, get priority in match suggestions, profile boosting, and access to exclusive features like video calls and personal matchmaker support.',
      category: 'premium'
    },
    {
      id: '4',
      question: 'How do I cancel my subscription?',
      answer: 'You can cancel your subscription at any time from your Account Settings page. Navigate to Subscription Management and click "Cancel Subscription". Your premium benefits will continue until the end of your billing period.',
      category: 'payment'
    },
    {
      id: '5',
      question: 'Is my personal information secure?',
      answer: 'Yes, we take your privacy seriously. All personal information is encrypted and stored securely. We never share your data with third parties without your consent. You can control your privacy settings in your account.',
      category: 'privacy'
    },
    {
      id: '6',
      question: 'How can I report a suspicious profile?',
      answer: 'If you encounter a suspicious or inappropriate profile, click on the "Report" button on their profile page. Our moderation team will review the report and take appropriate action.',
      category: 'privacy'
    },
    {
      id: '7',
      question: 'What payment methods do you accept?',
      answer: 'We accept bKash, Nagad, and all major credit/debit cards including Visa, Mastercard, and American Express. All transactions are secured with SSL encryption.',
      category: 'payment'
    },
    {
      id: '8',
      question: 'How do I update my profile information?',
      answer: 'Go to your Account Settings page and click on "Profile Information". You can update your personal details, location, profession, education, and interests. Don\'t forget to save your changes!',
      category: 'account'
    }
  ];

  // Filter FAQs based on search and category
  const filteredFAQs = faqs.filter(faq => {
    const matchesSearch = faq.question.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = activeCategory === 'all' || faq.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  // Get unique categories
  const categories = ['all', ...new Set(faqs.map(faq => faq.category))];

  const handleSupportFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setSupportForm(prev => ({
      ...prev,
      [id]: value
    }));
  };

  const handleSubmitSupportForm = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, you would send this to your backend
    console.log('Support request submitted:', supportForm);
    setSubmitted(true);
    
    // Reset form after submission
    setTimeout(() => {
      setSupportForm({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
      setSubmitted(false);
    }, 3000);
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
              <HelpCircle className="h-8 w-8 text-ghotok-muted-green" />
              <div className="ml-2 text-xl font-bold">
                <span className="text-ghotok-muted-green">Ghotok</span>
                <span className="text-ghotok-pastel-pink">der</span>
                <span className="text-ghotok-dark-gray">Bari</span>
              </div>
            </div>
            
            <h1 className="text-lg font-semibold">Help & Support</h1>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-ghotok-dark-gray mb-4">
            How can we help you?
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Find answers to common questions or contact our support team for personalized assistance
          </p>
          
          {/* Search Bar */}
          <div className="max-w-2xl mx-auto mt-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search for help..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 py-6 text-lg"
              />
            </div>
          </div>
        </div>

        {/* Support Topics */}
        <div className="mb-12">
          <h2 className="text-xl font-semibold mb-6">Browse Support Topics</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {supportTopics.map((topic) => (
              <Card 
                key={topic.id}
                className="hover:shadow-lg transition-shadow cursor-pointer"
                onClick={() => setActiveCategory(topic.id)}
              >
                <CardContent className="p-6">
                  <div className="flex items-start">
                    <div className="p-2 rounded-full bg-ghotok-muted-green/10 text-ghotok-muted-green">
                      {topic.icon}
                    </div>
                    <div className="ml-4">
                      <h3 className="font-semibold">{topic.title}</h3>
                      <p className="text-sm text-muted-foreground mt-1">
                        {topic.description}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mb-12">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold">Frequently Asked Questions</h2>
            <div className="flex space-x-2">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={activeCategory === category ? "default" : "outline"}
                  size="sm"
                  onClick={() => setActiveCategory(category)}
                  className={
                    activeCategory === category 
                      ? "bg-ghotok-muted-green hover:bg-ghotok-muted-green/90" 
                      : ""
                  }
                >
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </Button>
              ))}
            </div>
          </div>
          
          {filteredFAQs.length > 0 ? (
            <div className="space-y-4">
              {filteredFAQs.map((faq) => (
                <Card key={faq.id}>
                  <CardContent className="p-0">
                    <details className="group">
                      <summary className="list-none cursor-pointer p-6 flex justify-between items-center">
                        <h3 className="font-medium text-lg">{faq.question}</h3>
                        <ChevronRight className="w-5 h-5 group-open:rotate-90 transition-transform" />
                      </summary>
                      <div className="px-6 pb-6 pt-2 border-t">
                        <p className="text-muted-foreground">{faq.answer}</p>
                      </div>
                    </details>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <HelpCircle className="mx-auto h-12 w-12 text-muted-foreground" />
              <h3 className="mt-2 text-sm font-medium">No FAQs found</h3>
              <p className="mt-1 text-sm text-muted-foreground">
                Try adjusting your search or category filter
              </p>
              <div className="mt-6">
                <Button onClick={() => {
                  setSearchQuery('');
                  setActiveCategory('all');
                }}>
                  Reset filters
                </Button>
              </div>
            </div>
          )}
        </div>

        {/* Contact Support */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Contact Methods */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Phone className="w-5 h-5 mr-2 text-ghotok-muted-green" />
                Contact Methods
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="p-2 rounded-full bg-ghotok-muted-green/10 text-ghotok-muted-green">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div className="ml-4">
                    <h3 className="font-medium">Email Support</h3>
                    <p className="text-muted-foreground mt-1">
                      support@ghotokderbari.com
                    </p>
                    <p className="text-sm text-muted-foreground mt-2">
                      Response within 24 hours
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="p-2 rounded-full bg-ghotok-muted-green/10 text-ghotok-muted-green">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div className="ml-4">
                    <h3 className="font-medium">Phone Support</h3>
                    <p className="text-muted-foreground mt-1">
                      +880 XXX XXX XXX
                    </p>
                    <p className="text-sm text-muted-foreground mt-2">
                      Sunday - Thursday, 9AM - 6PM BDT
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="p-2 rounded-full bg-ghotok-muted-green/10 text-ghotok-muted-green">
                    <MessageCircle className="w-5 h-5" />
                  </div>
                  <div className="ml-4">
                    <h3 className="font-medium">Live Chat</h3>
                    <p className="text-muted-foreground mt-1">
                      Available in the app
                    </p>
                    <p className="text-sm text-muted-foreground mt-2">
                      Instant support during business hours
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Support Form */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Send className="w-5 h-5 mr-2 text-ghotok-muted-green" />
                Send Us a Message
              </CardTitle>
            </CardHeader>
            <CardContent>
              {submitted ? (
                <div className="text-center py-8">
                  <div className="mx-auto bg-ghotok-muted-green/10 rounded-full p-3 w-16 h-16 flex items-center justify-center mb-4">
                    <Mail className="w-8 h-8 text-ghotok-muted-green" />
                  </div>
                  <h3 className="text-lg font-medium">Message Sent!</h3>
                  <p className="text-muted-foreground mt-2">
                    We'll get back to you as soon as possible
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmitSupportForm} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="name">Full Name</Label>
                      <Input
                        id="name"
                        value={supportForm.name}
                        onChange={handleSupportFormChange}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="email">Email Address</Label>
                      <Input
                        id="email"
                        type="email"
                        value={supportForm.email}
                        onChange={handleSupportFormChange}
                        required
                      />
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="subject">Subject</Label>
                    <Input
                      id="subject"
                      value={supportForm.subject}
                      onChange={handleSupportFormChange}
                      required
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="message">Message</Label>
                    <Textarea
                      id="message"
                      value={supportForm.message}
                      onChange={handleSupportFormChange}
                      rows={4}
                      required
                    />
                  </div>
                  
                  <Button 
                    type="submit" 
                    className="w-full bg-ghotok-muted-green hover:bg-ghotok-muted-green/90"
                  >
                    <Send className="w-4 h-4 mr-2" />
                    Send Message
                  </Button>
                </form>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Resources */}
        <div className="mt-12">
          <h2 className="text-xl font-semibold mb-6">Helpful Resources</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center">
                  <div className="p-2 rounded-full bg-ghotok-muted-green/10 text-ghotok-muted-green">
                    <BookOpen className="w-5 h-5" />
                  </div>
                  <div className="ml-4">
                    <h3 className="font-medium">User Guide</h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      Complete guide to using Ghotokder Bari
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center">
                  <div className="p-2 rounded-full bg-ghotok-muted-green/10 text-ghotok-muted-green">
                    <FileText className="w-5 h-5" />
                  </div>
                  <div className="ml-4">
                    <h3 className="font-medium">Terms of Service</h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      Our terms and conditions
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center">
                  <div className="p-2 rounded-full bg-ghotok-muted-green/10 text-ghotok-muted-green">
                    <Shield className="w-5 h-5" />
                  </div>
                  <div className="ml-4">
                    <h3 className="font-medium">Privacy Policy</h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      How we protect your data
                    </p>
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