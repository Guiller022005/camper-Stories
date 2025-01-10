import React, { Suspense } from 'react';

const LazySection = ({ children }) => {
  return (
    <Suspense 
      fallback={
        <div className="w-full h-48 rounded-lg my-4 bg-gradient-to-r from-gray-800/5 via-gray-800/10 to-gray-800/5 animate-pulse">
          <div className="w-full h-full bg-gradient-to-r from-transparent via-gray-800/10 to-transparent animate-shimmer"/>
        </div>
      }
    >
      {children}
    </Suspense>
  );
};

export default LazySection;