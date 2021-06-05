export type IProject = {
  id: string;
  title: string;
  resume: string;
  thumbnail: string;
  github_url: string;
  url: string;
  video: string;
  knowledge: string;
  about: string;
  images: Array<{
    id: string;
    url: string;
  }>;
};
