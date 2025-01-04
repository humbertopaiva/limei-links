import { Link } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import {
  Instagram,
  Facebook,
  Send as Telegram,
  MapPin,
  FileText,
  Youtube,
  Linkedin,
  ShoppingCart,
  MessageCircle,
  Store,
  ExternalLink,
  Music2,
} from "lucide-react";

interface LinkListProps {
  links: Link[];
}

type LinkStyleConfig = {
  icon: React.ComponentType;
  className: string;
};

const linkStyles: Record<string, LinkStyleConfig> = {
  whatsapp: {
    icon: MessageCircle,
    className:
      "border-emerald-500 text-emerald-500 hover:bg-emerald-500 hover:text-white",
  },
  instagram: {
    icon: Instagram,
    className:
      "border-pink-500 text-pink-500 hover:bg-pink-500 hover:text-white",
  },
  facebook: {
    icon: Facebook,
    className:
      "border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white",
  },
  telegram: {
    icon: Telegram,
    className: "border-sky-500 text-sky-500 hover:bg-sky-500 hover:text-white",
  },
  maps: {
    icon: MapPin,
    className: "border-red-500 text-red-500 hover:bg-red-500 hover:text-white",
  },
  linkedin: {
    icon: Linkedin,
    className:
      "border-blue-700 text-blue-700 hover:bg-blue-700 hover:text-white",
  },
  youtube: {
    icon: Youtube,
    className: "border-red-600 text-red-600 hover:bg-red-600 hover:text-white",
  },
  mercadolivre: {
    icon: Store,
    className:
      "border-yellow-500 text-yellow-500 hover:bg-yellow-500 hover:text-white",
  },
  shopee: {
    icon: ShoppingCart,
    className:
      "border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white",
  },
  tiktok: {
    icon: Music2,
    className:
      "border-neutral-800 text-neutral-800 hover:bg-neutral-800 hover:text-white",
  },
  pdf: {
    icon: FileText,
    className:
      "border-purple-500 text-purple-500 hover:bg-purple-500 hover:text-white",
  },
  default: {
    icon: ExternalLink,
    className:
      "border-gray-500 text-gray-500 hover:bg-gray-500 hover:text-white",
  },
};

function getLinkType(tipo_link: string, url: string): string {
  // Primeiro verifica o tipo_link definido
  if (tipo_link) return tipo_link.toLowerCase();

  // Se não tiver tipo_link, tenta identificar pela URL
  const urlLower = url.toLowerCase();

  if (urlLower.includes("whatsapp")) return "whatsapp";
  if (urlLower.includes("instagram")) return "instagram";
  if (urlLower.includes("facebook")) return "facebook";
  if (urlLower.includes("telegram")) return "telegram";
  if (urlLower.includes("maps")) return "maps";
  if (urlLower.includes("linkedin")) return "linkedin";
  if (urlLower.includes("youtube")) return "youtube";
  if (urlLower.includes("mercadolivre")) return "mercadolivre";
  if (urlLower.includes("shopee")) return "shopee";
  if (urlLower.includes("tiktok")) return "tiktok";
  if (urlLower.includes(".pdf")) return "pdf";

  return "default";
}

export function LinkList({ links }: LinkListProps) {
  if (links.length === 0) return null;

  return (
    <Card className="bg-white/95 backdrop-blur-sm shadow-xl">
      <CardHeader className="flex flex-row items-center justify-between px-8">
        <CardTitle className="text-xl font-bold flex items-center">
          Links
        </CardTitle>
      </CardHeader>
      <CardContent className="px-8 space-y-4">
        {links
          .sort((a, b) => a.ordem - b.ordem)
          .map((link) => {
            const type = getLinkType(link.tipo_link, link.url);
            const style = linkStyles[type] || linkStyles.default;
            const Icon = style.icon;

            return (
              <Button
                key={link.url}
                variant="outline"
                className={cn(
                  "w-full text-lg py-6 border-2",
                  "transition-all duration-300 ease-out",
                  "flex items-center justify-center gap-3",
                  "hover:scale-102",
                  style.className
                )}
                asChild
              >
                <a
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3"
                >
                  <Icon />
                  <span>{link.texto}</span>
                </a>
              </Button>
            );
          })}
      </CardContent>
    </Card>
  );
}
