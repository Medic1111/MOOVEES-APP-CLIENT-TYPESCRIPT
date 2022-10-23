import classes from "./ListItem.module.css";
import { useContext } from "react";
import { listsCtx } from "../../store/lists-ctx";
import { detailCtx } from "../../store/detail-ctx";
import { uiCtx } from "../../store/ui-ctx";
import axios from "axios";
import { data } from "../../models/models";

interface Props {
  obj: data;
}

const ListItem: React.FC<Props> = ({ obj }) => {
  const listCtxMgr = useContext(listsCtx);
  const detailCtxMgr = useContext(detailCtx);
  const uiCtxMgr = useContext(uiCtx);

  const addToWatchedHandler = () => {
    const foundEntry = listCtxMgr.watched.find((movie) => movie === obj);
    if (!foundEntry) {
      listCtxMgr.setWatched((prev) => [...prev, obj]);
    } else {
      return;
    }
  };

  const addToWishHandler = () => {
    const foundEntry = listCtxMgr.wish.find((movie) => movie === obj);
    if (!foundEntry) {
      listCtxMgr.setWish((prev) => [...prev, obj]);
    } else {
      return;
    }
  };

  const detailHandler = async () => {
    let id = obj.imdbID;
    uiCtxMgr.setIsLoading(true);

    let cancelToken = axios.CancelToken.source();

    await axios
      .get(
        `https://www.omdbapi.com/?i=${id}&apikey=${process.env.REACT_APP_API_KEY}`,
        { cancelToken: cancelToken.token }
      )
      .then((serverRes) => {
        detailCtxMgr.setDetailInfo(serverRes.data);
        uiCtxMgr.setShowModal(true);
        uiCtxMgr.setIsLoading(false);
      })
      .catch((err) => {
        uiCtxMgr.setIsLoading(false);
      });

    return () => cancelToken.cancel();
  };

  return (
    <li className={classes.li}>
      <p className={classes.pTitle}>{obj.Title}</p>
      <p className={classes.pYear}>{obj.Year}</p>
      <img onClick={detailHandler} src={obj.Poster} />
      <div className={classes.btnBox}>
        <button onClick={addToWatchedHandler} className={classes.btn}>
          + Watched
        </button>
        <button onClick={addToWishHandler} className={classes.btn}>
          + Wish
        </button>
      </div>
    </li>
  );
};

export default ListItem;
