import { useState, useEffect } from 'react';
import CodeMirror from '@uiw/react-codemirror';

import { useConvert } from '../context/LanguageContext';
import styles from '@/styles/Main.module.css';

const Output = ({ lang }: any) => {
  const [language, setLanguage] = useState('python');

  const { convertedCode, langTwo } = useConvert();

  useEffect(() => {
    langTwo(language);
  }, [language]);

  return (
    <>
      <div className={styles.codeBlock}>
        <div className={styles.lang_options}>
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
          >
            <option value='python'>Python</option>
            <option value='javascript'>JavaScript</option>
            <option value='cpp'>C++</option>
            <option value='java'>Java</option>
            <option value='rust'>Rust</option>
          </select>
        </div>
        <CodeMirror
          className={styles.codeMirror}
          value={convertedCode}
          height='80vh'
          extensions={lang}
          theme='dark'
          readOnly={true}
        />
      </div>
    </>
  );
};

export default Output;
