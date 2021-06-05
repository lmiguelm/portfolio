import { FormEvent } from 'react';

import { Container } from './styles';
import { Blur } from '../../styles/global';

import { FiX } from 'react-icons/fi';

type IModalProps = {
  children: React.ReactNode;
  handleSubmit(e: FormEvent): void;
  closeModal(): void;
};

export function Modal({ children, handleSubmit, closeModal }: IModalProps) {
  return (
    <>
      <Container onSubmit={handleSubmit}>
        <FiX color="#fff" onClick={closeModal} />

        <div>{children}</div>
      </Container>
      <Blur />
    </>
  );
}
