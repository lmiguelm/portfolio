import NextLink from 'next/link';
import { useState } from 'react';
import { useStylesContext } from '../../contexts/StylesContext';

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

export const Header = () => {
  const { currentPage: active, handleCurrentPage, scrollProgress } = useStylesContext();
  const [lastActive, setLastActive] = useState('');

  function handleMouseEnter() {
    setLastActive(active != '' ? active : lastActive);
    handleCurrentPage('');
  }

  function handleMouseLeave() {
    handleCurrentPage(active != '' ? active : lastActive);
  }

  return (
    <Container
      variants={container}
      initial="hidden"
      animate="visible"
      onMouseLeave={handleMouseLeave}
      className={scrollProgress > 0 ? 'scrolling' : ''}
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
          variants={item}
        >
          Sobre
        </Link>
      </NextLink>

      <NextLink href="/projects">
        <Link
          className={active == 'projects' ? 'active' : ''}
          onMouseEnter={handleMouseEnter}
          variants={item}
        >
          Projetos
        </Link>
      </NextLink>

      <NextLink href="/contact">
        <Link
          className={active == 'contact' ? 'active' : ''}
          onMouseEnter={handleMouseEnter}
          variants={item}
        >
          Contato
        </Link>
      </NextLink>
    </Container>
  );
};
