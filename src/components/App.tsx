import sentenceCase from "sentence-case";
import { useSelector } from "react-redux";
import { Layout, Menu } from "antd";
import React, { useEffect } from "react";
import { Root, Roots, Wishlist } from "../reducers/initial-state";
import { StarFilled, StarOutlined } from "@ant-design/icons";
import { getRoot, getRoots, getWishlist } from "../actions";

const { Content, Footer, Sider } = Layout;
const { Item } = Menu;

const App = ({
  children,
}: {
  children: React.ReactNode | React.ReactNodeArray;
}) => {
  const roots = useSelector<{ roots: Roots }, Roots>((state) => state.roots);
  const root = useSelector<{ root: Root }, Root>((state) => state.root);
  const wishlist = useSelector<{ wishlist: Wishlist }, Wishlist>(
    (state) => state.wishlist
  );
  const keys = Object.keys(roots.payload || {});

  useEffect(() => {
    getWishlist();
    getRoots();
    getRoot("people");
  }, []);

  const generateMenuItems = () =>
    keys.map((k) => (
      <Item
        icon={wishlist.indexOf(k) < 0 ? <StarOutlined /> : <StarFilled />}
        key={k}
        onClick={() => getRoot(k)}
      >
        {sentenceCase(k)}
      </Item>
    ));

  return (
    <Layout>
      <Sider breakpoint="lg" collapsedWidth="0" trigger={null}>
        <Menu
          mode="inline"
          selectedKeys={[root.payload?.root ?? ""]}
          theme="dark"
        >
          {roots.payload && generateMenuItems()}
        </Menu>
      </Sider>
      <Layout>
        <Content className="m-3">{children}</Content>
        <Footer className="text-center">{"Star Wars Client ©2021"}</Footer>
      </Layout>
    </Layout>
  );
};

export default App;
