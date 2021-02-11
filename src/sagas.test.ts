import { getRoot, getRoots } from "./api";
// eslint-disable-next-line sort-imports
import {
  FETCH_RESOURCE_SUCCESS,
  FETCH_ROOTS_SUCCESS,
  FETCH_ROOT_SUCCESS,
} from "./constants";
import { fetchResource, fetchRoot, fetchRoots } from "./sagas";

describe("Sagas", () => {
  it("fetchRoots", () => {
    const genObject = fetchRoots();

    // @ts-ignore
    expect(genObject.next().value.payload.fn).toEqual(getRoots);
    // @ts-ignore
    expect(genObject.next().value.payload.action.type).toEqual(
      FETCH_ROOTS_SUCCESS
    );
    expect(genObject.next().done).toBeTruthy();
  });

  it("fetchRoot", () => {
    const genObject = fetchRoot("root");

    // @ts-ignore
    expect(genObject.next().value.payload.fn).toEqual(getRoot);
    // @ts-ignore
    expect(genObject.next().value.payload.action.type).toEqual(
      FETCH_ROOT_SUCCESS
    );
    expect(genObject.next().done).toBeTruthy();
  });

  it("fetchResource", () => {
    const genObject = fetchResource("resource");

    // @ts-ignore
    expect(genObject.next().value.payload.fn).toEqual(getRoot);
    // @ts-ignore
    expect(genObject.next().value.payload.action.type).toEqual(
      FETCH_RESOURCE_SUCCESS
    );
    expect(genObject.next().done).toBeTruthy();
  });
});
