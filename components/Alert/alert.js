import React from "react";
import Error from "./error";
import Success from "./success";

const Alert = () => {
  return <div>Alert</div>;
};

Alert.Success = Success;
Alert.Error = Error;

export default Alert;
