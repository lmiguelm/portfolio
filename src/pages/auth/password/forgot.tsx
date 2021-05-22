import { GetServerSideProps } from 'next';
import Router from 'next/router';

import { FormEvent, useEffect, useState } from 'react';
import { useAuth } from '../../../contexts/AuthContext';
import { FormButton, Input } from '../../../styles/global';

import { Container, CardContainer } from '../../../styles/pages/auth/password/forgot';
import { isAValidEmail } from '../../../utils/checkEmail';

import { FiArrowLeft } from 'react-icons/fi';

export default function Forgot() {
  const [email, setEmail] = useState('');
  const [enableButton, setEnableButton] = useState(false);
  const [showInputError, setShowInputError] = useState(false);

  const { checkEmail } = useAuth();

  useEffect(() => {
    if (isAValidEmail(email)) {
      setEnableButton(true);
    } else {
      setEnableButton(false);
    }
    setShowInputError(false);
  }, [email]);

  function back() {
    Router.back();
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();

    try {
      await checkEmail(email);
    } catch (error) {
      setShowInputError(true);
    }
  }

  return (
    <Container>
      <CardContainer>
        <h1>Recuperação de senha</h1>

        <form onSubmit={handleSubmit}>
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

        <button onClick={back} className="back" type="button">
          <FiArrowLeft size={24} color="black" />
        </button>
      </CardContainer>
    </Container>
  );
}
