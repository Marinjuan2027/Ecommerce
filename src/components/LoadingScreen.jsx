import React from "react";
import "../styles/loadingScreen.css";
import { Spinner } from "react-bootstrap";

const LoadingScreen = () => {
  return (
    <div className="overlay">
      {/* <Spinner animation="grow" variant="secondary" /> */}
      <Spinner
        as="span"
        animation="grow"
        size="sm"
        role="status"
        aria-hidden="true"
      />
      Loading...
    </div>
  );
};

export default LoadingScreen;
