import React, { useEffect, useRef, useState } from 'react';

import { GetStaticProps } from 'next';
import Head from 'next/head';

import { useElementScroll } from 'framer-motion';

import { useStylesContext } from '../contexts/StylesContext';

import {
  Container,
  FirstSection,
  InfoContainer,
  SecondSection,
  CardContainer,
} from '../styles/pages/about';

import { Card } from '../components/Card';
import { api } from '../services/api';
import { Button, ScrollButton } from '../styles/global';
import { FiChevronUp, FiChevronDown } from 'react-icons/fi';

type ISkill = {
  id: string;
  name: string;
  image: string;
  url: string;
  description: string;
};

type ITool = {
  id: string;
  name: string;
  image: string;
  url: string;
  description: string;
};

type IAboutProps = {
  tools: ITool[];
  skills: ISkill[];
};

export default function About({ tools, skills }: IAboutProps) {
  const [active, setActive] = useState(false);
  const [scroll, setScroll] = useState(0);

  const { handleCurrentPage, handleScroll } = useStylesContext();

  const containeRef = useRef() as React.MutableRefObject<HTMLDivElement>;
  const { scrollYProgress } = useElementScroll(containeRef);
  scrollYProgress.onChange(setScroll);

  useEffect(() => {
    handleCurrentPage('about');

    containeRef.current.addEventListener('scroll', () => {
      const section = document.getElementById('card-section');
      if (section.getBoundingClientRect().top < window.innerHeight) {
        setTimeout(() => {
          setActive(true);
        }, 200);
      } else {
        setTimeout(() => {
          setActive(false);
        }, 200);
      }
    });
  }, []);

  useEffect(() => {
    handleScroll(scroll);
  }, [scroll]);

  function goToTop() {
    console.log('entro');
    containeRef.current.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
  }

  function goToBottom() {
    console.log('entro2 ');
    containeRef.current.scroll({
      top: window.innerHeight - 80,
      left: 0,
      behavior: 'smooth',
    });
  }

  return (
    <>
      <Container ref={containeRef}>
        <Head>
          <title>&lt; Sobre /&gt;</title>
        </Head>

        <FirstSection>
          <div></div>

          <InfoContainer>
            <h1>
              <span>&lt;</span>Luis Miguel Fernandes Marcelo<span>&gt;</span>
            </h1>
            <p>
              Tenho 19 anos, sou de Araraquara, interior do estado de São Paulo. Comecei a programar
              em 2018, no curso técnico em informática no IFSP, que conclui em dezembro de 2019.
              Autalmente estou cursando o 3º semestre em Análise e Desenvolvimento de Sistemas na
              UNIP e sou Analista de Desenolvimento Júnior na Move Mais.
            </p>
            <p>
              Sou apaixonado por desenvolvimento web, principalmente em tecnologias que utilizam
              Javascript, como React.js, Next.js, React-Native, Vue.js e Node. Sempre estou em busca
              de novos desafios e conhecimentos, seja em cursos ou em treinamentos.
            </p>

            <a target="_blank" href="/docs/LuisMiguel.pdf">
              <Button>Ver currículo</Button>
            </a>
          </InfoContainer>
        </FirstSection>

        <SecondSection id="card-section" className={active ? 'active' : ''}>
          <CardContainer
            initial={{
              scale: 0,
            }}
            animate={{
              scale: 1,
            }}
            transition={{
              duration: 1,
            }}
          >
            <div className="info">
              <h1>Habilidades</h1>
              <span>Tecnologias que utilizo profissionalmente e mais estudo no dia a dia.</span>
            </div>
            <div className="card">
              {skills.map((skill) => (
                <Card data={skill} key={skill.id} />
              ))}
            </div>
          </CardContainer>

          <CardContainer
            initial={{
              scale: 0,
            }}
            animate={{
              scale: 1,
            }}
            transition={{
              duration: 1,
            }}
          >
            <div className="card">
              {tools.map((tool) => (
                <Card data={tool} key={tool.id} />
              ))}
            </div>
            <div className="info">
              <h1>Ferramentas</h1>
              <span>Principais ferramentas que utilizo no desenvolvimento de novos projetos.</span>
            </div>
          </CardContainer>
        </SecondSection>
      </Container>

      {active ? (
        <ScrollButton onClick={goToTop}>
          <FiChevronUp size={40} />
        </ScrollButton>
      ) : (
        <ScrollButton onClick={goToBottom}>
          <FiChevronDown size={40} />
        </ScrollButton>
      )}
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const skills = await api.get<ISkill[]>('/skills');
  const tools = await api.get<ITool[]>('/tools');

  return {
    props: {
      skills: skills.data,
      tools: tools.data,
    },
    revalidate: 60 * 60 * 8,
  };
};
