import ResourceModal from "./ResourceModal";
import { Root } from "../reducers/initial-state";
import WishlistButton from "./WishlistButton";
import { getResource } from "../actions";
import { useSelector } from "react-redux";
import { Card, Skeleton } from "antd";
import React, { useState } from "react";

const List = () => {
  const root = useSelector<{ root: Root }, Root>((state) => state.root);
  const [isOpen, setIsOpen] = useState(false);
  const loaderCards = 6;

  const handleCardClick = (url: string) => {
    const res = url.split("api/")[1];

    setIsOpen(true);
    getResource(res);
  };

  return (
    <>
      {isOpen && <ResourceModal onRequestClose={() => setIsOpen(false)} />}
      {!root.isLoading && root.payload?.root && (
        <div className="row mb-2">
          <div className="col">
            <WishlistButton resource={root.payload?.root} />
          </div>
        </div>
      )}

      {root.isLoading
        ? Array(loaderCards)
            .fill(0)
            .map((v, i) => (
              <Card className="mb-2" key={i}>
                <Skeleton active paragraph={false} />
              </Card>
            ))
        : root.payload &&
          root.payload.results.map((result) => (
            <Card
              className="mb-2"
              key={result.url}
              onClick={() => handleCardClick(result.url)}
            >
              <p>{result.name || result.title}</p>
            </Card>
          ))}
    </>
  );
};

export default List;
