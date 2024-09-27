import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Page } from "./types";
import ScrollToTop from "./ScrollToTop";
import Footer from "shared/Footer/Footer";
import PageHome2 from "containers/PageHome/PageHome2";
import Page404 from "containers/Page404/Page404";
//import AccountPage from "containers/AccountPage/AccountPage";
import PageLogin from "containers/PageLogin/PageLogin";
import SiteHeader from "containers/SiteHeader";
import ProductDetailPage from "containers/ProductDetailPage/ProductDetailPage";
import CheckoutPage from "containers/PageCheckout/CheckoutPage";
import PageCollection2 from "containers/PageCollection2";
import { Toaster } from "react-hot-toast";



export const pages: Page[] = [
  { path: "/", component: PageHome2 },
  { path: "/product-detail", component: ProductDetailPage },
  { path: "/product-detail", component: ProductDetailPage },
  { path: "/page-collection", component: PageCollection2 },
  { path: "/checkout", component: CheckoutPage },
  { path: "/login", component: PageLogin },
];

const MyRoutes = () => {
  return (
    <BrowserRouter>
      <Toaster />
      <ScrollToTop />
      <SiteHeader />
      <Routes >
        {pages.map(({ component: Component, path }, index) => {
          return <Route key={index} element={<Component />} path={path} />;
        })}
        <Route element={<Page404 />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
};

export default MyRoutes;

//import PageSearch from "containers/PageSearch";

/* import AccountPass from "containers/AccountPage/AccountPass";
import AccountBilling from "containers/AccountPage/AccountBilling";
import AccountOrder from "containers/AccountPage/AccountOrder";
import CartPage from "containers/ProductDetailPage/CartPage";
 */


  /* { path: "/page-search", component: PageSearch }, 
     { path: "/account-change-password", component: AccountPass }, 
     { path: "/account-billing", component: AccountBilling },
     { path: "/cart", component: CartPage },
     { path: "/account-my-order", component: AccountOrder },
     { path: "/account", component: AccountPage },
  */