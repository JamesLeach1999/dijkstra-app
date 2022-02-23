import React from "react";
import "./App.css";
import MainApp from "./main/MainApp.js";
import ConnectionContext, {ConnectionContextProvider} from "./context/NodeContext";
import MainPage from "./pages/MainPage";
import LineTest from "./components/LineTest";
import Edge from "./components/Edge";
import VanLineTest from "./components/VanLineTest";
function App() {
  return (
    <div className="App">
      {/* <ConnectionContextProvider>
        <MainApp />
      </ConnectionContextProvider> */}
        <MainPage/>
        
         {/* <Edge/>
          */}
          {/* <VanLineTest/> */}
    </div>
  );
}

export default App;
