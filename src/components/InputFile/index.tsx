import React, { HTMLAttributes, ReactNode } from 'react';
import { FiPlus } from 'react-icons/fi';
import { useTheme } from 'styled-components';

import { Input, Container, Title } from './styles';

type InputFile = HTMLAttributes<HTMLInputElement> & {
  children?: ReactNode;
  title: string;
};

export function InputFile({ title, children, ...rest }: InputFile) {
  const { colors } = useTheme();

  return (
    <>
      <Title>{title}</Title>
      <Container>
        <Input htmlFor={rest.id}>
          <FiPlus color={colors.backgroundPrimary} />
          <input type="file" {...rest} />
        </Input>

        {children}
      </Container>
    </>
  );
}
