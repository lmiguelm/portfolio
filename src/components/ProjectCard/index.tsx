import Link from 'next/link';
import Image from 'next/image';

import { Container } from './styles';

import { FiChevronRight } from 'react-icons/fi';

type IProject = {
  id: string;
  title: string;
  resume: string;
  thumbnail: string;
  github_url: string;
  url: string;
};

type IProjectsProps = {
  project: IProject;
};

export const ProjectCard = ({ project }: IProjectsProps) => {
  return (
    <Container
      transition={{
        duration: 0.2,
      }}
      whileHover={{ scale: 1.02 }}
    >
      <Image src={project.thumbnail} alt={project.title} height={1080} width={3840} />

      <div>
        <h1>
          <span>&lt;</span>
          {project.title}
          <span>&gt;</span>
        </h1>
        <p>{project.resume}</p>

        <div>
          <article>
            {project.url != 'null' && (
              <a href={project.url} target="_blank" style={{ marginRight: '2rem' }}>
                Acessar
              </a>
            )}
            <a href={project.github_url} target="_blank">
              Ver no github
            </a>
          </article>

          <Link href={`/projects/${project.id}`}>
            <article className="icon-container">
              <FiChevronRight color="#fff" size={30} />
            </article>
          </Link>
        </div>
      </div>
    </Container>
  );
};
