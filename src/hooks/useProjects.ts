import { useState, useEffect } from 'react';
import { IProject, IThumbnail, TypeFirebaseProjects } from '../../@types/lmiguelm/project';
import { database } from '../services/firebase';

export function useProjects() {
  const [loading, setLoading] = useState<boolean>(false);
  const [projects, setProjects] = useState<IProject[]>([]);

  useEffect(() => {
    setLoading(true);
    const projectRef = database.ref('projects');

    projectRef.on('value', (response) => {
      const projects: TypeFirebaseProjects = response.val() ?? ({} as TypeFirebaseProjects);

      const parsedProjects: IProject[] = Object.entries(projects).map(([key, value]) => {
        return {
          id: key,
          title: value.title ?? '',
          about: value.about ?? '',
          githubUrl: value.githubUrl ?? '',
          knowledge: value.knowledge ?? '',
          resume: value.resume ?? '',
          url: value.url ?? '',
          video: value.video,
          thumbnail: value.thumbnail ?? ({} as IThumbnail),
          images: Object.entries(value.images ?? {}).map(([key, value]) => {
            return {
              id: key,
              name: value.name,
              url: value.url,
            };
          }),
        };
      });

      setProjects(parsedProjects.reverse());
      setLoading(false);
    });

    return () => projectRef.off('value');
  }, []);

  return {
    projects,
    loading,
  };
}
