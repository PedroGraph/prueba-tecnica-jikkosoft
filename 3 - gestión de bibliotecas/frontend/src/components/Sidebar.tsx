import { useLocation, Link } from 'react-router-dom';
import { BookOpen, BookText, Users } from 'lucide-react';

const navItems = [
  { name: 'Libros', href: '/libros', icon: BookText },
  { name: 'Miembros', href: '/miembros', icon: Users },
];

export default function Sidebar() {
  const location = useLocation();

  return (
    <div className="flex min-h-screen w-64 flex-col bg-gray-600">
      <div className="flex h-16 items-center px-6">
        <Link to="/libros" className="flex items-center gap-2 font-semibold">
          <BookOpen className="h-6 w-6 text-orange-600" />
          <span className="text-xl text-white">Biblioteca</span>
        </Link>
      </div>

      <nav className="flex-1 space-y-1 p-4">
        {navItems.map((item) => (
          <Link
            key={item.href}
            to={item.href}
            className={`flex items-center gap-3 rounded-lg px-3 py-2 text-slate-700 transition-colors hover:bg-orange-50 hover:text-orange-500 
              ${location.pathname === item.href ? 'bg-orange-100 text-orange-700 font-medium' : 'text-white'}`}
          >
            <item.icon className={`h-5 w-5 text-slate-700 ${location.pathname !== item.href && "text-white"}`} />
            {item.name}
          </Link>
        ))}
      </nav>
    </div>
  );
}
