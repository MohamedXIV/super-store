import {createTheme} from "@mui/material";


const darkTheme = createTheme({
    palette: {
        mode: "dark",
        primary: {
            main: "#5EE6DA",
            light: "#68E2FE",
            dark: "#74FCCA"
        },
        error: {
            main: "#ff0677",
            light: "#ff0677",
            dark: "#ff0677"
        },
        // background: '#f1f1f1',
        paper: '#121212'
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

export default darkTheme;