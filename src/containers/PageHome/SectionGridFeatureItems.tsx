import React, { FC, useState, useEffect } from "react";
import HeaderFilterSection from "components/HeaderFilterSection";
import ProductCard from "components/ProductCard";
import ButtonPrimary from "shared/Button/ButtonPrimary";
import { Product } from "data/data";
import { productsService } from 'services/productsService'
//
export interface SectionGridFeatureItemsProps {
  data?: Product[];
}

const SectionGridFeatureItems: FC<SectionGridFeatureItemsProps> = ({
  data,
}) => {
  const [products, setProduct] = useState([]);
  useEffect(() => {
    productsService.getAllProducts().then(setProduct)
  },[]);
  return (
    <div className="nc-SectionGridFeatureItems relative">
      <HeaderFilterSection />
      <div
        className={`grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 grid-cols-2`}
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
