import List from "./List";
import React from "react";
import { Skeleton, Tabs } from "antd";
import { getRoot } from "../actions";
import sentenceCase from "sentence-case";
import { useSelector } from "react-redux";
import { Root, Roots } from "../reducers/initial-state";

const Loader = () => {
  return (
    <>
      <Skeleton active />
      <Skeleton active />
      <Skeleton active />
    </>
  );
};

const Home = () => {
  const roots = useSelector<{ roots: Roots }, Roots>((state) => state.roots);
  const root = useSelector<{ root: Root }, Root>((state) => state.root);

  const keys = Object.keys(roots.payload || {});

  if (roots.isLoading) return <Loader />;

  return (
    <div>
      <h4>{"Star Wars Client 👾"}</h4>
      {roots.payload && (
        <Tabs activeKey={root.payload?.root} onChange={(key) => getRoot(key)}>
          {keys.map((k) => (
            <Tabs.TabPane key={k} tab={sentenceCase(k)}>
              <List />
            </Tabs.TabPane>
          ))}
        </Tabs>
      )}
    </div>
  );
};

export default Home;
