import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Layout from "./layouts/sidebar"; // Change layout to sidebar
import Index from "./pages/Index.jsx";
import { Home } from "lucide-react"; // Import Home icon from lucide-react
const queryClient = new QueryClient();

export const navItems = [
  {
    title: "Inbox",
    to: "/",
    icon: <Home className="h-4 w-4" />,
  },
  {
    title: "Today",
    to: "/today",
    icon: <Home className="h-4 w-4" />,
  },
  {
    title: "Upcoming",
    to: "/upcoming",
    icon: <Home className="h-4 w-4" />,
  },
];

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Index />} />
              {/* Add more routes here as needed */}
            </Route>
          </Routes>
        </Router>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;