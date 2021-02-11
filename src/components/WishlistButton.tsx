import { Button } from "antd";
import { Wishlist } from "../reducers/initial-state";
import { setWishlist } from "../actions";
import { useSelector } from "react-redux";
import { HeartFilled, HeartOutlined } from "@ant-design/icons";
import React, { useEffect, useState } from "react";

const WishlistButton = ({ resource }: { resource: string }) => {
  const [isWished, setIsWished] = useState(false);
  const wishlist = useSelector<{ wishlist: Wishlist }, Wishlist>(
    (state) => state.wishlist
  );

  useEffect(() => {
    const index = wishlist.indexOf(resource);

    if (index >= 0) setIsWished(true);
    else setIsWished(false);
  }, [resource, wishlist]);

  return (
    <Button
      danger={isWished}
      data-testid="wishlistButton"
      icon={isWished ? <HeartFilled /> : <HeartOutlined />}
      onClick={() => {
        setWishlist(resource);
        setIsWished(!isWished);
      }}
      type="primary"
    >
      {isWished ? "Remove from favorites" : "Add to favorites"}
    </Button>
  );
};

export default WishlistButton;
