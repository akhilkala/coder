import React, { Component } from "react";
import Lottie from "react-lottie";
import animation from "../assets/animations/error.json";
import { lottieOptions } from "../utils/utilities";
import Button from "./Button";

export default class ErrorBoundary extends Component {
  state = {
    error: false,
  };

  static getDerivedStateFromError(error: Error) {
    return { error: true };
  }

  componentDidCatch(error: Error, errorInfo: any) {
    // TODO: API request to log error somewhere
    console.log(error);
  }

  render() {
    if (this.state.error) {
      return (
        <div className="error-boundary">
          <Lottie options={lottieOptions(animation)} height={400} width={400} />
          <h1>Something went wrong</h1>
          <Button link to="/">
            Back to Home
          </Button>
        </div>
      );
    }

    return this.props.children;
  }
}
