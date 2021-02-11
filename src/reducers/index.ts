import { combineReducers } from "redux";
import initialState, { Resource, Root, Roots, Wishlist } from "./initial-state";
// eslint-disable-next-line sort-imports
import {
  FETCH_RESOURCE,
  FETCH_RESOURCE_FAILURE,
  FETCH_RESOURCE_SUCCESS,
  FETCH_ROOT,
  FETCH_ROOTS,
  FETCH_ROOTS_FAILURE,
  FETCH_ROOTS_SUCCESS,
  FETCH_ROOT_FAILURE,
  FETCH_ROOT_SUCCESS,
  GET_WISHLIST,
  SET_WISHLIST,
} from "../constants";
import { getWithExpiry, setWithExpiry } from "../services/LocalStorage";

export default combineReducers({
  roots: (state: Roots = initialState.roots, action) => {
    switch (action.type) {
      case FETCH_ROOTS:
        return { isLoading: true };

      case FETCH_ROOTS_FAILURE:
        return {
          isLoading: false,
          error: action.payload,
          key: void 0,
        };

      case FETCH_ROOTS_SUCCESS:
        return {
          isLoading: false,
          payload: action.payload,
          key: action.payload.root,
        };

      default:
        return state;
    }
  },
  root: (state: Root = initialState.root, action) => {
    switch (action.type) {
      case FETCH_ROOT:
        return { isLoading: true };

      case FETCH_ROOT_FAILURE:
        return {
          isLoading: false,
          error: action.payload,
        };

      case FETCH_ROOT_SUCCESS:
        return {
          isLoading: false,
          payload: action.payload,
        };

      default:
        return state;
    }
  },
  resource: (state: Resource = initialState.resource, action) => {
    switch (action.type) {
      case FETCH_RESOURCE:
        return { isLoading: true };

      case FETCH_RESOURCE_FAILURE:
        return {
          isLoading: false,
          error: action.payload,
        };

      case FETCH_RESOURCE_SUCCESS:
        return {
          isLoading: false,
          payload: action.payload,
        };

      default:
        return state;
    }
  },
  wishlist: (state: Wishlist = initialState.wishlist, action) => {
    switch (action.type) {
      case GET_WISHLIST:
        return getWithExpiry("WISHLIST") ?? [];

      case SET_WISHLIST: {
        const index = state.indexOf(action.payload);

        if (index < 0) {
          setWithExpiry("WISHLIST", [...state, action.payload]);

          return [...state, action.payload];
        }
        setWithExpiry("WISHLIST", [
          ...state.slice(0, index),
          ...state.slice(index + 1),
        ]);

        return [...state.slice(0, index), ...state.slice(index + 1)];
      }

      default:
        return state;
    }
  },
});
