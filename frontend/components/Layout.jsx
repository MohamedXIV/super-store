import {Box} from "@mui/material";
import Navbar from './Navbar';
import Footer from './Footer';
import {createContext, useEffect, useState} from "react";

export const GlobalContext = createContext(null);

export default function Layout({children, theme, setTheme, darkThemeOn}) {
    const [deleteEnabled, setDeleteEnabled] = useState(true);
    const [deleteList, setDeleteList] = useState({});
    const [packedData, setPackedData] = useState([]);
    // const f = ()=>{};
    // const deleteCallback = (f) => {f()};

    return (
        <>
            <GlobalContext.Provider
                value={{
                    deleteEnabled,
                    setDeleteEnabled,
                    setTheme,
                    darkThemeOn,
                    deleteList,
                    setDeleteList,
                    packedData,
                    setPackedData

                }}>
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