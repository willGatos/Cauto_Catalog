import React, { FC, useState, useEffect } from "react";
import HeaderFilterSection from "components/HeaderFilterSection";
import ProductCard from "components/ProductCard";
import ButtonPrimary from "shared/Button/ButtonPrimary";
import { Product } from "data/data";
import { productsService } from "services/productsService";
//
export interface SectionGridFeatureItemsProps {
  shopId;
  product?: Product[];
}

const SectionGridFeatureItems: FC<SectionGridFeatureItemsProps> = ({
  shopId,
  product,
}) => {
  const [products, setProduct] = useState([]);
  useEffect(() => {
    productsService.getAllProducts(shopId).then(setProduct);
  }, []);
  return (
    <div className="nc-SectionGridFeatureItems relative">
      <HeaderFilterSection shopId={shopId} />
      <div
        className={`grid gap-4 m-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 grid-cols-2`}
      >
        {products.map((item, index) => (
          <ProductCard data={item} key={index} />
        ))}
      </div>
      {/* <div className="flex mt-16 justify-center items-center">
        <ButtonPrimary loading>Show me more</ButtonPrimary>
      </div> */}
    </div>
  );
};

export default SectionGridFeatureItems;
