// import styles from './index.module.css';
import { useEffect, useState } from 'react';
import { Layout } from '@next-mfe/shared-ui';
import { useLoginStore } from '@next-mfe/states';
import { ProductGrid } from '../../components/product/cards';
import { useProductStore } from '../../store/productStore';

type Product = {
  id: string;
  title: string;
  price: number;
  images: string[];
};

export default function Index() {
  const { productsList, setProductsList } = useProductStore();
  const { login } = useLoginStore();
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    if (productsList.length > 0) {
      setProducts(productsList);
    } else {
      fetch('/api/products/products')
        .then((res) => res.json())
        .then((products) => {
          setProductsList(products);
          setProducts(products);
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <Layout>
      {products.length === 0 ? (
        <div className="flex justify-center items-center py-8">
          <span className="animate-pulse text-gray-500">
            Loading products...
          </span>
        </div>
      ) : (
        <div>
          <div className="flex justify-between items-center p-4 bg-gray-100">
            User: {login.username || 'Guest'}
          </div>
          <ProductGrid products={products} />
        </div>
      )}
    </Layout>
  );
}
