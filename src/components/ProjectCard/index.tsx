import Link from 'next/link';

import { IProject } from '../../../@types/lmiguelm/project';

import { Container, Thumbnail, Content, Title, Resume } from './styles';

type IProjectsProps = {
  project: IProject;
};

export const ProjectCard = ({ project }: IProjectsProps) => {
  return (
    <Link href={`/projects/${project.id}`}>
      <Container>
        <Thumbnail src={project.thumbnail.url} alt={project.title} draggable="false" />

        <Content>
          <Title>{project.title}</Title>

          <Resume>{project.resume}</Resume>
        </Content>
      </Container>
    </Link>
  );
};
