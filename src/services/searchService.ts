import type { Product } from '@/types/product';
import api from './api';

export const searchService = {
  async searchProducts(query: string): Promise<Product[]> {
    try {
      const nameResponse = await api.get(`/products?name_like=${encodeURIComponent(query)}`);
      const descResponse = await api.get(`/products?description_like=${encodeURIComponent(query)}`);

      const nameResults = nameResponse.data as Product[];
      const descResults = descResponse.data as Product[];

      const uniqueIDs = new Set();
      const combinedResults: Product[] = [];

      nameResults.forEach((product) => {
        combinedResults.push(product);
        uniqueIDs.add(product.id);
      });

      descResults.forEach((product) => {
        if (!uniqueIDs.has(product.id)) {
          combinedResults.push(product);
        }
      });

      return combinedResults;
    } catch (err) {
      console.error('Error searching for products: ', err);
      const response = await api.get('/products');
      const allProducts = response.data;
      return this.filterProducts(allProducts, query);
    }
  },
  filterProducts(products: Product[], query: string): Product[] {
    if (!query.trim()) return products;

    const cleanQuery = query.toLowerCase().trim();

    return products.filter(
      (product) =>
        product.name.toLowerCase().includes(cleanQuery) ||
        product.description.toLowerCase().includes(cleanQuery),
    );
  },
};
