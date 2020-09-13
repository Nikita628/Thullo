import React from 'react';
import './App.css';
import Button from './components/common/Button/Button';
import Icon from './components/common/Icon/Icon';
import Input from './components/common/Input/Input';

function App() {
  return (
    <>
    <Input className="m-5" />
    <Button type="light">Some button</Button>
    <Button type="primary">Some button</Button>
    <Button type="secondary">Some button</Button>
    </>
  );
}

export default App;
