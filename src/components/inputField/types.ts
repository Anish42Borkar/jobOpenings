export interface InputFieldType {
  type?: "text";
  placeholder?: string;
  customeClass?: string;
  props?: any;
  symbol?: JSX.Element;
  callBack?: () => void;
  [key: string]: any;
}
