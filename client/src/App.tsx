import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";

// user defined
import Views from "./views";
import store from "./state";
import setAuthToken from "./utils/setAuthToken";
import { loadUser } from "./state/auth/actions";
function App() {
  useEffect(() => {
    if (localStorage.getItem("token")) {
      setAuthToken(localStorage.getItem("token"));
    }
    store.dispatch(loadUser());
  });
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
