import React from 'react';
import Layout from '@theme/Layout';
import { Login } from '../features/Auth/Login/Login';
import useAuthParams from '../hooks/useAuthParams';
import { useEffect } from 'react';
import { Redirect, useLocation } from '@docusaurus/router';
import useAuthContext from '../hooks/useAuthContext';

export default function Auth(): JSX.Element {
  const { search } = useLocation(); // to get the search params
  const { is_logged_in } = useAuthContext();
  const { checkUrlParams } = useAuthParams();

  useEffect(() => {
    checkUrlParams(search);
  }, [checkUrlParams, search]);

  if (is_logged_in) {
    return <Redirect to={'/'} />;
  }

  return (
    <Layout title='Auth' description='Deriv API documentation'>
      <main>
        <Login />
      </main>
    </Layout>
  );
}
