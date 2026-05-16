'use client'

import { useToast } from "@/hooks/use-toast"

/**
 * The standard response format returned by the useApiClient methods.
 */
export type ApiResponse<T> = {
  data?: T
  meta?: any
  error?: string
  status: number
}

interface ApiOptions extends RequestInit {
  silent?: boolean
  pendingMessage?: string
  successMessage?: string
}

export function useApiClient() {
  const { toast } = useToast()

  async function handleResponse<T>(
    response: Response, 
    toastId?: string, 
    customSuccessMessage?: string
  ): Promise<ApiResponse<T>> {
    const contentType = response.headers.get('content-type')
    const isJson = contentType && contentType.includes('application/json')
    const rawData = isJson ? await response.json() : null

    // Standardized response extraction
    const success = rawData?.success ?? response.ok
    const message = rawData?.message || rawData?.error || response.statusText
    const payload = rawData?.data !== undefined ? rawData.data : rawData
    const meta = rawData?.meta

    if (!success) {
      const errorMessage = message || 'An unexpected error occurred'
      
      if (toastId) {
        toast({
          id: toastId,
          title: "Error",
          description: errorMessage,
          variant: "destructive",
        })
      }

      return {
        error: errorMessage,
        status: response.status,
      }
    }

    if (toastId) {
      toast({
        id: toastId,
        title: "Success",
        description: customSuccessMessage || message || "Operation successful",
      })
    }

    return {
      data: payload as T,
      meta,
      status: response.status,
    }
  }

  return {
    async get<T>(url: string, options?: ApiOptions): Promise<ApiResponse<T>> {
      let toastId: string | undefined
      if (!options?.silent) {
        const t = toast({
          title: options?.pendingMessage || "Fetching...",
          description: "Please wait while we load the data",
        })
        toastId = t.id
      }

      try {
        const response = await fetch(url, {
          ...options,
          method: 'GET',
          cache: 'no-store',
        })
        return handleResponse<T>(response, toastId)
      } catch (error) {
        if (toastId) {
          toast({
            id: toastId,
            title: "Connection Error",
            description: "Failed to connect to the server",
            variant: "destructive",
          })
        }
        return { error: 'Network connection error', status: 500 }
      }
    },

    async post<T>(url: string, body: any, options?: ApiOptions): Promise<ApiResponse<T>> {
      const { id: toastId } = toast({
        title: options?.pendingMessage || "Processing...",
        description: "Please wait while we process your request",
      })

      try {
        const response = await fetch(url, {
          ...options,
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            ...options?.headers,
          },
          body: JSON.stringify(body),
          cache: 'no-store',
        })
        return handleResponse<T>(response, toastId, options?.successMessage)
      } catch (error) {
        toast({
          id: toastId,
          title: "Connection Error",
          description: "Failed to connect to the server",
          variant: "destructive",
        })
        return { error: 'Network connection error', status: 500 }
      }
    },

    async put<T>(url: string, body: any, options?: ApiOptions): Promise<ApiResponse<T>> {
      const { id: toastId } = toast({
        title: options?.pendingMessage || "Updating...",
        description: "Saving your changes",
      })

      try {
        const response = await fetch(url, {
          ...options,
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            ...options?.headers,
          },
          body: JSON.stringify(body),
          cache: 'no-store',
        })
        return handleResponse<T>(response, toastId, options?.successMessage)
      } catch (error) {
        toast({
          id: toastId,
          title: "Connection Error",
          description: "Failed to connect to the server",
          variant: "destructive",
        })
        return { error: 'Network connection error', status: 500 }
      }
    },

    async delete<T>(url: string, options?: ApiOptions): Promise<ApiResponse<T>> {
      const { id: toastId } = toast({
        title: options?.pendingMessage || "Deleting...",
        description: "Removing the requested item",
      })

      try {
        const response = await fetch(url, {
          ...options,
          method: 'DELETE',
          cache: 'no-store',
        })
        return handleResponse<T>(response, toastId, options?.successMessage)
      } catch (error) {
        toast({
          id: toastId,
          title: "Connection Error",
          description: "Failed to connect to the server",
          variant: "destructive",
        })
        return { error: 'Network connection error', status: 500 }
      }
    },
  }
}
