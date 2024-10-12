declare module 'react-rating' {
    import React from 'react';
  
    interface RatingProps {
      emptySymbol: React.ReactNode;
      fullSymbol: React.ReactNode;
      initialRating?: number;
      onChange?: (value: number) => void;
    }
  
    const Rating: React.FC<RatingProps>;
  
    export default Rating;
  }