export type StateProps = {
  id: number | string;
  title: string;
  filter: string;
};

export type FilteredList = {
  [key: string]: ResponseData[];
};

export interface ResponseData {
  id: number;
  code: string;
  title: string;
  description: string;
  industry: Industry;
  postedDate: Date;
  closingDate: null;
  attributes: any[];
  location: Location;
  department: Department | null;
  division: any[];
  function: Department | null;
  type: Type;
  positions: number;
  experience: string;
  salary: string;
  hostedUrl: string;
  applyUrl: string;
  slug: string;
  company: Company;
}

export enum Company {
  Teknorix = "Teknorix",
}

export interface Department {
  id: number;
  title: string;
}

export enum Industry {
  ComputerSoftware = "Computer Software\u000d\n",
  InformationTechnologyAndServices = "Information Technology and Services\u000d\n",
}

export interface Location {
  id: number;
  title: Title;
  city: City;
  state: State;
  country: Country;
  zip: string;
}

export enum City {
  Lisbon = "Lisbon",
  Verna = "Verna",
}

export enum Country {
  India = "India",
  Portugal = "Portugal",
}

export enum State {
  Goa = "Goa",
  Lisbon = "Lisbon",
}

export enum Title {
  LisbonLisbon = "Lisbon - Lisbon",
  VernaGoa = "Verna, Goa",
  VernaVerna = "Verna - Verna",
}

export enum Type {
  Empty = "",
  FullTime = "Full Time",
}
