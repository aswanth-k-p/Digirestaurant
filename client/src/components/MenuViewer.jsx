import React, { useEffect, useState } from "react";
import myimage from "../assets/testimage.jpg";
import { useParams } from "react-router-dom";

const MenuViewer = () => {
  const { restaurantId } = useParams();
  const [menu, setMenu] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedIdx, setSelectedIdx] = useState(0);
  const [restaurant, setRestaurant] = useState({});

  useEffect(() => {
    async function fetchMenu() {
      setLoading(true);
      setError("");
      try {
        const res = await fetch(
          `${import.meta.env.VITE_SERVER_URI}/api/menu/public/${restaurantId}`
        );
        const data = await res.json();
        const rest = data.restaurant.name;
        const logo = data.restaurant.logo;
        const address = data.restaurant.address;
        const phone = data.restaurant.phone;
        setRestaurant({ name: rest, logo: logo, address: address, phone: phone });
        if (data.menu) {
          setMenu(data.menu);
        } else {
          setError("No menu data found.");
        }
      } catch (err) {
        setError("Failed to fetch menu.");
      } finally {
        setLoading(false);
      }
    }
    fetchMenu();
  }, [restaurantId]);

  const categories = menu.map((cat) => cat.category);
  const items = menu[selectedIdx]?.items || [];

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-amber-100 px-4 py-10">
      <div className="max-w-xl mx-auto bg-white/80 backdrop-blur-md p-6 rounded-xl shadow-xl border border-amber-100">

        {/* Header: Logo and Name Left, Address/Phone Right */}
        <div className="flex items-center justify-between gap-4 mb-3 flex-wrap">
          {/* Left: Logo and Name */}
          <div className="flex items-center gap-4 min-w-0">
            <img
              src={restaurant.logo || myimage}
              alt="Restaurant Logo"
              className="w-16 h-16 object-cover rounded-full border-2 border-amber-400 shadow-md"
            />
            <h1 className="text-2xl font-bold text-amber-700 tracking-wide truncate">
              {restaurant.name}
            </h1>
          </div>
          {/* Right: Address and Phone */}
          <div className="flex flex-col items-end text-right min-w-0">
            {restaurant.address && (
              <div className="text-gray-500 text-sm flex items-center gap-1">
                <span className="material-icons text-amber-400 text-base align-middle">location_on</span>
                <span className="truncate max-w-[180px]">{restaurant.address}</span>
              </div>
            )}
            {restaurant.phone && (
              <div className="text-gray-500 text-sm flex items-center gap-1 mt-1">
                <span className="material-icons text-amber-400 text-base align-middle">phone</span>
                <span className="truncate max-w-[180px]">{restaurant.phone}</span>
              </div>
            )}
          </div>
        </div>

        <hr className="my-4 border-amber-100" />

        {loading && (
          <div className="text-center text-gray-500 py-8 text-lg font-medium">
            Loading...
          </div>
        )}
        {error && (
          <div className="text-center text-red-500 py-8 text-lg font-semibold">
            {error}
          </div>
        )}
        {!loading && !error && (
          <>
            {/* Categories Horizontal Scroll */}
            <div className="flex overflow-x-auto space-x-3 pb-4 border-b border-amber-200 mb-4">
              {categories.map((cat, idx) => (
                <button
                  key={cat.id}
                  className={`whitespace-nowrap px-4 py-2 rounded-full font-semibold text-sm transition-all duration-300 shadow-sm ${
                    idx === selectedIdx
                      ? "bg-amber-500 text-white shadow-md"
                      : "bg-white text-gray-700 hover:bg-amber-100 hover:text-amber-700"
                  }`}
                  onClick={() => setSelectedIdx(idx)}
                  aria-label={`Select category: ${cat.name}`}
                >
                  {cat.name}
                </button>
              ))}
            </div>

            {/* Items Vertical Scroll */}
            <div className="mt-4 max-h-[28rem] overflow-y-auto space-y-4 pr-1">
              {items.length === 0 && (
                <div className="text-gray-400 text-center py-8">
                  No items in this category.
                </div>
              )}
              {items.map((item) => (
                <div
                  key={item.id}
                  className="flex gap-4 bg-gradient-to-r from-amber-50 via-white to-amber-100 shadow hover:shadow-lg transition rounded-xl p-4 items-center border border-amber-100"
                >
                  <img
                    src={item.image || myimage}
                    alt={item.name}
                    className="w-20 h-20 object-cover rounded-lg border border-gray-200"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="font-bold text-lg text-gray-800 truncate">
                      {item.name}
                    </div>
                    <div className="text-gray-600 text-sm mb-1 break-words">
                      {item.description}
                    </div>
                    <div className="font-semibold text-amber-700 text-base">
                      ₹{item.price}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default MenuViewer;
