import { useState } from "react";
import { isUnauthorized } from "../api/apiFetch";
import { useToast } from "./ToastContext";

// Alles wat je kunt verwijderen heeft minstens een id en een naam
// (boek, genre, auteur)
type Item = { id: number; name: string };

type Options<T extends Item> = {
  remove: (item: T) => Promise<void>; // de API-call, bv. (book) => deleteBook(book.id)
  onDeleted: (item: T) => void; // wat de pagina doet als het gelukt is
  onError: (message: string) => void; // wat de pagina doet bij een andere fout
};

// ── Eigen hook: alles rond "verwijderen" op één plek ──
// Werkt voor boeken, genres én auteurs. <T> betekent: "welk soort item
// je ook meegeeft, je krijgt hetzelfde soort terug".
export function useDeleteItem<T extends Item>({
  remove,
  onDeleted,
  onError,
}: Options<T>) {
  const { showToast } = useToast();
  const [itemToDelete, setItemToDelete] = useState<T | null>(null); // null = modal dicht
  const [deleting, setDeleting] = useState(false); // bezig met verwijderen?

  // Prullenbak aangeklikt → modal open
  function askDelete(item: T) {
    setItemToDelete(item);
  }

  // "Annuleren" → modal dicht (maar niet terwijl hij bezig is)
  function cancelDelete() {
    if (!deleting) setItemToDelete(null);
  }

  // "Ja, verwijder" → naar de API
  async function confirmDelete() {
    if (!itemToDelete) return;
    setDeleting(true); // knoppen uitzetten, zodat je niet 2x klikt
    try {
      await remove(itemToDelete);
      onDeleted(itemToDelete);
      showToast("success", "Verwijderd", `"${itemToDelete.name}" is uit de kast gehaald.`);
    } catch (err) {
      if (isUnauthorized(err)) {
        // 401/403: de API zegt dat je dit niet mag → gele toast
        showToast(
          "unauthorized",
          "Alleen voor admins",
          `${err.status} · Log in als administrator om "${itemToDelete.name}" te verwijderen.`,
        );
      } else {
        onError(err instanceof Error ? err.message : "Verwijderen mislukt");
      }
    } finally {
      setDeleting(false);
      setItemToDelete(null); // modal dicht
    }
  }

  return { itemToDelete, deleting, askDelete, cancelDelete, confirmDelete };
}
