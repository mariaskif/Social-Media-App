export interface post {
  text: string;
  title: string;
  image: string;
  fav: boolean;
  numberOfLikes: number;
  updated: boolean;
  userId: number;
  name: string;
  id: number;
}

export type user = {
  pass: string;
  name: string;
  id: number;
};

export interface comment {
  textComm: string;
  postId: number;
  id: number;
}
