import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Home';
import MobileLegends from './MobileLegends';
import ChatCS from './components/ChatCS';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/id-id/mobile-legends" element={<MobileLegends />} />
      </Routes>
      <ChatCS />
    </Router>
  );
}
