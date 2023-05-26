'use client'
 
import { useEffect } from 'react';
 
export default function Error({error,reset}: { error: Error; reset: () => void; } ) {
  useEffect(() => {
    console.error(error);
  }, [error]);
 
  return (
    <div className='h-[75vh] space-y-3 flex flex-col justify-center items-center w-screen text-center'>
      <h1 className='text-2xl md:text-3xl text-blue-600 font-bold text-center'>
        Something went wrong!
      </h1>
      <button
        onClick={ () => reset() }
        className='button'
      >
        Try again
      </button>
    </div>
  );
}