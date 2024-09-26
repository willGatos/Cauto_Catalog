import React, { FC } from "react";
import Heading from "shared/Heading/Heading";
import TabFilters from "components/TabFilters";
import { Transition } from "@headlessui/react";
import Nav from "shared/Nav/Nav";
import NavItem from "shared/NavItem/NavItem";

export interface HeaderFilterSectionProps {
  className?: string;
}

const HeaderFilterSection: FC<HeaderFilterSectionProps> = ({
  className = "mb-12",
}) => {
  const [isOpen, setIsOpen] = React.useState(true);
  const [tabActive, setTabActive] = React.useState("All items");

  return (
    <div className={`flex flex-col relative ${className}`}>
      <Heading>What's trending now</Heading>
      <div className="flex flex-col lg:flex-row lg:items-center justify-between space-y-6 lg:space-y-0 lg:space-x-2 ">
      <Nav
          className="sm:space-x-2"
          containerClassName="relative flex w-full overflow-x-auto text-sm md:text-base hiddenScrollbar"
        >
          {["All items", "Women", "Mans", "Kids", "jewels"].map(
            (item, index) => (
              <NavItem
                key={index}
                isActive={tabActive === item}
                onClick={() => setTabActive(item)}
              >
                {item}
              </NavItem>
            )
          )}
        </Nav> 
      </div>

      <Transition
        show={isOpen}
        enter="transition-opacity duration-150"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="transition-opacity duration-150"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        <div className="w-full border-b border-neutral-200 dark:border-neutral-700 my-8"></div>
        <TabFilters />
      </Transition>
    </div>
  );
};

export default HeaderFilterSection;

        
        