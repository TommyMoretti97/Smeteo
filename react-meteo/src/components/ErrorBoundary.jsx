import React, { Component } from 'react';
import { Link } from 'react-router-dom';


class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    
    console.error(error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div>
          <h2>Si è verificato un errore.</h2>
          <Link to={'/'}>Ritorna alla HomePage</Link>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;