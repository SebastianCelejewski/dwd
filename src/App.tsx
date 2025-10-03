import { BrowserRouter, Routes, Route } from "react-router";

import MeasurementList from "./measurements/measurementList.tsx"
import MeasurementDetails from "./measurements/measurementDetails.tsx"
import MeasurementAdd from "./measurements/measurementAdd.tsx"

function App() {

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
    </main>
  );
}

export default App;
