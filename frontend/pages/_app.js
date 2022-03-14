import '../styles/globals.css';
import {CacheProvider} from '@emotion/react';
import createEmotionCache from '../utility/createEmotionCache';
import Layout from "../components/Layout";
import {ThemeProvider, CssBaseline} from "@mui/material";
import lightTheme from "../styles/themes/lighttheme";
import darkTheme from "../styles/themes/darktheme";
import {useState} from "react";



const clientSideEmotionCache = createEmotionCache();

function MyApp({Component, emotionCache = clientSideEmotionCache, pageProps}) {
    const [isDarkThemeOn, setIsDarkThemeOn] = useState(false);
    const currentTheme = isDarkThemeOn? darkTheme : lightTheme;

    return (
        <CacheProvider value={emotionCache}>
            <ThemeProvider theme={currentTheme}>
                <Layout theme={currentTheme} setTheme={setIsDarkThemeOn} darkThemeOn={isDarkThemeOn}>
                    <CssBaseline/>
                    <Component {...pageProps} />
                </Layout>
            </ThemeProvider>
        </CacheProvider>
    )

}

export default MyApp
