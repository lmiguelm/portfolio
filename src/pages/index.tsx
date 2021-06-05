import { useEffect, useState } from 'react';
import UseAnimations from 'react-useanimations';

import Lottie from 'react-lottie';
import animation from '../../public/lottie/59446-black-guy-animation.json';
import toggleTheme from '../../public/lottie/toggleTheme.json';

import format from 'date-fns/format';
import ptBR from 'date-fns/locale/pt-BR';

import { GetStaticProps } from 'next';
import Head from 'next/head';

import github from 'react-useanimations/lib/github';
import facebook from 'react-useanimations/lib/facebook';
import instagram from 'react-useanimations/lib/instagram';
import linkedin from 'react-useanimations/lib/linkedin';

import { useStylesContext } from '../contexts/StylesContext';

import Typewriter from 'typewriter-effect/dist/core';

import {
  Container,
  InfoContainer,
  AnimationContainer,
  IconsContainer,
  Icon,
} from '../styles/pages/home';
import { useFetch } from '../lib/fecther';
import { motion } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';
import { loadTheme } from '../utils/theme';
import { useTheme } from 'styled-components';

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

type IHomeProps = {
  toggleThemeApplication: () => void;
  isDarkTheme: boolean;
};

export default function Home({ toggleThemeApplication, isDarkTheme }: IHomeProps) {
  const { data } = useFetch('/api/views-preview', false);
  const { colors } = useTheme();

  const { handleCurrentPage, handleScroll } = useStylesContext();

  const currentDate = format(new Date(), 'EEEEEE, d MMMM', { locale: ptBR });

  const { handleSetHeader } = useAuth();

  const [direction, setDirection] = useState<number>(1);
  const [loadedTheme, setLoadedTheme] = useState(false);

  useEffect(() => {
    const theme = loadTheme();
    setDirection(theme === 'dark' ? 1 : -1);
    setLoadedTheme(true);
  }, []);

  useEffect(() => {
    handleSetHeader('public');
    handleCurrentPage('home');
    handleScroll(0);

    const typing = document.getElementById('typing');

    const typewriter = new Typewriter(typing, {
      loop: true,
    });

    typewriter
      .typeString('Web.')
      .pauseFor(1000)
      .deleteAll()
      .typeString('Next JS.')
      .pauseFor(1000)
      .deleteAll()
      .typeString('React JS.')
      .pauseFor(1000)
      .deleteAll()
      .typeString('React Native.')
      .pauseFor(1000)
      .deleteAll()
      .typeString('Vue JS.')
      .pauseFor(1000)
      .deleteAll()
      .typeString('Node JS.')
      .pauseFor(1000)
      .deleteAll()
      .start();
  }, []);

  function openLink(link: string) {
    window.open(link);
  }

  function handleToggleTheme() {
    setDirection(direction > 0 ? -1 : 1);
    toggleThemeApplication();
  }

  return (
    <>
      <Container initial="hidden" animate="visible">
        <Head>
          <title>&lt; Home /&gt;</title>
        </Head>

        <InfoContainer>
          <h2>Olá,</h2>
          <h1>
            Eu sou <span>&lt;Luis Miguel&gt;</span>
          </h1>
          <h2>
            Desenvolvedor <span id="typing"></span>
          </h2>

          <IconsContainer variants={container}>
            <Icon
              variants={item}
              onClick={() => openLink('https://www.facebook.com/luismiguel.marcelo.1/')}
            >
              <UseAnimations animation={facebook} size={40} strokeColor={colors.textPrimary} />
            </Icon>

            <Icon variants={item} onClick={() => openLink('https://www.github.com/lmiguelm')}>
              <UseAnimations animation={github} size={40} strokeColor={colors.textPrimary} />
            </Icon>

            <Icon variants={item} onClick={() => openLink('https://www.instagram.com/lmiguel10/')}>
              <UseAnimations animation={instagram} size={40} strokeColor={colors.textPrimary} />
            </Icon>

            <Icon variants={item} onClick={() => openLink('https://www.linkedin.com/in/lmiguelm/')}>
              <UseAnimations animation={linkedin} size={40} strokeColor={colors.textPrimary} />
            </Icon>
          </IconsContainer>
        </InfoContainer>

        <AnimationContainer>
          <Lottie
            options={{
              animationData: animation,
              autoplay: true,
              loop: true,
            }}
            style={{
              userSelect: 'none',
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

        {loadedTheme && (
          <span
            style={{
              cursor: 'pointer',
              position: 'absolute',
              bottom: 0,
              margin: '2.5rem',
              userSelect: 'none',
            }}
            onClick={handleToggleTheme}
          >
            <Lottie
              options={{
                animationData: toggleTheme,
                autoplay: false,
                loop: false,
              }}
              speed={1}
              direction={direction}
              style={{
                userSelect: 'none',
                pointerEvents: 'none',
              }}
            />
          </span>
        )}
      </Container>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  return {
    props: {},
  };
};
