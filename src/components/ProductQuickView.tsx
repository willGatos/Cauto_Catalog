import {
  ClockIcon,
  NoSymbolIcon,
  SparklesIcon,
} from "@heroicons/react/24/outline";
import BagIcon from "components/BagIcon";
import IconDiscount from "components/IconDiscount";
import Prices from "components/Prices";
import AccordionInfo from "containers/ProductDetailPage/AccordionInfo";
import { PRODUCTS } from "data/data";
import detail1JPG from "images/products/detail1.jpg";
import detail2JPG from "images/products/detail2.jpg";
import detail3JPG from "images/products/detail3.jpg";
import React, { FC, useEffect, useState } from "react";
import toast from "react-hot-toast";
import supabase from "services/baseService";
import ButtonPrimary from "shared/Button/ButtonPrimary";
import NotifyAddTocart from "./NotifyAddTocart";
// Types.ts
interface AttributeValue {
  types: { name: string };
  value: string;
}

interface Variation {
  id: number;
  name: string;
  price: number;
  stock: number;
  pictures: string[];
  attribute_values: AttributeValue[];
}

const variationsData: Variation[] = [
  {
    id: 1,
    name: "Camiseta Roja - Talla M",
    price: 19.99,
    stock: 50,
    pictures: [
      "/placeholder.svg?height=150&width=150",
      "/placeholder.svg?height=150&width=150",
    ],
    attribute_values: [
      { types: { name: "Color" }, value: "Rojo" },
      { types: { name: "Talla" }, value: "M" },
    ],
  },
  {
    id: 2,
    name: "Camiseta Azul - Talla L",
    price: 21.99,
    stock: 30,
    pictures: [
      "/placeholder.svg?height=150&width=150",
      "/placeholder.svg?height=150&width=150",
      "/placeholder.svg?height=150&width=150",
    ],
    attribute_values: [
      { types: { name: "Color" }, value: "Azul" },
      { types: { name: "Talla" }, value: "L" },
    ],
  },
  {
    id: 3,
    name: "Camiseta Verde - Talla S",
    price: 18.99,
    stock: 40,
    pictures: ["/placeholder.svg?height=150&width=150"],
    attribute_values: [
      { types: { name: "Color" }, value: "Verde" },
      { types: { name: "Talla" }, value: "S" },
    ],
  },
];
export interface Product {
  id: number;
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
  product_variations: ProductVariation[];
}

export interface ProductVariation {
  id: number;
  name: string;
  price: number;
  stock: number;
  pictures: string[];
  attribute_values: AttributeValue[];
}

// Interfaces for component props
export interface ProductDetailsProps {
  productId: string;
}

export interface ProductVariationItemProps {
  variation: ProductVariation;
}

export const initialValues = {
  id: 0,
  name: "",
  description: "",
  category_id: 0,
  created_at: "",
  shop_id: 0,
  cost: 0,
  discount: 0,
  state: "",
  gender: "",
  commission: 0,
  type: "",
  origin: "",
  commission_type: "",
  reference_currency: 0,
  owner_id: "",
  sale_price: null,
  standard_price: 0,
  status: 0,
  tax: null,
  brand: "",
  stock: 0,
  images: [],
  product_variations: variationsData,
  variations: [] as ProductVariation[],
  loading: true,
  error: null as string | null,
};

export const getProductbyId = async (id) => {
  try {
    const { data, error } = await supabase
      .from("products")
      .select(
        "*,product_variations(*, attribute_values(value, types: attributes(name)))"
      ) //
      .eq("id", id)
      .single();

    if (error) throw error;

    return data;
  } catch (error) {
    console.error("Error fetching tables:", error);
    throw error;
  }
};
export interface ProductQuickViewProps {
  className?: string;
  id: string | number;
}

