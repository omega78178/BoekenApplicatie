import Entitycard from "../ui/Entitycard";
import type { Book } from "../../types/book";

type BookCardProps = {
  book: Book;
  onEdit: (book: Book) => void;
  onDelete: (book: Book) => void;
};

// Zet een boek uit de API om naar een Entitycard
function BookCard({ book, onEdit, onDelete }: BookCardProps) {
  const author = book.author?.name ?? "Onbekende auteur";
  const genres = book.genres?.map((genre) => genre.name).join(", ") ?? "";

  return (
    <Entitycard
      type="book"
      title={book.name}
      subtitle={`${author} · ${book.year}`}
      extra={genres}
      onEdit={() => onEdit(book)}
      onDelete={() => onDelete(book)}
    />
  );
}

export default BookCard;
