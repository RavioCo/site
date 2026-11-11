import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Product } from '../types/product';
import { SAMPLE_CATALOG } from '../data/sampleCatalog';
import { evaluatePromoCode } from '../utils/commerceRules';

export interface CartItem {
  id: string; // unique composite key (e.g. handle-color-size)
  product: Product;
  selectedColor: string;
  selectedSize: string;
  quantity: number;
  unitPriceBDT: number;
  unitPriceUSD: number;
  variantId?: string;
}

export interface DeliveryOption {
  id: string;
  name: string;
  description: string;
  estimatedDays: string;
  priceBDT: number;
  priceUSD: number;
  freeThresholdBDT?: number;
}

export const DELIVERY_OPTIONS: DeliveryOption[] = [
  {
    id: 'dhaka-concierge',
    name: 'Dhaka Metropolitan Concierge',
    description: 'Signature rigid dust-box packaging delivered by our dedicated courier.',
    estimatedDays: '1–2 Business Days',
    priceBDT: 120,
    priceUSD: 2,
    freeThresholdBDT: 10000,
  },
  {
    id: 'nationwide-express',
    name: 'Nationwide Insured Courier',
    description: 'Safe transit to Chittagong, Sylhet, and all 64 districts with tracking.',
    estimatedDays: '2–4 Business Days',
    priceBDT: 200,
    priceUSD: 3,
    freeThresholdBDT: 15000,
  },
];

interface CartContextType {
  items: CartItem[];
  totalItemCount: number;
  subtotalBDT: number;
  subtotalUSD: number;
  activeCurrency: 'BDT' | 'USD';
  setActiveCurrency: (currency: 'BDT' | 'USD') => void;
  isBagDrawerOpen: boolean;
  openBagDrawer: () => void;
  closeBagDrawer: () => void;
  addToCart: (product: Product, selectedColor: string, selectedSize: string, quantity?: number) => void;
  updateQuantity: (itemId: string, delta: number) => void;
  setQuantity: (itemId: string, qty: number) => void;
  removeItem: (itemId: string) => void;
  clearCart: () => void;
  selectedDeliveryOption: DeliveryOption;
  setSelectedDeliveryOption: (option: DeliveryOption) => void;
  appliedPromo: { code: string; discountPercentage: number; description: string } | null;
  applyPromoCode: (code: string) => { success: boolean; message: string };
  removePromoCode: () => void;
}

const STORAGE_KEY = 'ravio_cart_v2';
const CURRENCY_KEY = 'ravio_currency_v2';

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [activeCurrency, setActiveCurrencyState] = useState<'BDT' | 'USD'>(() => {
    try {
      const saved = localStorage.getItem(CURRENCY_KEY);
      return saved === 'USD' ? 'USD' : 'BDT';
    } catch {
      return 'BDT';
    }
  });

  const [items, setItems] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) {
          // Refresh saved product data from the current catalog.
          return parsed.map((item: CartItem) => ({
            ...item,
            product: SAMPLE_CATALOG.find((p) => p.handle === item.product?.handle) ?? item.product,
          }));
        }
      }
    } catch {
      // Fallback
    }

    // New visitors start with an empty bag.
    return [];
  });

  const [isBagDrawerOpen, setIsBagDrawerOpen] = useState(false);
  const [selectedDeliveryOption, setSelectedDeliveryOption] = useState<DeliveryOption>(
    DELIVERY_OPTIONS[0]
  );
  const [appliedPromo, setAppliedPromo] = useState<{
    code: string;
    discountPercentage: number;
    description: string;
  } | null>(null);

  // Sync items to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {
      // Ignore localStorage errors
    }
  }, [items]);

  const setActiveCurrency = (cur: 'BDT' | 'USD') => {
    setActiveCurrencyState(cur);
    try {
      localStorage.setItem(CURRENCY_KEY, cur);
    } catch {
      // Ignore
    }
  };

  const totalItemCount = items.reduce((sum, item) => sum + item.quantity, 0);

  const subtotalBDT = items.reduce(
    (sum, item) => sum + item.unitPriceBDT * item.quantity,
    0
  );

  const subtotalUSD = items.reduce(
    (sum, item) => sum + item.unitPriceUSD * item.quantity,
    0
  );

  const openBagDrawer = () => setIsBagDrawerOpen(true);
  const closeBagDrawer = () => setIsBagDrawerOpen(false);

  const addToCart = (
    product: Product,
    selectedColor: string,
    selectedSize: string,
    quantity = 1
  ) => {
    const compositeId = `${product.handle}-${selectedColor.toLowerCase().replace(/\s+/g, '-')}-${selectedSize.toLowerCase()}`;

    setItems((prevItems) => {
      const existingIndex = prevItems.findIndex((item) => item.id === compositeId);

      if (existingIndex > -1) {
        // Update existing item quantity
        const updated = [...prevItems];
        updated[existingIndex] = {
          ...updated[existingIndex],
          quantity: updated[existingIndex].quantity + quantity,
        };
        return updated;
      }

      // Add new item
      const newItem: CartItem = {
        id: compositeId,
        product,
        selectedColor,
        selectedSize,
        quantity,
        unitPriceBDT: product.price.amountBDT,
        unitPriceUSD: product.price.amountUSD,
      };

      return [newItem, ...prevItems];
    });

    setIsBagDrawerOpen(true);
  };

  const updateQuantity = (itemId: string, delta: number) => {
    setItems((prev) =>
      prev
        .map((item) => {
          if (item.id === itemId) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const setQuantity = (itemId: string, qty: number) => {
    if (qty <= 0) {
      removeItem(itemId);
      return;
    }
    setItems((prev) =>
      prev.map((item) => (item.id === itemId ? { ...item, quantity: qty } : item))
    );
  };

  const removeItem = (itemId: string) => {
    setItems((prev) => prev.filter((item) => item.id !== itemId));
  };

  const clearCart = () => {
    setItems([]);
  };

  const applyPromoCode = (rawCode: string) => {
    const result = evaluatePromoCode(rawCode);
    if (result.success && result.promo) {
      setAppliedPromo(result.promo);
    }
    return { success: result.success, message: result.message };
  };

  const removePromoCode = () => {
    setAppliedPromo(null);
  };

  return (
    <CartContext.Provider
      value={{
        items,
        totalItemCount,
        subtotalBDT,
        subtotalUSD,
        activeCurrency,
        setActiveCurrency,
        isBagDrawerOpen,
        openBagDrawer,
        closeBagDrawer,
        addToCart,
        updateQuantity,
        setQuantity,
        removeItem,
        clearCart,
        selectedDeliveryOption,
        setSelectedDeliveryOption,
        appliedPromo,
        applyPromoCode,
        removePromoCode,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
