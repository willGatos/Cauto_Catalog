import { useEffect, useState } from "react";
import SectionGridFeatureItems from "./SectionGridFeatureItems";
import SectionHero3 from "components/SectionHero/SectionHero3";

function PageHome2() {
  const [products, setProducts] = useState([])

  useEffect(()=>{
   

  },[])

  return (
    <div className="nc-PageHome2 relative overflow-hidden">
      <div className="container px-4">
        {/* SECTION HERO */}
        <SectionHero3 />
      </div>

      <div className="container relative space-y-24 my-24 lg:space-y-32 lg:my-32">
        {/* SECTION */}
        <SectionGridFeatureItems data={products} />


      </div>
    </div>
  );
}

export default PageHome2;
        {/* SECTION
        
        <SectionPromo1 />


        */}

        {/* <SectionHowItWork /> 
        
         <SectionSliderProductCard
          data={SPORT_PRODUCTS.filter((_, i) => i < 8)}
          subHeading="New Sports equipment"
        />
        
        */}

        {/* SECTION */}
       

        {/* SECTION 
        
        <SectionPromo2 />

        */}
        

        {/* SECTION 3 
        
        <SectionSliderLargeProduct /> 

        */}
        

        {/* SECTION 
        
         <div className="relative py-24 lg:py-32">
          <BackgroundSection />
          <SectionGridMoreExplore
            data={DEMO_MORE_EXPLORE_DATA.filter((_, i) => i > 2)}
          />
        </div>
        //import { SPORT_PRODUCTS } from "data/data";
/* import SectionHowItWork from "components/SectionHowItWork/SectionHowItWork";
import BackgroundSection from "components/BackgroundSection/BackgroundSection";
import SectionSliderLargeProduct from "components/SectionSliderLargeProduct";
import SectionSliderProductCard from "components/SectionSliderProductCard";
import SectionGridMoreExplore, {
  DEMO_MORE_EXPLORE_DATA,
} from "components/SectionGridMoreExplore/SectionGridMoreExplore";
import SectionPromo2 from "components/SectionPromo2"; 
        */}