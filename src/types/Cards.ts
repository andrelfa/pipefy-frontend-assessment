export type Cards = {
  edges: Edge[];
};

export type Edge = {
  node: Node;
};

export type Node = {
  id: string;
  created_at: string;
  title: string;
};
