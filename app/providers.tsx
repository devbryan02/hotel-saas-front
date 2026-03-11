'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { useState } from 'react'
import { Toaster } from 'sonner'

export function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(() => new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 1000 * 60 * 5,
        retry: 1,
      },
    },
  }))

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <Toaster
        position="top-right"
        expand={true}
        toastOptions={{
          classNames: {
            toast: '!rounded-2xl !shadow-lg !border',
            title: '!font-semibold !text-sm',
            description: '!text-xs',
            success: '!bg-emerald-50 !border-emerald-200 !text-emerald-900 [&_[data-description]]:!text-emerald-700 dark:!bg-emerald-950/50 dark:!border-emerald-800 dark:!text-emerald-100 dark:[&_[data-description]]:!text-emerald-300',
            error: '!bg-red-50 !border-red-200 !text-red-900 [&_[data-description]]:!text-red-700 dark:!bg-red-950/50 dark:!border-red-800 dark:!text-red-100 dark:[&_[data-description]]:!text-red-300',
            warning: '!bg-amber-50 !border-amber-200 !text-amber-900 [&_[data-description]]:!text-amber-700 dark:!bg-amber-950/50 dark:!border-amber-800 dark:!text-amber-100 dark:[&_[data-description]]:!text-amber-300',
            info: '!bg-blue-50 !border-blue-200 !text-blue-900 [&_[data-description]]:!text-blue-700 dark:!bg-blue-950/50 dark:!border-blue-800 dark:!text-blue-100 dark:[&_[data-description]]:!text-blue-300',
          },
        }}
      />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  )
}