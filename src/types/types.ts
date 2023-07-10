export interface linksType {
  id: number;
  path: string;
  text: string;
}

export interface DataType {
  key: React.Key;
  numero: string;
  designation: string;
  niveau: string;
  date_edition: string;
  date_modification: string;
  telecharger: string;
}

export interface IUser {
  first_name: string;
  last_name: string;
  email: string;
}
