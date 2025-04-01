import React from 'react';
import Hero from './Hero';

const Test: React.FC = () => {
  return (
    <div className="bg-white p-8">
      <h1 className="text-black mb-4">Testing Hero Component</h1>
      <Hero name="Alyssa Marie D. Stevenson" />
    </div>
  );
};

export default Test; 