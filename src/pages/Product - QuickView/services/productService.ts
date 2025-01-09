import supabase from './baseService'
import { Product } from '../types/product'

export const getProductbyId = async (id: string | number): Promise<Product> => {
  try {
    const { data, error } = await supabase
      .from("products")
      .select(
        "*,product_variations(*, attribute_values(value, types: attributes(name)))"
      )
      .eq("id", id)
      .single()

    if (error) throw error

    return data as Product
  } catch (error) {
    console.error("Error fetching product:", error)
    throw error
  }
}

