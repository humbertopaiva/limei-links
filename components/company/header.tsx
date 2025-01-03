import { Profile } from "@/lib/api";
import { SocialLinks } from "@/components/social-links";

interface HeaderProps {
  profile: Profile;
}

export function CompanyHeader({ profile }: HeaderProps) {
  return (
    <div className="text-center space-y-4">
      {profile.logo && (
        <img
          src={profile.logo}
          alt={profile.nome}
          className="w-24 h-24 mx-auto rounded-full border-4 border-white shadow-lg"
        />
      )}
      <h1 className="text-4xl font-bold text-white">{profile.nome}</h1>
      <SocialLinks profile={profile} className="justify-center" />
    </div>
  );
}