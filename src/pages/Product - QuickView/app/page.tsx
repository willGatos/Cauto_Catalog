import { Suspense } from "react";
import ProductCatalog from "../components/ProductCatalog";
import { getProductbyId } from "../services/productService";
import { Product } from "../types/product";

async function fetchProduct(): Promise<Product> {
  return await getProductbyId(92);
}

export default async function CatalogPage() {
  const product = await fetchProduct();

  return (
    <div className="container mx-auto py-8">
      <Suspense fallback={<div>Cargando...</div>}>
        {/*@ts-ignore*/}
        <ProductCatalog products={[product]} />
      </Suspense>
    </div>
  );
}
