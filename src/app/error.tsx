'use client'
 
import { useEffect } from 'react';
 
export default function Error({error,reset}: { error: Error; reset: () => void; } ) {
  useEffect(() => {
    console.error(error);
  }, [error]);
 
  return (
    <div className='h-screen flex flex-col justify-center items-center w-screen'>
      <h1 className='text-3xl text-blue-600 font-bold'>
        Something went wrong!
      </h1>
      <button
        onClick={ () => reset() }
        className='button'
      >
        Reload
      </button>
    </div>
  );
}