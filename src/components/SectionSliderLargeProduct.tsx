import Glide from "@glidejs/glide";
import Heading from "components/Heading/Heading";
import React, { FC, useEffect, useId, useState } from "react";
import { Link } from "react-router-dom";
import { offersService } from "services/offersService";
import CollectionCard2 from "./CollectionCard2";
import ModalQuickView from "./OffersComponents/ModalQuickView";
import { DEMO_LARGE_PRODUCTS } from "./SectionSliderLargeProduct2";
export interface SectionSliderLargeProductProps {
  className?: string;
  itemClassName?: string;
  cardStyle?: "style1" | "style2";
  shopId;
}
export const fetchOffers = async (shopId) => {
  try {
    const offers = await offersService.getAllOffers(shopId);
    return offers;
  } catch (error) {
    console.error("Error fetching offers:", error);
    return []; // Or handle the error appropriately
  }
};
export interface OfferWithImages
  extends Omit<(typeof DEMO_LARGE_PRODUCTS)[0], "images"> {
  images: string[];
  description: string;
}
const SectionSliderLargeProduct: FC<SectionSliderLargeProductProps> = ({
  className = "",
  cardStyle = "style2",
  shopId,
}) => {
  const [offers, setOffers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModalQuickView, setShowModalQuickView] = React.useState(false);
  const [offersSelected, setOffersSelected] = useState("");
  const id = useId();
  const UNIQUE_CLASS = "glidejs" + id.replace(/:/g, "_");

  useEffect(() => {
    // @ts-ignoreconst [offers, setOffers] = useState<Offer[]>([]);

    const OPTIONS: Glide.Options = {
      perView: 3,
      gap: 32,
      bound: true,
      breakpoints: {
        1280: {
          gap: 28,
          perView: 2.5,
        },
        1024: {
          gap: 20,
          perView: 2.15,
        },
        768: {
          gap: 20,
          perView: 1.5,
        },

        500: {
          gap: 20,
          perView: 1,
        },
      },
    };

    let slider = new Glide(`.${UNIQUE_CLASS}`, OPTIONS);
    fetchOffers(shopId)
      .then(setOffers)
      .then(() => slider.mount());

    return () => {
      slider.destroy();
    };
  }, [UNIQUE_CLASS]);

  return (
    <>
      <div className={`nc-SectionSliderLargeProduct ${className} my-20`}>
        <div className={`${UNIQUE_CLASS} flow-root`}>
          <Heading isCenter={false} hasNextPrev>
            Nuestras Mejores Ofertas
          </Heading>
          <div className="glide__track" data-glide-el="track">
            <ul className="glide__slides">
              {offers.map((offer, index) => (
                <li className={`glide__slide`} key={index}>
                  <div
                    onClick={() => {
                      setOffersSelected(offer.id.toString());
                      setShowModalQuickView(true);
                    }}
                  >
                    <CollectionCard2
                      name={offer.name}
                      price={offer.price}
                      imgs={offer.images}
                      description={offer.desc}
                      id={offer.id}
                    />
                  </div>
                </li>
              ))}

              <li className={`glide__slide   `}>
                <Link to={"/page-search"} className="block relative group">
                  <div className="relative rounded-2xl overflow-hidden h-[410px]">
                    <div className="h-[410px] bg-black/5 dark:bg-neutral-800"></div>
                    <div className="absolute inset-y-6 inset-x-10  flex flex-col items-center justify-center">
                      <div className="flex items-center justify-center relative">
                        <span className="text-xl font-semibold">
                          Más Artículos
                        </span>
                        <svg
                          className="absolute left-full w-5 h-5 ml-2 rotate-45 group-hover:scale-110 transition-transform"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M18.0701 9.57L12.0001 3.5L5.93005 9.57"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeMiterlimit="10"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M12 20.4999V3.66992"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeMiterlimit="10"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </div>
                      <span className="text-sm mt-1">Enseñame Más</span>
                    </div>
                  </div>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <ModalQuickView
        id={offersSelected}
        show={showModalQuickView}
        onCloseModalQuickView={() => setShowModalQuickView(false)}
      />
    </>
  );
};

export default SectionSliderLargeProduct;
