import classes from "../ListItem/ListItem.module.css";
import { listsCtx } from "../../store/lists-ctx";
import { useContext } from "react";
import { detailCtx } from "../../store/detail-ctx";
import { uiCtx } from "../../store/ui-ctx";
import axios from "axios";
import { data } from "../../models/models";

const WishListItem: React.FC<{ obj: data }> = ({ obj }) => {
  const listCtxMgr = useContext(listsCtx);
  const detailCtxMgr = useContext(detailCtx);
  const uiCtxMgr = useContext(uiCtx);

  const detailHandler = async () => {
    const cancelToken = axios.CancelToken.source();

    let id = obj.imdbID;
    uiCtxMgr.setIsLoading(true);
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
  const moveToWatchedHandler = () => {
    listCtxMgr.setWish(() => {
      return listCtxMgr.wish.filter((objRet) => {
        return objRet !== obj;
      });
    });
    let foundEntry = listCtxMgr.watched.find((movie) => obj === movie);
    if (foundEntry) {
      return;
    }
    listCtxMgr.setWatched((prev) => [obj, ...prev]);
  };

  const removeFromWishHandler = () => {
    listCtxMgr.setWish(() => {
      return listCtxMgr.wish.filter((objRet) => {
        return objRet !== obj;
      });
    });
  };

  return (
    <li className={classes.li}>
      <p className={classes.pTitle}>{obj.Title}</p>
      <p className={classes.pYear}>{obj.Year}</p>
      <img onClick={detailHandler} src={obj.Poster} />
      <div className={classes.btnBox}>
        <button onClick={moveToWatchedHandler} className={classes.btn}>
          + Watched
        </button>
        <button onClick={removeFromWishHandler} className={classes.btn}>
          Remove
        </button>
      </div>
    </li>
  );
};

export default WishListItem;
