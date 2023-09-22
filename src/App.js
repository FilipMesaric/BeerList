import React, { useState } from "react";
import "./App.css";
import Login from "./Login";
import BeerList from "./BeerList";

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
