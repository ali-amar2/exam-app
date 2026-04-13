declare type Diploma = {
  id: string;
  title: string;
  description: string;
  image: string;
  immutable: boolean;
  createdAt: string;
  updatedAt: string;
};

declare type DiplomasResponse = {
  status: boolean;
  code: number;
  payload: {
    data: Diploma[];
    metadata: {
      page: number;
      limit: number;
      total: number;
      totalPages: number;
    };
  };
};
