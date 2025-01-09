import { FC, useEffect, useState } from "react"
import { Product } from '../types/product'
import { getProductbyId } from '../services/productService'
import { ProductCard } from './ProductCard'
import Loading from '../app/loading'

interface ProductCatalogProps {
  className?: string;
  id?: string;
}

const ProductCatalog: FC<ProductCatalogProps> = ({
  className = "",
  id = "93",
}) => {
  const [product, setProduct] = useState<Product | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    setLoading(true)
    getProductbyId(id)
      .then((prod) => {
        const variations = prod.product_variations.map((variation: any) => ({
          id: variation.id,
          name: variation.name,
          price: variation.price,
          stock: variation.stock,
          pictures: variation.pictures,
          attribute_values: variation.attribute_values.map((attr: any) => ({
            types: { name: attr.types.name },
            value: attr.value,
          })),
          enabled: variation.enabled
        }))
        setProduct({
          ...prod,
          product_variations: variations,
          images: prod.images || [],
          attributes: Array.from(
            new Set(
              variations.flatMap((v) => 
                v.attribute_values.map((av) => av.types.name)
              )
            )
          ).map((attrName) => ({
            id: attrName,
            name: attrName,
            values: Array.from(
              new Set(
                variations.flatMap((v) =>
                  v.attribute_values
                    .filter((av) => av.types.name === attrName)
                    .map((av) => ({ id: av.value, value: av.value }))
                )
              )
            ),
          })),
        })
      })
      .catch((err) => {
        console.error("Error fetching product:", err)
        if (err.message === "JSON object requested, multiple (or no) rows returned") {
          setError("Lo sentimos, no se pudo encontrar el producto solicitado.")
        } else {
          setError("Ocurrió un error al cargar el producto. Por favor, inténtalo de nuevo más tarde.")
        }
      })
      .finally(() => {
        setLoading(false)
      })
  }, [id])

  if (loading) {
    return <Loading />
  }

  if (error) {
    return (
      <div className="w-full max-w-4xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden p-6">
        <h2 className="text-2xl font-bold mb-4 text-red-600">Error</h2>
        <p className="text-gray-700">{error}</p>
      </div>
    )
  }

  return product ? <ProductCard product={product} /> : null
}

export default ProductCatalog

