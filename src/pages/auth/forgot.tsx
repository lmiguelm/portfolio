import Router from 'next/router';
import Head from 'next/head';

import { FormEvent, useEffect, useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { FormButton, Input } from '../../styles/global';

import { Container, CardContainer } from '../../styles/pages/auth/forgot';
import { isAValidEmail } from '../../utils/checkEmail';

import { FiArrowLeft } from 'react-icons/fi';
import { GetServerSideProps } from 'next';
import { api } from '../../services/api';

export default function Forgot() {
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [userId, setUserId] = useState('');

  const [enableButton, setEnableButton] = useState(false);
  const [showInputError, setShowInputError] = useState(false);
  const [step, setStep] = useState(0);

  const { checkEmail, checkCode, resetPassword, handleSetHeader } = useAuth();

  useEffect(() => {
    handleSetHeader('none');
  }, []);

  useEffect(() => {
    if (isAValidEmail(email)) {
      setEnableButton(true);
    } else {
      setEnableButton(false);
    }
    setShowInputError(false);
  }, [email]);

  useEffect(() => {
    if (code.length === 6) {
      setEnableButton(true);
    } else {
      setEnableButton(false);
    }
    setShowInputError(false);
  }, [code]);

  useEffect(() => {
    if (password.length >= 5 && password === confirm) {
      setEnableButton(true);
    } else {
      setEnableButton(false);
    }
  }, [password, confirm]);

  function goBack() {
    Router.back();
  }

  async function handleSubmitFirstStep(e: FormEvent) {
    e.preventDefault();
    try {
      await checkEmail(email);
      setEnableButton(false);
      setStep(step + 1);
    } catch (error) {
      setShowInputError(true);
    }
  }

  async function handleSubmitSecondStep(e: FormEvent) {
    e.preventDefault();
    try {
      const { id } = await checkCode(email, Number(code));
      setUserId(id);
      setStep(step + 1);
    } catch (error) {
      setShowInputError(true);
    }
  }

  async function handleSubmitThirdStep(e: FormEvent) {
    e.preventDefault();
    try {
      await resetPassword(userId, password, Number(code), email);
      Router.push('/auth/login');
    } catch (error) {
      setShowInputError(true);
    }
  }

  if (step == 0) {
    return (
      <>
        <Head>
          <title>&lt; Esqueci a senha /&gt;</title>
        </Head>
        <Container>
          <CardContainer>
            <h1>Informe o e-mail de recuperação</h1>

            <form onSubmit={handleSubmitFirstStep}>
              <Input
                value={email}
                onChange={(element) => setEmail(element.target.value)}
                type="email"
                placeholder="E-mail"
                className={showInputError ? 'error' : ''}
              />
              <span className={showInputError ? 'message-error' : ''}>E-mail inválido.</span>

              <FormButton
                type="submit"
                disabled={!enableButton}
                className={enableButton ? 'active' : ''}
              >
                Continuar
              </FormButton>
            </form>

            <button onClick={goBack} className="back" type="button">
              <FiArrowLeft size={24} color="white" />
            </button>
          </CardContainer>
        </Container>
      </>
    );
  } else if (step == 1) {
    return (
      <>
        <Head>
          <title>&lt; Dashboard /&gt;</title>
        </Head>
        <Container>
          <CardContainer>
            <h1>Informe o código enviado no e-mail</h1>

            <form onSubmit={handleSubmitSecondStep}>
              <Input
                value={code}
                onChange={(element) => setCode(element.target.value)}
                type="text"
                placeholder="Informe o código"
                className={showInputError ? 'error' : ''}
              />
              <span className={showInputError ? 'message-error' : ''}>Código inválido.</span>

              <FormButton
                type="submit"
                disabled={!enableButton}
                className={enableButton ? 'active' : ''}
              >
                Continuar
              </FormButton>
            </form>

            <button onClick={goBack} className="back" type="button">
              <FiArrowLeft size={24} color="white" />
            </button>
          </CardContainer>
        </Container>
      </>
    );
  } else if (step == 2) {
    return (
      <>
        <Head>
          <title>&lt; Dashboard /&gt;</title>
        </Head>
        <Container>
          <CardContainer>
            <h1>Informe o código enviado no e-mail</h1>

            <form onSubmit={handleSubmitThirdStep}>
              <Input
                value={password}
                onChange={(element) => setPassword(element.target.value)}
                type="password"
                placeholder="Nova senha"
                className={showInputError ? 'error' : ''}
              />

              <Input
                value={confirm}
                onChange={(element) => setConfirm(element.target.value)}
                type="password"
                placeholder="Digite novemante"
                className={showInputError ? 'error' : ''}
              />
              <span className={showInputError ? 'message-error' : ''}>Senhas não são iguais.</span>

              <FormButton
                type="submit"
                disabled={!enableButton}
                className={enableButton ? 'active' : ''}
              >
                Continuar
              </FormButton>
            </form>

            <button onClick={goBack} className="back" type="button">
              <FiArrowLeft size={24} color="white" />
            </button>
          </CardContainer>
        </Container>
      </>
    );
  }
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
