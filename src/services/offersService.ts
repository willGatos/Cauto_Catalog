import supabase from "./baseService";

// Offers Service (Combined)
const offersService = {
  // Get all offers with products and variations
  async getAllOffers(shopId) {
    const { data: offers, error } = await supabase
      .from("offers")
      .select(
        `
      id,
      name,
      description,
      start_date,
      end_date,
      products (
          id,
          name
        ),
        variations:offer_product_variations (
          id,
          variation:product_variations (
            id,
            name
          ),
          offer_price,
          currency:currency (
            name,
            exchange_rate
          )
        )
      )
    `
      )
      .order("start_date", { ascending: false })
      .eq("shop_id", shopId);
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
            variations:product_variation_id (*)
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
  }, // Get offer products by offer ID
  async getOffersByOfferId(offerId: number) {
    const { data: offerProducts, error } = await supabase
      .from("offers")
      .select("*")
      .eq("id", offerId)
      .single();

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
