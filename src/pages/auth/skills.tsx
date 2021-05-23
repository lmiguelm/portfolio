import { useState } from 'react';
import { GetServerSideProps } from 'next';
import Link from 'next/link';

import { api } from '../../services/api';

import { Header } from '../../components/AuthHeader';

import { Container, Card } from '../../styles/pages/auth/skills';

type ISkill = {
  id: string;
  name: string;
  image: string;
  url: string;
  description: string;
};

type ISkillProps = {
  initialSkills: ISkill[];
};

export default function Tools({ initialSkills }: ISkillProps) {
  const [skills, setTools] = useState(initialSkills);

  async function handleRemoveSkill(id: string) {
    try {
      await api.delete(`http://localhost:3333/api/skills/delete/${id}`);

      if (confirm(`Tem certeza que deseja deletar está habilidade?`)) {
        const newSkill = skills.filter((skill) => skill.id !== id);
        setTools(newSkill);
      }
    } catch (error) {
      console.log('erro', error);
      alert('Erro interno do servidor!');
    }
  }

  return (
    <>
      <Header currentPage="skills" showRegisterButton />
      <Container>
        {skills.map((skill) => (
          <Card key={skill.id}>
            <img src={skill.image} alt={skill.name} />

            <div>
              <h3>{skill.name}</h3>
              <p>{skill.description}</p>
            </div>

            <footer>
              <Link href={`/auth/skills/edit?id=${skill.id}`}>
                <button type="button">Editar</button>
              </Link>
              <button onClick={() => handleRemoveSkill(skill.id)} type="button">
                Remover
              </button>
            </footer>
          </Card>
        ))}
      </Container>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const token = ctx.req.cookies.access_token;
  const currentUser = ctx.req.cookies.current_user;

  try {
    if (!token && !currentUser) {
      throw new Error();
    }

    const { data } = await api.get('http://localhost:3333/api/skills');

    return {
      props: {
        initialSkills: data,
      },
    };
  } catch (e) {
    return {
      redirect: {
        destination: '/auth/login',
        permanent: false,
      },
    };
  }
};
