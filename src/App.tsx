// App.tsx
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/login";
import Book from "./pages/books";
import Auteur from "./pages/auteurs";
import Genre from "./pages/genres";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="/login" element={<Login />} />
      <Route path="/book" element={<Book />} />
      <Route path="/auteur" element={<Auteur />} />
      <Route path="/genre" element={<Genre />} />
      {/* <Route path="/book/:id" element={<BookDetail />} /> */}
    </Routes>
  );
}
