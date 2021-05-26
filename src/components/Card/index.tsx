import { useState } from 'react';

import { Container, Modal } from './styles';
import { Blur } from '../../styles/global';

import { FiX } from 'react-icons/fi';

type IData = {
  id: string;
  name: string;
  image: string;
  url: string;
  description: string;
};

type ICardProps = {
  data: IData;
};

export const Card = ({ data }: ICardProps) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Container
        initial={{
          opacity: 0,
          scale: 0,
        }}
        animate={{
          opacity: 1,
          scale: 1,
        }}
        transition={{
          duration: 0.2,
        }}
        whileHover={{ scale: 1.2 }}
        onClick={() => setOpen(true)}
      >
        <img src={data.image} alt={data.name} />
      </Container>

      {open && (
        <>
          <Modal
            initial={{
              opacity: 0,
              scale: 0,
            }}
            animate={{
              opacity: 1,
              scale: 1,
            }}
            transition={{
              duration: 0.4,
            }}
          >
            <FiX size={30} color="#fff" onClick={() => setOpen(false)} />

            <div>
              <div>
                <img src={data.image} alt={data.name} />
              </div>

              <h2>{data.name}</h2>

              <p>{data.description}</p>

              <a target="_blank" href={data.url}>
                saiba mais
              </a>
            </div>
          </Modal>

          <Blur />
        </>
      )}
    </>
  );
};
