// App.tsx
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/login";
import Book from "./pages/book";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="/login" element={<Login />} />
      <Route path="/book" element={<Book />} />
      {/* <Route path="/book/:id" element={<BookDetail />} /> */}
    </Routes>
  );
}
