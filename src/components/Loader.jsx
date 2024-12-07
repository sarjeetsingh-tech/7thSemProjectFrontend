import React from 'react';
import CircularProgress from '@mui/material/CircularProgress';

function Loader() {
  return (
    <div className='flex mt-2'>
      <span class='sr-only'>Loading...</span>
      <div class='h-4 w-4 mr-1 bg-gray-300 rounded-full animate-bounce [animation-delay:-0.3s]'></div>
      <div class='h-4 w-4 mr-1 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.15s]'></div>
      <div class='h-4 w-4 mr-1 bg-gray-300 rounded-full animate-bounce'></div>
    </div>
  );
}

export default Loader;
