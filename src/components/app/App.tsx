import './App.css';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Views } from '../../views/views';

function App(): React.JSX.Element {
  return (
      <BrowserRouter basename="/">
          <Views/>
      </BrowserRouter>
  );
}

export default App;
