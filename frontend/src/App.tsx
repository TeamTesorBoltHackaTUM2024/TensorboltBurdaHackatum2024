import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { HomePage } from "./pages/HomePage";
import { ArticlePage } from "./pages/ArticlePage";
import { RootLayout } from "./layouts/RootLayout";
import { TrendPage } from "./pages/TrendPage";
import { Toaster } from "./components/ui/toaster";
import { ArticleGenerator } from "./customcomponents/AIArticleGenerator";

export function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<RootLayout />}>
          <Route index element={<HomePage />} />
          <Route path="article/:id" element={<ArticlePage />} />
          {/* <Route path="trend/:id" element={<ArticlePage />} /> */}

          <Route
            path="mann"
            element={
              <ArticleGenerator
                articles={[
                  { id: "asd", title: "mann" },
                  { id: "asd", title: "karm" },
                ]}
              />
            }
          />

          <Route path="trend/:id/" element={<TrendPage />} />
        </Route>
      </Routes>
      <Toaster />
    </Router>
  );
}
