import { useEffect, useState } from 'react';
import Head from 'next/head';

import format from 'date-fns/format';
import ptBR from 'date-fns/locale/pt-BR';

import {
  Container,
  Views,
  ToggleTheme,
  ToggleThemeContainer,
  Animation,
  Content,
  AnimationWrapper,
  Footer,
} from './styles';

import { loadTheme } from '../../utils/theme';
import { database } from '../../services/firebase';

import { Greeting } from '../../components/Greeting';

type IHomeProps = {
  toggleTheme: () => void;
};

export function Landing({ toggleTheme }: IHomeProps) {
  const currentDate = format(new Date(), 'EEEEEE, d MMMM', { locale: ptBR });

  const [direction, setDirection] = useState<number>(1);
  const [loadedTheme, setLoadedTheme] = useState(false);
  const [views, setViews] = useState<number>(undefined);

  useEffect(() => {
    async function loadViews() {
      const oldViews = await database.ref('views').get();
      const newViews = oldViews.val().number + 1;
      await database.ref('views').update({ number: newViews });
      setViews(newViews);
    }
    loadViews();
  }, []);

  useEffect(() => {
    const theme = loadTheme();
    setDirection(theme === 'dark' ? 1 : -1);
    setLoadedTheme(true);
  }, []);

  function handleToggleTheme() {
    setDirection(direction > 0 ? -1 : 1);
    toggleTheme();
  }

  return (
    <Container initial="hidden" animate="visible">
      <Content>
        <Greeting />

        <AnimationWrapper>
          <Animation />
        </AnimationWrapper>
      </Content>

      <Footer>
        {views && (
          <Views>
            {currentDate} - <strong>{Number(views).toLocaleString('pt-br')}</strong> visitas
          </Views>
        )}

        {loadedTheme && (
          <ToggleThemeContainer onClick={handleToggleTheme}>
            <ToggleTheme direction={direction} />
          </ToggleThemeContainer>
        )}
      </Footer>
    </Container>
  );
}
