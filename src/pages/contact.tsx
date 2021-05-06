import { useEffect } from 'react';
import { useStylesContext } from '../contexts/StylesContext';

import UseAnimations from 'react-useanimations';

import github from 'react-useanimations/lib/github';
import facebook from 'react-useanimations/lib/facebook';
import instagram from 'react-useanimations/lib/instagram';
import linkedin from 'react-useanimations/lib/linkedin';

import {
  Container,
  Section,
  AnimationContainer,
  IconsContainer,
  Icon,
} from '../styles/pages/contact';

import Lottie from 'react-lottie';
import animation from '../public/lottie/37147-contact-us.json';
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

export default function Contact() {
  const { handleCurrentPage, handleScroll } = useStylesContext();

  useEffect(() => {
    handleCurrentPage('contact');
    handleScroll(0);
  }, []);

  function openLink(link: string) {
    window.open(link);
  }

  return (
    <Container>
      <AnimationContainer>
        <Lottie
          options={{
            animationData: animation,
            autoplay: true,
            loop: true,
          }}
        />
      </AnimationContainer>

      <Section>
        <h1>Contato</h1>
        <p>
          Espero que tenha gostado do meu portfólio. Caso queria entrar em contato, esses são os
          meios aonde posso ser encontrado.
        </p>

        <strong>E-mail</strong>
        <a href="mailto:luismiguelfernandes.marcelo@gmail.com">
          luismiguelfernandes.marcelo@gmail.com
        </a>

        <strong>Redes sociais</strong>
        <IconsContainer variants={container}>
          <Icon
            variants={item}
            onClick={() => openLink('https://www.facebook.com/luismiguel.marcelo.1/')}
          >
            <UseAnimations animation={facebook} size={35} strokeColor="#fff" />
          </Icon>

          <Icon variants={item} onClick={() => openLink('https://www.github.com/lmiguelm')}>
            <UseAnimations animation={github} size={35} strokeColor="#fff" />
          </Icon>

          <Icon variants={item} onClick={() => openLink('https://www.instagram.com/lmiguel10/')}>
            <UseAnimations animation={instagram} size={35} strokeColor="#fff" />
          </Icon>

          <Icon variants={item} onClick={() => openLink('https://www.linkedin.com/in/lmiguelm/')}>
            <UseAnimations animation={linkedin} size={35} strokeColor="#fff" />
          </Icon>
        </IconsContainer>
      </Section>
    </Container>
  );
}
