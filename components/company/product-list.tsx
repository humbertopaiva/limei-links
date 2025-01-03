import { Product } from "@/lib/api";
import { ProductCard } from "@/components/product-card";

interface ProductListProps {
  products: Product[];
}

export function ProductList({ products }: ProductListProps) {
  if (products.length === 0) return null;

  return (
    <div>
      <h2 className="text-2xl font-bold text-white mb-4">Produtos</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <ProductCard key={product.produto.nome} product={product} />
        ))}
      </div>
    </div>
  );
}