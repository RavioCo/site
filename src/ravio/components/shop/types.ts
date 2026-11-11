import { CategorySlug } from '../../types/product';

export interface FilterState {
  categories: CategorySlug[];
  sizes: string[];
  colors: string[];
  priceRange: 'all' | 'under-7000' | '7000-9000' | 'over-9000';
  inStockOnly: boolean;
}

export type SortOption = 'featured' | 'newest' | 'price-low' | 'price-high';

export const INITIAL_FILTER_STATE: FilterState = {
  categories: [],
  sizes: [],
  colors: [],
  priceRange: 'all',
  inStockOnly: false,
};
