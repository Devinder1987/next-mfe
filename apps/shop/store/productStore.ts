import { create } from 'zustand';

type Product = {
  id: string;
  title: string;
  price: number;
  images: string[];
};

type ProductState = {
  productsList: Product[];
  setProductsList: (products: Product[]) => void;
};

export const useProductStore = create<ProductState>((set) => ({
  productsList: [],
  setProductsList: (productsList) => set({ productsList }),
}));
