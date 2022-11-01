import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import Layout from '../../components/Layout';

const Dashboard = ({children}) => {
  const router = useRouter()
  return (
    <Layout title={'Dashboard'}>
      <div className="drawer drawer-mobile drawer-end -mt-4">
        <input id="drawer-sidebar-mobile" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content flex flex-col items-center justify-center">
          {/* <!-- Page content here --> */}
          <div>
            <h1>Welcome to Dashboard</h1>
          </div>
          {children}
        </div>
        <div className="drawer-side">
          <label htmlFor="drawer-sidebar-mobile" className="drawer-overlay"></label>
          <ul className="menu p-4 overflow-y-auto w-80 bg-base-100 text-base-content">
            {/* <!-- Sidebar content here --> */}
            <li className={router.pathname == '/dashboard/add-product' ? 'btn btn-active btn-info rounded' : ''}>
              <Link href={'/dashboard/add-product'}><a>Add Product</a></Link>
            </li>
            <li>
              <a>Update Product</a>
            </li>
            <li>
              <a>Manage Products</a>
            </li>
            <li>
              <a>Manage Orders</a>
            </li>
            <li>
              <a>Order History</a>
            </li>
            <li>
              <a>Manage Cart</a>
            </li>
          </ul>
        </div>
      </div>
    </Layout>
  );
};

Dashboard.auth = true;
export default Dashboard;
