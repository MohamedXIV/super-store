import {createTheme} from "@mui/material";


const lightTheme = createTheme({
    palette: {
        mode: "light",
        primary: {
            main: "#ea00d9",
            light: "#f100e0",
            dark: "#ff00ea"
        },
        error: {
            main: "#ff0677",
            light: "#ff0677",
            dark: "#ff0677"
        },
        // background: '#f1f1f1',
        paper: 'white'
    },
    typography: {
        fontFamily: "Raleway",
        fontSize: 14,
        fontWeightLight: 300,
        fontWeightRegular: 400,
        fontWeightMedium: 500,
        fontWeightBold: 700,
    },
})

export default lightTheme;