const ProductQuickView: FC<ProductQuickViewProps> = ({
  className = "",
  id = "1",
}) => {
  const { sizes, variants, status, allOfSizes } = PRODUCTS[0];
  const LIST_IMAGES_DEMO = [detail1JPG, detail2JPG, detail3JPG];
  const [product, setProduct] = useState(initialValues);
  const [variantActive, setVariantActive] = React.useState(0);
  const [sizeSelected, setSizeSelected] = React.useState(sizes ? sizes[0] : "");
  const [qualitySelected, setQualitySelected] = React.useState(1);

  useEffect(() => {
    getProductbyId(id).then((prod) => {
      console.log("SOL", prod);
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
      }));
      prod.product_variations = variations;
      setProduct(prod);
    });
  }, []);
  const notifyAddTocart = () => {
    toast.custom(
      (t) => (
        <NotifyAddTocart
          productImage={LIST_IMAGES_DEMO[0]}
          qualitySelected={qualitySelected}
          show={t.visible}
          sizeSelected={sizeSelected}
          variantActive={variantActive}
        />
      ),
      { position: "top-right", id: "nc-product-notify", duration: 3000 }
    );
  };

  const variations = (variationsData) => {
    if (!variationsData || variationsData.length === 0) {
      return <div>No variations available</div>;
    }
    return (
      <div className="container mx-auto p-4">
        <h2 className="text-2xl font-bold mb-6">Variaciones del Producto</h2>
        <div className="space-y-8">
          {variationsData.map((variation) => {
            const attribute_values = variation.attribute_values
              ? variation.attribute_values
              : [];
            console.log("s", variation);
            const pictures = variation.pictures;

            return (
              <div key={variation.id} className="border-b pb-8">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-4">
                    <h3 className="text-xl font-semibold">{variation.name}</h3>
                    <div className="bg-primary text-primary-foreground p-2 text-lg font-bold">
                      ${variation.price.toFixed(2)}
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {/* {attribute_values.map((attr, index) => (
                    <label key={index}>
                      {attr.types.name}: {attr.value}
                    </label>
                  ))} */}
                  </div>
                </div>
                <div className="flex flex-wrap gap-4">
                  {pictures?.map((pic, index) => (
                    <img
                      key={index}
                      src={pic}
                      alt={`${variation.name} - Imagen ${index + 1}`}
                      width={150}
                      height={150}
                      className="rounded-md object-cover"
                    />
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  const renderStatus = () => {
    if (!status) {
      return null;
    }
    const CLASSES =
      "absolute top-3 left-3 px-2.5 py-1.5 text-xs bg-white dark:bg-slate-900 nc-shadow-lg rounded-full flex items-center justify-center text-slate-700 text-slate-900 dark:text-slate-300";
    if (status === "New in") {
      return (
        <div className={CLASSES}>
          <SparklesIcon className="w-3.5 h-3.5" />
          <span className="ml-1 leading-none">{status}</span>
        </div>
      );
    }
    if (status === "50% Discount") {
      return (
        <div className={CLASSES}>
          <IconDiscount className="w-3.5 h-3.5" />
          <span className="ml-1 leading-none">{status}</span>
        </div>
      );
    }
    if (status === "Sold Out") {
      return (
        <div className={CLASSES}>
          <NoSymbolIcon className="w-3.5 h-3.5" />
          <span className="ml-1 leading-none">{status}</span>
        </div>
      );
    }
    if (status === "limited edition") {
      return (
        <div className={CLASSES}>
          <ClockIcon className="w-3.5 h-3.5" />
          <span className="ml-1 leading-none">{status}</span>
        </div>
      );
    }
    return null;
  };

  const renderSectionContent = (price) => {
    return (
      <div className="space-y-8">
        {/* ---------- 1 HEADING ----------  */}
        <div>
          <h2 className="text-2xl font-semibold hover:text-primary-6000 transition-colors">
            {product.name}
          </h2>

          <div className="flex items-center mt-5 space-x-4 sm:space-x-5">
            {/* <div className="flex text-xl font-semibold">$112.00</div> */}
            <Prices
              contentClass="py-1 px-2 md:py-1.5 md:px-3 text-lg font-semibold"
              price={price}
            />

            {/* <div className="h-6 border-l border-slate-300 dark:border-slate-700"></div>

            <div className="flex items-center">
              <Link
                to="/product-detail"
                className="flex items-center text-sm font-medium"
              >
                <StarIcon className="w-5 h-5 pb-[1px] text-yellow-400" />
                <div className="ml-1.5 flex">
                  <span>4.9</span>
                  <span className="block mx-2">·</span>
                  <span className="text-slate-600 dark:text-slate-400 underline">
                    142 reviews
                  </span>
                </div>
              </Link>
              <span className="hidden sm:block mx-2.5">·</span>
              <div className="hidden sm:flex items-center text-sm">
                <SparklesIcon className="w-3.5 h-3.5" />
                <span className="ml-1 leading-none">{status}</span>
              </div>
            </div> */}
          </div>
        </div>

        {/*  ---------- 4  QTY AND ADD TO CART BUTTON */}
        <div className="flex space-x-3.5">
          <ButtonPrimary
            className="flex-1 flex-shrink-0"
            onClick={notifyAddTocart}
          >
            <BagIcon className="hidden sm:inline-block w-5 h-5 mb-0.5" />
            <span className="ml-3">Descargar Imagen</span>
          </ButtonPrimary>
        </div>

        {/*  */}
        <hr className=" border-slate-200 dark:border-slate-700"></hr>
        {/*  */}

        {/* ---------- 5 ----------  */}
        <AccordionInfo
          data={[
            {
              name: "Descripcion",
              content: product.description,
            },
          ]}
        />
      </div>
    );
  };

  return (
    <div className={`nc-ProductQuickView ${className}`}>
      {/* MAIn */}
      <div className="lg:flex">
        {/* CONTENT */}
        <div className="w-full lg:w-[50%] ">
          {/* HEADING */}
          <div className="lg:grid grid-cols-2 gap-3 mt-3 sm:gap-6 sm:mt-6 xl:gap-5 xl:mt-5">
            {product.images.map((item, index) => {
              return (
                <div key={index} className="">
                  <img
                    src={item}
                    className="w-full rounded-xl object-cover"
                    alt="product detail 1"
                  />
                </div>
              );
            })}
          </div>
        </div>

        {/* SIDEBAR */}
        <div className="w-full lg:w-[50%] pt-6 lg:pt-0 lg:pl-7 xl:pl-8">
          {renderSectionContent(product.standard_price)}
        </div>

        {product.product_variations.length > 0 &&
          variations(product.product_variations)}
      </div>
    </div>
  );
};

export default ProductQuickView;
