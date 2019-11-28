import React from "react";
import ResizeObserver from "@juggle/resize-observer";

const Polyfill = () => {
  React.useEffect(() => {
    window.ResizeObserver =
      window.ResizeObserver || ResizeObserver;
  }, []);

  return null;
};

export { Polyfill };
