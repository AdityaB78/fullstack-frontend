import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const MainLayout = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-100 font-sans text-gray-900">
      {/* Navbar */}
      <header className="fixed top-0 left-0 w-full z-50 bg-white shadow-md">
        <Navbar />
      </header>

      {/* Main Content Area */}
      {/* Added pt-16 to account for fixed navbar height */}
      <main className="flex-grow pt-16 pb-8">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <Outlet />
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full bg-gray-800 text-white py-6">
        <Footer />
      </footer>
    </div>
  );
};

export default MainLayout;