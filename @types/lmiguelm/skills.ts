export type IImage = {
  url: string;
  name: string;
};

export type ISkill = {
  id: string;
  name: string;
  image: IImage;
  url: string;
  description: string;
};

export type TypeFirebaseSkills = Record<
  string,
  {
    image: IImage;
    url: string;
    name: string;
    description: string;
  }
>;
