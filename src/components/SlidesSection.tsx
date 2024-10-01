import React, { FC, useEffect, useId, useState } from "react";
import Heading from "components/Heading/Heading";
import Glide from "@glidejs/glide";
import CollectionCard from "./CollectionCard";
import CollectionCard2 from "./CollectionCard2";
import { Link } from "react-router-dom";
import { DEMO_LARGE_PRODUCTS } from "./SectionSliderLargeProduct2";
import { offersService } from "services/offersService";
import supabase from "services/baseService";
import ModalQuickView from "./OffersComponents/ModalQuickView";
export interface SectionSliderLargeProductProps {
  className?: string;
  itemClassName?: string;
  cardStyle?: "style1" | "style2";
}

export const getSlides = async (shopId) => {
  try {
    const { data, error } = await supabase
      .from("slides")
      .select("*")
      .eq("shop_id", shopId);

    if (error) throw error;

    return data;
  } catch (error) {
    console.error("Error fetching tables:", error);
    throw error;
  }
};

export const fetchOffers = async () => {
  try {
    const offers = await offersService.getAllOffers();
    // For each offer, fetch its products and variations
    for (const offer of offers) {
      offer.products = await offersService.getOfferProductsByOfferId(offer.id);
      for (const product of offer.products) {
        product.variations =
          await offersService.getOfferProductVariationsByOfferProductId(
            product.id
          );
      }
    }
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
}) => {
  const [offers, setOffers] = useState<OfferWithImages[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModalQuickView, setShowModalQuickView] = React.useState(false);

  const id = useId();
  const UNIQUE_CLASS = "glidejs" + id.replace(/:/g, "_");
  const [sliders, setSliders] = useState([
    {
      id: 0,
      name: "",
      images: [],
      created_at: "",
    },
  ]);
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
    try {
      console.log("HOLA");

      let slider = new Glide(`.${UNIQUE_CLASS}`, OPTIONS);
      getSlides(6)
        .then((res) => {
          console.log(res);
          setSliders(res);
        })
        .then(() => slider.mount())
        .catch((e) => console.log(":", e));
    } catch (error) {
      console.error(error);
    }
    // return () => {
    //   slider.destroy();
    // };
  }, [UNIQUE_CLASS]);

  return (
    <>
      <div className={`nc-SectionSliderLargeProduct ${className} my-20`}>
        {sliders.length > 0 &&
          sliders.map((slide) => (
            <div className={`${UNIQUE_CLASS} flow-root`}>
              <Heading isCenter={false} hasNextPrev>
                Nuestras Mejores Ofertas
              </Heading>
              <div className="glide__track" data-glide-el="track">
                <ul className="glide__slides">
                  <div className="w-screen h-96">
                    {slide.images.map((img) => (
                      <img src={img} alt={slide.name} />
                    ))}
                  </div>
                </ul>
              </div>
            </div>
          ))}
        {offers.map((offer, index) => (
          <li className={`glide__slide`} key={index}></li>
        ))}
      </div>
    </>
  );
};

export default SectionSliderLargeProduct;
