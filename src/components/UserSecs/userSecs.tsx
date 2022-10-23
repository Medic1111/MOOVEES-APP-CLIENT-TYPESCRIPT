import { listsCtx } from "../../store/lists-ctx";
import React, { useContext } from "react";
import Watched from "../../components/Watched/Watched";
import WishList from "../WishList/WishList";
import List from "../../components/List/List";

const UserSecs: React.FC = () => {
  const listCtxMgr = useContext(listsCtx);

  return (
    <React.Fragment>
      {listCtxMgr.data.length === 0 || <List />}
      {listCtxMgr.wish.length === 0 || <WishList />}
      {listCtxMgr.watched.length === 0 || <Watched />}
    </React.Fragment>
  );
};

export default UserSecs;
