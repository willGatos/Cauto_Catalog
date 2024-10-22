import baseService from "./baseService";

// Define a type for the filters
type ProductFilters = {
  category?: string;
  priceRange?: { min: number; max: number };
  // Add more filter criteria as needed
};

// Products Service
const productsService = {
  // Get one product by ID
  async getOneProduct(id: number) {
    try {
      const response = await baseService
        .from("products")
        .select("*")
        .eq("id", id)
        .single();
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  },

  // Get all products with optional filters
  async getAllProducts(filters?: ProductFilters) {
    try {
      let query = baseService
        .from("products")
        .select("*")
        .gt("status", 0);

      if (filters) {
        if (filters.category) {
          query = query.eq("category", filters.category);
        }
        if (filters.priceRange) {
          query = query
            .gte("price", filters.priceRange.min)
            .lte("price", filters.priceRange.max);
        }
        // Add more filter conditions as needed
      }

      const response = await query;
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  },

  // Get subcategories (assuming you have a subcategories table)
  async getCategories() {
    try {
      const response = await baseService.from("categories").select("*");
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  },

  // Get subcategories (assuming you have a subcategories table)
  async getAttributesAndValues() {
    try {
      const response = await baseService
        .from("attributes")
        .select("id, name, value:attribute_values(value)");
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  },
};

export { productsService };
