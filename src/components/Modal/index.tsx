import { HTMLAttributes } from 'react';

import { Container } from './styles';
import { Blur } from '../../styles/global';

import { FiX } from 'react-icons/fi';

type IModalProps = HTMLAttributes<HTMLFormElement> & {
  children: React.ReactNode;
  closeModal(): void;
};

export function Modal({ children, closeModal, ...rest }: IModalProps) {
  return (
    <>
      <Container {...rest}>
        <FiX color="red" className="close" onClick={closeModal} />

        <main>{children}</main>
      </Container>
      <Blur />
    </>
  );
}
