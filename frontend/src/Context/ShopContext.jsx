import { createContext, useEffect, useState } from "react";

// Create a context
export const ShopContext = createContext(null);

// Provider Component
const ShopContextProvider = (props) => {
  const [all_product, setAll_Product] = useState([]);
  const [cartItems, setCartItems] = useState({});

  const BASE_URL = process.env.REACT_APP_API_BASE || "https://internship-project-hkax.onrender.com";

  // Fetch all products and cart data on mount
  useEffect(() => {
    // Fetch all products
    fetch(`${BASE_URL}/allproducts`)
      .then((response) => response.json())
      .then((data) => setAll_Product(data))
      .catch((err) => console.error("Error fetching products:", err));

    // Fetch cart data if logged in
    if (localStorage.getItem("auth-token")) {
      fetch(`${BASE_URL}/getcart`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "auth-token": localStorage.getItem("auth-token"),
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((data) => setCartItems(data))
        .catch((err) => console.error("Error fetching cart:", err));
    }
  }, [BASE_URL]); // ✅ Properly added dependency array

  // Add item to cart
  const addToCart = (itemId) => {
    setCartItems((prev) => ({
      ...prev,
      [itemId]: (prev[itemId] || 0) + 1,
    }));

    if (localStorage.getItem("auth-token")) {
      fetch(`${BASE_URL}/addtocart`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "auth-token": localStorage.getItem("auth-token"),
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ itemId }),
      });
    }
  };

  // Remove item from cart
  const removeFromCart = (itemId) => {
    setCartItems((prev) => ({
      ...prev,
      [itemId]: Math.max((prev[itemId] || 1) - 1, 0),
    }));

    if (localStorage.getItem("auth-token")) {
      fetch(`${BASE_URL}/removefromcart`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "auth-token": localStorage.getItem("auth-token"),
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ itemId }),
      });
    }
  };

  // Provide the context value
  const contextValue = {
    all_product,
    cartItems,
    setCartItems,
    addToCart,
    removeFromCart,
  };

  return (
    <ShopContext.Provider value={contextValue}>
      {props.children}
    </ShopContext.Provider>
  );
};

export default ShopContextProvider;
