import Cookies from 'js-cookie';

export function loadTheme(): 'dark' | 'light' {
  try {
    return JSON.parse(Cookies.get('@lmiguelm:theme'));
  } catch {
    return 'dark';
  }
}
