import React from 'react';
import './App.css';
import Button from './components/common/Button/Button';
import FilePicker from './components/common/FilePicker/FilePicker';
import Icon from './components/common/Icon/Icon';
import Input from './components/common/Input/Input';

function App() {
  return (
    <>
    <FilePicker isUploadEnabled={true} />
    </>
  );
}

export default App;
