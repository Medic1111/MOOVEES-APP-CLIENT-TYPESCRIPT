import classes from "./Form.module.css";
import axios from "axios";
import { useState, useContext } from "react";
import { listsCtx } from "../../store/lists-ctx";
import { uiCtx } from "../../store/ui-ctx";

const Form: React.FC = () => {
  const listCtxMgr = useContext(listsCtx);
  const uiCtxMgr = useContext(uiCtx);

  const [userInput, setUserInput] = useState("");
  const [error, setError] = useState(false);
  const [serverError, setServerError] = useState(false);

  const postToApiHandler = async (e: React.MouseEvent<HTMLInputElement>) => {
    const cancelToken = axios.CancelToken.source();
    uiCtxMgr.setIsLoading(true);
    e.preventDefault();
    await axios
      .get(
        `https://www.omdbapi.com/?apikey=${process.env.REACT_APP_API_KEY}&s=${userInput}`,
        { cancelToken: cancelToken.token }
      )
      .then((serverRes) => {
        uiCtxMgr.setIsLoading(false);
        setError(false);
        setServerError(false);
        console.log(serverRes.data.Search);
        listCtxMgr.setData(serverRes.data.Search);
      })
      .catch((err) => {
        uiCtxMgr.setIsLoading(false);
        err.response.status === 404 && setError(true);
        err.response.status === 500 && setServerError(true);
      });

    return () => cancelToken.cancel();
  };

  return (
    <form className={classes.form}>
      <input
        value={userInput}
        onChange={(e) => {
          setError(false);
          setServerError(false);
          setUserInput(e.target.value);
        }}
        className={classes.input}
        type="text"
        placeholder="Movie Title"
      />
      <input
        onClick={postToApiHandler}
        className={classes.submit}
        type="submit"
      />
      {error && <p className={classes.feedback}>Nothing found...</p>}
      {serverError && (
        <p className={classes.feedback}>
          Oops, something went wrong, please try again
        </p>
      )}
    </form>
  );
};

export default Form;
