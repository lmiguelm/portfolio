import { GetServerSideProps } from 'next';
import Link from 'next/link';
import Router from 'next/router';
import Head from 'next/head';

import React, { FormEvent, useEffect, useState } from 'react';
import { FiArrowLeft } from 'react-icons/fi';
import { api } from '../../../services/api';
import { FormButton } from '../../../styles/global';

import { Container, CardContainer } from './styles';

import { isAValidEmail } from '../../../utils/checkEmail';
import { useAuth } from '../../../hooks/useAuth';
import { Input } from '../../../components/Input';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [enableButton, setEnableButton] = useState(false);
  const [showInputError, setShowInputError] = useState(false);

  const { login, handleSetHeader } = useAuth();

  useEffect(() => {
    handleSetHeader('none');
  }, []);

  useEffect(() => {
    if (isAValidEmail(email) && password.length >= 5) {
      setEnableButton(true);
    } else {
      setEnableButton(false);
    }
    setShowInputError(false);
  }, [email, password]);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();

    try {
      await login(email, password);
      Router.push('/auth/dashboard');
    } catch (error) {
      setShowInputError(true);
    }
  }

  function goBack() {
    Router.push('/');
  }

  return (
    <>
      <Head>
        <title>&lt; Login /&gt;</title>
      </Head>

      <Container>
        <CardContainer>
          <h1>Faça seu login</h1>

          <form onSubmit={handleSubmit}>
            <Input
              value={email}
              onChange={(element) => setEmail(element.target.value)}
              type="email"
              placeholder="E-mail"
              className={showInputError ? 'error' : ''}
            />
            <span className={showInputError ? 'message-error' : ''}>E-mail inválido.</span>

            <Input
              value={password}
              onChange={(element) => setPassword(element.target.value)}
              type="password"
              placeholder="Senha"
              className={showInputError ? 'error' : ''}
            />
            <span className={showInputError ? 'message-error' : ''}>Senha inválida.</span>

            <FormButton
              type="submit"
              disabled={!enableButton}
              className={enableButton ? 'active' : ''}
            >
              Continuar
            </FormButton>
          </form>

          <footer>
            <button onClick={goBack} className="back" type="button">
              <FiArrowLeft size={24} color="white" />
            </button>

            <Link href="/auth/forgot">
              <a>Esqueci a senha</a>
            </Link>

            <span />
          </footer>
        </CardContainer>
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

    await api.get('/validating/token', {
      headers: {
        Authorization: JSON.parse(token),
      },
    });

    return {
      redirect: {
        destination: '/auth/dashboard',
        permanent: false,
      },
    };
  } catch (e) {
    return {
      props: {},
    };
  }
};
