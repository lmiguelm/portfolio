import React, { ChangeEvent, FormEvent, useCallback, useEffect, useState } from 'react';
import Head from 'next/head';
import Routes from 'next/router';
import { FiX } from 'react-icons/fi';
import { toast, Toaster } from 'react-hot-toast';

import { Modal } from '../../components/Modal';

import { Container, Card } from '../../styles/pages/auth/skills';

import { Input } from '../../components/Input';
import { Button } from '../../components/Button';
import { Textarea } from '../../components/Textarea';
import { database, storage } from '../../services/firebase';

import { useTheme } from 'styled-components';
import { useAuth } from '../../hooks/useAuth';

import { IImage, ISkill, TypeFirebaseSkills } from '../../../types/lmiguelm/skills';
import { Loading } from '../../components/Loading';
import { InputFile } from '../../components/InputFile';
import { useForm } from 'react-hook-form';

type ISkillData = {
  name: string;
  description: string;
  url: string;
};

export default function Skills() {
  const { handleSetHeader, user, loadedAuth } = useAuth();
  const { colors } = useTheme();
  const { register, handleSubmit } = useForm();

  const [skills, setSkills] = useState<ISkill[]>([]);
  const [selectedSkill, setSelectedSkill] = useState<ISkill>({} as ISkill);

  const [loading, setLoading] = useState<boolean>(false);
  const [file, setFile] = useState<File>();

  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (!user && loadedAuth) {
      Routes.push('/auth/login');
    }
  }, [user, loadedAuth]);

  useEffect(() => {
    handleSetHeader('private');
  }, []);

  useEffect(() => {
    setLoading(true);
    const skillsRef = database.ref('skills');

    skillsRef.on('value', (response) => {
      const skills: TypeFirebaseSkills = response.val() ?? ({} as TypeFirebaseSkills);

      const parsedskills = Object.entries(skills).map(([key, value]) => {
        return {
          id: key,
          description: value.description,
          name: value.name,
          url: value.url,
          image: value.image ?? ({} as IImage),
        };
      });

      setSkills(parsedskills);
      setLoading(false);
    });

    return () => skillsRef.off('value');
  }, []);

  function handleOpenModalEdit(skill: ISkill) {
    setSelectedSkill(skill);
    setShowModal(true);
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

  async function handleEdit(data: ISkillData) {
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

        await database.ref(`/skills/${selectedSkill.id}`).update({ image: imageUrl });
      }

      if (!data.name) {
        delete data.name;
      }
      if (!data.url) {
        delete data.url;
      }
      if (!data.description) {
        delete data.description;
      }

      if (data.url || data.name || data.description) {
        await database.ref(`/skills/${selectedSkill.id}`).update(data);
      }

      toast.success(`Skill editado com sucesso!`);
    } catch {
      toast.error(`Errro ao editar`);
    } finally {
      setSelectedSkill({} as ISkill);
      setFile(undefined);
      setLoading(false);
    }
  }

  async function handleSaveNewskill(data: ISkillData) {
    setShowModal(false);
    setLoading(true);

    try {
      if (!file) {
        toast.error('Selecione uma imagem');
        return;
      }

      const { name, description, url } = data;

      if (name.trim() === '' || description.trim() === '' || url.trim() === '') {
        toast.error('Campos não podem ser vazios!');
        return;
      }

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
      setFile(undefined);
      setLoading(false);
    }
  }

  function handleSelectFile(event: ChangeEvent<HTMLInputElement>) {
    if (!event.target.files) {
      toast.error('Selecione uma Imagem');
      return;
    }

    const selectedVideo = Array.from(event.target.files);
    setFile(selectedVideo[0]);

    const selectedVideoPreview = {
      name: selectedVideo[0].name,
      url: URL.createObjectURL(selectedVideo[0]),
    };

    setSelectedSkill({ ...selectedSkill, image: selectedVideoPreview });
  }

  function handleRemoveFile() {
    setFile(undefined);
    setSelectedSkill({ ...selectedSkill, image: undefined });
  }

  if (loading || !loadedAuth) {
    return <Loading />;
  }

  return (
    <>
      <Head>
        <title>&lt; Dashboard /&gt;</title>
      </Head>

      <Container>
        <Button onClick={() => setShowModal(true)}>Adicionar</Button>

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
                <button onClick={() => handleOpenModalEdit(skill)} type="button">
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
        <Modal
          closeModal={handleCloseModal}
          onSubmit={selectedSkill.id ? handleSubmit(handleEdit) : handleSubmit(handleSaveNewskill)}
        >
          <InputFile title="Selecione a imagem" onChange={handleSelectFile}>
            {selectedSkill.image && (
              <div className="image-container">
                <div className="icon-container">
                  <FiX color="#fff" onClick={handleRemoveFile} />
                </div>
                <img src={selectedSkill.image.url} alt={selectedSkill.image.name} />
              </div>
            )}
          </InputFile>

          <Input type="text" placeholder="Nome" {...register('name')} />

          <Input type="text" placeholder="Url" {...register('url')} />

          <Textarea placeholder="Descrição" {...register('description')} />

          <Button type="submit" style={{ alignSelf: 'center' }}>
            Salvar
          </Button>
        </Modal>
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
