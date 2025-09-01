import React, { useState } from 'react';
import { Button } from './ui/button';
import { Sheet, SheetContent, SheetTrigger } from './ui/sheet';
import { Menu, Search, Bell, User, MessageCircle, Heart, Settings, LogOut } from 'lucide-react';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from './ui/dropdown-menu';
import { Badge } from './ui/badge';
import { Input } from './ui/input';

interface NavigationProps {
  currentPage?: string;
  userAuthenticated?: boolean;
}

export function Navigation({ currentPage = 'home', userAuthenticated = false }: NavigationProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'browse', label: 'Browse Matches', labelBn: 'ম্যাচ খুঁজুন' },
    { id: 'success', label: 'Success Stories', labelBn: 'সাফল্যের গল্প' },
    { id: 'help', label: 'Help', labelBn: 'সাহায্য' },
    { id: 'about', label: 'About Us', labelBn: 'আমাদের সম্পর্কে' },
  ];

  return (
    <>
      {/* Desktop Navigation */}
      <nav className="hidden md:block bg-white shadow-sm border-b border-ghotok-light-gray sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center">
              <div className="flex-shrink-0 flex items-center">
                <Heart className="h-8 w-8 text-ghotok-muted-green mr-2" />
                <div className="text-xl font-bold">
                  <span className="text-ghotok-muted-green">Ghotok</span>
                  <span className="text-ghotok-pastel-pink">der</span>
                  <span className="text-ghotok-dark-gray">Bari</span>
                </div>
              </div>
              
              {/* Desktop Menu Items */}
              <div className="hidden lg:ml-10 lg:flex lg:space-x-8">
                {navItems.map((item) => (
                  <Button
                    key={item.id}
                    variant={currentPage === item.id ? "default" : "ghost"}
                    className="text-sm font-medium"
                  >
                    <span className="block">{item.label}</span>
                    <span className="block text-xs opacity-75">{item.labelBn}</span>
                  </Button>
                ))}
              </div>
            </div>

            {/* Search Bar */}
            <div className="flex-1 max-w-md mx-8">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Search profiles... / প্রোফাইল খুঁজুন..."
                  className="pl-10 bg-ghotok-light-gray border-none focus:bg-white focus:ring-2 focus:ring-primary"
                />
              </div>
            </div>

            {/* Right Side Actions */}
            <div className="flex items-center space-x-4">
              {userAuthenticated ? (
                <>
                  {/* Notifications */}
                  <Button variant="ghost" size="sm" className="relative">
                    <Bell className="h-5 w-5" />
                    <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center text-xs bg-ghotok-pastel-pink text-ghotok-dark-gray">
                      3
                    </Badge>
                  </Button>

                  {/* Messages */}
                  <Button variant="ghost" size="sm" className="relative">
                    <MessageCircle className="h-5 w-5" />
                    <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center text-xs bg-ghotok-pastel-pink text-ghotok-dark-gray">
                      5
                    </Badge>
                  </Button>

                  {/* Profile Dropdown */}
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm" className="relative">
                        <div className="w-8 h-8 bg-ghotok-muted-green rounded-full flex items-center justify-center">
                          <User className="h-4 w-4 text-white" />
                        </div>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-56">
                      <DropdownMenuItem>
                        <User className="mr-2 h-4 w-4" />
                        <span>Profile</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Settings className="mr-2 h-4 w-4" />
                        <span>Settings</span>
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="text-destructive">
                        <LogOut className="mr-2 h-4 w-4" />
                        <span>Log out</span>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </>
              ) : (
                <>
                  <Button variant="ghost" size="sm">
                    Log In
                  </Button>
                  <Button size="sm" className="bg-ghotok-muted-green hover:bg-ghotok-muted-green/90">
                    Sign Up
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Navigation */}
      <nav className="md:hidden bg-white shadow-sm border-b border-ghotok-light-gray sticky top-0 z-50">
        <div className="px-4">
          <div className="flex justify-between items-center h-14">
            {/* Mobile Logo */}
            <div className="flex items-center">
              <Heart className="h-6 w-6 text-ghotok-muted-green mr-2" />
              <div className="text-lg font-bold">
                <span className="text-ghotok-muted-green">Ghotok</span>
                <span className="text-ghotok-pastel-pink">der</span>
                <span className="text-ghotok-dark-gray">Bari</span>
              </div>
            </div>

            {/* Mobile Actions */}
            <div className="flex items-center space-x-2">
              <Button variant="ghost" size="sm">
                <Search className="h-5 w-5" />
              </Button>
              
              {userAuthenticated && (
                <>
                  <Button variant="ghost" size="sm" className="relative">
                    <Bell className="h-5 w-5" />
                    <Badge className="absolute -top-1 -right-1 h-4 w-4 flex items-center justify-center text-xs bg-ghotok-pastel-pink text-ghotok-dark-gray">
                      3
                    </Badge>
                  </Button>
                  
                  <Button variant="ghost" size="sm" className="relative">
                    <MessageCircle className="h-5 w-5" />
                    <Badge className="absolute -top-1 -right-1 h-4 w-4 flex items-center justify-center text-xs bg-ghotok-pastel-pink text-ghotok-dark-gray">
                      5
                    </Badge>
                  </Button>
                </>
              )}

              {/* Mobile Menu */}
              <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="sm">
                    <Menu className="h-5 w-5" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-80 bg-white">
                  <div className="flex flex-col h-full">
                    <div className="py-6">
                      <div className="flex items-center mb-8">
                        <Heart className="h-8 w-8 text-ghotok-muted-green mr-2" />
                        <div className="text-xl font-bold">
                          <span className="text-ghotok-muted-green">Ghotok</span>
                          <span className="text-ghotok-pastel-pink">der</span>
                          <span className="text-ghotok-dark-gray">Bari</span>
                        </div>
                      </div>

                      <div className="space-y-4">
                        {navItems.map((item) => (
                          <Button
                            key={item.id}
                            variant={currentPage === item.id ? "default" : "ghost"}
                            className="w-full justify-start text-left"
                            onClick={() => setMobileMenuOpen(false)}
                          >
                            <div>
                              <div>{item.label}</div>
                              <div className="text-xs opacity-75">{item.labelBn}</div>
                            </div>
                          </Button>
                        ))}
                      </div>
                    </div>

                    {userAuthenticated ? (
                      <div className="mt-auto border-t border-ghotok-light-gray pt-6">
                        <div className="space-y-2">
                          <Button variant="ghost" className="w-full justify-start">
                            <User className="mr-2 h-4 w-4" />
                            <span>Profile</span>
                          </Button>
                          <Button variant="ghost" className="w-full justify-start">
                            <Settings className="mr-2 h-4 w-4" />
                            <span>Settings</span>
                          </Button>
                          <Button variant="ghost" className="w-full justify-start text-destructive">
                            <LogOut className="mr-2 h-4 w-4" />
                            <span>Log out</span>
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <div className="mt-auto border-t border-ghotok-light-gray pt-6">
                        <div className="space-y-2">
                          <Button variant="outline" className="w-full">
                            Log In
                          </Button>
                          <Button className="w-full bg-ghotok-muted-green hover:bg-ghotok-muted-green/90">
                            Sign Up
                          </Button>
                        </div>
                      </div>
                    )}
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Bottom Navigation (when authenticated) */}
      {userAuthenticated && (
        <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-ghotok-light-gray z-40">
          <div className="flex items-center justify-around py-2">
            <Button variant="ghost" size="sm" className="flex-col h-12">
              <Search className="h-5 w-5" />
              <span className="text-xs mt-1">Browse</span>
            </Button>
            <Button variant="ghost" size="sm" className="flex-col h-12 relative">
              <Heart className="h-5 w-5" />
              <span className="text-xs mt-1">Likes</span>
              <Badge className="absolute top-0 right-2 h-4 w-4 flex items-center justify-center text-xs bg-ghotok-pastel-pink text-ghotok-dark-gray">
                2
              </Badge>
            </Button>
            <Button variant="ghost" size="sm" className="flex-col h-12 relative">
              <MessageCircle className="h-5 w-5" />
              <span className="text-xs mt-1">Chat</span>
              <Badge className="absolute top-0 right-2 h-4 w-4 flex items-center justify-center text-xs bg-ghotok-pastel-pink text-ghotok-dark-gray">
                5
              </Badge>
            </Button>
            <Button variant="ghost" size="sm" className="flex-col h-12">
              <User className="h-5 w-5" />
              <span className="text-xs mt-1">Profile</span>
            </Button>
          </div>
        </div>
      )}
    </>
  );
}