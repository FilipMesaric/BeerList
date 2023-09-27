import React, { useState } from "react";
import "./App.css";
import Login from "./pages/Login";
import BeerList from "./pages/BeerList";

function App() {
  const [user, setUser] = useState(null);

  const handleLogin = (username) => {
    setUser(username);
  };

  return (
    <div className="App">
      {user ? (
        <div>
          <BeerList />
        </div>
      ) : (
        <Login onLogin={handleLogin} />
      )}
    </div>
  );
}

export default App;
