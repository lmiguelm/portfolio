import { MotionProps } from 'framer-motion';

import { Container, Link } from './styles';

const container = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    transition: {
      delayChildren: 0,
      staggerChildren: 0.1,
    },
  },
};

const item = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
  },
};

type Props = MotionProps;

export const PublicHeader = (props: Props) => {
  return (
    <Container {...props} variants={container} initial="hidden" animate="visible">
      <Link href="#" variants={item}>
        Home
      </Link>

      <Link href="#about" variants={item}>
        Sobre
      </Link>

      <Link href="#projects" variants={item}>
        Projetos
      </Link>

      <Link href="#contact" variants={item}>
        Contato
      </Link>
    </Container>
  );
};
