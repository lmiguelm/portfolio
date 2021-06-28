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

export default function Skills() {
  const { handleSetHeader, user, loadedAuth } = useAuth();
  const { colors } = useTheme();

  const [skills, setSkills] = useState<ISkill[]>([]);
  const [skill, setSkill] = useState<ISkill>({} as ISkill);
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
    setSkill(skill);
    setShowModal(true);
  }

  const handleCloseModal = useCallback(() => {
    setShowModal(false);
    clearData();
  }, []);

  async function handleRemoveSkill(id: string) {
    setLoading(true);
    await database.ref(`skills/${id}`).remove();
    await storage.ref(`skills/${id}`).delete();
    toast.success('Habilidade removida com sucesso!');
    setLoading(false);
  }

  async function handleEdit(event: FormEvent) {
    event.preventDefault();
    setLoading(true);
    setShowModal(false);

    const { name, description, url, id } = skill;

    if (name.trim() === '' || description.trim() === '' || url.trim() === '') {
      toast.error('Campos não podem ser vazios!');
      setLoading(false);
      return;
    }

    try {
      if (file) {
        const imageRef = storage.ref(`images/${file.name}`);
        await imageRef.put(file);
        const imageUrl = {
          url: await imageRef.getDownloadURL(),
          name: file.name,
        };

        await database.ref(`/skills/${id}`).update({ image: imageUrl });
      }

      await database.ref(`/skills/${id}`).update(skill);
      toast.success(`${name} editado com sucesso!`);
      clearData();
    } catch {
      toast.success(`Errro ao editar`);
    } finally {
      setLoading(false);
    }
  }

  async function handleSaveNewskill(event: FormEvent) {
    event.preventDefault();
    setLoading(true);
    setShowModal(false);

    if (!file) {
      toast.error('Selecione uma imagem');
      return;
    }

    const { name, description, url } = skill;

    if (name.trim() === '' || description.trim() === '' || url.trim() === '') {
      toast.error('Campos não podem ser vazios!');
      return;
    }

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
      clearData();
    } catch {
      toast.error('Erro ao salvar!');
    } finally {
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

    setSkill({ ...skill, image: selectedVideoPreview });
  }

  function handleRemoveFile() {
    setFile(undefined);
    setSkill({ ...skill, image: undefined });
  }

  function clearData() {
    setSkill({} as ISkill);
    setFile(undefined);
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
        <Modal closeModal={handleCloseModal} onSubmit={skill.id ? handleEdit : handleSaveNewskill}>
          <InputFile title="Selecione a imagem" onChange={handleSelectFile}>
            {skill.image && (
              <div className="image-container">
                <div className="icon-container">
                  <FiX color="#fff" onClick={handleRemoveFile} />
                </div>
                <img src={skill.image.url} alt={skill.image.name} />
              </div>
            )}
          </InputFile>

          <Input
            type="text"
            placeholder="Nome"
            value={skill.name}
            onChange={(event) => setSkill({ ...skill, name: event.target.value })}
          />

          <Input
            type="text"
            placeholder="Url"
            value={skill.url}
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

      <Toaster
        position="bottom-right"
        toastOptions={{
          style: { background: colors.backgroundSecondary, color: colors.textPrimary },
        }}
      />
    </>
  );
}
