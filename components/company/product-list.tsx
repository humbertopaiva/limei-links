"use client";

import { Product } from "@/lib/api";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { ChevronRight } from "lucide-react";
import { useRef, useEffect } from "react";
import { cn } from "@/lib/utils";

interface ProductListProps {
  products: Product[];
}

export function ProductList({ products }: ProductListProps) {
  if (products.length === 0) return null;

  return (
    <Card className="bg-white/95 backdrop-blur-sm shadow-xl">
      <CardHeader className="flex flex-row items-center justify-between px-8">
        <CardTitle className="text-xl font-bold flex items-center gap-2">
          Destaques
          <Badge variant="secondary" className="text-xs ml-2">
            {products.length} items
          </Badge>
        </CardTitle>
      </CardHeader>

      <CardContent className="relative px-8">
        <div className="relative after:absolute after:pointer-events-none after:inset-y-0 after:right-[-8px] after:w-16 after:bg-gradient-to-l after:from-white/60 after:via-white/30 after:to-transparent">
          <div className="overflow-x-auto pb-4 -mx-2 px-2 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent hover:scrollbar-thumb-gray-400 transition-colors">
            <div className="flex gap-6 min-w-max pb-4">
              {products.map((product) => (
                <ProductCard key={product.produto.nome} product={product} />
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

interface ProductCardProps {
  product: Product;
}

function ProductCard({ product }: ProductCardProps) {
  return (
    <div className="group relative flex-none w-[280px] rounded-xl overflow-hidden bg-white hover:shadow-xl transition-all duration-300">
      <div className="relative aspect-square w-full overflow-hidden bg-gray-100/10">
        {product.produto.imagem ? (
          <Image
            src={product.produto.imagem}
            alt={product.produto.nome}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-110"
          />
        ) : (
          <div className="flex h-full items-center justify-center bg-gray-100">
            <span className="text-2xl font-bold text-gray-400">
              {product.produto.nome.charAt(0)}
            </span>
          </div>
        )}
        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 to-transparent p-4 pt-20">
          <Badge className="bg-white/90 text-black hover:bg-white">
            R$ {product.produto.preco}
          </Badge>
        </div>
      </div>

      <div className="p-4">
        <h3 className="text-lg font-semibold line-clamp-1 mb-2">
          {product.produto.nome}
        </h3>

        {product.produto.descricao && (
          <p className="text-sm text-muted-foreground line-clamp-2">
            {product.produto.descricao}
          </p>
        )}
      </div>

      <div
        className={cn(
          "absolute right-4 top-4 opacity-0 transform translate-x-4",
          "transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0"
        )}
      >
        <Badge
          variant="secondary"
          className="backdrop-blur-sm bg-black/50 text-white"
        >
          Ver mais <ChevronRight className="w-4 h-4 ml-1" />
        </Badge>
      </div>
    </div>
  );
}
