import React from "react";
import "./App.css";
import MainApp from "./main/MainApp.js";
import ConnectionContext, {ConnectionContextProvider} from "./context/NodeContext";
import MainPage from "./pages/MainPage";
function App() {
  return (
    <div className="App">
      {/* <ConnectionContextProvider>
        <MainApp />
      </ConnectionContextProvider> */}
        <MainPage/>
    </div>
  );
}

export default App;
