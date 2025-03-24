import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import DataEntryPage from './pages/DataEntryPage';
import PortfolioPage from './pages/PortfolioPage'; 


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<DataEntryPage />} />
        <Route path="/portfolio" element={<PortfolioPage />} />
      </Routes>
    </Router>
  );
}

export default App;