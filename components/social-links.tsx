"use client";

import { Profile } from "@/lib/api";
import { Button } from "@/components/ui/button";
import {
  Facebook,
  Instagram,
  Linkedin,
  Twitter,
  // Remove TiktokIcon import as it doesn't exist in lucide-react
} from "lucide-react";

// Create a custom TikTok icon component
function TikTokIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
    </svg>
  );
}

interface SocialLinksProps {
  profile: Profile;
  className?: string;
}

export function SocialLinks({ profile, className }: SocialLinksProps) {
  const socials = [
    {
      icon: Facebook,
      url: `https://facebook.com/${profile.facebook}`,
      show: profile.facebook,
    },
    {
      icon: Instagram,
      url: `https://instagram.com/${profile.instagram}`,
      show: profile.instagram,
    },
    {
      icon: TikTokIcon,
      url: `https://tiktok.com/@${profile.tiktok}`,
      show: profile.tiktok,
    },
    {
      icon: Twitter,
      url: `https://twitter.com/${profile.twitter}`,
      show: profile.twitter,
    },
    {
      icon: Linkedin,
      url: `https://linkedin.com/in/${profile.linkedin}`,
      show: profile.linkedin,
    },
  ].filter((social) => social.show);

  return (
    <div className={`flex gap-2 ${className}`}>
      {socials.map((social) => (
        <Button
          key={social.url}
          variant="ghost"
          size="icon"
          asChild
          className="hover:scale-110 transition-transform"
        >
          <a href={social.url} target="_blank" rel="noopener noreferrer">
            <social.icon className="h-5 w-5" />
          </a>
        </Button>
      ))}
    </div>
  );
}