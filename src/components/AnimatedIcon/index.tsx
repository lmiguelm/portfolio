import React from 'react';
import UseAnimations from 'react-useanimations';
import { useTheme } from 'styled-components';

import { Container } from './styles';

type Props = {
  link: string;
  animation: any;
  color?: string;
};

const item = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
  },
};

export function AnimatedIcon({ link, animation, color }: Props) {
  const { colors } = useTheme();

  function handleOpenLink(link: string) {
    window.open(link);
  }

  return (
    <Container variants={item} onClick={() => handleOpenLink(link)}>
      <UseAnimations
        animation={animation}
        size={40}
        strokeColor={color ? color : colors.colorSecondary}
      />
    </Container>
  );
}
