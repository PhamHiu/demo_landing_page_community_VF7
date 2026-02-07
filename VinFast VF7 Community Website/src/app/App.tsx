import { useLocation } from 'react-router';
import { Header } from '@/app/components/header';
import { Footer } from '@/app/components/footer';
import { AnimatedRoutes } from '@/app/components/animated-routes';

function App() {
  const location = useLocation();
  const isMapPage = location.pathname === '/map';

  return (
    <div className="min-h-screen flex flex-col overflow-x-hidden">
      <Header />
      <main className="flex-1 flex flex-col relative w-full pt-16">
        <AnimatedRoutes />
      </main>
      {!isMapPage && <Footer />}
    </div>
  );
}

export default App;