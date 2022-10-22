import { useRouter } from 'next/router';
import React from 'react';
import Layout from '../components/Layout';

const Unauthorized = () => {
    const router = useRouter();
    const {message} = router.query;
    return (
        <Layout title={'Unauthorized Page'}>
            <div className='flex flex-col justify-center items-center h-screen'>
            <h1 className='text-3xl font-bold'>Access Denied</h1> <br />
            {message && <div className='text-red-500 text-xl'>{message}</div>}
            </div>
        </Layout>
    );
};

export default Unauthorized;