import EntryList from "./entries/EntryList.tsx"
import AddEntry from "./entries/AddEntry.tsx"
import { BrowserRouter, Routes, Route } from "react-router";

function App() {

  return (
    <main>
      <h1>Duszności Wczesnej Dorosłości</h1>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<EntryList />} />
          <Route path="/entries" element={<EntryList />} />
          <Route path="/entries/:id" element={<AddEntry />} />
        </Routes>
      </BrowserRouter>
    </main>
  );
}

export default App;
