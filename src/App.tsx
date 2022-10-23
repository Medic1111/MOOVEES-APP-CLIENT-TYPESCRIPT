import React, { useContext } from "react";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import { uiCtx } from "./store/ui-ctx";
import Spinner from "./components/Spinner/Spinner";
import MainPage from "./components/MainPage/MainPage";
import DetailModal from "./components/DetailModal/DetailModal";
function App() {
  const uiCtxMgr = useContext(uiCtx);

  return (
    <div className="App">
      {uiCtxMgr.isLoading && <Spinner />}
      {uiCtxMgr.isModal && <DetailModal />}
      <Header />
      <MainPage />
      <Footer />
    </div>
  );
}

export default App;
