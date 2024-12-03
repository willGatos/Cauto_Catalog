"use client";

import Prices from "components/Prices";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import Button from "shared/Button/Button";
import { Category } from "../lib/mock-data";
import { Product } from "components/ProductQuickView";
import ProductCard from "components/ProductCard";
import Heading from "shared/Heading/Heading";

export function CategoriesNav({ categories, products }) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [currentCategories, setCurrentCategories] = useState<Category[]>(
    categories.filter((category) => category.parent_id === null)
  );
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(
    null
  );
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(products);
  const [otherProducts, setOtherProducts] = useState<Product[]>([]);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = 200;
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  const handleCategoryClick = (category: Category) => {
    const subcategories = categories.filter(
      (cat) => cat.parent_id === category.id
    );
    if (subcategories.length > 0) {
      setCurrentCategories(subcategories);
    }
    setSelectedCategory(category);
  };

  const handleBackClick = () => {
    setCurrentCategories(
      categories.filter((category) => category.parent_id === null)
    );
    setSelectedCategory(null);
  };

  useEffect(() => {
    if (selectedCategory) {
      const categoryHierarchy = getCategoryHierarchy(selectedCategory);
      const categoryIds = categoryHierarchy.map((cat) => cat.id);

      const filtered = products.filter((product) =>
        product.categories.some((cat) => categoryIds.includes(cat.id))
      );

      const sortedFiltered = filtered.sort((a, b) => {
        const aIndex = a.categories.findIndex(
          (cat) => cat.id === selectedCategory.id
        );
        const bIndex = b.categories.findIndex(
          (cat) => cat.id === selectedCategory.id
        );
        return aIndex - bIndex;
      });

      setFilteredProducts(sortedFiltered);

      const others = products.filter(
        (product) =>
          !product.categories.some((cat) => categoryIds.includes(cat.id))
      );
      setOtherProducts(others);
    } else {
      setFilteredProducts(products);
      setOtherProducts([]);
    }
  }, [selectedCategory]);

  const getCategoryHierarchy = (category: Category): Category[] => {
    const hierarchy: Category[] = [category];
    let currentCategory = category;
    while (currentCategory.parent_id) {
      const parentCategory = categories.find(
        (cat) => cat.id === currentCategory.parent_id
      );
      if (parentCategory) {
        hierarchy.unshift(parentCategory);
        currentCategory = parentCategory;
      } else {
        break;
      }
    }
    return hierarchy;
  };

  return (
    <div className="flex flex-col space-y-8">
      <Heading isCenter={true}>Descubre todos nuestros Productos</Heading>
      <div className="relative flex justify-center items-center">
        <Button
          className="absolute left-0 top-1/2 -translate-y-1/2 z-10"
          onClick={() => scroll("left")}
        >
          <ChevronLeft className="h-4 w-4" />
          <span className="sr-only">Scroll left</span>
        </Button>
        <div className="overflow-scroll w-full" ref={scrollRef}>
          <div className="flex items-center gap-4 p-4">
            {selectedCategory && (
              <Button
                className="flex items-center gap-2"
                onClick={handleBackClick}
              >
                <ChevronLeft className="h-4 w-4" />
                <span>Volver</span>
              </Button>
            )}
            {currentCategories.map((category) => (
              <button
                key={category.id}
                onClick={() => handleCategoryClick(category)}
                className="flex flex-col items-center gap-2 p-2 rounded-full transition-colors hover:bg-accent focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2"
              >
                <div className="relative w-16 h-16 overflow-hidden rounded-full border">
                  <img
                    src={category.cover}
                    alt=""
                    className="object-cover w-full h-full"
                  />
                </div>
                <span className="text-sm font-medium text-center max-w-[100px] h-24 line-clamp-2">
                  {category.name}
                </span>
              </button>
            ))}
          </div>
        </div>
        <Button
          className="absolute right-0 top-1/2 -translate-y-1/2 z-10"
          onClick={() => scroll("right")}
        >
          <ChevronRight className="h-4 w-4" />
          <span className="sr-only">Scroll right</span>
        </Button>
      </div>

      <AnimatePresence>
        <motion.div
          className="grid gap-4 m-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 grid-cols-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {filteredProducts.map((product, index) => (
            <motion.div
              key={product.id}
              className="bg-white rounded-lg overflow-hidden"
              layout
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              {/* <img
                src={product.images[0]}
                alt={product.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="text-lg font-semibold mb-2">{product.name}</h3>
                <p
                  className="text-gray-600 mb-2"
                  dangerouslySetInnerHTML={{
                    __html: product.description || "",
                  }}
                ></p>
                <p className="text-xl font-bold">
                  ${product.standard_price.toFixed(2)}
                </p>
              </div> */}
              <ProductCard data={product} key={index} />
            </motion.div>
          ))}
        </motion.div>
      </AnimatePresence>

      {otherProducts.length > 0 && (
        <div className="bg-gray-100 p-6 rounded-lg mt-8">
          <h2 className="text-2xl font-bold mb-4">
            Otros productos que te pueden interesar
          </h2>
          <AnimatePresence>
            <motion.div
              className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {otherProducts.map((product) => (
                <motion.div
                  key={product.id}
                  className="bg-white rounded-lg shadow-md overflow-hidden"
                  layout
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <img
                    alt={product.name}
                    src={product.images[0]}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-4">
                    <h3 className="text-lg font-semibold mb-2">
                      {product.name}
                    </h3>
                    <p
                      className="text-gray-600 mb-2"
                      dangerouslySetInnerHTML={{
                        __html: product.description || "",
                      }}
                    ></p>
                    <p className="text-xl font-bold">
                      ${product.standard_price.toFixed(2)}
                    </p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      )}
    </div>
  );
}
