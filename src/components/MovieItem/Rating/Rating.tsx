import React from 'react';
import './Rating.scss';

type RatingProps = {
  rating: number;
  className: string;
};

type ColorByRate = {
  [key: number]: string;
};

const colorByRate: ColorByRate = {
  0: '#E90000',
  3: '#E97E00',
  5: '#E9D100',
  7: '#66E900',
};

const Rating: React.FC<RatingProps> = ({ rating, className }) => {
  const rate = parseFloat(rating.toFixed(1));
  const borderColor =
    rate < 3 ? colorByRate[0] : rate < 5 ? colorByRate[3] : rate < 7 ? colorByRate[5] : colorByRate[7];
  const styles = {
    border: `2px solid ${borderColor}`,
  };
  return (
    <div style={styles} className={`rating ${className}`}>
      {rate}
    </div>
  );
};

export default Rating;
