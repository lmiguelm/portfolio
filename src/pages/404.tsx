import Lottie from 'react-lottie';

import Head from 'next/head';
import { Header } from '../components/ExternalHeader';

import { Container } from '../styles/pages/404';

import animation from '../../public/lottie/16294-404-space-error.json';

export default function Custom404() {
  return (
    <>
      <Head>
        <title>&lt; Error /&gt;</title>
      </Head>

      <Header />

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
