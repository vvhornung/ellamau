import Layout from "@/components/Layout";
import { useEffect, useState } from "react";
import { format } from "date-fns";
import React from "react";

export default function OrdersPage() {
  const [orders, setOrders] = useState([]);
  const [expandedOrder, setExpandedOrder] = useState(null);
  const [orderTotal, setOrderTotal] = useState(0);

  useEffect(() => {
    fetch("/api/orders")
      .then((res) => res.json())
      .then((data) => {
        setOrders(data);
        const total = data.reduce((acc, order) => {
          return (
            acc +
            order.line_items.reduce((acc, product) => {
              return acc + product.price * product.quantity;
            }, 0)
          );
        }, 0);
        setOrderTotal(total);
      })
      .catch((error) => console.error(error));
  }, []);

  const toggleOrder = (orderId) => {
    if (expandedOrder === orderId) {
      setExpandedOrder(null);
    } else {
      setExpandedOrder(orderId);
    }
  };

  return (
    <Layout>
      <section className="container mx-auto py-8">
        <h1 className="text-3xl font-semibold mb-6 text-white">Orders</h1>
        <div className="overflow-x-auto shadow-md rounded-lg">
          <table className="min-w-full divide-y divide-gray-700 bg-zinc-800">
            <thead className="bg-zinc-700">
              <tr>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider"
                >
                  Date
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider"
                >
                  Customer
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider"
                >
                  Items
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider"
                >
                  Total
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider"
                >
                  Payment Status
                </th>
              </tr>
            </thead>
            <tbody className="bg-zinc-800 divide-y divide-gray-700">
              {orders.length > 0 ? (
                orders.map((order) => (
                  <React.Fragment key={order._id}>
                    <tr className="hover:bg-zinc-700">
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                        {format(
                          new Date(order.createdAt),
                          "MMM dd, yyyy HH:mm"
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                        <div className="capitalize font-bold text-gray-100">
                          {order.name}
                        </div>
                        <div className="text-gray-400">{order.email}</div>
                        {order.phone && (
                          <div className="text-gray-400">{order.phone}</div>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                        <div className="flex items-center gap-2">
                          <span>
                            {order.line_items.length}{" "}
                            {order.line_items.length === 1 ? "item" : "items"}
                          </span>
                          {order.line_items.length > 0 && (
                            <button
                              onClick={() => toggleOrder(order._id)}
                              className="btn-primary"
                            >
                              {expandedOrder === order._id ? "Hide" : "Show"}
                            </button>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                        ${orderTotal}
                      </td>
                      <td
                        className={`px-6 py-4 whitespace-nowrap text-sm ${
                          order.paid ? "text-green-400" : "text-red-400"
                        }`}
                      >
                        {order.paid ? "Paid" : "Not paid"}
                      </td>
                    </tr>
                    {expandedOrder === order._id && (
                      <tr >
                        <td  colSpan={5}>
                          <div className="bg-zinc-700 p-6 rounded-md shadow-md m-12">
                            <h3 className="text-3xl font-semibold mb-4 text-gray-100">
                              Order Items
                            </h3>
                            <table className="min-w-full">
                              <thead>
                                <tr className="text-left">
                                  <th className="py-2 text-sm font-semibold text-gray-300">
                                    Product
                                  </th>
                                  <th className="py-2 text-sm font-semibold text-gray-300">
                                    Quantity
                                  </th>
                                  <th className="py-2 text-sm font-semibold text-gray-300">
                                    Price
                                  </th>
                                </tr>
                              </thead>
                              <tbody>
                                {order.line_items.map((item, index) => (
                                  <tr
                                    key={index}
                                    className="border-t border-gray-600"
                                  >
                                    <td className="py-4">
                                      <div className="flex items-center">
                                        {item.image && (
                                          <img
                                            src={item.image}
                                            alt={item.name}
                                            className="w-12 h-12 object-cover rounded-md mr-4"
                                          />
                                        )}
                                        <div>
                                          <div className="font-medium text-gray-100">
                                            {item.name}
                                          </div>
                                          {item.variant && (
                                            <div className="text-sm text-gray-400">
                                              {item.variant.color &&
                                                `Color: ${item.variant.color}`}
                                              {item.variant.size &&
                                                ` | Size: ${item.variant.size}`}
                                            </div>
                                          )}
                                        </div>
                                      </div>
                                    </td>
                                    <td className="py-4 text-center text-gray-300">
                                      {item.quantity}
                                    </td>
                                    <td className="py-4 text-gray-300">
                                      ${item.price}
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                              <tfoot>
                                <tr className="font-semibold">
                                  <td
                                    colSpan={2}
                                    className="py-2 text-right text-gray-300"
                                  >
                                    Total:
                                  </td>
                                  <td className="py-2 text-gray-300">
                                    ${orderTotal}
                                  </td>
                                </tr>
                              </tfoot>
                            </table>

                            {order.address && (
                              <div className="mt-6">
                                <h3 className="text-3xl font-semibold mb-4 text-gray-100">
                                  Shipping Address
                                </h3>
                                <div className="text-gray-400">
                                  <div>
                                    <span className="text-white font-semibold">Address Line 1:</span>{" "}
                                    {order.address.line1}
                                  </div>
                                  {order.address.line2 && (
                                    <div>
                                      <span className="text-white font-semibold">Address Line 2:</span>{" "}
                                      {order.address.line2}
                                    </div>
                                  )}
                                  <div>
                                    <span className="text-white font-semibold">City:</span> {order.address.city}
                                  </div>
                                  <div>
                                    <span className="text-white font-semibold">Postal Code:</span> {order.address.postal_code}
                                  </div>
                                  <div><span className="text0white font-semibold">Country:</span> {order.address.country}</div>
                                </div>
                              </div>
                            )}
                          </div>
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={5}
                    className="px-6 py-4 text-center text-sm text-gray-300"
                  >
                    No orders found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>
    </Layout>
  );
}
