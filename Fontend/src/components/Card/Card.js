import React from 'react';
import './Card.css';

const Card = ({ children, title }) => (
  <div className='Card'>
    {title && <h2>{title}</h2>}
    {children}
  </div>
);

export default Card;