import axios, { AxiosInstance } from "axios";
import { Product, CreateProductDto, UpdateProductDto } from "@/types/product";

class ApiClient {
  private client: AxiosInstance;

  constructor() {
    this.client = axios.create({
      baseURL: process.env.NEXT_PUBLIC_API_URL || "/api",
      headers: {
        "Content-Type": "application/json",
      },
    });

    // Request interceptor to add auth token
    this.client.interceptors.request.use((config) => {
      const token =
        typeof window !== "undefined" ? localStorage.getItem("token") : null;
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    });

    // Response interceptor for error handling
    this.client.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response?.status === 401) {
          // Handle unauthorized - redirect to login
          if (typeof window !== "undefined") {
            localStorage.removeItem("token");
            window.location.href = "/login";
          }
        }
        return Promise.reject(error);
      }
    );
  }

  // Auth endpoints
  async login(email: string) {
    const response = await this.client.post("/auth", { email });
    return response.data;
  }

  // Products endpoints
  async getProducts(params?: {
    search?: string;
    category?: string;
    page?: number;
    pageSize?: number;
  }) {
    const response = await this.client.get("/products", { params });
    return response.data;
  }

  async getProduct(id: string) {
    const response = await this.client.get(`/products/${id}`);
    return response.data;
  }

  async createProduct(data: CreateProductDto) {
    const response = await this.client.post("/products", data);
    return response.data;
  }

  async updateProduct(id: string, data: UpdateProductDto) {
    const response = await this.client.patch(`/products/${id}`, data);
    return response.data;
  }

  async deleteProduct(id: string) {
    const response = await this.client.delete(`/products/${id}`);
    return response.data;
  }
}

export const apiClient = new ApiClient();
