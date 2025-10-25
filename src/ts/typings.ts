export interface Product {
  id: string;
  name: string;
  price: number;
  parcelamento: Array<number>;
  color: string;
  image: string;
  size: Array<string>;
  date: string;
}

export interface Filters {
  cor: {
    [key: string]: "active" | "inactive"
  }
  tamanho: {
    [key: string]: "active" | "inactive"
  }
  preco: {
    [key: string]: "active" | "inactive"
  }
}