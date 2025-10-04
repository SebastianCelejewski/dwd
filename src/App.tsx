import { BrowserRouter, Routes, Route } from "react-router";

import MeasurementList from "./measurements/measurementList.tsx"
import MeasurementDetails from "./measurements/measurementDetails.tsx"
import MeasurementAdd from "./measurements/measurementAdd.tsx"
import { Authenticator } from '@aws-amplify/ui-react';

function App() {

  return (
    <Authenticator>
      {({ signOut, user }) => {
        console.log(JSON.stringify(user))
        return ( 
      <main>
        <h1>Duszności Wczesnej Dorosłości</h1>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<MeasurementList />} />
            <Route path="/measurements" element={<MeasurementList />} />
            <Route path="/measurements/new" element={<MeasurementAdd />} />
            <Route path="/measurements/:id" element={<MeasurementDetails />} />
          </Routes>
        </BrowserRouter>
        <button onClick={signOut}>Wyloguj się</button>
      </main>
    )}}
    </Authenticator>
  );
}

export default App;
