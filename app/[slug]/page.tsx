import { fetchCompanyData } from "@/lib/api";
import { SocialLinks } from "@/components/social-links";
import { ProductCard } from "@/components/product-card";
import { BusinessHours } from "@/components/business-hours";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Phone, MapPin, Mail, CreditCard } from "lucide-react";

export default async function CompanyPage({
  params,
}: {
  params: { slug: string };
}) {
  const { products, links, profile } = await fetchCompanyData(params.slug);

  return (
    <div
      className="min-h-screen"
      style={{
        background: `linear-gradient(135deg, ${profile.cor_primaria}, ${profile.cor_secundaria})`,
      }}
    >
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="space-y-8">
          {/* Header */}
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

          {/* Contact Info */}
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

          {/* Business Hours */}
          <Card>
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold mb-4">Horário de Funcionamento</h2>
              <BusinessHours profile={profile} />
            </CardContent>
          </Card>

          {/* Links */}
          {links.length > 0 && (
            <div className="space-y-4">
              {links
                .sort((a, b) => a.ordem - b.ordem)
                .map((link) => (
                  <Button
                    key={link.url}
                    variant="secondary"
                    className="w-full text-lg py-6 hover:scale-105 transition-transform"
                    asChild
                  >
                    <a href={link.url} target="_blank" rel="noopener noreferrer">
                      {link.texto}
                    </a>
                  </Button>
                ))}
            </div>
          )}

          {/* Products */}
          {products.length > 0 && (
            <div>
              <h2 className="text-2xl font-bold text-white mb-4">Produtos</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {products.map((product) => (
                  <ProductCard key={product.produto.nome} product={product} />
                ))}
              </div>
            </div>
          )}

          {/* Tags */}
          {profile.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 justify-center">
              {profile.tags.map((tag) => (
                <Badge key={tag} variant="secondary">
                  #{tag}
                </Badge>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}