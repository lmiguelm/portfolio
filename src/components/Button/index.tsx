import React, { HTMLAttributes, ReactNode } from 'react';

import { Container } from './styles';

type IButton = HTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
  type?: 'button' | 'submit';
};

export function Button({ type = 'button', children, ...rest }: IButton) {
  return (
    <Container type={type} {...rest}>
      {children}
    </Container>
  );
}
