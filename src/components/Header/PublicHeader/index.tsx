import NextLink from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';

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

type ILink = 'home' | 'about' | 'projects' | 'contact';

export const PublicHeader = () => {
  const router = useRouter();

  const initialActive = router.asPath === '/' ? 'home' : (router.asPath.replace('/', '') as ILink);

  const [active, setActive] = useState<ILink>(initialActive);

  function handleActiveLink(link: 'home' | 'about' | 'projects' | 'contact') {
    setActive(link);
  }

  return (
    <Container variants={container} initial="hidden" animate="visible">
      <NextLink href="/">
        <Link
          className={active === 'home' ? 'active' : ''}
          variants={item}
          onClick={() => handleActiveLink('home')}
        >
          Home
        </Link>
      </NextLink>

      <NextLink href="/about">
        <Link
          className={active === 'about' ? 'active' : ''}
          variants={item}
          onClick={() => handleActiveLink('about')}
        >
          Sobre
        </Link>
      </NextLink>

      <NextLink href="/projects">
        <Link
          className={active === 'projects' ? 'active' : ''}
          variants={item}
          onClick={() => handleActiveLink('projects')}
        >
          Projetos
        </Link>
      </NextLink>

      <NextLink href="/contact">
        <Link
          className={active === 'contact' ? 'active' : ''}
          variants={item}
          onClick={() => handleActiveLink('contact')}
        >
          Contato
        </Link>
      </NextLink>
    </Container>
  );
};
