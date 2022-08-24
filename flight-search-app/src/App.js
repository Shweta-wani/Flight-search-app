import React from 'react';
import AppContextProvider from './context/appContext';
import FlightSearch from "./components/flightSearch";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import NotFoundPage from "./components/notFoundPage";

function App() {

  return (
      <AppContextProvider>
          <BrowserRouter>
              <Routes>
                  <Route path="/" element={<FlightSearch />} />
                  <Route path="/:origin/:destination" element={<FlightSearch />} />
                  <Route path="/*" element={<NotFoundPage />} />
              </Routes>
          </BrowserRouter>

      </AppContextProvider>
  );
}

export default App;
