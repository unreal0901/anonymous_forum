import React from "react";
import { createPortal } from "react-dom";

import { Comment } from "react-loader-spinner";

const LoadingScreen = () => {
  return (
    <>
      {createPortal(
        <div className="w-screen h-screen bg-[#fafafa] absolute top-0 z-[100] flex justify-center items-center">
          <Comment height="120" width="120" backgroundColor="#307EB6" />
        </div>,
        document.body
      )}
    </>
  );
};

export default LoadingScreen;
