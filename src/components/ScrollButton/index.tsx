import React, { ButtonHTMLAttributes } from 'react';
import { ReactNode } from 'react';

import { Container } from './styles';

interface IScrollButton extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
}

export function ScrollButton({ children, ...rest }: IScrollButton) {
  return (
    <Container type="button" {...rest}>
      {children}
    </Container>
  );
}
