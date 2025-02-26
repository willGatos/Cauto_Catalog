import React, { FC } from "react";

export interface PricesProps {
  className?: string;
  price?: number;
  contentClass?: string;
}

const Prices: FC<PricesProps> = ({
  className = "",
  price = 0,
  contentClass = "",
}) => {
  return (
    price != 0 && (
      <div
        className={`flex items-center border-2 border-green-500 rounded-lg py-1 px-2 md:py-1.5 md:px-2.5 text-sm font-medium`}
      >
        <span className="text-green-500">${price}</span>
      </div>
    )
  );
};

export default Prices;
