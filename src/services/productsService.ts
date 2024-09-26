import baseService from "./baseService";

export function getStoreName() {
    const path = window.location.pathname; // This will give you "/nameOfTheStore/p"
    // Split the path by '/' to get an array of segments
    const segments = path.split('/');
    // The store name is the second segment (index 1)
    const nameOfTheStore = segments[1];
    return nameOfTheStore;
}

const getOneProduct = async (id: number) => {
    try {
       const response = await baseService.get(`products/${id}`);
       return response.data;
    } catch (error) {
       console.error(error);
       throw error;
    }
};
// Define a type for the filters
type ProductFilters = {
    category?: string;
    priceRange?: { min: number; max: number };
    // Add more filter criteria as needed
};
   
const getAllProducts = async (filters?: ProductFilters) => {
 try {
    if (filters) {
      const params = new URLSearchParams();
      if (filters.category) {
        params.append('category', filters.category);
      }
      if (filters.priceRange) {
        params.append('minPrice', filters.priceRange.min.toString());
        params.append('maxPrice', filters.priceRange.max.toString());
      }
    }
    const storeName = getStoreName()
    const response = await baseService.get(`${storeName}/productsFiltered`);
    return response.data;
 } catch (error) {
    console.error(error);
    throw error;
 }
};

const getSubcategories = async () => {
 try {
    const storeName = getStoreName()

    const response = await baseService.get(`${storeName}/subcategories`);
    return response.data;
 } catch (error) {
    console.error(error);
    throw error;
 }
};

export { getOneProduct, getAllProducts, getSubcategories };