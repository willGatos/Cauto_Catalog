export interface Category {
    id: number;
    name: string;
    description: string | null;
    created_at: string;
    parent_id: number | null;
    shop_id: number | null;
    cover: string;
  }
  
  export interface Product {
    id: number;
    name: string;
    description: string | null;
    created_at: string;
    shop_id: number;
    cost: number;
    discount: number;
    state: string;
    gender: string | null;
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
    brand: string | null;
    stock: number | null;
    images: string[];
    categories: { id: number }[];
  }
  
  export const categories: Category[] = [
    {
      "id": 11,
      "name": "Another Son",
      "description": "Infer",
      "created_at": "2024-11-29T19:01:31.69694+00:00",
      "parent_id": 10,
      "shop_id": 6,
      "cover": "https://res.cloudinary.com/dd6mge7ez/image/upload/v1732028250/cbtqjospqi7n97w8nwtz.jpg"
    },
    {
      "id": 8,
      "name": "Personalización de Artículos",
      "description": "Personalización de pullovers, losas, jarras de cerámica, jarras térmicas, llaveros, bolsas, gorras, etc.",
      "created_at": "2024-11-19T06:31:06.413103+00:00",
      "parent_id": null,
      "shop_id": 8,
      "cover": "https://res.cloudinary.com/dd6mge7ez/image/upload/v1732028250/cbtqjospqi7n97w8nwtz.jpg"
    },
    {
      id: 1,
      name: "Ropa de Mujer",
      description: "Toda la ropa para mujer",
      created_at: "2024-11-29T00:00:00Z",
      parent_id: null,
      shop_id: 1,
      cover: "https://res.cloudinary.com/dd6mge7ez/image/upload/v1732028250/cbtqjospqi7n97w8nwtz.jpg"
    },
    {
      id: 2,
      name: "Tops & Blusas",
      description: "Tops y blusas para mujer",
      created_at: "2024-11-29T00:00:00Z",
      parent_id: 1,
      shop_id: 1,
      cover: "/placeholder.svg?height=100&width=100"
    },
    {
      id: 3,
      name: "Vestidos de mujer",
      description: "Vestidos para toda ocasión",
      created_at: "2024-11-29T00:00:00Z",
      parent_id: 1,
      shop_id: 1,
      cover: "/placeholder.svg?height=100&width=100"
    },
    {
      id: 4,
      name: "Bottoms de Mujer",
      description: "Pantalones y faldas",
      created_at: "2024-11-29T00:00:00Z",
      parent_id: 1,
      shop_id: 1,
      cover: "/placeholder.svg?height=100&width=100"
    },
    {
      id: 5,
      name: "Tejido de Punto",
      description: "Sweaters y tejidos",
      created_at: "2024-11-29T00:00:00Z",
      parent_id: 1,
      shop_id: 1,
      cover: "/placeholder.svg?height=100&width=100"
    },
    {
      id: 6,
      name: "Mezclilla para mujer",
      description: "Jeans y ropa de mezclilla",
      created_at: "2024-11-29T00:00:00Z",
      parent_id: 1,
      shop_id: 1,
      cover: "/placeholder.svg?height=100&width=100"
    },
    {
      id: 7,
      name: "Blusas Casuales",
      description: "Blusas para el día a día",
      created_at: "2024-11-29T00:00:00Z",
      parent_id: 2,
      shop_id: 1,
      cover: "/placeholder.svg?height=100&width=100"
    },
    {
      id: 8,
      name: "Tops Deportivos",
      description: "Tops para ejercicio",
      created_at: "2024-11-29T00:00:00Z",
      parent_id: 2,
      shop_id: 1,
      cover: "/placeholder.svg?height=100&width=100"
    },
    {
      id: 9,
      name: "Vestidos Casuales",
      description: "Vestidos para el día",
      created_at: "2024-11-29T00:00:00Z",
      parent_id: 3,
      shop_id: 1,
      cover: "/placeholder.svg?height=100&width=100"
    },
    {
      id: 10,
      name: "Vestidos de Fiesta",
      description: "Vestidos para ocasiones especiales",
      created_at: "2024-11-29T00:00:00Z",
      parent_id: 3,
      shop_id: 1,
      cover: "/placeholder.svg?height=100&width=100"
    },
    {
      id: 11,
      name: "Pantalones",
      description: "Pantalones para mujer",
      created_at: "2024-11-29T00:00:00Z",
      parent_id: 4,
      shop_id: 1,
      cover: "/placeholder.svg?height=100&width=100"
    },
    {
      id: 12,
      name: "Faldas",
      description: "Faldas para mujer",
      created_at: "2024-11-29T00:00:00Z",
      parent_id: 4,
      shop_id: 1,
      cover: "/placeholder.svg?height=100&width=100"
    }
  ];
  
  export const products: Product[] = [
    {
      "id": 39,
      "name": "William",
      "description": "<p>D</p>",
      "created_at": "2024-12-01T22:57:39.973717+00:00",
      "shop_id": 6,
      "cost": 10.00,
      "discount": 0.00,
      "state": "available",
      "gender": null,
      "commission": 10.00,
      "type": "simple",
      "origin": "imported",
      "commission_type": "percentage",
      "reference_currency": 1,
      "owner_id": "b554da40-5f52-4cd3-b1d2-83ecee853ee6",
      "sale_price": null,
      "standard_price": 10.00,
      "status": 0,
      "tax": null,
      "brand": null,
      "stock": null,
      "images": [],
      "categories": [
        {
          "id": 8
        },
        {
          "id": 12
        },
        {
          "id": 13
        }
      ]
    },
    {
      id: 1,
      name: "Blusa Floral",
      description: "Blusa con estampado floral",
      created_at: "2024-11-29T00:00:00Z",
      shop_id: 1,
      cost: 10,
      discount: 0,
      state: "available",
      gender: null,
      commission: 10,
      type: "simple",
      origin: "imported",
      commission_type: "percentage",
      reference_currency: 1,
      owner_id: "owner1",
      sale_price: null,
      standard_price: 29.99,
      status: 0,
      tax: null,
      brand: null,
      stock: null,
      images: [],
      categories: [
          {id: 1},
          {id: 2},
          {id: 7}
      ]
    },
    {
      id: 2,
      name: "Vestido de Noche",
      description: "Elegante vestido de noche",
      created_at: "2024-11-29T00:00:00Z",
      shop_id: 1,
      cost: 10,
      discount: 0,
      state: "available",
      gender: null,
      commission: 10,
      type: "simple",
      origin: "imported",
      commission_type: "percentage",
      reference_currency: 1,
      owner_id: "owner2",
      sale_price: null,
      standard_price: 89.99,
      status: 0,
      tax: null,
      brand: null,
      stock: null,
      images: [],
      categories: [
          {id: 1},
          {id: 3},
          {id: 10}
      ]
    },
    {
      id: 3,
      name: "Jeans Skinny",
      description: "Jeans ajustados de mezclilla",
      created_at: "2024-11-29T00:00:00Z",
      shop_id: 1,
      cost: 10,
      discount: 0,
      state: "available",
      gender: null,
      commission: 10,
      type: "simple",
      origin: "imported",
      commission_type: "percentage",
      reference_currency: 1,
      owner_id: "owner3",
      sale_price: null,
      standard_price: 49.99,
      status: 0,
      tax: null,
      brand: null,
      stock: null,
      images: [],
      categories: [
          {id: 1},
          {id: 4},
          {id: 6},
          {id: 11}
      ]
    },
    {
      id: 4,
      name: "Top Deportivo",
      description: "Top para hacer ejercicio",
      created_at: "2024-11-29T00:00:00Z",
      shop_id: 1,
      cost: 10,
      discount: 0,
      state: "available",
      gender: null,
      commission: 10,
      type: "simple",
      origin: "imported",
      commission_type: "percentage",
      reference_currency: 1,
      owner_id: "owner4",
      sale_price: null,
      standard_price: 24.99,
      status: 0,
      tax: null,
      brand: null,
      stock: null,
      images: [],
      categories: [
          {id: 1},
          {id: 2},
          {id: 8}
      ]
    },
    {
      id: 5,
      name: "Falda Plisada",
      description: "Falda plisada elegante",
      created_at: "2024-11-29T00:00:00Z",
      shop_id: 1,
      cost: 10,
      discount: 0,
      state: "available",
      gender: null,
      commission: 10,
      type: "simple",
      origin: "imported",
      commission_type: "percentage",
      reference_currency: 1,
      owner_id: "owner5",
      sale_price: null,
      standard_price: 39.99,
      status: 0,
      tax: null,
      brand: null,
      stock: null,
      images: [],
      categories: [
          {id: 1},
          {id: 4},
          {id: 12}
      ]
    },
    {
      id: 6,
      name: "Suéter de Punto",
      description: "Suéter cálido de punto",
      created_at: "2024-11-29T00:00:00Z",
      shop_id: 1,
      cost: 10,
      discount: 0,
      state: "available",
      gender: null,
      commission: 10,
      type: "simple",
      origin: "imported",
      commission_type: "percentage",
      reference_currency: 1,
      owner_id: "owner6",
      sale_price: null,
      standard_price: 59.99,
      status: 0,
      tax: null,
      brand: null,
      stock: null,
      images: [],
      categories: [
          {id: 1},
          {id: 5}
      ]
    },
    {
      id: 7,
      name: "Vestido Casual",
      description: "Vestido casual para el día",
      created_at: "2024-11-29T00:00:00Z",
      shop_id: 1,
      cost: 10,
      discount: 0,
      state: "available",
      gender: null,
      commission: 10,
      type: "simple",
      origin: "imported",
      commission_type: "percentage",
      reference_currency: 1,
      owner_id: "owner7",
      sale_price: null,
      standard_price: 44.99,
      status: 0,
      tax: null,
      brand: null,
      stock: null,
      images: [],
      categories: [
          {id: 1},
          {id: 3},
          {id: 9}
      ]
    },
    {
      id: 8,
      name: "Blusa de Seda",
      description: "Blusa elegante de seda",
      created_at: "2024-11-29T00:00:00Z",
      shop_id: 1,
      cost: 10,
      discount: 0,
      state: "available",
      gender: null,
      commission: 10,
      type: "simple",
      origin: "imported",
      commission_type: "percentage",
      reference_currency: 1,
      owner_id: "owner8",
      sale_price: null,
      standard_price: 69.99,
      status: 0,
      tax: null,
      brand: null,
      stock: null,
      images: [],
      categories: [
          {id: 1},
          {id: 2},
          {id: 7}
      ]
    }
  ];
  