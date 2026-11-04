import Header from "../components/Header";
import PageHeader from "../components/PageHeader";
import Entitycard from "../components/Entitycard";

export default function Book() {
  return (
    <div className="min-h-screen flex flex-col bg-bg-canvas">
      <Header />
      <PageHeader
        title="boeken"
        searchText="Zoek op titel…"
        buttonText="Nieuw boek"
      />
      {/* 4 kaarten per rij die de volle breedte van de container vullen */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full max-w-7xl mx-auto px-8 py-8">
        {Array.from({ length: 8 }).map((_, i) => (
          <Entitycard key={i} />
        ))}
      </div>
    </div>
  );
}
