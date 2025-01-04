import { fetchCompanyData } from "@/lib/api";
import { SocialLinks } from "@/components/social-links";
import { BusinessHours } from "@/components/business-hours";
import { notFound } from "next/navigation";
import { Badge } from "lucide-react";
import { ProductList } from "@/components/company/product-list";
import { LinkList } from "@/components/company/link-list";
import Image from "next/image";
import { Footer } from "@/components/footer";
import { CompanyInfo } from "@/components/info-tabs";

export default async function CompanyPage({
  params,
}: {
  params: { slug: string };
}) {
  try {
    const { products, links, profile } = await fetchCompanyData(params.slug);

    if (!profile) {
      notFound();
    }

    const bgStyle = profile.cor_primaria
      ? `linear-gradient(145deg, ${profile.cor_primaria}15, ${profile.cor_primaria}35)`
      : "linear-gradient(145deg, #e2e8f0, #f8fafc)";

    return (
      <div
        className="min-h-screen"
        style={{
          background: bgStyle,
        }}
      >
        <div className="max-w-4xl mx-auto px-4 py-4 md:py-8">
          <div className="space-y-8">
            {/* Banner Section */}
            <div className="relative w-full h-[200px] rounded-xl">
              <div className="relative w-full h-full overflow-hidden rounded-xl">
                {profile.banner ? (
                  <Image
                    src={profile.banner}
                    alt="Banner"
                    fill
                    className="object-cover"
                    priority
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-b from-gray-800 to-gray-900" />
                )}
              </div>
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent rounded-xl" />

              {/* Logo positioned at the bottom center of banner */}
              <div className="absolute -bottom-12 left-1/2 transform -translate-x-1/2">
                {profile.logo && (
                  <Image
                    src={profile.logo}
                    alt={profile.nome}
                    width={120}
                    height={120}
                    className="w-32 h-32 rounded-full border-4 border-white shadow-lg object-cover"
                    priority
                    objectFit="cover"
                  />
                )}
              </div>
            </div>

            {/* Header - with extra top padding to account for logo overflow */}
            <div className="text-center space-y-4 pt-12">
              <h1
                className="text-4xl font-bold"
                style={{ color: profile.cor_primaria }}
              >
                {profile.nome}
              </h1>
              <SocialLinks profile={profile} className="justify-center" />
            </div>

            {/* Links */}
            {links && links.length > 0 && <LinkList links={links} />}

            {/* Products */}
            {products && products.length > 0 && (
              <ProductList products={products} />
            )}

            <CompanyInfo profile={profile} />

            {/* Footer */}
            <Footer />
          </div>
        </div>
      </div>
    );
  } catch (error) {
    console.error("Error loading company data:", error);
    notFound();
  }
}
