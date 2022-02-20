import React, { useEffect } from 'react';
import Typewriter from 'typewriter-effect/dist/core';

import github from 'react-useanimations/lib/github';
import facebook from 'react-useanimations/lib/facebook';
import instagram from 'react-useanimations/lib/instagram';
import linkedin from 'react-useanimations/lib/linkedin';

import { AnimatedIcon } from '../AnimatedIcon';

import { Container, Title, Name, Description, IconsContainer } from './styles';

const variants = {
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

export function Greeting() {
  useEffect(() => {
    const typing = document.getElementById('typing');

    const typewriter = new Typewriter(typing, {
      loop: true,
    });

    typewriter
      .typeString('Web.')
      .pauseFor(1000)
      .deleteAll()
      .typeString('Next.js')
      .pauseFor(1000)
      .deleteAll()
      .typeString('React.js')
      .pauseFor(1000)
      .deleteAll()
      .typeString('React Native')
      .pauseFor(1000)
      .deleteAll()
      .start();
  }, []);

  return (
    <Container>
      <Title>Olá,</Title>

      <Name>
        Eu sou <span>&lt;Luis Miguel&gt;</span>
      </Name>

      <Description>
        Desenvolvedor <span id="typing"></span>
      </Description>

      <IconsContainer variants={variants}>
        <AnimatedIcon animation={github} link="https://github.com/lmiguelm" />
        <AnimatedIcon animation={facebook} link="https://www.facebook.com/luismiguel.marcelo.1/" />
        <AnimatedIcon animation={instagram} link="https://www.instagram.com/lmiguelm_/" />
        <AnimatedIcon animation={linkedin} link="https://www.linkedin.com/in/lmiguelm/" />
      </IconsContainer>
    </Container>
  );
}
