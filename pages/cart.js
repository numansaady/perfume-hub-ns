import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useContext } from 'react';
import { HiOutlineXCircle } from 'react-icons/hi';
import Layout from '../components/Layout';
import { Store } from '../utils/Store';

const CartScreen = () => {
  const { state, dispatch } = useContext(Store);
  const {
    cart: { cartItems },
  } = state;

  const router = useRouter()

  const removeItemHandler = (item) => {
    dispatch({type: 'CART_REMOVE_ITEM', payload: item})
  }
  return (
    <Layout title={'Shopping Cart'}>
      <h1 className="text-4xl text-center mb-8">Shopping Cart</h1>
      {cartItems.length === 0 ? (
        <div>
          Cart is empty, You can buy from
          <Link href={'/product'}>
            <a>Shopping Page</a>
          </Link>
        </div>
      ) : (
        <div className="grid md:grid-cols-4 md:gap-3">
          <div className="overflow-x-auto md:col-span-3">
            <table className="min-w-full">
              <thead className="border-b">
                <tr>
                  <th className="px-5 text-left">Item</th>
                  <th className="p-5 text-right">Quantity</th>
                  <th className="p-5 text-right">Price</th>
                  <th className="p-5 text-center">Action</th>
                </tr>
              </thead>
              <tbody>
                {cartItems.map((item) => (
                  <tr key={item.slug} className="border-b">
                    <td>
                      <Link href={`/product/${item.slug}`}>
                        <a className="flex items-center">
                          <Image
                            src={item.image}
                            alt={item.name}
                            width={50}
                            height={50}
                          ></Image>
                          &nbsp;
                          {item.name}
                        </a>
                      </Link>
                    </td>
                    <td className='p-5 text-right'>{item.quantity}</td>
                    <td className='p-5 text-right'>${item.price}</td>
                    <td className='p-5 text-center'>
                        <button onClick={()=> removeItemHandler(item)}>
                        <HiOutlineXCircle className='h-5 w-5'/>
                        </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className='card p-5'>
              <ul>
                <li>
                  <div className='pb-3'>Subtotal ( {cartItems.reduce((a, c) => a + c.quantity, 0)} ) {' '} : ${cartItems.reduce((a, c) => a + c.quantity * c.price, 0)}
                  </div>
                </li>
                <li>
                  <button onClick={()=> router.push('/shipping')} className='primary-button w-full'>Check Out</button>
                </li>
              </ul>
          </div>
        </div>
      )}
    </Layout>
  );
};

export default CartScreen;
