import Entitycard from "../ui/Entitycard";
import type { Author } from "../../types/author";
import type { Book } from "../../types/book";

type AuthorCardProps = {
  author: Author;
  books: Book[]; // alle boeken, om te tellen hoeveel er van deze auteur zijn
  onEdit: (author: Author) => void;
  onDelete: (author: Author) => void;
};

// Zet een auteur uit de API om naar een Entitycard
function AuthorCard({ author, books, onEdit, onDelete }: AuthorCardProps) {
  // Tel hoeveel boeken bij deze auteur horen
  const bookCount = books.filter((book) => book.author?.id === author.id).length;

  return (
    <Entitycard
      type="author"
      title={author.name}
      subtitle={`Geboren in ${author.birth_year}`}
      extra={`${bookCount} ${bookCount === 1 ? "boek" : "boeken"}`}
      onEdit={() => onEdit(author)}
      onDelete={() => onDelete(author)}
    />
  );
}

export default AuthorCard;
