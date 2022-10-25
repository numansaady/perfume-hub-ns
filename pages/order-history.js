import axios from 'axios';
import Link from 'next/link';
import React, { useEffect, useReducer } from 'react';
import Layout from '../components/Layout';
import { getError } from '../utils/error';

const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true, error: '' };

    case 'FETCH_SUCCESS':
      return { ...state, loading: false, orders: action.payload, error: '' };

    case 'FETCH_FAIL':
      return { ...state, loading: false, error: action.payload };

    default:
      return state;
  }
};

const OrderHistoryScreen = () => {
  const [{ loading, error, orders }, dispatch] = useReducer(reducer, {
    loading: true,
    orders: [],
    error: '',
  });

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        dispatch({ type: 'FETCH_REQUEST' });
        const { data } = await axios.get('/api/orders/history');
        dispatch({ type: 'FETCH_SUCCESS', payload: data });
      } catch (err) {
        dispatch({ type: 'FETCH_FAIL', payload: getError(err) });
      }
    };
    fetchOrder();
  }, []);

  return (
    <Layout title={'Order History'}>
      <h1 className='mb-4 text-xl'>Order History</h1>
      {loading ? (
        <div>Loading...</div>
      ) : error ? (
        <dib className="alert-error">{error}</dib>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead className="border-b">
              <tr>
                <td className="px-5 text-left">ID</td>
                <td className="p-5 text-left">Date</td>
                <td className="p-5 text-left">Total</td>
                <td className="p-5 text-left">Paid</td>
                <td className="p-5 text-left">Delivered</td>
                <td className="p-5 text-left">Action</td>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order._id} className="border-b">
                  <td className="p-5">{order._id.substring(20, 24)}</td>
                  <td className="p-5">{order.createdAt.substring(0, 10)}</td>
                  <td className="p-5">${order.totalPrice}</td>
                  <td className="p-5">
                    {order.isPaid
                      ? `${order.paidAt.substring(0, 10)}`
                      : 'Not paid'}
                  </td>
                  <td className="p-5">
                    {order.isDelivered
                      ? `${order.deliveredAt.substring(0, 10)}`
                      : 'Not delivered'}
                  </td>
                  <td className='p-5'>
                    <Link href={`/order/${order._id}`} passHref>
                        <a>Details</a>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </Layout>
  );
};

OrderHistoryScreen.auth = true;
export default OrderHistoryScreen;
