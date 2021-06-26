import format from 'date-fns/format';
import ptBR from 'date-fns/locale/pt-BR';

import { Container } from './styles';

import { FiLogOut } from 'react-icons/fi';
import { useAuth } from '../../../hooks/useAuth';

export function AuthHeader() {
  const currentDate = format(new Date(), 'EEEE, d MMMM uuuu', { locale: ptBR });

  const { logout } = useAuth();

  return (
    <Container>
      <li>
        <p>{currentDate}</p>
      </li>

      <li>
        <button onClick={logout} type="button">
          <FiLogOut size={24} />
        </button>
      </li>
    </Container>
  );
}
