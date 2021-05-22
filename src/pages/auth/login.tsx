import { GetServerSideProps } from 'next';
import Link from 'next/link';
import Router from 'next/router';

import { FormEvent, useEffect, useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { FormButton, Input } from '../../styles/global';

import { Container, CardContainer } from '../../styles/pages/auth/login';

import { isAValidEmail } from '../../utils/checkEmail';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(false);
  const [enableButton, setEnableButton] = useState(false);
  const [showInputError, setShowInputError] = useState(false);

  const { login } = useAuth();

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
      await login(email, password, remember);
      Router.push('/auth/dashboard');
    } catch (error) {
      setShowInputError(true);
    }
  }

  return (
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

          <label htmlFor="remember">
            <Input
              onClick={() => setRemember(!remember)}
              defaultChecked={remember}
              type="checkbox"
              id="remember"
            />
            &nbsp; Lembrar senha
          </label>

          <FormButton
            type="submit"
            disabled={!enableButton}
            className={enableButton ? 'active' : ''}
          >
            Continuar
          </FormButton>
        </form>

        <Link href="/auth/forgot">
          <a>Esqueci a senha</a>
        </Link>
      </CardContainer>
    </Container>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const token = ctx.req.cookies.access_token;

  if (token) {
    return {
      redirect: {
        destination: '/auth/dashboard',
        permanent: false,
      },
    };
  } else {
    return {
      props: {},
    };
  }
};
