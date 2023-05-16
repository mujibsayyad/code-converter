import Head from 'next/head';
import { Inter } from 'next/font/google';
import styles from '@/styles/Main.module.css';

import CodeConverter from '@/context/LanguageContext';
import Main from '../components/Main';

const inter = Inter({ subsets: ['latin'] });

export default function Home() {
  return (
    <>
      <Head>
        <title>Code Converter</title>
        <meta name='code converter' content='code converter' />
        <meta
          name='keywords'
          content='code converter, code, converter, nextjs, reactjs, openai'
        />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <main className={`${styles.main} ${inter.className}`}>
        <CodeConverter>
          <Main />
        </CodeConverter>
      </main>
    </>
  );
}
