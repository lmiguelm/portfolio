import Router from 'next/router';

import format from 'date-fns/format';
import ptBR from 'date-fns/locale/pt-BR';

import { Container } from './styles';

import { FiLogOut } from 'react-icons/fi';
import { useAuth } from '../../hooks/useAuth';

export function AuthHeader() {
  const currentDate = format(new Date(), 'EEEE, d MMMM uuuu', { locale: ptBR });

  const { signout } = useAuth({});

  async function handleSignout() {
    try {
      await signout();
      Router.push('/auth/login');
    } catch (error) {
      console.log(error.message);
    }
  }

  return (
    <Container>
      <li>
        <p>{currentDate}</p>
      </li>

      <li>
        <button onClick={handleSignout} type="button">
          <FiLogOut size={24} />
        </button>
      </li>
    </Container>
  );
}
