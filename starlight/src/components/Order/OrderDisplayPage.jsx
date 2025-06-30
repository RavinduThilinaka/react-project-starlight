import { useState, useEffect } from 'react';

const OrderDisplayPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch('http://localhost:3001/api/getOrder');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        
        // Debugging: Log the API response
        console.log('API Response:', data);

        // Handle different response formats
        let ordersArray = [];
        if (Array.isArray(data)) {
          ordersArray = data;
        } else if (data && Array.isArray(data.orders)) {
          ordersArray = data.orders;
        } else if (data && Array.isArray(data.data)) {
          ordersArray = data.data;
        } else if (data && typeof data === 'object') {
          // If single order is returned, wrap it in an array
          ordersArray = [data];
        } else {
          throw new Error('Unexpected API response format');
        }

        setOrders(ordersArray);
      } catch (err) {
        console.error('Fetch error:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading your orders...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="bg-white p-6 rounded-lg shadow-md max-w-md w-full">
          <div className="text-red-500 mb-4">
            <svg className="h-10 w-10 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-center text-gray-900 mb-2">Error Loading Orders</h3>
          <p className="text-gray-600 text-center mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md transition duration-200"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  // Ensure orders is always an array before mapping
  const safeOrders = Array.isArray(orders) ? orders : [];

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Your Orders</h1>
          <p className="text-gray-600">Review your purchase history</p>
        </div>

        {safeOrders.length === 0 ? (
          <div className="bg-white p-8 rounded-lg shadow-sm text-center">
            <svg
              className="mx-auto h-16 w-16 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1}
                d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
              />
            </svg>
            <h3 className="mt-4 text-lg font-medium text-gray-900">No orders found</h3>
            <p className="mt-2 text-gray-500">You haven't placed any orders yet.</p>
            <button className="mt-6 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
              Start Shopping
            </button>
          </div>
        ) : (
          <div className="space-y-6">
            {safeOrders.map((order) => {
              // Ensure items is always an array
              const orderItems = Array.isArray(order.items) ? order.items : [];
              
              return (
                <div
                  key={order.id || order._id || `order-${Math.random().toString(36).substr(2, 9)}`}
                  className="bg-white overflow-hidden shadow rounded-lg divide-y divide-gray-200"
                >
                  <div className="px-4 py-5 sm:px-6 flex flex-col sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <h3 className="text-lg leading-6 font-medium text-gray-900">
                        Order #{order.orderNumber || order.id || 'N/A'}
                      </h3>
                      <p className="mt-1 text-sm text-gray-500">
                        Placed on {order.date ? new Date(order.date).toLocaleDateString() : 'N/A'}
                      </p>
                    </div>
                    <div className="mt-3 sm:mt-0">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          order.status === 'completed' || order.status === 'delivered'
                            ? 'bg-green-100 text-green-800'
                            : order.status === 'processing' || order.status === 'shipped'
                            ? 'bg-yellow-100 text-yellow-800'
                            : order.status === 'cancelled' || order.status === 'refunded'
                            ? 'bg-red-100 text-red-800'
                            : 'bg-blue-100 text-blue-800'
                        }`}
                      >
                        {order.status ? order.status.charAt(0).toUpperCase() + order.status.slice(1) : 'Processing'}
                      </span>
                    </div>
                  </div>

                  <div className="px-4 py-5 sm:p-6">
                    <h4 className="text-md font-medium text-gray-900 mb-4">Items</h4>
                    <ul className="divide-y divide-gray-200">
                      {orderItems.length > 0 ? (
                        orderItems.map((item) => (
                          <li key={item.id || item._id || `item-${Math.random().toString(36).substr(2, 9)}`} className="py-4">
                            <div className="flex items-start">
                              <div className="flex-shrink-0 h-16 w-16 rounded-md overflow-hidden bg-gray-100">
                                <img
                                  className="h-full w-full object-cover"
                                  src={item.image || '/placeholder-product.png'}
                                  alt={item.name || 'Product'}
                                  onError={(e) => {
                                    e.target.src = '/placeholder-product.png';
                                  }}
                                />
                              </div>
                              <div className="ml-4 flex-1">
                                <div className="flex items-start justify-between">
                                  <div>
                                    <h5 className="text-sm font-medium text-gray-900">
                                      {item.name || 'Unnamed Product'}
                                    </h5>
                                    <p className="mt-1 text-xs text-gray-500">
                                      SKU: {item.sku || 'N/A'}
                                    </p>
                                  </div>
                                  <p className="ml-4 text-sm font-medium text-gray-900">
                                    ${item.price ? item.price.toFixed(2) : '0.00'}
                                  </p>
                                </div>
                                <div className="mt-2 flex items-center justify-between">
                                  <p className="text-xs text-gray-500">
                                    Quantity: {item.quantity || 1}
                                  </p>
                                  <p className="text-xs font-medium text-gray-900">
                                    Total: ${(item.price && item.quantity ? (item.price * item.quantity) : 0).toFixed(2)}
                                  </p>
                                </div>
                              </div>
                            </div>
                          </li>
                        ))
                      ) : (
                        <li className="py-4 text-center text-sm text-gray-500">
                          No items found in this order
                        </li>
                      )}
                    </ul>
                  </div>

                  <div className="px-4 py-4 sm:px-6 bg-gray-50">
                    <div className="flex flex-col space-y-3">
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Subtotal</span>
                        <span className="text-sm font-medium text-gray-900">
                          ${order.subtotal ? order.subtotal.toFixed(2) : '0.00'}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Shipping</span>
                        <span className="text-sm font-medium text-gray-900">
                          ${order.shipping ? order.shipping.toFixed(2) : '0.00'}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Tax</span>
                        <span className="text-sm font-medium text-gray-900">
                          ${order.tax ? order.tax.toFixed(2) : '0.00'}
                        </span>
                      </div>
                      <div className="flex justify-between pt-3 border-t border-gray-200">
                        <span className="text-base font-semibold text-gray-900">Total</span>
                        <span className="text-base font-semibold text-gray-900">
                          ${order.total ? order.total.toFixed(2) : '0.00'}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderDisplayPage;