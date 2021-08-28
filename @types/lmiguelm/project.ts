export type ISlides = {
  url: string;
  id?: string;
  name: string;
};

export type IThumbnail = {
  url: string;
  name: string;
};

export type IVideo = {
  url: string;
  name: string;
};

export type IProject = {
  id: string;
  title: string;
  resume: string;
  thumbnail: IThumbnail;
  githubUrl: string;
  url: string;
  video: IVideo;
  knowledge: string;
  about: string;
  images: ISlides[];
};

export type TypeFirebaseProjects = Record<
  string,
  {
    title: string;
    resume: string;
    githubUrl: string;
    url: string;
    video: IVideo;
    knowledge: string;
    about: string;
    thumbnail: IThumbnail;
    images: Record<
      string,
      {
        name: string;
        url: string;
      }
    >;
  }
>;
