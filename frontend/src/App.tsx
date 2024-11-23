import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { HomePage } from "./pages/HomePage";
import { ArticlePage } from "./pages/ArticlePage";
import { AIGeneratorPage } from "./pages/AIGeneratorPage";
import { RootLayout } from "./layouts/RootLayout";

export function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<RootLayout />}>
          <Route index element={<HomePage />} />
          <Route path="article/:id" element={<ArticlePage />} />
          <Route path="ai-generator" element={<AIGeneratorPage />} />
        </Route>
      </Routes>
    </Router>
  );
}
