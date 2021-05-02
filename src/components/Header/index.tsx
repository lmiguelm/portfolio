import NextLink from 'next/link';
import { useState } from 'react';
import { useStylesContext } from '../../contexts/StylesContext';

import { Container, Link } from './styles';

const container = {
  hidden: { opacity: 1, scale: 0 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      delayChildren: 0.3,
      staggerChildren: 0.2,
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

export const Header = () => {
  const { currentPage: active, handleCurrentPage } = useStylesContext();
  const [lastActive, setLastActive] = useState('');

  function handleMouseEnter() {
    handleCurrentPage('');
    setLastActive(active != '' ? active : lastActive);
  }

  function handleMouseLeave() {
    handleCurrentPage(lastActive != '' ? lastActive : active);
  }

  return (
    <Container
      variants={container}
      initial="hidden"
      animate="visible"
      onMouseLeave={handleMouseLeave}
    >
      <NextLink href="/">
        <Link
          className={active == 'home' ? 'active' : ''}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          variants={item}
        >
          Home
        </Link>
      </NextLink>

      <NextLink href="/about">
        <Link
          className={active == 'about' ? 'active' : ''}
          onMouseEnter={handleMouseEnter}
          // onMouseLeave={handleMouseLeave}
          variants={item}
        >
          Sobre
        </Link>
      </NextLink>

      <NextLink href="/projects">
        <Link
          className={active == 'projects' ? 'active' : ''}
          onMouseEnter={handleMouseEnter}
          // onMouseLeave={handleMouseLeave}
          variants={item}
        >
          Projetos
        </Link>
      </NextLink>

      <NextLink href="/contact">
        <Link
          className={active == 'contact' ? 'active' : ''}
          onMouseEnter={handleMouseEnter}
          // onMouseLeave={handleMouseLeave}
          variants={item}
        >
          Contato
        </Link>
      </NextLink>
    </Container>
  );
};
