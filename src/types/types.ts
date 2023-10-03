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

export interface DataBaseType {
  id: number
  family_code: string;
  id_code: string;
  icon: string;
  title: string;
  description: string;
  file: string;
  items_type: string;
  condition: string;
  help: string;
  comment?: string;
  help_documents: string;
  user_right: string;
  complexity_point?: string;
  rank: number
}



export interface BesoinDetails {
  besoin: Besoin
  steps: Step[]
}

export interface Besoin {
  id: number
  designation: string
  complexite: string
  created_at: string
  update_at: string
  owner: any
}

export interface HelpDocument {
  url: string
  title: string
}
export interface Step {
  icon: string
  items_type: string
  multiple: boolean
  items_list: string[]
  help_documents: string[]
  user_right: string[]
  id: number
  title: string
  family_code: string
  id_code: string
  user_help: string
  description: string
  condition: string
  rank: number
  comment: string
  choice: string
  docs: string[]
  // items_type: string
  // items_list: string[]
  // multiple: boolean
  // title: string
  // family_code: string
  // id_code: string
  // icon: string | File
  // attachment: string
  // help_documents: (HelpDocument | string | File)[]
  // user_help: string
  // comment: string
  // description: string
  // condition: string
  // complexity: number
  // user_right: string[]
  // rank: number
  // groups: any
  // id: number
}