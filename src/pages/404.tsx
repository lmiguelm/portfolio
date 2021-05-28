import { useEffect } from 'react';

import Head from 'next/head';

import { useAuth } from '../contexts/AuthContext';

import Lottie from 'react-lottie';

import { Container } from '../styles/pages/404';

import animation from '../../public/lottie/16294-404-space-error.json';

export default function Custom404() {
  const { handleSetHeader } = useAuth();

  useEffect(() => {
    handleSetHeader('public');
  }, []);

  return (
    <>
      <Head>
        <title>&lt; Error /&gt;</title>
      </Head>

      <Container>
        <Lottie
          options={{
            animationData: animation,
            autoplay: true,
            loop: true,
          }}
        />
      </Container>
    </>
  );
}
