import { Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Layout from '@/components/organisms/Layout';
import Home from '@/components/pages/Home';
import Phonics from '@/components/pages/Phonics';
import Vocabulary from '@/components/pages/Vocabulary';
import Reading from '@/components/pages/Reading';
import Writing from '@/components/pages/Writing';
import Progress from '@/components/pages/Progress';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="phonics" element={<Phonics />} />
          <Route path="vocabulary" element={<Vocabulary />} />
          <Route path="reading" element={<Reading />} />
          <Route path="writing" element={<Writing />} />
          <Route path="progress" element={<Progress />} />
        </Route>
      </Routes>
      
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        className="z-50"
      />
    </>
  );
}

export default App;