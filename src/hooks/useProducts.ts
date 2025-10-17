import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiClient } from "@/lib/api/client";
import { Product, CreateProductDto, UpdateProductDto } from "@/types/product";
import toast from "react-hot-toast";

// Query Keys
export const productKeys = {
  all: ["products"] as const,
  lists: () => [...productKeys.all, "list"] as const,
  list: (filters: { search?: string; category?: string; page?: number }) =>
    [...productKeys.lists(), filters] as const,
  details: () => [...productKeys.all, "detail"] as const,
  detail: (id: string) => [...productKeys.details(), id] as const,
};

// Fetch all products with filters
export function useProducts(filters?: {
  search?: string;
  category?: string;
  page?: number;
}) {
  return useQuery({
    queryKey: productKeys.list(filters || {}),
    queryFn: async () => {
      const response = await apiClient.getProducts(filters);
      return response;
    },
    staleTime: 1000 * 60 * 5, // Data stays fresh for 5 minutes
  });
}

// Fetch single product
export function useProduct(id: string) {
  return useQuery({
    queryKey: productKeys.detail(id),
    queryFn: async () => {
      const response = await apiClient.getProduct(id);
      return response.data as Product;
    },
    enabled: !!id, // Only fetch if id exists
    staleTime: 1000 * 60 * 5,
  });
}

// Create product mutation
export function useCreateProduct() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: CreateProductDto) => {
      const response = await apiClient.createProduct(data);
      return response.data as Product;
    },
    onSuccess: (newProduct) => {
      // Invalidate all product lists to refetch with new data
      queryClient.invalidateQueries({ queryKey: productKeys.lists() });

      // Optionally: Optimistically update the cache
      queryClient.setQueryData(productKeys.detail(newProduct.id), newProduct);

      toast.success("Product created successfully!");
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.error || "Failed to create product");
    },
  });
}

// Update product mutation
export function useUpdateProduct() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      id,
      data,
    }: {
      id: string;
      data: UpdateProductDto;
    }) => {
      const response = await apiClient.updateProduct(id, data);
      return response.data as Product;
    },
    onMutate: async ({ id, data }) => {
      // Cancel outgoing refetches
      await queryClient.cancelQueries({ queryKey: productKeys.detail(id) });

      // Snapshot previous value
      const previousProduct = queryClient.getQueryData(productKeys.detail(id));

      // Optimistically update cache
      queryClient.setQueryData(productKeys.detail(id), (old: any) => ({
        ...old,
        ...data,
      }));

      return { previousProduct };
    },
    onSuccess: (updatedProduct, { id }) => {
      // Update the detail cache
      queryClient.setQueryData(productKeys.detail(id), updatedProduct);

      // Invalidate and refetch lists to show updated data
      queryClient.invalidateQueries({ queryKey: productKeys.lists() });

      toast.success("Product updated successfully!");
    },
    onError: (error: any, { id }, context) => {
      // Rollback on error
      if (context?.previousProduct) {
        queryClient.setQueryData(
          productKeys.detail(id),
          context.previousProduct
        );
      }
      toast.error(error.response?.data?.error || "Failed to update product");
    },
  });
}

// Delete product mutation
export function useDeleteProduct() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      await apiClient.deleteProduct(id);
      return id;
    },
    onMutate: async (id) => {
      // Cancel queries
      await queryClient.cancelQueries({ queryKey: productKeys.lists() });

      // Snapshot previous value
      const previousProducts = queryClient.getQueriesData({
        queryKey: productKeys.lists(),
      });

      // Optimistically remove from cache
      queryClient.setQueriesData(
        { queryKey: productKeys.lists() },
        (old: any) => {
          // Check 1: If old is not defined or is null, return it as is.
          if (!old) return old;

          // ✅ FIX: Check 2: Ensure 'old' is an Array before attempting to use .filter()
          if (!Array.isArray(old)) {
            // If it's not an array (e.g., it's a single product object), do nothing.
            return old;
          }

          // If it is an array (the list of products), filter out the deleted ID.
          return old.filter((product: Product) => product.id !== id);
        }
      );

      return { previousProducts };
    },
    onSuccess: (deletedId) => {
      // Remove from detail cache
      queryClient.removeQueries({ queryKey: productKeys.detail(deletedId) });

      // Invalidate lists to refetch
      queryClient.invalidateQueries({ queryKey: productKeys.lists() });

      toast.success("Product deleted successfully!");
    },
    onError: (error: any, id, context) => {
      // Rollback on error
      if (context?.previousProducts) {
        context.previousProducts.forEach(([queryKey, data]) => {
          queryClient.setQueryData(queryKey, data);
        });
      }
      toast.error(error.response?.data?.error || "Failed to delete product");
    },
  });
}
