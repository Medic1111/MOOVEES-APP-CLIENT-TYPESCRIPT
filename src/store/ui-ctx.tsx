import React, { createContext, useState } from "react";

interface uiCtxValue {
  isLoading: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  isModal: boolean;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
}

export const uiCtx = createContext<uiCtxValue>({
  isLoading: false,
  setIsLoading: () => {},
  isModal: false,
  setShowModal: () => {},
});

const UiCtxProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isLoading, setIsLoading] = useState(false);

  // VERIFY IF isModal or showModal
  const [isModal, setShowModal] = useState(false);
  return (
    <uiCtx.Provider
      value={{
        isLoading,
        setIsLoading,
        isModal,
        setShowModal,
      }}
    >
      {children}
    </uiCtx.Provider>
  );
};

export default UiCtxProvider;
