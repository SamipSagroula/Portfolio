import React from 'react';
import Portfolio from './components/Portfolio';
import Contact from './components/Contact';
import Footer from './components/Footer';

function App() {
  return (
    <div className='min-h-screen bg-blue-50 font-sans selection:bg-blue-200 selection:text-blue-900'>
      <main className='flex-grow'>
       
      
        <Portfolio />
      </main>
    </div>
  );
}

export default App;
