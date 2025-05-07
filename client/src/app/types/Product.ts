// Interface: Beskriver hur ett objekt behöver se ut för att vara ett giltigt product-object
export interface Product {
    id: number;
    productName: string;
    productPrice: number;
    description: string;
    category: string;
    color: string;
    image: URL;
    publishDate: string;
    urlSlug: string;
    SKU: string;
}