import EntryList from "./entries/EntryList.tsx"
import EntryDetails from "./entries/EntryDetails.tsx"
import { BrowserRouter, Routes, Route } from "react-router";

function App() {

  return (
    <main>
      <h1>Duszności Wczesnej Dorosłości</h1>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<EntryList />} />
          <Route path="/entries" element={<EntryList />} />
          <Route path="/entries/:id" element={<EntryDetails />} />
        </Routes>
      </BrowserRouter>
    </main>
  );
}

export default App;
