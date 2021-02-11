export type Roots = {
  isLoading: boolean;
  payload: Record<string, string> | undefined;
  error: string | undefined;
};

export type Root = {
  isLoading: boolean;
  payload: { results: Record<string, string>[]; root?: string } | undefined;
  error: string | undefined;
  key: string | undefined;
};

export type Resource = {
  isLoading: boolean;
  payload: Record<string, string>;
  error: string | undefined;
};

export type Wishlist = string[];

const roots: Roots = {
  isLoading: true,
  payload: void 0,
  error: void 0,
};

const root: Root = {
  isLoading: true,
  payload: void 0,
  error: void 0,
  key: void 0,
};

const resource: Resource = {
  isLoading: true,
  payload: {},
  error: void 0,
};

const wishlist: Wishlist = [];

export default {
  roots,
  root,
  resource,
  wishlist,
};
