export interface SearchFormModel {
    infos: {
      identifiant: string | null;
      titre: string | null;
    };
    type: string | null;
    anneeDeSortie: number | null;
    fiche: string | null;
  }
/* se crea una interface para el esqueleto del stringify, siguiendo el patron de un typo JSON */