import { ThemeProvider, createTheme } from "@mui/material";
import { useState } from "react";
import { BrowserRouter, Route } from "react-router-dom";
// import "./App.css";
import Chat from "./components/chat";
import Login from "./components/login";
import Meme from "./components/meme";
import Signup from "./components/signup";
import Header from "./header";

function App() {
  const [lightTheme, setLightTheme] = useState(true);

  const myTheme = createTheme({
    palette: {
      mode: lightTheme ? "light" : "dark",
      secondary: {
        main: "#00e9b3",
      },
    },
  });

  return (
    <div>
      <ThemeProvider theme={myTheme}>
        <BrowserRouter>
          <Header
            lightTheme={lightTheme}
            setLightTheme={setLightTheme}
          ></Header>
          <Route path="/login" component={Login}></Route>
          <Route path="/signup" component={Signup}></Route>
          <Route path="/chat" component={Chat}></Route>
          <Route path="/meme" component={Meme}></Route>
        </BrowserRouter>
      </ThemeProvider>
    </div>
  );
}

export default App;
