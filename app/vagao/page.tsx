import { fetchCompanyData } from "@/lib/api";
import { CompanyHeader } from "@/components/company/header";
import { ContactInfo } from "@/components/company/contact-info";
import { BusinessHours } from "@/components/business-hours";
import { LinkList } from "@/components/company/link-list";
import { ProductList } from "@/components/company/product-list";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default async function VagaoPage() {
  const { products, links, profile } = await fetchCompanyData("vagao");

  return (
    <div
      className="min-h-screen"
      style={{
        background: `linear-gradient(135deg, ${profile.cor_primaria}, ${profile.cor_secundaria})`,
      }}
    >
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="space-y-8">
          <CompanyHeader profile={profile} />
          <ContactInfo profile={profile} />

          <Card>
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold mb-4">Horário de Funcionamento</h2>
              <BusinessHours profile={profile} />
            </CardContent>
          </Card>

          <LinkList links={links} />
          <ProductList products={products} />

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