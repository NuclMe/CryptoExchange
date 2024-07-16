import { useEffect, useRef } from 'react';
import { Typography, Flex } from 'antd';

import { EditorView, basicSetup } from 'codemirror';
import { javascript } from '@codemirror/lang-javascript';
import { appCodeString } from './appCodeString';
const CodeMirrorEditor = () => {
  const editorRef = useRef<EditorView | null>(null);

  useEffect(() => {
    editorRef.current = new EditorView({
      doc: appCodeString,
      extensions: [
        basicSetup,
        javascript({
          typescript: true,
          jsx: true,
        }),
      ],
      parent: document.querySelector('#editor')!,
    });

    return () => {
      editorRef.current?.destroy();
    };
  }, []);

  return (
    <Flex vertical gap="middle">
      <Typography.Title style={{ fontSize: '24px', fontWeight: '400' }}>
        App source code
      </Typography.Title>
      <div id="editor" />
    </Flex>
  );
};

export default CodeMirrorEditor;
