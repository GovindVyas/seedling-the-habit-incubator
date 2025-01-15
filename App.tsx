import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Layout from '@/components/Layout';
import Home from '@/pages/Home';
import Habits from '@/pages/Habits';
import Garden from '@/pages/Garden';
import { HabitProvider } from '@/contexts/HabitContext';
import HabitReminder from '@/components/HabitReminder';

const App: React.FC = () => {
  return (
    <Router>
      <HabitProvider>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/habits" element={<Habits />} />
            <Route path="/garden" element={<Garden />} />
          </Routes>
          <HabitReminder />
        </Layout>
      </HabitProvider>
    </Router>
  );
};

export default App;