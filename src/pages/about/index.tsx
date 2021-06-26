import React, { useEffect, useRef, useState } from 'react';

import { GetStaticProps } from 'next';
import Head from 'next/head';

import { useElementScroll } from 'framer-motion';

import { Container, FirstSection, InfoContainer, SecondSection, CardContainer } from './styles';

import { FiChevronDown } from 'react-icons/fi';

import Typewriter from 'typewriter-effect/dist/core';

import { Card } from '../../components/Card';

import { api } from '../../services/api';

import { ITool } from '../../../types/lmiguelm/ITools';
import { ISkill } from '../../../types/lmiguelm/ISkills';

import { useStylesContext } from '../../hooks/useStyles';
import { useAuth } from '../../hooks/useAuth';
import { Button } from '../../components/Button';
import { ScrollButton } from '../../components/ScrollButton';

type IAboutProps = {
  tools: ITool[];
  skills: ISkill[];
};

export default function About({ tools, skills }: IAboutProps) {
  const [scroll, setScroll] = useState(0);

  const { handleCurrentPage, handleScroll } = useStylesContext();

  const containeRef = useRef() as React.MutableRefObject<HTMLDivElement>;
  const { scrollYProgress } = useElementScroll(containeRef);
  scrollYProgress.onChange(setScroll);

  const { handleSetHeader } = useAuth();

  useEffect(() => {
    handleSetHeader('public');
    handleCurrentPage('about');
  }, []);

  useEffect(() => {
    handleScroll(scroll);
  }, [scroll]);

  useEffect(() => {
    const skill = document.getElementById('skill');
    const tool = document.getElementById('tool');

    const writerSkill = new Typewriter(skill, {
      loop: true,
    });

    const writerTool = new Typewriter(tool, {
      loop: true,
    });

    writerSkill
      .typeString('_Habilidades')
      .pauseFor(2000)
      .deleteAll()
      .typeString('_Skills')
      .pauseFor(2000)
      .deleteAll()
      .start();

    writerTool
      .typeString('Ferramentas_')
      .pauseFor(2000)
      .deleteAll()
      .typeString('Tools_')
      .pauseFor(2000)
      .deleteAll()
      .start();
  }, []);

  function goToTop() {
    containeRef.current.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
  }

  function goToBottom() {
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
              <Button title="Ver currículo" />
            </a>
          </InfoContainer>
        </FirstSection>

        <SecondSection id="card-section" className={scroll !== 0 ? 'active' : ''}>
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
              <h1 id="skill"></h1>
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
              <h1 id="tool"></h1>
            </div>
          </CardContainer>
        </SecondSection>
      </Container>

      <ScrollButton onClick={scroll !== 0 ? goToTop : goToBottom}>
        <FiChevronDown color="#fff" className={scroll !== 0 ? 'rotate' : ''} size={40} />
      </ScrollButton>
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
