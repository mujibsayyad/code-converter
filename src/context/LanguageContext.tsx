import { useState, createContext, useContext } from 'react';

interface ConverterContextInterface {
  code: string;
  convertedCode: string;
  language: string;
  convertToLanguage: string;
  loading: boolean;

  langOne: (data: string) => void;
  langTwo: (data: string) => void;
  userCode: (data: string) => void;
  userConvertedCode: (data: string) => void;

  fetchCode: (
    code: string,
    language: string,
    convertToLanguage: string
  ) => Promise<string>;
}

type ConverterContextProps = {
  children: React.ReactNode;
};

type ConverterProps = {
  children: React.ReactNode;
  AuthProvider?: React.ComponentType<ConverterContextProps>;
};

// ***************************************************************** //
// Context
// ***************************************************************** //

const ConverterContext = createContext<ConverterContextInterface | undefined>(
  undefined
);

const CodeConverter = ({ children }: ConverterProps) => {
  const [code, setCode] = useState<string>('');
  const [convertedCode, setConvertedCode] = useState<string>('');
  const [language, setLanguage] = useState<string>('');
  const [convertToLanguage, setConvertToLanguage] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const langOne = (lang: string) => {
    setLanguage(lang);
  };

  const langTwo = (lang: string) => {
    setConvertToLanguage(lang);
  };

  const userCode = (lang: string) => {
    setCode(lang);
  };

  const userConvertedCode = (lang: string) => {
    setConvertedCode(lang);
  };

  // making req to serverless to hide api key from client
  // route -> src/pages/api/serverlessAPI

  const fetchCode = async (
    code: string,
    language: string,
    convertToLanguage: string
  ) => {
    setLoading(true);

    const convCode = await fetch('/api/serverlessAPI', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        code,
        language,
        convertToLanguage,
      }),
    });

    const convCodeData = await convCode.json();
    setLoading(false);

    if (convCodeData === 'You Are Not Authorize') {
      return convCodeData;
    }

    if (convCodeData?.error?.code === 'rate_limit_exceeded') {
      return 'Too Many Requests.';
    }

    return convCodeData?.choices[0].text.trim() as string;
  };

  return (
    <ConverterContext.Provider
      value={{
        code,
        convertedCode,
        language,
        convertToLanguage,
        langOne,
        langTwo,
        userCode,
        userConvertedCode,
        loading,
        fetchCode,
      }}
    >
      {children}
    </ConverterContext.Provider>
  );
};

export const useConvert = () => {
  const contextValue = useContext(ConverterContext);
  if (!contextValue) {
    throw new Error('Context must be used within its provider');
  }
  return contextValue;
};

export default CodeConverter;
