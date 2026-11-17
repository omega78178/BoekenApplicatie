type PageStatusProps = {
  loading: boolean;
  error: string;
  isEmpty: boolean; // true als de lijst leeg is
  emptyText: string; // tekst die je dan ziet
};

// Laat "Laden…", een foutmelding, of een lege-lijst-tekst zien.
// Is er niets aan de hand, dan laat hij niets zien.
// Zelfde zijmarge als de rest van de pagina (px-6 → lg:px-20).
function PageStatus({ loading, error, isEmpty, emptyText }: PageStatusProps) {
  if (loading) {
    return <p className="px-6 lg:px-20 text-ink-soft">Laden…</p>;
  }
  if (error) {
    return <p className="px-6 lg:px-20 text-error">{error}</p>;
  }
  if (isEmpty) {
    return <p className="px-6 lg:px-20 text-ink-soft">{emptyText}</p>;
  }
  return null;
}

export default PageStatus;
