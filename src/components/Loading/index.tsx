import { HTMLAttributes } from 'react';

import { Container } from './styles';

import Lottie from 'react-lottie';
import loading from '../../../public/lottie/loading.json';

type ILoading = HTMLAttributes<HTMLDivElement>;

export function Loading(props: ILoading) {
  return (
    <Container {...props}>
      <Lottie
        options={{
          animationData: loading,
          autoplay: true,
          loop: true,
        }}
        height={300}
        width={300}
        speed={1}
      />
    </Container>
  );
}
