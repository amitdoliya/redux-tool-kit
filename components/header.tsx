"use client";

import Link from "next/link";
import { useState } from "react";
import { ShoppingCart, Search, UserRound, Menu, X, Store } from "lucide-react";
import { useSelector } from "react-redux";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [search, setSearch] = useState("");

  const cartCount = useSelector(
    (state: { cart: { value: number } }) => state.cart.value,
  );
  console.log(cartCount, "cartCount");
  return (
    <header className="sticky top-0 z-50 bg-white shadow-md">
      {/* Top Navbar */}
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <div className="rounded-lg bg-blue-600 p-2 text-white">
            <Store size={25} />
          </div>
          <span className="text-2xl font-extrabold text-gray-900">
            Shop<span className="text-blue-600">Kart</span>
          </span>
        </Link>

        {/* Search Bar */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            console.log("Search:", search);
          }}
          className="hidden flex-1 md:flex md:max-w-xl"
        >
          <input
            type="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search for products..."
            className="w-full rounded-l-lg border border-gray-300 px-4 py-2.5 outline-none focus:border-blue-500"
          />
          <button
            type="submit"
            aria-label="Search products"
            className="rounded-r-lg bg-blue-600 px-5 text-white transition hover:bg-blue-700"
          >
            <Search size={21} />
          </button>
        </form>

        {/* Desktop Actions */}
        <div className="hidden items-center gap-5 md:flex">
          <Link
            href="/login"
            className="flex items-center gap-2 text-gray-700 transition hover:text-blue-600"
          >
            <UserRound size={22} />
            <span className="font-medium">Login</span>
          </Link>

          <Link
            href="/cart"
            className="relative flex items-center gap-2 text-gray-700 transition hover:text-blue-600"
          >
            <ShoppingCart size={24} />
            <span className="font-medium">Cart</span>
            <span className="absolute -right-3 -top-3 flex h-5 min-w-5 items-center justify-center rounded-full bg-red-500 px-1 text-xs text-white">
              {cartCount}
            </span>
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          type="button"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          className="rounded-lg p-2 text-gray-700 hover:bg-gray-100 md:hidden"
        >
          {menuOpen ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      {/* Desktop Navigation */}
      <nav className="hidden border-t border-gray-100 md:block">
        <div className="mx-auto flex max-w-7xl items-center gap-8 px-4 py-3">
          <Link href="/" className="font-medium text-blue-600">
            Home
          </Link>
          <Link
            href="/products"
            className="font-medium text-gray-600 transition hover:text-blue-600"
          >
            All Products
          </Link>
          <Link
            href="/categories"
            className="font-medium text-gray-600 transition hover:text-blue-600"
          >
            Categories
          </Link>
          <Link
            href="/deals"
            className="font-medium text-gray-600 transition hover:text-blue-600"
          >
            Best Deals
          </Link>
          <Link
            href="/contact"
            className="font-medium text-gray-600 transition hover:text-blue-600"
          >
            Contact
          </Link>
        </div>
      </nav>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="border-t border-gray-200 bg-white p-4 md:hidden">
          {/* Mobile Search */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              console.log("Search:", search);
              setMenuOpen(false);
            }}
            className="mb-4 flex"
          >
            <input
              type="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search products..."
              className="w-full min-w-0 rounded-l-lg border border-gray-300 px-3 py-2 outline-none focus:border-blue-500"
            />
            <button
              type="submit"
              aria-label="Search products"
              className="rounded-r-lg bg-blue-600 px-4 text-white"
            >
              <Search size={20} />
            </button>
          </form>

          <div className="flex flex-col gap-1">
            {[
              { name: "Home", href: "/" },
              { name: "All Products", href: "/products" },
              { name: "Categories", href: "/categories" },
              { name: "Best Deals", href: "/deals" },
              { name: "Login", href: "/login" },
              { name: "My Cart", href: "/cart" },
              { name: "Contact", href: "/contact" },
            ].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMenuOpen(false)}
                className="rounded-lg px-3 py-3 font-medium text-gray-700 transition hover:bg-blue-50 hover:text-blue-600"
              >
                {item.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
