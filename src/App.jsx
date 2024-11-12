import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import TeamList from './components/TeamList';
import CircleAssignment from './components/CircleAssignment';

const basename = process.env.NODE_ENV === 'production' ? '/creador-anelles/' : '/creador-anelles/';

const App = () => {
  return (
    <Router basename={basename}>
      <Routes>
        <Route path="/" element={<TeamList />} />
        <Route path="/team/:teamId/:configId" element={<CircleAssignment />} />
      </Routes>
    </Router>
  );
};

export default App;