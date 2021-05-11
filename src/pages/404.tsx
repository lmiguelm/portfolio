import Lottie from 'react-lottie';

import { Container } from '../styles/pages/404';

import animation from '../../public/lottie/16294-404-space-error.json';

export default function Custom404() {
  return (
    <Container>
      <Lottie
        options={{
          animationData: animation,
          autoplay: true,
          loop: true,
        }}
        // height={500}
        // width={500}
      />
    </Container>
  );
}
