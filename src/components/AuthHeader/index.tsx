import Link from 'next/link';

import format from 'date-fns/format';
import ptBR from 'date-fns/locale/pt-BR';
import { useAuth } from '../../contexts/AuthContext';

import { Container } from './styles';

import { FiLogOut, FiArrowLeft } from 'react-icons/fi';

import Router from 'next/router';

type IHeaderProps = {
  currentPage: string;
  showRegisterButton?: boolean;
};

export function Header({ currentPage, showRegisterButton }: IHeaderProps) {
  const currentDate = format(new Date(), 'EEEE, d MMMM uuuu', { locale: ptBR });

  const { logout } = useAuth();

  function goBack() {
    Router.back();
  }

  return (
    <Container>
      <li>
        {currentPage == 'dashboard' ? (
          <p>{currentDate}</p>
        ) : (
          <button onClick={goBack} type="button">
            <FiArrowLeft size={24} />
          </button>
        )}
      </li>
      <li>
        {showRegisterButton && (
          <Link href={`/auth/${currentPage}/edit`}>
            <button id="add">Adicionar novo</button>
          </Link>
        )}
      </li>
      <li>
        <button onClick={logout} type="button">
          <FiLogOut size={24} />
        </button>
      </li>
    </Container>
  );
}
