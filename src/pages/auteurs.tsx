import Header from "../components/Header";
import PageHeader from "../components/PageHeader";

export default function Auteur() {
  return (
    <div className="min-h-screen flex flex-col bg-bg-canvas">
      <Header />
      <PageHeader
        title="auteurs"
        searchText="Zoek op auteur…"
        buttonText="Nieuw auteur"
      />
    </div>
  );
}
