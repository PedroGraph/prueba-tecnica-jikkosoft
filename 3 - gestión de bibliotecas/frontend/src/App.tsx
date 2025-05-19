import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Books } from './pages/Books';
import { Users } from './pages/Users'; 
import Sidebar from './components/Sidebar';

function App() {
  return (
    <Router>
      <div className="flex h-screen bg-gray-100">
        <Sidebar />
        <div className="flex-1 flex flex-col overflow-hidden">
          <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-800">
            <div className="container mx-auto px-6 py-8">
              <Routes>
                <Route path="/libros" element={<Books />} />
                <Route path="/miembros" element={<Users />} />
                {/* <Route path="/books" element={<Books />} />
                <Route path="/users" element={<Users />} />
                <Route path="/users/:id/books" element={<Users />} /> */}
              </Routes>
            </div>
          </main>
        </div>
      </div>
    </Router>
  );
}

export default App;