import React, { useState } from 'react';
import './App.css';
import Button from './components/common/Button/Button';
import FilePicker from './components/common/FilePicker/FilePicker';
import Icon from './components/common/Icon/Icon';
import ImgCropper from './components/common/ImgCropper/ImgCropper';
import Input from './components/common/Input/Input';

function App() {
  const [file, setFile] = useState<File>(null);

  let imgCropper = null;

  if (file) {
    imgCropper = <ImgCropper onImgCropped={(f) => { }} img={file} minHeight={50} minWidth={50} cropType="square" />
  }

  return (
    <>
      <FilePicker isUploadEnabled={false} onSelectedFilesChanged={(files) => { setFile(files[0]); }} />
      {imgCropper}
    </>
  );
}

export default App;
