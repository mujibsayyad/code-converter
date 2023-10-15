import { useState, useEffect } from 'react';
import CodeMirror from '@uiw/react-codemirror';

import { useConvert } from '../context/LanguageContext';
import styles from '@/styles/Main.module.css';

const Editor = ({ lang }: any) => {
  const [code, setCode] = useState('');
  const [language, setLanguage] = useState('javascript');

  const { langOne, userCode } = useConvert();

  useEffect(() => {
    langOne(language);
  }, [language]);

  useEffect(() => {
    userCode(code);
  }, [code]);

  return (
    <div className={styles.codeBlock}>
      <div className={styles.lang_options}>
        <select value={language} onChange={(e) => setLanguage(e.target.value)}>
          <option value='javascript'>JavaScript</option>
          <option value='python'>Python</option>
          <option value='cpp'>C++</option>
          <option value='java'>Java</option>
          <option value='rust'>Rust</option>
        </select>
      </div>
      <CodeMirror
        className={styles.codeMirror}
        value={code}
        onChange={setCode}
        height='80vh'
        extensions={lang}
        theme='dark'
      />
    </div>
  );
};

export default Editor;
