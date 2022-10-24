import axios from 'axios';
import { signIn, useSession } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import Layout from '../components/Layout';
import getError from '../utils/error';

const RegisterScreen = () => {
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
    handleSubmit, getValues,
    formState: { errors },
  } = useForm();

  const submitHandler = async ({ name, email, password }) => {
    try {
        await axios.post('/api/auth/signup', {
            name, email, password
        })
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
    <Layout title={'Register'}>
      <form
        className="mx-auto max-w-screen-md "
        onSubmit={handleSubmit(submitHandler)}
      >
        <h1 className="mb-4 text-xl">Register</h1>
        
        <div className="mb-4">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            {...register('name', {
              required: 'Please enter name'              
            })}
            className="w-full"
            id="name"
            autoFocus
          />
          {errors.name && (
            <div className="text-red-500">{errors.name.message}</div>
          )}
        </div>
        
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
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            type="password"
            {...register('confirmPassword', {
              required: 'Please repeat passwrod',
              validate: (value) => value === getValues('password'),
              minLength: {
                value: 6,
                message: 'Confirm Password must be greater than 6',
              },
              maxLength: {
                value: 12,
                message: 'Confirm Password must be less than or equal to 12',
              },
            })}
            className="w-full"
            id="confirmPassword"
            autoFocus
          />
          {errors.confirmPassword && (
            <div className="text-red-500">{errors.confirmPassword.message}</div>
          )}
          {errors.confirmPassword && errors.confirmPassword.type === 'validate' && (
            <div className="text-red-500">Password not matched</div>
          )}
        </div>

        <div className="mb-4">
          <button className="primary-button">Register</button>
        </div>
        <div className="mb-4">
          Already have an account?
          <Link href={`/register?redirect=${redirect || '/' }`}> Login Please</Link>
        </div>
      </form>
    </Layout>
  );
};

export default RegisterScreen;
