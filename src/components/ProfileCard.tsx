import React from 'react';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { 
  MapPin, 
  Briefcase, 
  GraduationCap, 
  Heart, 
  MessageCircle, 
  Star,
  Verified
} from 'lucide-react';

interface ProfileCardProps {
  profile: {
    id: string;
    name: string;
    age: number;
    location: string;
    profession: string;
    education: string;
    photo: string;
    isVerified?: boolean;
    isOnline?: boolean;
    matchPercentage?: number;
    interests?: string[];
    bio?: string;
  };
  variant?: 'compact' | 'detailed' | 'featured';
  showActions?: boolean;
  onLike?: () => void;
  onMessage?: () => void;
  onViewProfile?: () => void;
}

export function ProfileCard({ 
  profile, 
  variant = 'compact', 
  showActions = true,
  onLike,
  onMessage,
  onViewProfile
}: ProfileCardProps) {
  const isCompact = variant === 'compact';
  const isFeatured = variant === 'featured';

  return (
    <Card className={`group hover:shadow-lg transition-all duration-300 overflow-hidden ${
      isFeatured ? 'border-ghotok-muted-green border-2' : ''
    }`}>
      <div className="relative">
        {/* Profile Image */}
        <div className={`relative ${isCompact ? 'aspect-[3/4]' : 'aspect-[4/5]'} overflow-hidden`}>
          <ImageWithFallback
            src={profile.photo}
            alt={profile.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
          
          {/* Online Status */}
          {profile.isOnline && (
            <div className="absolute top-3 left-3">
              <div className="w-3 h-3 bg-green-500 rounded-full border-2 border-white shadow-sm"></div>
            </div>
          )}
          
          {/* Match Percentage */}
          {profile.matchPercentage && profile.matchPercentage > 80 && (
            <div className="absolute top-3 right-3">
              <Badge className="bg-ghotok-muted-green text-white text-xs font-semibold">
                <Star className="w-3 h-3 mr-1" />
                {profile.matchPercentage}%
              </Badge>
            </div>
          )}
          
          {/* Featured Badge */}
          {isFeatured && (
            <div className="absolute top-3 left-1/2 transform -translate-x-1/2">
              <Badge className="bg-yellow-500 text-black text-xs font-semibold">
                Featured
              </Badge>
            </div>
          )}
          
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
          
          {/* Quick Actions on Hover */}
          {showActions && (
            <div className="absolute bottom-3 left-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <Button 
                size="sm" 
                variant="secondary"
                className="flex-1 bg-white/90 hover:bg-white text-black backdrop-blur-sm"
                onClick={onLike}
              >
                <Heart className="w-4 h-4 mr-1" />
                Like
              </Button>
              <Button 
                size="sm" 
                className="flex-1 bg-ghotok-muted-green hover:bg-ghotok-muted-green/90 backdrop-blur-sm"
                onClick={onMessage}
              >
                <MessageCircle className="w-4 h-4 mr-1" />
                Chat
              </Button>
            </div>
          )}
        </div>
      </div>

      <CardContent className="p-4">
        {/* Name and Verification */}
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <h3 className="font-semibold text-lg text-ghotok-dark-gray truncate">
              {profile.name}
            </h3>
            {profile.isVerified && (
              <Verified className="w-4 h-4 text-blue-500" />
            )}
          </div>
          <span className="text-sm text-muted-foreground font-medium">
            {profile.age}
          </span>
        </div>

        {/* Location */}
        <div className="flex items-center text-sm text-muted-foreground mb-2">
          <MapPin className="w-4 h-4 mr-1 flex-shrink-0" />
          <span className="truncate">{profile.location}</span>
        </div>

        {/* Profession */}
        <div className="flex items-center text-sm text-muted-foreground mb-2">
          <Briefcase className="w-4 h-4 mr-1 flex-shrink-0" />
          <span className="truncate">{profile.profession}</span>
        </div>

        {/* Education */}
        <div className="flex items-center text-sm text-muted-foreground mb-3">
          <GraduationCap className="w-4 h-4 mr-1 flex-shrink-0" />
          <span className="truncate">{profile.education}</span>
        </div>

        {/* Bio (for detailed variant) */}
        {!isCompact && profile.bio && (
          <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
            {profile.bio}
          </p>
        )}

        {/* Interests */}
        {!isCompact && profile.interests && profile.interests.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-3">
            {profile.interests.slice(0, 3).map((interest, index) => (
              <Badge 
                key={index} 
                variant="secondary" 
                className="text-xs bg-ghotok-light-gray text-ghotok-dark-gray"
              >
                {interest}
              </Badge>
            ))}
            {profile.interests.length > 3 && (
              <Badge 
                variant="secondary" 
                className="text-xs bg-ghotok-light-gray text-ghotok-dark-gray"
              >
                +{profile.interests.length - 3}
              </Badge>
            )}
          </div>
        )}

        {/* Actions */}
        {showActions && isCompact && (
          <div className="flex gap-2">
            <Button 
              variant="outline" 
              size="sm" 
              className="flex-1"
              onClick={onLike}
            >
              <Heart className="w-4 h-4 mr-1" />
              Like
            </Button>
            <Button 
              size="sm" 
              className="flex-1 bg-ghotok-muted-green hover:bg-ghotok-muted-green/90"
              onClick={onMessage}
            >
              <MessageCircle className="w-4 h-4 mr-1" />
              Chat
            </Button>
          </div>
        )}

        {/* View Profile Button */}
        {!isCompact && (
          <Button 
            variant="outline" 
            className="w-full mt-2"
            onClick={onViewProfile}
          >
            View Full Profile
          </Button>
        )}
      </CardContent>
    </Card>
  );
}

/* CSS for line-clamp utility */