import { useEffect } from 'react';
import Lottie from 'react-lottie';

import Link from 'next/link';
import Head from 'next/head';

import UseAnimations from 'react-useanimations';

import github from 'react-useanimations/lib/github';
import facebook from 'react-useanimations/lib/facebook';
import instagram from 'react-useanimations/lib/instagram';
import linkedin from 'react-useanimations/lib/linkedin';

import { Button } from '../styles/global';

import {
  Container,
  InfoContainer,
  AnimationContainer,
  IconsContainer,
  Icon,
} from '../styles/pages/home';

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

import animation from '../public/lottie/59446-black-guy-animation.json';
import { useStylesContext } from '../contexts/StylesContext';
import { GetStaticProps } from 'next';

export default function Home() {
  const { handleCurrentPage, handleScroll } = useStylesContext();

  useEffect(() => {
    handleCurrentPage('home');
    handleScroll(0);
  }, []);

  function openLink(link: string) {
    window.open(link);
  }

  return (
    <Container initial="hidden" animate="visible">
      <Head>
        <title>Home</title>
      </Head>

      <InfoContainer>
        <h2>Olá,</h2>
        <h1>
          Eu sou <span>Luis Miguel</span>
        </h1>
        <h2>Desenvolvedor web.</h2>

        <IconsContainer variants={container}>
          <Icon
            variants={item}
            onClick={() => openLink('https://www.facebook.com/luismiguel.marcelo.1/')}
          >
            <UseAnimations animation={facebook} size={40} strokeColor="#fff" />
          </Icon>

          <Icon variants={item} onClick={() => openLink('https://www.github.com/lmiguelm')}>
            <UseAnimations animation={github} size={40} strokeColor="#fff" />
          </Icon>

          <Icon variants={item} onClick={() => openLink('https://www.instagram.com/lmiguel10/')}>
            <UseAnimations animation={instagram} size={40} strokeColor="#fff" />
          </Icon>

          <Icon variants={item} onClick={() => openLink('https://www.linkedin.com/in/lmiguelm/')}>
            <UseAnimations animation={linkedin} size={40} strokeColor="#fff" />
          </Icon>
        </IconsContainer>

        <Link href="/about">
          <Button type="button">Saiba mais</Button>
        </Link>
      </InfoContainer>

      <AnimationContainer>
        <Lottie
          options={{
            animationData: animation,
            autoplay: true,
            loop: true,
          }}
        />
      </AnimationContainer>
    </Container>
  );
}

const getStaticProps: GetStaticProps = async () => {
  return {
    props: {},
  };
};
function handleScroll(scroll: { (options?: ScrollToOptions): void; (x: number, y: number): void }) {
  throw new Error('Function not implemented.');
}
