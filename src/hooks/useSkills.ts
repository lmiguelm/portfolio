import { useEffect, useState } from 'react';
import { IImage, ISkill, TypeFirebaseSkills } from '../../@types/lmiguelm/skills';
import { database } from '../services/firebase';

export function useSkills() {
  const [loading, setLoading] = useState<boolean>(false);
  const [skills, setSkills] = useState<ISkill[]>([]);

  useEffect(() => {
    setLoading(true);
    const skillsRef = database.ref('skills');

    skillsRef.on('value', (response) => {
      const skills: TypeFirebaseSkills = response.val() ?? ({} as TypeFirebaseSkills);

      const parsedskills = Object.entries(skills).map(([key, value]) => {
        return {
          id: key,
          description: value.description,
          name: value.name,
          url: value.url,
          image: value.image ?? ({} as IImage),
        };
      });

      setSkills(parsedskills);
      setLoading(false);
    });

    return () => skillsRef.off('value');
  }, []);

  return {
    loading,
    skills,
  };
}
