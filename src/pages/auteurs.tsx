import Header from "../components/Header";
import PageHeader from "../components/PageHeader";
import Entitycard from "../components/Entitycard";

export default function Auteur() {
  return (
    <div className="min-h-screen flex flex-col bg-bg-canvas">
      <Header />
      <PageHeader
        title="auteurs"
        searchText="Zoek op auteur…"
        buttonText="Nieuw auteur"
      />
      {/* 4 kaarten per rij die de volle breedte van de container vullen */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full max-w-7xl mx-auto px-8 py-8">
        {Array.from({ length: 8 }).map((_, i) => (
          <Entitycard key={i} type="author" />
        ))}
      </div>
    </div>
  );
}
