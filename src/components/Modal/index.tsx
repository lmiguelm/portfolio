import { FormEvent } from 'react';

import { Container } from './styles';
import { Blur } from '../../styles/global';

import { FiX } from 'react-icons/fi';

type IModalProps = {
  children: React.ReactNode;
  handleSubmit(e: FormEvent): void;
};

export function Modal({ children, handleSubmit }: IModalProps) {
  return (
    <>
      <Container onSubmit={handleSubmit}>
        <FiX />

        <div>{children}</div>
      </Container>
      <Blur />
    </>
  );
}
