import { getRoot, getRoots } from "./api";
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
} from "./constants";
import { all, call, put, takeLatest } from "redux-saga/effects";

export function* fetchRoots() {
  try {
    const roots = yield call(getRoots);

    yield put({ type: FETCH_ROOTS_SUCCESS, payload: roots });
  } catch (e) {
    yield put({ type: FETCH_ROOTS_FAILURE, payload: e.message });
  }
}

export function* fetchRoot(action: { payload: string }) {
  try {
    const result = yield call(getRoot, action.payload);

    yield put({
      type: FETCH_ROOT_SUCCESS,
      payload: { ...result, root: action.payload },
    });
  } catch (e) {
    yield put({ type: FETCH_ROOT_FAILURE, payload: e.message });
  }
}

export function* fetchResource(action: { payload: string }) {
  try {
    const result = yield call(getRoot, action.payload);

    yield put({ type: FETCH_RESOURCE_SUCCESS, payload: result });
  } catch (e) {
    yield put({ type: FETCH_RESOURCE_FAILURE, payload: e.message });
  }
}

function* watchRootsAsync() {
  yield takeLatest(FETCH_ROOTS, fetchRoots);
}

function* watchRootAsync() {
  // @ts-expect-error
  yield takeLatest(FETCH_ROOT, fetchRoot);
}

function* watchResourceAsync() {
  // @ts-expect-error
  yield takeLatest(FETCH_RESOURCE, fetchResource);
}

export default function* rootSaga() {
  yield all([watchResourceAsync(), watchRootsAsync(), watchRootAsync()]);
}
