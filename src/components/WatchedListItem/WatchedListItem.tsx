import classes from "../ListItem/ListItem.module.css";
import { useState } from "react";
import Stars from "../Stars/Stars";
import { useContext } from "react";
import { listsCtx } from "../../store/lists-ctx";
import { detailCtx } from "../../store/detail-ctx";
import { uiCtx } from "../../store/ui-ctx";
import axios from "axios";
import { data } from "../../models/models";

const WatchedListItem: React.FC<{ obj: data }> = ({ obj }) => {
  const [rate, setRate] = useState(["☆", "☆", "☆", "☆", "☆"]);
  const listCtxMgr = useContext(listsCtx);
  const detailCtxMgr = useContext(detailCtx);
  const uiCtxMgr = useContext(uiCtx);

  const detailHandler = async () => {
    const cancelToken = axios.CancelToken.source();

    uiCtxMgr.setIsLoading(true);
    let id = obj.imdbID;
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

  const removeFromWatchedHandler = () => {
    listCtxMgr.setWatched(() => {
      return listCtxMgr.watched.filter((objRet) => {
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
        <p className={classes.stars}>
          {rate.map((item, index) => {
            return (
              <Stars
                key={`STAR_${index}`}
                item={item}
                index={index}
                setRate={setRate}
                rate={rate}
              />
            );
          })}
        </p>
        <button onClick={removeFromWatchedHandler} className={classes.btn}>
          Remove
        </button>
      </div>
    </li>
  );
};

export default WatchedListItem;
