import React, { TextareaHTMLAttributes } from 'react';

import { Container } from './styles';

interface ITextarea extends TextareaHTMLAttributes<HTMLTextAreaElement> {}

export function Textarea({ ...rest }: ITextarea) {
  return <Container {...rest}></Container>;
}
