export interface contacts {
  id: number;
  nom: string;
  prenom: string;
  tel: string;
  adressemail: string;
  adressePostale: string;
  entreprise: string;
  fonction: string;
  dateNaissance: Date;
  site?: string;
  typeContact: string;
  notes?: string;
  photo?: string | ArrayBuffer;
  reseauxSociaux?: string;
  favori?: boolean;
}
