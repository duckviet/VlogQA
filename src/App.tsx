import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import VideoPage from './pages/VideoPage';
import Header from './components/Header';

import MainLayout from './components/MainLayout';
import { SearchProvider } from './contexts/SearchContext';

function App() {
  return (
    <SearchProvider>
      <div className="min-h-screen flex flex-col bg-neutral-50">
        <Header />
        <main className="flex-grow">
          <Routes>
            <Route element={<MainLayout />}>
              <Route path="/" element={<HomePage />} />
              <Route path="/video/:id" element={<VideoPage />} />
            </Route>
          </Routes>
        </main>
       
      </div>
    </SearchProvider>
  );
}

export default App;