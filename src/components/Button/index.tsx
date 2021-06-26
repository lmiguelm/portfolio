import React, { ButtonHTMLAttributes } from 'react';

import { Container } from './styles';

interface IButton extends ButtonHTMLAttributes<HTMLButtonElement> {
  title: string;
}

export function Button({ title, ...rest }: IButton) {
  return <Container {...rest}>{title}</Container>;
}
