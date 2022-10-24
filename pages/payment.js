import Cookies from 'js-cookie';
import { useRouter } from 'next/router';
import React, { useContext, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import CheckoutWizard from '../components/CheckoutWizard';
import Layout from '../components/Layout';
import { Store } from '../utils/Store';

const PaymentScreen = () => {
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('');
  const router = useRouter();
  const { state, dispatch } = useContext(Store);
  const { cart } = state;
  const { shippingAddress, paymentMethod } = cart;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!selectedPaymentMethod) {
      return toast.error('Payment Method is required');
    }
    dispatch({ type: 'SAVE_PAYMENT_METHOD', payload: selectedPaymentMethod });
    Cookies.set(
      'cart',
      JSON.stringify({
        ...cart,
        paymentMethod: selectedPaymentMethod,
      })
    );
    router.push('/placeorder');
  };

  useEffect(() => {
    if (!shippingAddress.address) {
      return router.push('/shipping');
    }
    setSelectedPaymentMethod(paymentMethod || '');
  }, [paymentMethod, router, shippingAddress.address]);

  return (
    <Layout title={'Payment Page'}>
      <CheckoutWizard activeStep={2} />

      <form className="mx-auto max-w-screen-md" onSubmit={handleSubmit}>
        <h1 className="mb-4 text-xl">Payment Method</h1>
        {['Paypal', 'Stripe', 'Bkash', 'Nagad', 'Rocket', 'Mkash'].map(
          (payment) => (
            <div className="mb-4" key={payment}>
              <input
                type="radio"
                className="p-2 outline-none focus:ring-0"
                name="paymentMethod"
                id={payment}
                checked={selectedPaymentMethod === payment}
                onChange={() => setSelectedPaymentMethod(payment)}
              />
              <label className="p-2" htmlFor={payment}>
                {payment}
              </label>
            </div>
          )
        )}
        <div className="mb-4 flex justify-between">
          <button
            className="default-button"
            onClick={() => router.push('/shipping')}
          >
            Back
          </button>
          <button className="primary-button">Next</button>
        </div>
      </form>
    </Layout>
  );
};

PaymentScreen.auth = true;
export default PaymentScreen;
