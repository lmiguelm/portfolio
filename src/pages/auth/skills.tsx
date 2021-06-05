import { FormEvent, useEffect, useState } from 'react';
import { GetServerSideProps } from 'next';
import Head from 'next/head';

import { api } from '../../services/api';

import { Modal } from '../../components/Modal';

import { Container, Card } from '../../styles/pages/auth/skills';
import { Button, Input, Textarea } from '../../styles/global';
import { useAuth } from '../../contexts/AuthContext';

import { ISkill } from '../../../types/lmiguelm/ISkills';

type ISkillProps = {
  initialSkills: ISkill[];
};

export default function Skills({ initialSkills }: ISkillProps) {
  const [skills, setSkills] = useState(initialSkills);

  const [skill, setSkill] = useState<ISkill>({} as ISkill);

  const [showModal, setShowModal] = useState(false);

  const { handleSetHeader } = useAuth();

  useEffect(() => {
    handleSetHeader('private');
  }, []);

  async function handleRemoveSkill(id: string) {
    try {
      await api.delete(`${process.env.NEXT_PUBLIC_APP_URL}/skills/delete/${id}`);

      if (confirm(`Tem certeza que deseja deletar está habilidade?`)) {
        const newSkill = skills.filter((skill) => skill.id !== id);
        setSkills(newSkill);
      }
    } catch (error) {
      alert('Erro interno do servidor!');
    }
  }

  function handleOpenModalEdit(skill: ISkill) {
    setSkill(skill);
    setShowModal(true);
  }

  function handleCloseModal() {
    setShowModal(!showModal);
  }

  async function handleEdit(event: FormEvent) {
    event.preventDefault();

    const { name, description, url } = skill;

    if (name.length == 0 || description.length == 0 || url.length == 0) {
      alert('Campos não podem ser vazios!');
      return;
    }

    try {
      await api.put(`${process.env.NEXT_PUBLIC_APP_URL}/skills/update/${skill.id}`, skill);

      const newSkills = skills.map((element) => {
        if (element.id == skill.id) {
          return {
            ...element,
            ...skill,
          };
        }
        return element;
      });

      setSkills(newSkills as []);
      setShowModal(false);

      alert('Habilidade editada com sucesso!');
    } catch {
      alert('Erro ao editar habilidade');
    }
  }

  return (
    <>
      <Head>
        <title>&lt; Dashboard /&gt;</title>
      </Head>
      <Container>
        {skills.map((skill) => (
          <Card key={skill.id}>
            <img src={skill.image} alt={skill.name} />

            <div>
              <h3>{skill.name}</h3>
              <p>{skill.description}</p>
            </div>

            <footer>
              <button onClick={() => handleOpenModalEdit(skill)} type="button">
                Editar
              </button>
              <button onClick={() => handleRemoveSkill(skill.id)} type="button">
                Remover
              </button>
            </footer>
          </Card>
        ))}
      </Container>

      {showModal && (
        <Modal closeModal={handleCloseModal} handleSubmit={skill.id ? handleEdit : () => {}}>
          <Input
            type="text"
            placeholder="Nome"
            value={skill.name}
            onChange={(event) => setSkill({ ...skill, name: event.target.value })}
          />

          <Input
            type="text"
            placeholder="Url"
            value={skill.description}
            onChange={(event) => setSkill({ ...skill, url: event.target.value })}
          />

          <Textarea
            placeholder="Descrição"
            value={skill.description}
            onChange={(event) => setSkill({ ...skill, description: event.target.value })}
          />

          <Button type="submit" style={{ alignSelf: 'center' }}>
            Salvar
          </Button>
        </Modal>
      )}
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

    const { data } = await api.get('/skills');

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
