"use client";

import Image from "next/image";
import { ShoppingCart, Star, Heart, Zap } from "lucide-react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { increment } from "@/app/redux/slice";

interface Product {
  id: number;
  name: string;
  price: number;
  oldPrice: number;
  rating: number;
  image: string;
  category: string;
}

const products: Product[] = [
  {
    id: 1,
    name: "Premium Smart Watch",
    price: 1999,
    oldPrice: 2999,
    rating: 4.5,
    image: "/products/watch.jpg",
    category: "Electronics",
  },
];

export default function Product() {
  const [cart, setCart] = useState<number[]>([]);
  const [wishlist, setWishlist] = useState<number[]>([]);

  //   const addToCart = (id: number) => {
  //     setCart((prev) => [...prev, id]);
  //   };
  const dispatch = useDispatch();
  console.log(dispatch, "disPatch");

  const toggleWishlist = (id: number) => {
    setWishlist((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id],
    );
  };

  return (
    <section className="min-h-screen bg-gray-50 px-4 py-12 sm:px-6 lg:px-10">
      <div className="mx-auto max-w-7xl">
        {/* Heading */}
        <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="mb-2 font-semibold uppercase tracking-widest text-blue-600">
              Our Collection
            </p>
            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
              Popular Products
            </h2>
            <p className="mt-2 text-gray-500">
              Discover the best products at great prices.
            </p>
          </div>

          <span className="rounded-full bg-blue-100 px-4 py-2 text-sm font-semibold text-blue-700">
            {products.length} Products
          </span>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {products.map((product) => {
            const discount = Math.round(
              ((product.oldPrice - product.price) / product.oldPrice) * 100,
            );

            const added = cart.includes(product.id);
            const liked = wishlist.includes(product.id);

            return (
              <article
                key={product.id}
                className="group overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl"
              >
                {/* Image */}
                <div className="relative flex h-56 items-center justify-center overflow-hidden bg-gray-100">
                  <span className="absolute left-3 top-3 z-10 rounded-md bg-red-500 px-3 py-1 text-xs font-bold text-white">
                    {discount}% OFF
                  </span>

                  <button
                    type="button"
                    onClick={() => toggleWishlist(product.id)}
                    aria-label={
                      liked ? "Remove from wishlist" : "Add to wishlist"
                    }
                    className="absolute right-3 top-3 z-10 rounded-full bg-white p-2 shadow transition hover:scale-110"
                  >
                    <Heart
                      size={19}
                      className={
                        liked ? "fill-red-500 text-red-500" : "text-gray-600"
                      }
                    />
                  </button>

                  <Image
                    src={product.image}
                    alt={product.name}
                    width={240}
                    height={200}
                    className="h-44 w-44 object-contain transition duration-500 group-hover:scale-110"
                  />
                </div>

                {/* Product Details */}
                <div className="p-5">
                  <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-blue-600">
                    {product.category}
                  </p>

                  <h3 className="truncate text-lg font-bold text-gray-800">
                    {product.name}
                  </h3>

                  <div className="mt-2 flex items-center gap-1">
                    <Star
                      size={17}
                      className="fill-yellow-400 text-yellow-400"
                    />
                    <span className="text-sm font-semibold text-gray-700">
                      {product.rating}
                    </span>
                    <span className="text-sm text-gray-400">
                      (Customer rating)
                    </span>
                  </div>

                  <div className="mt-4 flex items-center gap-2">
                    <span className="text-2xl font-extrabold text-gray-900">
                      ₹{product.price.toLocaleString("en-IN")}
                    </span>
                    <span className="text-sm text-gray-400 line-through">
                      ₹{product.oldPrice.toLocaleString("en-IN")}
                    </span>
                  </div>

                  {/* Buttons */}
                  <div className="mt-5 flex flex-col gap-2">
                    <button
                      type="button"
                      onClick={() => dispatch(increment())}
                      className={`flex w-full items-center justify-center gap-2 rounded-lg px-4 py-3 font-semibold text-white transition ${
                        added
                          ? "bg-green-600 hover:bg-green-700"
                          : "bg-blue-600 hover:bg-blue-700"
                      }`}
                    >
                      <ShoppingCart size={19} />
                      {added ? "Added to Cart" : "Add to Cart"}
                    </button>

                    <button
                      type="button"
                      onClick={() => alert(`You selected ${product.name}`)}
                      className="flex w-full items-center justify-center gap-2 rounded-lg border border-gray-200 px-4 py-3 font-semibold text-gray-700 transition hover:border-blue-600 hover:bg-blue-50 hover:text-blue-600"
                    >
                      <Zap size={18} />
                      Buy Now
                    </button>
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        {/* Cart Summary */}
        <div className="mt-8 rounded-xl bg-blue-50 p-4 text-center">
          <p className="font-semibold text-blue-900">
            <ShoppingCart className="mr-2 inline" size={20} />
            Cart Items: {cart.length}
          </p>
        </div>
      </div>
    </section>
  );
}
