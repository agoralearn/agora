import React from 'react';
import './Section.scss';

export default function Section({ children }) {
  return <section className='Section_wrapper'>{children}</section>;
}
