export type IImage = {
  url: string;
  name: string;
};

export type ITool = {
  id: string;
  name: string;
  image: IImage;
  url: string;
  description: string;
};

export type TypeFirebaseTools = Record<
  string,
  {
    image: IImage;
    url: string;
    name: string;
    description: string;
  }
>;
