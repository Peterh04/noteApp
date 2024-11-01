import './App.css';
import NotesListPage from './pages/NotesListPage';
import Header from './components/Header';
import NotePage from './pages/NotePage';
import { BrowserRouter, Route, Routes } from 'react-router-dom';




function App() {
  return (
    <div className="container dark">
      <div className="app">

      
    <BrowserRouter>
      < Header />
    <Routes>
      <Route path='/' element = {<NotesListPage />}/>
      <Route path='/note/:id' element = {<NotePage />}/>
    </Routes>

    </BrowserRouter>
    </div>
    </div>
  );
}

export default App;
