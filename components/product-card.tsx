import { Product } from "@/lib/api";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  return (
    <Card className="overflow-hidden group hover:shadow-lg transition-shadow">
      {product.produto.imagem && (
        <div className="relative h-48 overflow-hidden">
          <Image
            src={product.produto.imagem}
            alt={product.produto.nome}
            fill
            className="object-cover group-hover:scale-105 transition-transform"
          />
        </div>
      )}
      <CardHeader>
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg">{product.produto.nome}</CardTitle>
          <Badge variant="secondary">R$ {product.produto.preco}</Badge>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground line-clamp-2">
          {product.produto.descricao}
        </p>
      </CardContent>
    </Card>
  );
}