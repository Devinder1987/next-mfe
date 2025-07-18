import React from 'react';
import Image from 'next/image';

type Product = {
  id: string;
  title: string;
  price: number;
  images: string[];
};

type ProductCardProps = {
  product: Product;
};

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const [qty, setQty] = React.useState(1);
  const handleAddToCart = (id: string) => {
    fetch('/api/products/addtocart', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id, qty: 1 }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          alert('Product added to cart successfully!');
        } else {
          alert('Failed to add product to cart: ' + data.message);
        }
      })
      .catch((error) => {
        console.error('Error adding product to cart:', error);
        alert('An error occurred while adding the product to the cart.');
      });
  };

  return (
    <div className="rounded-lg p-4 shadow hover:shadow-lg transition text-center">
      <Image
        src={product.images[0]}
        alt={product.title}
        width={128}
        height={128}
        className="m-auto mb-4 rounded object-cover"
      />
      <h2 className="text-lg font-semibold mb-2 text-center">
        {product.title}
      </h2>
      <p className="text-gray-700 mb-4">${product.price.toFixed(2)}</p>
      <div className="flex flex-row justify-center">
        <div className="flex items-center justify-center mb-4 border border-gray-300 rounded-md">
          <button
            type="button"
            className="px-2 py-1 bg-gray-200 rounded-l hover:bg-gray-300"
            onClick={() => setQty((prev) => Math.max(1, prev - 1))}
            aria-label="Decrease quantity"
          >
            -
          </button>
          <input
            type="number"
            min={1}
            step={1}
            value={qty}
            onChange={(e) => {
              const val = Math.max(1, Math.floor(Number(e.target.value) || 1));
              setQty(val);
            }}
            className="w-12 text-center  outline-none"
          />
          <button
            type="button"
            className="px-2 py-1 bg-gray-200 rounded-r hover:bg-gray-300"
            onClick={() => setQty((prev) => prev + 1)}
            aria-label="Increase quantity"
          >
            +
          </button>
        </div>
        <button
          className="bg-blue-600 text-white px-4 ml-8 h-9 rounded-md hover:bg-blue-700 transition"
          onClick={() => handleAddToCart(product.id)}
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

type ProductGridProps = {
  products: Product[];
};

export const ProductGrid: React.FC<ProductGridProps> = ({ products }) => (
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
    {products.map((product) => (
      <ProductCard key={product.id} product={product} />
    ))}
  </div>
);
