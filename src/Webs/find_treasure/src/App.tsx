import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import TreasureList from "./app/treasure_list.tsx";
import { ToastContainer } from 'react-toastify';
const queryClient = new QueryClient()

function App() {
  return (
    <QueryClientProvider client={queryClient}>
        <>
            <TreasureList />
            <ToastContainer />
        </>
    </QueryClientProvider>
  )
}

export default App
