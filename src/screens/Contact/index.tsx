import React, { useEffect } from 'react';
import UseAnimations from 'react-useanimations';

import github from 'react-useanimations/lib/github';
import facebook from 'react-useanimations/lib/facebook';
import instagram from 'react-useanimations/lib/instagram';
import linkedin from 'react-useanimations/lib/linkedin';

import { IoLogoWhatsapp, IoMdMail } from 'react-icons/io';

import { Container, Section, AnimationContainer, IconsContainer, Icon } from './styles';

import Lottie from 'react-lottie';
import animation from '../../../public/lottie/37147-contact-us.json';
import { useTheme } from 'styled-components';

export function Contact() {
  const { colors } = useTheme();

  useEffect(() => {
    window.addEventListener('scroll', handleDetectOnScroll);
    return () => window.removeEventListener('scroll', handleDetectOnScroll);
  }, []);

  function handleDetectOnScroll() {
    const animation = document.getElementById('animation');
    const contactSection = document.getElementById('contact-section');

    if (
      contactSection.getBoundingClientRect().top + contactSection.getBoundingClientRect().top / 4 <
      window.innerHeight
    ) {
      animation.classList.add('animate');
      contactSection.classList.add('animate');
    }
  }

  function openLink(link: string) {
    window.open(link);
  }

  return (
    <Container>
      <AnimationContainer id="animation">
        <Lottie
          options={{
            animationData: animation,
            autoplay: true,
            loop: true,
          }}
        />
      </AnimationContainer>

      <Section id="contact-section">
        <h1>
          <span>&lt;</span>Contato<span>&gt;</span>
        </h1>
        <p>
          Espero que tenha gostado do meu portfólio. Caso queria entrar em contato, esses são os
          meios aonde posso ser encontrado.
        </p>

        <strong>
          <IoMdMail /> E-mail
        </strong>
        <a href="mailto:luismiguelfernandes.marcelo@gmail.com">
          luismiguelfernandes.marcelo@gmail.com
        </a>

        <strong>
          <IoLogoWhatsapp /> WhatsApp
        </strong>
        <a target="_blank" href="https://wa.me/+5516988018106">
          (16) 988081-8106
        </a>

        <strong>Redes sociais</strong>

        <IconsContainer>
          <Icon onClick={() => openLink('https://www.facebook.com/luismiguel.marcelo.1/')}>
            <UseAnimations animation={facebook} size={35} strokeColor={colors.textPrimary} />
          </Icon>

          <Icon onClick={() => openLink('https://www.github.com/lmiguelm')}>
            <UseAnimations animation={github} size={35} strokeColor={colors.textPrimary} />
          </Icon>

          <Icon onClick={() => openLink('https://www.instagram.com/lmiguel10/')}>
            <UseAnimations animation={instagram} size={35} strokeColor={colors.textPrimary} />
          </Icon>

          <Icon onClick={() => openLink('https://www.linkedin.com/in/lmiguelm/')}>
            <UseAnimations animation={linkedin} size={35} strokeColor={colors.textPrimary} />
          </Icon>
        </IconsContainer>
      </Section>
    </Container>
  );
}
