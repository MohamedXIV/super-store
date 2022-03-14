import {Box} from "@mui/material";
import Navbar from './Navbar';
import Footer from './Footer';
import {createContext, useEffect, useState} from "react";

export const GlobalContext = createContext(null);

export default function Layout({children, theme, setTheme, darkThemeOn}) {
    const [deleteEnabled, setDeleteEnabled] = useState(false);
    const [deleteList, setDeleteList] = useState({});

    return (
        <>
            <GlobalContext.Provider
                value={{deleteEnabled, setDeleteEnabled, setTheme, darkThemeOn, deleteList, setDeleteList}}>
                <Box sx={{backgroundColor: theme.palette.mode === 'dark' ? '#333' : '#f5f5f5'}}>
                    <Navbar theme={theme}/>
                    <main>
                        {children}
                    </main>
                </Box>
                <Footer/>
            </GlobalContext.Provider>
        </>
    )
}