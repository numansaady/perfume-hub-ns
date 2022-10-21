import { signIn, useSession } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import Layout from '../components/Layout';
import getError from '../utils/error';

const LoginScreen = () => {
  const {data: session} = useSession();
  const router = useRouter();
  const {redirect} = router.query;
  
  useEffect(()=>{
    if(session?.user){
      router.push(redirect || '/')
    }
  },[router, session, redirect])
  
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const submitHandler = async ({ email, password }) => {
    try {
      const result = await signIn('credentials', {
        redirect: false,
        email,
        password,
      });
      if(result.error){
        toast.error(result.error)
      }
    } catch (error) {
      toast.error(getError(error))
    }
  };

  return (
    <Layout title={'Login'}>
      <form
        className="mx-auto max-w-screen-md "
        onSubmit={handleSubmit(submitHandler)}
      >
        <h1 className="mb-4 text-xl">Login</h1>
        <div className="mb-4">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            {...register('email', {
              required: 'Please enter an email',
              pattern: {
                value:
                  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/i,
                message: 'Please enter valid email',
              },
            })}
            className="w-full"
            id="email"
            autoFocus
          />
          {errors.email && (
            <div className="text-red-500">{errors.email.message}</div>
          )}
        </div>

        <div className="mb-4">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            {...register('password', {
              required: 'Please enter passwrod',
              minLength: {
                value: 6,
                message: 'Password must be greater than 6',
              },
              maxLength: {
                value: 12,
                message: 'Password must be less than or equal to 12',
              },
            })}
            className="w-full"
            id="password"
            autoFocus
          />
          {errors.password && (
            <div className="text-red-500">{errors.password.message}</div>
          )}
        </div>

        <div className="mb-4">
          <button className="primary-button">Login</button>
        </div>
        <div className="mb-4">
          Don&apos;t have an account?
          <Link href="/register"> Register Please</Link>
        </div>
      </form>
    </Layout>
  );
};

export default LoginScreen;
