import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import './App.scss'
import SearchInput from './components/SearchInput'
import RecipeDetails from './components/RecipeDetails';

function App() {

  return (
    <Router>
      <div className="app">
        <Routes>
          <Route path="/" element={<SearchInput />} />
          <Route path="/recipe/:id" element={<RecipeDetails />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App
