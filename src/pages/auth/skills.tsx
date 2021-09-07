import React, { useCallback, useState } from 'react';
import Head from 'next/head';
import { toast, Toaster } from 'react-hot-toast';

import { SkillsModal } from '../../components/SkillsModal';

import { Container, Card } from '../../styles/pages/auth/skills';

import { Button } from '../../components/Button';
import { database, storage } from '../../services/firebase';

import { useTheme } from 'styled-components';
import { useAuth } from '../../hooks/useAuth';

import { ISkill } from '../../../@types/lmiguelm/skills';
import { Loading } from '../../components/Loading';
import { useSkills } from '../../hooks/useSkills';
import { AuthHeader } from '../../components/AuthHeader';

export type ISkillData = {
  id?: string;
  name: string;
  description: string;
  url: string;
};

export default function Skills() {
  const { loadedAuth } = useAuth({ header: 'private', route: 'private' });
  const { colors } = useTheme();
  const { skills, loading: loadingSkills } = useSkills();

  const [selectedSkill, setSelectedSkill] = useState<ISkill>({} as ISkill);
  const [loading, setLoading] = useState<boolean>(loadingSkills);

  const [showModal, setShowModal] = useState(false);

  function handleOpenModal(skill?: ISkill) {
    setShowModal(true);
    setSelectedSkill(skill);
  }

  const handleCloseModal = useCallback(() => {
    setShowModal(false);
  }, []);

  async function handleRemoveSkill(id: string) {
    setLoading(true);
    await database.ref(`skills/${id}`).remove();
    await storage.ref(`skills/${id}`).delete();
    toast.success('Habilidade removida com sucesso!');
    setLoading(false);
  }

  const saveNewSkill = useCallback(
    async (data: ISkillData, file: File) => {
      setShowModal(false);
      setLoading(true);

      const { name, description, url } = data;

      try {
        const { key } = await database.ref('skills').push({
          name,
          description,
          url,
        });

        const imageRef = storage.ref(`skills/${key}`);
        await imageRef.put(file);
        const imageUrl = {
          name: file.name,
          url: await imageRef.getDownloadURL(),
        };

        await database.ref(`skills/${key}`).update({ image: imageUrl });
        toast.success(`${name} salvo com sucesso!`);
      } catch {
        toast.error('Erro ao salvar!');
      } finally {
        setLoading(false);
      }
    },
    [loading, showModal]
  );

  const editSkill = useCallback(
    async (data: ISkillData, file: File) => {
      setShowModal(false);
      setLoading(true);

      try {
        if (file) {
          const imageRef = storage.ref(`images/${file.name}`);
          await imageRef.put(file);
          const imageUrl = {
            url: await imageRef.getDownloadURL(),
            name: file.name,
          };

          await database.ref(`/skills/${data.id}`).update({ image: imageUrl });
        }

        await database.ref(`/skills/${data.id}`).update(data);

        toast.success(`Skill editada com sucesso!`);
      } catch (error) {
        console.log(error);
        toast.error(`Errro ao editar`);
      } finally {
        setLoading(false);
      }
    },
    [loading, showModal]
  );

  if (loading || !loadedAuth) {
    return <Loading />;
  }

  return (
    <>
      <Head>
        <title>&lt; Dashboard /&gt;</title>
      </Head>

      <AuthHeader />

      <Container>
        <Button onClick={() => handleOpenModal({} as ISkill)}>Adicionar</Button>

        <main className="grid">
          {skills.map((skill) => (
            <Card key={skill.id}>
              <header>
                <img src={skill.image.url} alt={skill.image.name} />
              </header>

              <main className="card">
                <h3>{skill.name}</h3>
                <p>{skill.description}</p>
              </main>

              <footer>
                <button onClick={() => handleOpenModal(skill)} type="button">
                  Editar
                </button>
                <button onClick={() => handleRemoveSkill(skill.id)} type="button">
                  Remover
                </button>
              </footer>
            </Card>
          ))}
        </main>
      </Container>

      {showModal && (
        <SkillsModal
          skill={selectedSkill}
          closeModal={handleCloseModal}
          editSkill={editSkill}
          newSkill={saveNewSkill}
        />
      )}

      <Toaster
        position="bottom-right"
        toastOptions={{
          style: { background: colors.backgroundSecondary, color: colors.textPrimary },
        }}
      />
    </>
  );
}
