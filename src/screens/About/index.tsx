import React, { useEffect } from 'react';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import Typewriter from 'typewriter-effect/dist/core';
import { ISkill } from '../../../@types/lmiguelm/skills';
import { ITool } from '../../../@types/lmiguelm/tools';
import { Button } from '../../components/Button';
import { Card } from '../../components/Card';
import { getMyAge } from '../../utils/birthDate';
import {
  ApresentationContainer,
  Container,
  Content,
  History,
  Name,
  SkillsContainer,
  Title,
  ToolsContainer,
  Wrapper,
} from './styles';

type Props = {
  skills: ISkill[];
  tools: ITool[];
};

const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 9,
    slidesToSlide: 3, // optional, default to 1.
  },
  tablet: {
    breakpoint: { max: 1366, min: 768 },
    items: 5,
    slidesToSlide: 2, // optional, default to 1.
  },
  mobile: {
    breakpoint: { max: 768, min: 0 },
    items: 4,
    slidesToSlide: 1, // optional, default to 1.
  },
};

export function About({ skills, tools }: Props) {
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

  useEffect(() => {
    window.addEventListener('scroll', handleDetectOnScroll);
    return () => window.removeEventListener('scroll', handleDetectOnScroll);
  }, []);

  function handleDetectOnScroll() {
    const element = document.getElementById('apresentation');

    if (
      element.getBoundingClientRect().top + element.getBoundingClientRect().top / 4 <
      window.innerHeight
    ) {
      element.classList.add('animate-apresentation');
    }
  }

  return (
    <Container>
      <Wrapper>
        <ApresentationContainer id="apresentation">
          <Name>
            <span>&lt;</span>Sobre<span>&gt;</span>
          </Name>

          <History>
            Tenho {getMyAge()} anos, sou de Araraquara, interior do estado de São Paulo. Comecei a
            programar em 2018, no curso técnico em informática no{' '}
            <a target="_blank" href="https://www.arq.ifsp.edu.br">
              IFSP
            </a>
            , que conclui em dezembro de 2019. Sou formado em Análise e Desenvolvimento de Sistemas
            na{' '}
            <a target="_blank" href="https://www.unip.br">
              UNIP
            </a>{' '}
            , e atualmente atuo como Desenvolvedor Pleno na{' '}
            <a target="_blank" href="https://cpj.e1c.myftpupload.com/">
              5by5 Soluções em Sistemas
            </a>
            .
          </History>

          <History>
            Sou apaixonado por desenvolvimento web, principalmente em tecnologias que utilizam
            Javascript, como React.js, Next.js, React-Native, Vue.js e Node. Sempre estou em busca
            de novos desafios e conhecimentos, seja em cursos ou em treinamentos.
          </History>

          <a className="button-link" target="_blank" href="/docs/LuisMiguel.pdf">
            <Button>Ver currículo</Button>
          </a>
        </ApresentationContainer>
      </Wrapper>

      <Content>
        <SkillsContainer>
          <Title id="skill"></Title>

          <Carousel swipeable autoPlay responsive={responsive} infinite>
            {skills.map((tool) => (
              <Card key={tool.id} data={tool} />
            ))}
          </Carousel>
        </SkillsContainer>

        <ToolsContainer>
          <Title id="tool"></Title>

          <Carousel swipeable autoPlay responsive={responsive} infinite>
            {tools.map((tool) => (
              <Card key={tool.id} data={tool} />
            ))}
          </Carousel>
        </ToolsContainer>
      </Content>
    </Container>
  );
}
