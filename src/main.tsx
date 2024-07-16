import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import CodeMirrorEditor from './CodeMirrorEditor';
import { Flex } from 'antd';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Flex gap="middle" vertical>
      <App />
      <CodeMirrorEditor />
    </Flex>
  </React.StrictMode>
);
