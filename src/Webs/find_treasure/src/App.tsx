import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import TreasureList from "./app/treasure_list.tsx";

const queryClient = new QueryClient()

function App() {
  return (
    <QueryClientProvider client={queryClient}>
        <>
            <TreasureList />
        </>
    </QueryClientProvider>
  )
}

export default App
