import { AuthHeader } from '../Header/AuthHeader';
import { PublicHeader } from './PublicHeader';

import { useAuth } from '../../contexts/AuthContext';

export function Header() {
  const { header } = useAuth();

  if (header === 'private') {
    return <AuthHeader />;
  } else if (header === 'public') {
    return <PublicHeader />;
  } else {
    return <></>;
  }
}
