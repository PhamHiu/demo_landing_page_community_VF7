import { BrowserRouter } from 'react-router';
import { Header } from '@/app/components/header';
import { Footer } from '@/app/components/footer';
import { AnimatedRoutes } from '@/app/components/animated-routes';

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen flex flex-col overflow-x-hidden">
        <Header />
        <main className="flex-1 flex flex-col relative w-full">
          <AnimatedRoutes />
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;