import { useAuth } from '../../hooks/useAuth';
import { AuthHeader } from '../Header/AuthHeader';
import { PublicHeader } from './PublicHeader';

export function Header() {
  const { header } = useAuth({ setHeader: false });

  if (header === 'private') {
    return <AuthHeader />;
  } else if (header === 'public') {
    return <PublicHeader />;
  } else {
    return <></>;
  }
}
