export interface linksType {
  id: number;
  path: string;
  text: string;
  icon: React.ReactNode;
}

export interface DataType {
  id: number;
  numero: string;
  designation: string;
  niveau: string;
  create_at: string;
  update_at: string;
  zip: null;
}

export interface IAuth {
  first_name: string;
  last_name: string;
}

export interface NewUserType {
  first_name: string;
  last_name: string;
  group: string;
  email: string;
}

export interface IUser {
  id: number;
  first_name: string;
  last_name: string;
  username: string;
  group:
    | "administrateur"
    | "externe"
    | "moderateur"
    | "interne"
    | "gestion"
    | "formation"
    | "client"
    | "";
  email: string;
}

export interface DataBaseTypes {
  family_code: string;
  id_code: string;
  icon: string;
  title: string;
  description: string;
  file: string;
  item: string;
  condition: string;
  help: string;
  comment: string;
  document: string;
  complexity: string;
  right: string;
}
