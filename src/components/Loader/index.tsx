import React from 'react';
import { Circles } from 'react-loader-spinner';

const Loader = () => (
  <Circles
    height='100'
    width='100'
    color='#d44c0d'
    ariaLabel='circles-loading'
    wrapperClass='loading'
  />
);

export default Loader;
