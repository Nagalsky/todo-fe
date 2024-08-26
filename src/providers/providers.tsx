'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import React from 'react'

function Providers({ children }: React.PropsWithChildren) {
	const [client] = React.useState(
		new QueryClient({
			defaultOptions: {
				queries: {
					staleTime: 1 * 60 * 60 * 1000,
					refetchOnWindowFocus: false,
					retry: 0,
				},
			},
		})
	)

	return <QueryClientProvider client={client}>{children}</QueryClientProvider>
}

export default Providers
