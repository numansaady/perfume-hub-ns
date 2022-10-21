/* eslint-disable react/no-unescaped-entities */
import { useSession } from 'next-auth/react';
import Head from 'next/head';
import Link from 'next/link';
import { useContext, useEffect, useState } from 'react';
import { Store } from '../utils/Store';

const Layout = ({ title, children }) => {
  const {status, data: session} = useSession()
  const { state } = useContext(Store);
  const [cartItemCount, setCartItemCount] = useState(0);
  const { cart } = state;
  useEffect(() => {
    setCartItemCount(cart.cartItems.reduce((a, c) => a + c.quantity, 0));
  }, [cart.cartItems]);

  return (
    <>
      <Head>
        <title>{title ? title + '- Perfume Hub' : 'Perfume Hub'}</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="flex min-h-screen flex-col justify-between">
        <header>
          <nav className="flex h-12 justify-between items-center shadow-md">
            <Link href={'/'}>
              <a className="text-lg font-bold p-4">perfume-hub</a>
            </Link>

            <div>
              <Link href={'/women-perfume'}>
                <a className="p-2">Women's Perfume</a>
              </Link>
              <Link href={'/men-perfume'}>
                <a className="p-2">Men's Perfume</a>
              </Link>
              <Link href={'/attar'}>
                <a className="p-2">Attar</a>
              </Link>
              <Link href={'/brands'}>
                <a className="p-2">Brands</a>
              </Link>
              <Link href={'/special-offers'}>
                <a className="p-2">Special Offers</a>
              </Link>
              <Link href={'/cart'}>
                <a className="p-2">
                  Cart
                  {cartItemCount > 0 && (
                    <span className="ml-1 rounded-full px-2 py-1 bg-red-600 text-xs font-bold text-white">
                      {cartItemCount}
                    </span>
                  )}
                </a>
              </Link>
              {
                status === 'loading'? ('Loading')
                : session?.user ? 
                session.user.name  
                : 
              <Link href={'/login'}>
                <a className="p-2">Login</a>
              </Link>
              }
            </div>
          </nav>
        </header>
        <main className="container m-auto mt-4 px-4">{children}</main>

        <footer className="flex justify-center items-center h-10 shadow-inner">
          <p>Copyright &copy; 2022 Perfume Hub</p>
        </footer>
      </div>
    </>
  );
};

export default Layout;
