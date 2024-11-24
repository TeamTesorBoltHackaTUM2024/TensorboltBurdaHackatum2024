import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { HomePage } from "./pages/HomePage";
import { RootLayout } from "./layouts/RootLayout";
import { TrendPage } from "./pages/TrendPage";
import { Toaster } from "./components/ui/toaster";
// import { ArticleGenerator } from "./customcomponents/AIArticleGenerator";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
// import { CreateArticlePage } from "./pages/CreateArticlePage";
// import { EditArticlePage } from "./pages/EditArticlePage";
import EditorPage from "./pages/EditorPage";
import { ArticlePage } from "./pages/ArticlePage";
import { CreateArticlePage } from "./pages/CreateArticlePage";
import { EditArticlePage } from "./pages/EditArticlePage";

export function App() {
  const twentyFourHoursInMs = 1000 * 60 * 60 * 24;
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
        refetchOnMount: false,
        refetchOnReconnect: false,
        retry: false,
        staleTime: twentyFourHoursInMs,
      },
    },
  });

  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Routes>
          <Route path="/" element={<RootLayout />}>
            <Route path="/dashboard" element={<EditorPage />} />

            <Route index path="/" element={<TrendPage />} />

            <Route path="/article/" element={<HomePage />} />
            <Route path="/article/:id" element={<ArticlePage />} />
            <Route path="/article/new" element={<CreateArticlePage />} />
            <Route path="/article/edit/:id" element={<EditArticlePage />} />
          </Route>
        </Routes>
        <Toaster />
      </Router>
    </QueryClientProvider>
  );
}
