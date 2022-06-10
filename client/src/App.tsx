import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";

import Views from "./views";
import store from "./state";

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="*" element={<Views />} />
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;
