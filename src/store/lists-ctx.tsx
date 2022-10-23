import React, { createContext, useState } from "react";
import { data } from "../models/models";

interface listsCtxValue {
  data: data[] | [];
  setData: React.Dispatch<React.SetStateAction<data[]>>;
  watched: data[] | [];
  setWatched: React.Dispatch<React.SetStateAction<data[]>>;
  wish: data[] | [];
  setWish: React.Dispatch<React.SetStateAction<data[]>>;
}

export const listsCtx = createContext<listsCtxValue>({
  data: [],
  setData: () => {},
  watched: [],
  setWatched: () => {},
  wish: [],
  setWish: () => {},
});

const ListsProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [data, setData] = useState<data[] | []>([]);
  const [watched, setWatched] = useState<data[] | []>([]);
  const [wish, setWish] = useState<data[] | []>([]);

  return (
    <listsCtx.Provider
      value={{
        data,
        setData,
        watched,
        setWatched,
        wish,
        setWish,
      }}
    >
      {children}
    </listsCtx.Provider>
  );
};
export default ListsProvider;
