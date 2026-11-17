import Entitycard from "../ui/Entitycard";
import type { Genre } from "../../types/genre";
import type { Book } from "../../types/book";

type GenreCardProps = {
  genre: Genre;
  books: Book[]; // alle boeken, om te tellen hoeveel er in dit genre zitten
  onEdit: (genre: Genre) => void;
  onDelete: (genre: Genre) => void;
};

// Zet een genre uit de API om naar een Entitycard
function GenreCard({ genre, books, onEdit, onDelete }: GenreCardProps) {
  // Een boek kan meerdere genres hebben, dus: zit dit genre ergens in book.genres?
  const bookCount = books.filter((book) =>
    book.genres?.some((g) => g.id === genre.id),
  ).length;

  return (
    <Entitycard
      type="genre"
      title={genre.name}
      subtitle={genre.description}
      extra={`${bookCount} ${bookCount === 1 ? "boek" : "boeken"}`}
      onEdit={() => onEdit(genre)}
      onDelete={() => onDelete(genre)}
    />
  );
}

export default GenreCard;
