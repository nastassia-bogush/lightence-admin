import React from 'react';
import { ConfigProvider } from 'antd';
import deDe from 'antd/lib/locale/de_DE';
import enUS from 'antd/lib/locale/en_US';
import { ThemeProvider } from 'styled-components';
import { ThemeContext } from './context/ThemeContext';
import { NightModeContext } from './context/NightModeContext';
import lightTheme from './styles/theme';
import GlobalStyle from './styles/GlobalStyle';
import 'typeface-poppins';
import 'typeface-montserrat';
import { useTheme } from './hooks/useTheme';
import { useNightMode } from './hooks/useNightMode';
import { useTranslation } from 'react-i18next';
import { darkTheme } from 'styles/darkTheme';
import { AppRouter } from './components/router/AppRouter';

const App: React.FC = () => {
  const { isNightMode, setNightMode, nightTime, setNightTime } = useNightMode();
  const [theme, setTheme] = useTheme(isNightMode, nightTime);

  const { i18n } = useTranslation();

  return (
    <>
      <ThemeProvider theme={theme === 'dark' ? darkTheme : lightTheme}>
        <GlobalStyle />
        <ThemeContext.Provider value={{ theme, setTheme }}>
          <NightModeContext.Provider value={{ isNightMode, setNightMode, nightTime, setNightTime }}>
            <ConfigProvider locale={i18n.language === 'en' ? enUS : deDe}>
              <AppRouter />
            </ConfigProvider>
          </NightModeContext.Provider>
        </ThemeContext.Provider>
      </ThemeProvider>
    </>
  );
};

export default App;
