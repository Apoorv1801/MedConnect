import { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext();

const STORAGE_KEY = "medconnect_test_cart";

const emptyCart = { labId: null, labName: "", items: [] };

export function CartProvider({ children }) {
    const [cart, setCart] = useState(() => {
        try {
            const saved = localStorage.getItem(STORAGE_KEY);
            return saved ? JSON.parse(saved) : emptyCart;
        } catch {
            return emptyCart;
        }
    });

    useEffect(() => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(cart));
    }, [cart]);

    // Cart is scoped to one lab at a time (a booking = one lab, one slot).
    // Adding a test from a different lab replaces the cart, after confirming.
    const addToCart = (test, lab, offer) => {
        setCart((prev) => {
            const newItem = {
                testId: test.id,
                testName: test.name,
                price: offer.price,
                homeCollectionAvailable: offer.homeCollectionAvailable,
            };

            if (prev.labId && prev.labId !== lab.id) {
                const confirmed = window.confirm(
                    `Your cart has tests from ${prev.labName}. Adding a test from ${lab.name} will clear your current cart. Continue?`
                );
                if (!confirmed) return prev;

                return { labId: lab.id, labName: lab.name, items: [newItem] };
            }

            if (prev.items.some((i) => i.testId === test.id)) {
                return prev; // already in cart
            }

            return {
                labId: lab.id,
                labName: lab.name,
                items: [...prev.items, newItem],
            };
        });
    };

    const removeFromCart = (testId) => {
        setCart((prev) => {
            const items = prev.items.filter((i) => i.testId !== testId);
            return items.length === 0 ? emptyCart : { ...prev, items };
        });
    };

    const clearCart = () => setCart(emptyCart);

    return (
        <CartContext.Provider
            value={{ cart, addToCart, removeFromCart, clearCart }}
        >
            {children}
        </CartContext.Provider>
    );
}

export function useCart() {
    return useContext(CartContext);
}