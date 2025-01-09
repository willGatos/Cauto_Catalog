export interface AttributeValue {
  types: { name: string };
  value: string;
}

export interface Attribute {
  id: string;
  name: string;
  values: Array<{ id: string; value: string }>;
}

export interface Variation {
  id: number;
  name: string;
  price: number;
  stock: number;
  enabled: boolean;
  pictures: string[];
  attribute_values: AttributeValue[];
}

export interface Product {
  id: number | string;
  name: string;
  description: string;
  category_id: number;
  created_at: string;
  shop_id: number;
  cost: number;
  discount: number;
  state: string;
  gender: string;
  commission: number;
  type: string;
  origin: string;
  commission_type: string;
  reference_currency: number;
  owner_id: string;
  sale_price: number | null;
  standard_price: number;
  status: number;
  tax: number | null;
  brand: string;
  stock: number;
  images: string[];
  product_variations: Variation[];
  attributes: any[]; // Added to satisfy TypeScript error
}

export interface ProductQuickViewProps {
  className?: string;
  id: string | number;
}

