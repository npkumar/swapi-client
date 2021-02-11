import { action } from "./store";
import {
  FETCH_RESOURCE,
  FETCH_ROOT,
  FETCH_ROOTS,
  GET_WISHLIST,
  SET_WISHLIST,
} from "./constants";

export const getWishlist = () => action(GET_WISHLIST);
export const setWishlist = (resource: string) => action(SET_WISHLIST, resource);
export const getRoots = () => action(FETCH_ROOTS);
export const getRoot = (root: string) => action(FETCH_ROOT, root);
export const getResource = (resource: string) =>
  action(FETCH_RESOURCE, resource);
