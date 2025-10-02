import { BrowserRouter, Routes, Route } from "react-router";

import EntryList from "./entries/EntryList.tsx"
import EntryDetails from "./entries/EntryDetails.tsx"
import MeasurementList from "./measurements/measurementList.tsx"
import MeasurementDetails from "./measurements/measurementDetails.tsx"

function App() {

  return (
    <main>
      <h1>Duszności Wczesnej Dorosłości</h1>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MeasurementList />} />
          <Route path="/measurements" element={<MeasurementList />} />
          <Route path="/measurements/:id" element={<MeasurementDetails />} />
          <Route path="/entries" element={<EntryList />} />
          <Route path="/entries/:id" element={<EntryDetails />} />
        </Routes>
      </BrowserRouter>
    </main>
  );
}

export default App;
