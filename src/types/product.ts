export type CreateProductParams = {
  product: {
    name: string;
    description: string;
    offerPrice: number;
    originalPrice: number;
    discount?: number;
    rating: number;
    reviews: number;
    image: string[];
    category: string;
    type?: string;
    size?: string[];
    colors?: string[];
    availability: "In Stock" | "Out of Stock";
    flashSale?: boolean;
    bestSelling?: boolean;
    new?: boolean;
  };
};

export type ProductParams = {
  product: {
    _id: string;
    name: string;
    description: string;
    offerPrice: number;
    originalPrice: number;
    discount?: number;
    rating: number;
    reviews: number;
    image: string[];
    category: string;
    type?: string;
    size?: string[];
    colors?: string[];
    availability: "In Stock" | "Out of Stock";
    flashSale?: boolean;
    bestSelling?: boolean;
    new?: boolean;
  };
};
