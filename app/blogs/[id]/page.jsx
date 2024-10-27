'use client';
import { assets, blog_data } from '@/Assets/assets';
import Footer from '@/Components/Footer';
import axios from 'axios';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';

const Page = ({ params }) => { // Renamed to Page
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true); // State for loading
  const [error, setError] = useState(null); // State for error handling

  const fetchBlogData = async () => {
    try {
      const response = await axios.get('/api/blog', {
        params: { id: params.id }
      });
      setData(response.data);
    } catch (err) {
      setError('Failed to fetch blog data'); // Set error state
    } finally {
      setLoading(false); // Set loading to false regardless of outcome
    }
  };

  useEffect(() => {
    fetchBlogData();
  }, []); // Can leave as is, since fetchBlogData does not rely on any external values

  if (loading) {
    return <p>Loading...</p>; // Show loading state
  }

  if (error) {
    return <p>{error}</p>; // Show error message if there's an error
  }

  return data ? (
    <>
      <div className='bg-gray-200 py-5 px-5 md:px-12 lg:px-28'>
        <div className='flex justify-between items-center'>
          <Link href='/'>
            <Image src={assets.logo} width={180} alt='Website Logo' className='w-[130px] sm:w-auto' />
          </Link>
          <button className='flex items-center gap-2 font-medium py-1 px-3 sm:py-3 sm:px-6 border border-black shadow-[-7px_7px_0px_#000000]'>
            Get started <Image src={assets.arrow} alt='Arrow Icon' />
          </button>
        </div>
        <div className='text-center my-24'>
          <h1 className='text-2xl sm:text-5xl font-semibold max-w-[700px] mx-auto'>{data.title}</h1>
          <Image className='mx-auto mt-6 border border-white rounded-full' src={data.authorImg} width={60} height={60} alt='Author Image' />
          <p className='mt-1 pb-2 text-lg max-w-[740px] mx-auto'>{data.author}</p>
        </div>
      </div>
      <div className='mx-5 max-w-[800px] md:mx-auto mt-[-100px] mb-10'>
        <Image className='border-4 border-white' src={data.image} width={800} height={480} alt='Blog Image' />
        
        <div className='blog-content' dangerouslySetInnerHTML={{ __html: data.description }} />
        
        <div className='my-24'>
          <p className='text-black font font-semibold my-4'>Share this article on social media</p>
          <div className='flex'>
            <Image src={assets.facebook_icon} width={50} alt='Facebook Icon' />
            <Image src={assets.twitter_icon} width={50} alt='Twitter Icon' />
            <Image src={assets.googleplus_icon} width={50} alt='Google Plus Icon' />
          </div>
        </div>
      </div>
      <Footer />
    </>
  ) : <p>No data found.</p>; // Optionally handle no data case
};

export default Page; // Exporting the updated component name
