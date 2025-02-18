import { useEffect } from "react";
import "./App.css";
import { initFlowbite } from "flowbite";
import { BackgroundGradientAnimationDemo } from "./Components/Home/Home";
import { BackgroundGradientAnimationDemoAr } from "./Components/HomeAr/HomeAr";
import TopUpTransfer from "./Components/topUpTransfer/topUpTransfer";
import TopUpTransferAr from "./Components/TopUpTransferAr/TopUpTransferAr";
import Wallet from "./Components/Wallet/Wallet";
import WalletAr from "./Components/WalletAr/WalletAr";
import BillPayment from "./Components/BillPayment/BillPayment";
import BillPaymentAr from "./Components/BillPaymentAr/BillPaymentAr";
import Layout from "./Components/Layout/Layout";
import {
  createHashRouter,
  RouterProvider,
  useOutletContext,
} from "react-router-dom";
import Offers from "./Components/Offers/Offers";
import OffersAr from "./Components/OffersAr/OffersAr";
import ErrorPage from "./Components/ErrorPage/ErrorPage";

function LanguageWrapper({ EnComponent, ArComponent }) {
  const [isArabic] = useOutletContext();
  return isArabic ? <ArComponent /> : <EnComponent />;
}

function App() {
  useEffect(() => {
    initFlowbite();
  }, []);

  const router = createHashRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          index: true,
          element: (
            <LanguageWrapper
              EnComponent={BackgroundGradientAnimationDemo}
              ArComponent={BackgroundGradientAnimationDemoAr}
            />
          ),
        },
        {
          path: "billpayment",
          element: (
            <LanguageWrapper
              EnComponent={BillPayment}
              ArComponent={BillPaymentAr}
            />
          ),
        },
        {
          path: "topuptransfer",
          element: (
            <LanguageWrapper
              EnComponent={TopUpTransfer}
              ArComponent={TopUpTransferAr}
            />
          ),
        },
        {
          path: "wallet",
          element: (
            <LanguageWrapper EnComponent={Wallet} ArComponent={WalletAr} />
          ),
        },
        {
          path: "offers",
          element: (
            <LanguageWrapper EnComponent={Offers} ArComponent={OffersAr} />
          ),
        },
        {
          path: "*",
          element: <ErrorPage />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
