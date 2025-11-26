import React, { useState } from 'react';
import {
  ConfigProvider,
  enUS,
  zhCN, 
} from '@demo/ui';

export default function App() {
  const [dark, setDark] = useState(false);
  const [localeKey, setLocaleKey] = useState<'en' | 'zh'>('en'); 
  return (
    <ConfigProvider theme={dark ? 'dark' : 'light'} locale={localeKey === 'en' ? enUS : zhCN}> 
    </ConfigProvider>
  );
}
