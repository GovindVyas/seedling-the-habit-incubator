import React from 'react';
import { Link } from 'react-router-dom';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="bg-primary text-primary-foreground p-4">
        <nav>
          <ul className="flex space-x-4">
            <li><Link to="/" className="hover:underline">Home</Link></li>
            <li><Link to="/habits" className="hover:underline">Habits</Link></li>
            <li><Link to="/garden" className="hover:underline">Garden</Link></li>
          </ul>
        </nav>
      </header>
      <main className="container mx-auto p-4">
        {children}
      </main>
      <footer className="bg-secondary text-secondary-foreground p-4 text-center">
        <p>&copy; 2023 Seedling - The Habit Incubator</p>
      </footer>
    </div>
  );
};

export default Layout;