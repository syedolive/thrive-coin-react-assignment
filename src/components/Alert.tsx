import React, { memo } from "react";
import { AlertInterface } from "../lib/AlertInterface";

const Alert = ({ type, message }: AlertInterface) => {
  if (message !== null) {
    return (
      <div className={`alert alert-light text-${type}`} role="alert">
        {message}
      </div>
    );
  }
  return null;
};

export default memo(Alert);
