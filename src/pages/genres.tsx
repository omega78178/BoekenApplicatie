import Header from "../components/Header";
import PageHeader from "../components/PageHeader";

export default function Genre() {
  return (
    <div className="min-h-screen flex flex-col bg-bg-canvas">
      <Header />
      <PageHeader
        title="genres"
        searchText="Zoek op genres…"
        buttonText="Nieuw genres…"
      />
    </div>
  );
}
