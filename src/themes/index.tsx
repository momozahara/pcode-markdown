import createTheme from "@mui/material/styles/createTheme";
import responsiveFontSize from "@mui/material/styles/responsiveFontSizes";

let lightTheme = createTheme({
  palette: {
    mode: "light",
  },
});

lightTheme = responsiveFontSize(lightTheme);

export default lightTheme;
