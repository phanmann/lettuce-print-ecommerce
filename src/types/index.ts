export interface Product {
  id: number;
  name: string;
  description: string;
  price: string;
  image: string;
  category: string;
  specifications?: {
    sizes?: string[];
    paperTypes?: string[];
    finishes?: string[];
    turnaround?: string;
  };
}

export interface CartItem {
  id: number;
  name: string;
  description: string;
  quantity: number;
  price: number;
  image: string;
  specifications?: {
    size?: string;
    paperType?: string;
    finish?: string;
  };
}

export interface QuoteRequest {
  productType: string;
  quantity: number;
  size: string;
  paperType: string;
  color: string;
  deliveryDate?: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  notes?: string;
}