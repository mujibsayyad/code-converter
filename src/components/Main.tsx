import { useState, useEffect } from 'react';
import { RotatingLines } from 'react-loader-spinner';

import Editor from './Editor';
import Output from './Output';
import { useConvert } from '../context/LanguageContext';
import Footer from './Footer';

import { cpp } from '@codemirror/lang-cpp';
import { java } from '@codemirror/lang-java';
import { rust } from '@codemirror/lang-rust';
import { python } from '@codemirror/lang-python';
import { javascript } from '@codemirror/lang-javascript';

import styles from '@/styles/Main.module.css';

function App() {
  const [message, setMessage] = useState('');

  useEffect(() => {
    const timeout = setTimeout(() => {
      setMessage('');
    }, 10000);

    return () => clearTimeout(timeout);
  }, [message]);

  const {
    code,
    language,
    convertToLanguage,
    userConvertedCode,
    loading,
    fetchCode,
  } = useConvert();

  const translateHandler = async (e: React.FormEvent) => {
    e.preventDefault();

    if (language === convertToLanguage) {
      setMessage('Plese Select Different Language To Convert');
      return;
    }

    if (code.trim().length < 1) {
      setMessage('Please Write Some Code Before Converting');
      return;
    }

    const result = await fetchCode(code, language, convertToLanguage);

    if (result !== 'You Are Not Authorize') {
      userConvertedCode(result);
    } else {
      userConvertedCode(result);
    }
  };

  const getLang = () => {
    switch (language) {
      case 'cpp':
        return cpp();
      case 'java':
        return java();
      case 'rust':
        return rust();
      case 'python':
        return python();
      case 'javascript':
        return javascript();
      default:
        return null;
    }
  };

  const getConvertedLang = () => {
    switch (language) {
      case 'cpp':
        return cpp();
      case 'java':
        return java();
      case 'rust':
        return rust();
      case 'python':
        return python();
      case 'javascript':
        return javascript();
      default:
        return null;
    }
  };

  return (
    <div className={styles.app}>
      <div className={styles.heading}>
        <h1>Code Convertor</h1>
        <h2>AI-powered code conversion at your fingertips.</h2>
      </div>

      <div className={styles.message}>{message && <h4>{message}</h4>}</div>

      <div className={styles.flex}>
        <Editor lang={getLang()} />
        <button onClick={translateHandler}>
          {loading ? (
            <div className={styles.convert_btn}>
              <RotatingLines
                strokeColor='grey'
                strokeWidth='5'
                animationDuration='0.75'
                width='20'
                visible={true}
              />
            </div>
          ) : (
            'Convert'
          )}
        </button>
        <Output lang={getConvertedLang()} />
      </div>

      <Footer />
    </div>
  );
}

export default App;
