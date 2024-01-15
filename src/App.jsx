import { Routes, Route } from "react-router-dom";
import { HomePage } from "./components/HomePage";
import MoviePage from "./components/MoviePage";
import MovieCard from "./components/MovieCard";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/*" element={<HomePage />} />
      </Routes>
    </div>
  );
}

export default App;
