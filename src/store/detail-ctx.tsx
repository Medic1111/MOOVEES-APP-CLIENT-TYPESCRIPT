import React, { createContext, useState } from "react";
import { detailObj } from "../models/models";

interface detailCtxValue {
  detailInfo: detailObj;
  setDetailInfo: React.Dispatch<React.SetStateAction<detailObj>>;
}

export const detailCtx = createContext<detailCtxValue>({
  detailInfo: {
    Title: "",
    Year: "",
    Runtime: "",
    Actors: [],
    Director: "",
    Plot: "",
    Poster: "",
  },
  setDetailInfo: () => {},
});

const DetailProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [detailInfo, setDetailInfo] = useState<detailObj>({
    Title: "",
    Year: "",
    Runtime: "",
    Actors: [],
    Director: "",
    Plot: "",
    Poster: "",
  });

  return (
    <detailCtx.Provider
      value={{
        detailInfo,
        setDetailInfo,
      }}
    >
      {children}
    </detailCtx.Provider>
  );
};

export default DetailProvider;
