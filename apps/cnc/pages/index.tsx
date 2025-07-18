export function Index() {
  /*
   * Replace the elements below with your own.
   *
   * Note: The corresponding styles are in the ./index.tailwind file.
   */
  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          window.location.href = '/orderconfirmation?orderid=1';
        }}
        className="max-w-md mx-auto p-6 bg-white rounded shadow"
      >
        <h2 className="text-xl font-bold mb-4">Checkout</h2>

        {/* Address Section */}
        <div className="mb-4">
          <label className="block mb-1 font-medium">Address</label>
          <input
            type="text"
            required
            placeholder="Enter your address"
            className="w-full border px-3 py-2 rounded"
          />
        </div>

        {/* Payment Section */}
        <div className="mb-4">
          <label className="block mb-1 font-medium">Payment</label>
          <input
            type="text"
            required
            placeholder="Card Number"
            className="w-full border px-3 py-2 rounded mb-2"
          />
          <input
            type="text"
            required
            placeholder="Expiry Date"
            className="w-full border px-3 py-2 rounded mb-2"
          />
          <input
            type="text"
            required
            placeholder="CVV"
            className="w-full border px-3 py-2 rounded"
          />
        </div>

        {/* Checkout CTA */}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Checkout
        </button>
      </form>
    </div>
  );
}

export default Index;
