import React from 'react';
import { useRouter } from 'next/router';

const OrderConfirmation: React.FC = () => {
  const router = useRouter();
  const { orderNumber } = router.query;

  const handleGoHome = () => {
    router.push('/');
  };

  return (
    <div className="text-center mt-16">
      <h1 className="text-2xl font-bold mb-4">Thank You for Your Order!</h1>
      <p className="mb-2">Your order has been successfully placed.</p>
      {orderNumber && (
        <p className="mb-4">
          <strong>Order Number:</strong> {orderNumber}
        </p>
      )}
      <button
        className="mt-8 px-8 py-3 text-base cursor-pointer bg-blue-600 text-white rounded hover:bg-blue-700 transition"
        onClick={handleGoHome}
      >
        Go to Home Page
      </button>
    </div>
  );
};

export default OrderConfirmation;
