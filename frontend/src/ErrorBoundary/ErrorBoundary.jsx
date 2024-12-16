import React, { Component } from 'react';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    // Update state to show the fallback UI.
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    // Log the error to an error service, if needed
    // console.error('Error occurred:', error);
    // console.info('Component stack trace:', info.componentStack);
    // logErrorToMyService(error, info.componentStack); // Example: log to a service
  }

  render() {
    if (this.state.hasError) {
      // You can render a custom fallback UI
      return this.props.fallback || <p>Something went wrong. Please try again later.</p>;
    }

    return this.props.children;  
  }
}

export default ErrorBoundary;
