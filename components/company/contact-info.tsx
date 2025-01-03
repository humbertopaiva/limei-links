import { Profile } from "@/lib/api";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Phone, MapPin, Mail, CreditCard } from "lucide-react";

interface ContactInfoProps {
  profile: Profile;
}

export function ContactInfo({ profile }: ContactInfoProps) {
  return (
    <Card>
      <CardContent className="grid gap-4 p-6">
        <div className="flex items-center gap-2">
          <MapPin className="h-5 w-5 text-muted-foreground" />
          <span>{profile.endereco}</span>
        </div>
        <div className="flex items-center gap-2">
          <Phone className="h-5 w-5 text-muted-foreground" />
          <span>{profile.telefone}</span>
        </div>
        <div className="flex items-center gap-2">
          <Mail className="h-5 w-5 text-muted-foreground" />
          <span>{profile.email}</span>
        </div>
        <div className="flex items-center gap-2">
          <CreditCard className="h-5 w-5 text-muted-foreground" />
          <div className="flex flex-wrap gap-2">
            {profile.opcoes_pagamento.map((option) => (
              <Badge key={option} variant="secondary">
                {option}
              </Badge>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}