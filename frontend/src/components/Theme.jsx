import { createTheme } from '@mui/material'

const Theme = createTheme({
  typography: {
    fontSize: 13,
    fontFamily: [
      'defaultFont',
    ].join(','),
  },
  palette: {
    primary: {
      main: '#1a56db',
      paperBG : '#FF6D60'
    },
    secondary : {
      main: '#fff'
    }
  }
});

export default Theme