import { useEffect, useRef, useState } from 'react';
import { GetStaticProps } from 'next';
import Head from 'next/head';

import { motion, useElementScroll } from 'framer-motion';

import Lottie from 'react-lottie';
import animation from '../public/lottie/36185-animation-about-seo-dashboard.json';

import { useStylesContext } from '../contexts/StylesContext';

import {
  Container,
  FirstSection,
  InfoContainer,
  AnimationContainer,
  CardContainer,
} from '../styles/pages/about';

import { Card } from '../components/Card';
import { api } from '../services/api';

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
  const [scroll, setScroll] = useState(0);

  const { handleCurrentPage, handleScroll } = useStylesContext();

  const containeRed = useRef();
  const { scrollYProgress } = useElementScroll(containeRed);
  scrollYProgress.onChange(setScroll);

  useEffect(() => {
    handleScroll(scroll);
  }, [scroll]);

  useEffect(() => {
    handleCurrentPage('about');
  }, []);

  return (
    <Container ref={containeRed}>
      <Head>
        <title>Sobre</title>
      </Head>

      <FirstSection>
        <AnimationContainer>
          <Lottie
            options={{
              animationData: animation,
              autoplay: true,
              loop: true,
            }}
          />
        </AnimationContainer>

        <InfoContainer
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
          <h1>Luis Miguel Fernandes Marcelo</h1>
          <p>
            Tenho 19 anos, sou de Araraquara, interior do estado de São Paulo. Comecei a programar
            em 2018, no curso técnico em informática no IFSP, que conclui em dezembro de 2019.
            Autalmente estou cursando o 3º semestre em Análise e Desenvolvimento de Sistemas na UNIP
            e sou Analista de Desenolvimento Júnior na Move Mais.
          </p>
          <p>
            Sou apaixonado por desenvolvimento web, principalmente em tecnologias que utilizam
            Javascript, como React.js, Next.js, React-Native, Vue.js e Node. Sempre estou em busca
            de novos desafios e conhecimentos, seja em cursos ou em treinamentos.
          </p>
        </InfoContainer>
      </FirstSection>

      <CardContainer>
        <div className="info">
          <motion.h1
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
            Minhas habilidades
          </motion.h1>
          <span>Algumas habilidades que mais estudo e utilizo profissionalmente.</span>
        </div>
        <div className="card">
          {skills.map((skill) => (
            <Card data={skill} key={skill.id} />
          ))}
        </div>
      </CardContainer>

      <CardContainer>
        <div className="card">
          {tools.map((tool) => (
            <Card data={tool} key={tool.id} />
          ))}
        </div>
        <div className="info">
          <motion.h1
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
            Ferramentas
          </motion.h1>
          <span>Algumas ferramentas que utilizo para auxiliar no desenvolvimento.</span>
        </div>
      </CardContainer>
    </Container>
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
  };
};
