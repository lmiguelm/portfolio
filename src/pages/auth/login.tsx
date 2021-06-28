import { GetServerSideProps } from 'next';
import Router from 'next/router';
import Head from 'next/head';

import React, { useEffect } from 'react';
import { FiArrowLeft } from 'react-icons/fi';
import { FcGoogle } from 'react-icons/fc';
import { api } from '../../services/api';

import { Container, CardContainer } from '../../styles/pages/auth/login';

import { useAuth } from '../../hooks/useAuth';
import { Button } from '../../components/Button';
import { Loading } from '../../components/Loading';
import toast, { Toaster } from 'react-hot-toast';
import { useTheme } from 'styled-components';

export default function Login() {
  const { handleSetHeader, signinWithGoogle, user, loadedAuth } = useAuth();
  const { colors } = useTheme();

  useEffect(() => {
    handleSetHeader('none');

    if (user) {
      Router.push('/auth/dashboard');
    }
  }, [user]);

  function goBack() {
    Router.push('/');
  }

  function handleLogin() {
    if (!user) {
      signinWithGoogle()
        .then(() => {
          Router.push('/auth/dashboard');
        })
        .catch((error) => {
          toast.error(error.message);
        });
    }
  }

  if (!loadedAuth) {
    return <Loading style={{ height: '100vh' }} />;
  }

  return (
    <>
      <Head>
        <title>&lt; Login /&gt;</title>
      </Head>

      <Container>
        <CardContainer>
          <h2>Para entrar, confirme seu e-mail</h2>

          <Button onClick={handleLogin} title="Entrar com o google">
            <FcGoogle size={24} />
            <span>Entrar com o google</span>
          </Button>

          <footer>
            <button onClick={goBack} className="back" type="button">
              <FiArrowLeft size={24} color="white" />
            </button>
          </footer>
        </CardContainer>
      </Container>

      <Toaster
        position="bottom-right"
        toastOptions={{
          style: {
            background: colors.backgroundSecondary,
            color: colors.textPrimary,
            zIndex: 999999999,
          },
        }}
        containerStyle={{
          zIndex: 9999999999999,
        }}
      />
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
