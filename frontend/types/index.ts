export type APiResponse<T> = {
  ok: boolean;
  data?: T;
  timestamp: string | number | Date;
  message: string;
  errors?: Array<{ path: string; message: string }>;
};

export type HealthzResponse = {
  version: string;
};

export type Link = {
  id: string;
  url: string;
  code: string;
  clicks: number;
  createdAt: string | number | Date;
};
