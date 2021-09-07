import { Container } from './styles';

type IData = {
  id: string;
  name: string;
  image: {
    url: string;
    name: string;
  };
  url: string;
  description: string;
};

type ICardProps = {
  data: IData;
};

export const Card = ({ data }: ICardProps) => {
  function handleOpenUrl() {
    window.open(data.url);
  }

  return (
    <Container data-tip="hello world" onClick={handleOpenUrl} aria-label={data.name}>
      <img src={data.image.url} alt={data.image.name} draggable="false" />
    </Container>
  );
};
