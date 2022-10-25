import Cookies from 'js-cookie';
import { useRouter } from 'next/router';
import React, { useContext, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import CheckoutWizard from '../components/CheckoutWizard';
import Layout from '../components/Layout';
import { Store } from '../utils/Store';

const ShippingScreen = () => {
    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm();
    
    const { state, dispatch } = useContext(Store);
    const {cart} = state;
    const {shippingAddress} = cart;
    const router = useRouter()

    useEffect(() => {
      setValue('fullname', shippingAddress.fullname);
      setValue('address', shippingAddress.address);
      setValue('city', shippingAddress.city);
      setValue('postalCode', shippingAddress.postalCode);
      setValue('country', shippingAddress.country);
    }, [setValue, shippingAddress])
    
    const submitHandler = ({ fullname, address, city, postalCode, country }) => {
      dispatch({
        type: 'SAVE_SHIPPING_ADDRESS',
        payload: { fullname, address, city, postalCode, country },
      });
      Cookies.set(
        'cart',
        JSON.stringify({
          ...cart,
          shippingAddress: {
            fullname,
            address,
            city,
            postalCode,
            country,
          },
        })
      );
  
      router.push('/payment');
    };
    
  return (
    <Layout title="Shipping Address">
      <CheckoutWizard activeStep={1} />

      <form
        className="mx-auto max-w-screen-md"
        onSubmit={handleSubmit(submitHandler)}
      >
        <h1 className="mb-4 text-xl">Shipping Address</h1>
        <div className="mb-4">
          <label htmlFor="fullname">Full Name</label>
          <input
            type="text"
            className="w-full"
            id="fullname"
            autoFocus
            {...register('fullname', { required: 'Please enter Full Name' })}
          />
          {errors.fullname && (
            <div className="text-red-500">{errors.fullname.message}</div>
          )}
        </div>
        <div className="mb-4">
          <label htmlFor="address">Address</label>
          <input
            type="text"
            className="w-full"
            id="address"
            autoFocus
            {...register('address', {
              required: 'Please enter Address',
              minLength: {
                value: 5,
                message: 'Address more than 4 characters',
              },
            })}
          />
          {errors.address && (
            <div className="text-red-500">{errors.address.message}</div>
          )}
        </div>
        <div className="mb-4">
          <label htmlFor="city">City</label>
          <input
            type="text"
            className="w-full"
            id="city"
            autoFocus
            {...register('city', { required: 'Please enter City' })}
          />
          {errors.city && (
            <div className="text-red-500">{errors.city.message}</div>
          )}
        </div>
        <div className="mb-4">
          <label htmlFor="postalCode">Postal Code</label>
          <input
            type="text"
            className="w-full"
            id="postalCode"
            autoFocus
            {...register('postalCode', {
              required: 'Please enter Postal Code',
            })}
          />
          {errors.postalCode && (
            <div className="text-red-500">{errors.postalCode.message}</div>
          )}
        </div>
        <div className="mb-4">
          <label htmlFor="country">Country</label>
          <input
            type="text"
            className="w-full"
            id="country"
            autoFocus
            {...register('country', { required: 'Please enter country' })}
          />
          {errors.country && (
            <div className="text-red-500">{errors.country.message}</div>
          )}
        </div>
        <div className="mb-4 flex justify-between">
          <button className="primary-button">
            Next
          </button>
        </div>
      </form>
    </Layout>
  );
};

ShippingScreen.auth = true;
export default ShippingScreen;
