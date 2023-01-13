import React from 'react';
import Layout from '@theme/Layout';
import { Login } from '../components/Login/Login';

export default function Home(): JSX.Element {
  return (
    <Layout title={'Auth'} description='Deriv API documentation'>
      <main>
        <Login />
      </main>
    </Layout>
  );
}
