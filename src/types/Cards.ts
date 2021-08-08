export type Cards = {
  edges: Edge[];
};

export type Edge = {
  node: CardNode;
};

export type CardNode = {
  id: string;
  createdAt: string;
  title: string;
};
