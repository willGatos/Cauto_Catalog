import supabase from "./baseService";

// Offers Service (Combined)
const offersService = {
  // Get all offers with products and variations
  async getAllOffers() {
    const { data: offers, error } = await supabase.from("offers").select(`
        *,
        offer_products (
          *,
          products:product_id (*),
          offer_product_variations (
            *,
            product_variations:product_variation_id (*)
          )
        )
      `);

    if (error) {
      throw error;
    }

    return offers;
  },

  // Get offer by ID with products and variations
  async getOfferById(id: number) {
    const { data: offer, error } = await supabase
      .from("offers")
      .select(
        `
        *,
        offer_products (
          *,
          products:product_id (*),
          offer_product_variations (
            *,
            product_variations:product_variation_id (*)
          )
        )
      `
      )
      .eq("id", id)
      .single();

    if (error) {
      throw error;
    }

    return offer;
  },

  // Create a new offer
  async createOffer(offer: {
    name: string;
    description?: string;
    startDate: Date;
    endDate: Date;
    shopId?: number;
    image?: string[];
    generalOfferPrice?: number;
  }) {
    const { data: newOffer, error } = await supabase
      .from("offers")
      .insert([offer])
      .single();

    if (error) {
      throw error;
    }

    return newOffer;
  },

  // Update an existing offer
  async updateOffer(
    id: number,
    offer: {
      name?: string;
      description?: string;
      startDate?: Date;
      endDate?: Date;
      shopId?: number;
      image?: string[];
      generalOfferPrice?: number;
    }
  ) {
    const { data: updatedOffer, error } = await supabase
      .from("offers")
      .update(offer)
      .eq("id", id)
      .single();

    if (error) {
      throw error;
    }

    return updatedOffer;
  },

  // Delete an offer
  async deleteOffer(id: number) {
    const { error } = await supabase.from("offers").delete().eq("id", id);

    if (error) {
      throw error;
    }
  },

  // Add a product to an offer
  async addProductToOffer(offerProduct: {
    offerId: number;
    productId: number;
    offerPrice?: number;
    currencyId?: number;
  }) {
    const { data: newOfferProduct, error } = await supabase
      .from("offer_products")
      .insert([offerProduct])
      .single();

    if (error) {
      throw error;
    }

    return newOfferProduct;
  },

  // Update offer product
  async updateOfferProduct(
    id: number,
    offerProduct: {
      offerId?: number;
      productId?: number;
      offerPrice?: number;
      currencyId?: number;
    }
  ) {
    const { data: updatedOfferProduct, error } = await supabase
      .from("offer_products")
      .update(offerProduct)
      .eq("id", id)
      .single();

    if (error) {
      throw error;
    }

    return updatedOfferProduct;
  },

  // Remove a product from an offer
  async removeProductFromOffer(id: number) {
    const { error } = await supabase
      .from("offer_products")
      .delete()
      .eq("id", id);

    if (error) {
      throw error;
    }
  },

  // Get offer products by offer ID
  async getOfferProductsByOfferId(offerId: number) {
    const { data: offerProducts, error } = await supabase
      .from("offer_products")
      .select("*")
      .eq("offer_id", offerId);

    if (error) {
      throw error;
    }

    return offerProducts;
  },

  // Get offer product variations by offer product ID
  async getOfferProductVariationsByOfferProductId(offerProductId: number) {
    const { data: offerProductVariations, error } = await supabase
      .from("offer_product_variations")
      .select("*")
      .eq("offer_product_id", offerProductId);

    if (error) {
      throw error;
    }

    return offerProductVariations;
  },
};

export { offersService };
