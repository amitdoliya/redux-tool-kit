"use client";

import { Provider } from "react-redux";

import store from "./redux/store";
import Header from "@/components/header";
import Product from "@/components/product";

export default function Home() {
  return (
    <div className=" w-full bg-zinc-50 font-sans dark:bg-black">
      <Provider store={store}>
        <Header />
        <Product />
      </Provider>
    </div>
  );
}
