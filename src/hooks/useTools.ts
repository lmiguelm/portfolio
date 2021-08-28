import { useEffect, useState } from 'react';
import { IImage, ITool, TypeFirebaseTools } from '../../@types/lmiguelm/tools';
import { database } from '../services/firebase';

export function useTools() {
  const [loading, setLoading] = useState<boolean>(false);
  const [tools, setTools] = useState<ITool[]>([]);

  useEffect(() => {
    setLoading(true);
    const toolsRef = database.ref('tools');

    toolsRef.on('value', (response) => {
      const tools: TypeFirebaseTools = response.val() ?? ({} as TypeFirebaseTools);

      const parsedtools = Object.entries(tools).map(([key, value]) => {
        return {
          id: key,
          description: value.description,
          name: value.name,
          url: value.url,
          image: value.image ?? ({} as IImage),
        };
      });

      setTools(parsedtools);
      setLoading(false);
    });

    return () => toolsRef.off('value');
  }, []);

  return {
    loading,
    tools,
  };
}
