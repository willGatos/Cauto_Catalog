import { useEffect, useState } from "react";
import SectionGridFeatureItems from "./SectionGridFeatureItems";
import SectionHero3 from "components/SectionHero/SectionHero3";
import SectionPromo1 from "components/SectionPromo1";
import SectionSliderLargeProduct from "components/SectionSliderLargeProduct";
import BackgroundSection from "components/BackgroundSection/BackgroundSection";
import SectionGridMoreExplore, {
  DEMO_MORE_EXPLORE_DATA,
} from "components/SectionGridMoreExplore/SectionGridMoreExplore";
import SectionHowItWork from "components/SectionHowItWork/SectionHowItWork";
import SectionSliderProductCard from "components/SectionSliderProductCard";
import { SPORT_PRODUCTS } from "data/data";
import supabase from "services/baseService";

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
interface Slide {
  id: number;
  name: string;
  images: string[];
  created_at: string;
}
function PageHome2() {
  const [products, setProducts] = useState([]);
  const [sliders, setSliders] = useState<Slide[]>([{
    id: 0,
    name: "",
    images: [],
    created_at: "",
  }]);
  useEffect(() => {
    getSlides(6).then(setSliders);
  }, []);

  return (
    <div className="nc-PageHome2 relative overflow-hidden">
      <div className="container px-4">
        {/* SECTION HERO */}
        <SectionHero3 />
        <SectionSliderLargeProduct />
        <div className="relative py-24 lg:py-32">
          <BackgroundSection />
          <SectionSliderProductCard
            data={SPORT_PRODUCTS.filter((_, i) => i < 8)}
            subHeading="New Sports equipment"
          />
        </div>
      </div>
      {sliders.length > 0 &&
        <div>
          {sliders.map(slide =>(
            <div>
              {slide.images.map(img =>
              <img src={img} alt={slide.name}/>
              )}
            </div>
          ))}
        </div>
      }
      <div className="container relative space-y-24 my-24 lg:space-y-32 lg:my-32">
        {/* SECTION 
        
        <SectionHowItWork/>
        
        */}
        <SectionGridFeatureItems data={products} />
      </div>
    </div>
  );
}

export default PageHome2;
{
  /* SECTION
        


        */
}

{
  /* <SectionHowItWork /> 
        
         <SectionSliderProductCard
          data={SPORT_PRODUCTS.filter((_, i) => i < 8)}
          subHeading="New Sports equipment"
        />
        
        */
}

{
  /* SECTION */
}

{
  /* SECTION 
        
        <SectionPromo2 />

        */
}

{
  /* SECTION 3 
        
        <SectionSliderLargeProduct /> 

        */
}

{
  /* SECTION 
        
         
        //import { SPORT_PRODUCTS } from "data/data";
/* import SectionHowItWork from "components/SectionHowItWork/SectionHowItWork";
import BackgroundSection from "components/BackgroundSection/BackgroundSection";
import SectionSliderLargeProduct from "components/SectionSliderLargeProduct";
import SectionSliderProductCard from "components/SectionSliderProductCard";
import SectionGridMoreExplore, {
  DEMO_MORE_EXPLORE_DATA,
} from "components/SectionGridMoreExplore/SectionGridMoreExplore";
import SectionPromo2 from "components/SectionPromo2"; 
        */
}
