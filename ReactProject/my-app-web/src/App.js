import React from 'react';
//import logo from './logo.svg';
import './App.css';
import Web from './components/Web';
import { Button } from 'reactstrap';


function App() {
  return (
    <div className="App">
        <div>
      <Button outline color="primary">primary</Button>{' '}
      <Button outline color="secondary">secondary</Button>{' '}
      <Button outline color="success">success</Button>{' '}
      <Button outline color="info">info</Button>{' '}
      <Button outline color="warning">warning</Button>{' '}
      <Button outline color="danger">danger</Button>
    </div>
        <Web/>
        <Web/>
        <Web/>
    </div>
  );
}

export default App;
