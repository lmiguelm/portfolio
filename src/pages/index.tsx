import { useEffect } from 'react';
import UseAnimations from 'react-useanimations';

import Lottie from 'react-lottie';
import animation from '../../public/lottie/59446-black-guy-animation.json';

import format from 'date-fns/format';
import ptBR from 'date-fns/locale/pt-BR';

import { GetStaticProps } from 'next';
import Link from 'next/link';
import Head from 'next/head';

import github from 'react-useanimations/lib/github';
import facebook from 'react-useanimations/lib/facebook';
import instagram from 'react-useanimations/lib/instagram';
import linkedin from 'react-useanimations/lib/linkedin';

import { Button } from '../styles/global';
import { useStylesContext } from '../contexts/StylesContext';

import {
  Container,
  InfoContainer,
  AnimationContainer,
  IconsContainer,
  Icon,
} from '../styles/pages/home';
import { useFetch } from '../lib/fecther';
import { motion } from 'framer-motion';

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

export default function Home() {
  const { data } = useFetch('/api/views-preview', false);

  const { handleCurrentPage, handleScroll } = useStylesContext();

  const currentDate = format(new Date(), 'EEEEEE, d MMMM', { locale: ptBR });

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
        <title>&lt; Home /&gt;</title>
      </Head>

      <InfoContainer>
        <h2>Olá,</h2>
        <h1>
          Eu sou <span> &lt;Luis Miguel&gt;</span>
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

      {data && (
        <motion.span
          className="view"
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
          }}
          transition={{
            duration: 1,
          }}
        >
          {currentDate} - <strong>{Number(data).toLocaleString('pt-br')}</strong> visitas
        </motion.span>
      )}
    </Container>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  return {
    props: {},
  };
};
