// Raster voor kaarten. Aantal kolommen groeit mee met de schermbreedte:
// mobiel 1 · tablet 2 · laptop 3 · groot scherm 4
// Zelfde zijmarge als Header en PageHeader (px-6 → lg:px-20), zodat alles op één lijn staat.
function CardGrid({ children }: { children: React.ReactNode }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 w-full px-6 lg:px-20 py-8">
      {children}
    </div>
  );
}

export default CardGrid;
