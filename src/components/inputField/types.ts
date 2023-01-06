export interface InputFieldType {
  type?: "text";
  placeholder?: string;
  customeClass?: string;
  props?: any;
  symbol?: JSX.Element;
  [key: string]: any;
}
