// Wat de API terugstuurt
export type Author = {
  id: number;
  name: string;
  birth_year: number;
};

// Wat je opstuurt om een auteur te maken of te bewerken
export type NewAuthor = {
  name: string;
  birth_year: number;
};
