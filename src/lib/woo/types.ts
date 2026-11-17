/** Minimal Store API shapes actually used. Verify against the WooCommerce version you install. */
export interface WcPrices { price: string; regular_price: string; sale_price: string; currency_code: string; currency_minor_unit: number }
export interface WcImage { id: number; src: string; thumbnail?: string; srcset?: string; sizes?: string; name?: string; alt?: string }
export interface WcTerm { id: number; name: string; slug: string }
export interface WcProduct {
  id: number; name: string; slug: string; type: string; sku: string;
  description: string; short_description: string;
  prices: WcPrices; on_sale: boolean;
  images: WcImage[]; categories: WcTerm[];
  attributes: { id: number; name: string; taxonomy: string; has_variations: boolean; terms: WcTerm[] }[];
  variations: { id: number; attributes: { name: string; value: string }[] }[];
  is_purchasable: boolean; is_in_stock: boolean; is_on_backorder: boolean; low_stock_remaining: number | null;
}
export interface WcCategory { id: number; name: string; slug: string; count: number; parent: number }
export interface WcCartItem {
  key: string; id: number; name: string; quantity: number;
  variation: { attribute: string; value: string }[];
  images: WcImage[]; permalink?: string;
  prices: WcPrices; totals: { line_total: string; currency_minor_unit: number; currency_code: string };
  quantity_limits: { minimum: number; maximum: number; editable: boolean };
}
export interface WcShippingRate { rate_id: string; name: string; price: string; selected: boolean; delivery_time?: string; currency_code: string; currency_minor_unit: number }
export interface WcCart {
  items: WcCartItem[]; items_count: number; needs_shipping: boolean;
  coupons: { code: string; totals: { total_discount: string } }[];
  shipping_rates: { package_id: number | string; shipping_rates: WcShippingRate[] }[];
  totals: { total_items: string; total_discount: string; total_shipping: string | null; total_tax: string; total_price: string; currency_code: string; currency_minor_unit: number };
  errors?: { code: string; message: string }[];
}
export interface MarketsResponse {
  base_currency: string;
  countries: { code: string; name: string; states: Record<string, string>; payment_methods: { id: string; title: string }[] }[];
}
