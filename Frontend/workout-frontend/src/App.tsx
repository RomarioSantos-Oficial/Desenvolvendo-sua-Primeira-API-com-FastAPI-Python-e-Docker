import { useState, useEffect } from 'react';
import { Toaster } from 'react-hot-toast';
import Header from './components/Header';
import Dashboard from './components/Dashboard';
import AtletasPage from './components/AtletasPage';
import CategoriasPage from './components/CategoriasPage';
import CentrosPage from './components/CentrosPage';
import { healthCheck } from './services/api';

// Importar as imagens de background
import academiaImg from './assets/imgens/Acdemia.jpg';
import levantandoImg from './assets/imgens/levantando_autres.jpg';
import musculacaoImg from './assets/imgens/Musculação.jpg';

function App() {
  const [currentView, setCurrentView] = useState('dashboard');
  const [isApiOnline, setIsApiOnline] = useState(false);
  const [currentBgIndex, setCurrentBgIndex] = useState(0);
  
  const backgrounds = [academiaImg, levantandoImg, musculacaoImg];

  useEffect(() => {
    checkApiHealth();
    // Verificar API a cada 30 segundos
    const interval = setInterval(checkApiHealth, 30000);
    return () => clearInterval(interval);
  }, []);

  // Rotação automática das imagens de fundo a cada 12 segundos
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBgIndex((prev) => (prev + 1) % backgrounds.length);
    }, 12000);
    return () => clearInterval(interval);
  }, [backgrounds.length]);

  const checkApiHealth = async () => {
    const isOnline = await healthCheck();
    setIsApiOnline(isOnline);
  };

  const renderCurrentView = () => {
    switch (currentView) {
      case 'atletas':
        return <AtletasPage />;
      case 'categorias':
        return <CategoriasPage />;
      case 'centros':
        return <CentrosPage />;
      case 'dashboard':
      default:
        return <Dashboard onNavigate={setCurrentView} />;
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background Images com transição suave */}
      {backgrounds.map((bg, index) => (
        <div
          key={index}
          className={`absolute inset-0 bg-cover bg-center bg-no-repeat transition-opacity duration-2000 ${
            index === currentBgIndex ? 'opacity-100' : 'opacity-0'
          }`}
          style={{ backgroundImage: `url(${bg})` }}
        />
      ))}
      
      {/* Overlay Glassmorphism para melhor contraste */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/85 via-blue-900/80 to-indigo-900/85 backdrop-blur-sm" />
      
      {/* Overlay escuro adicional para melhor legibilidade */}
      <div className="absolute inset-0 bg-black/25" />
      
      {/* Conteúdo da aplicação */}
      <div className="relative z-10 min-h-screen">
        {/* Toast Notifications */}
        <Toaster
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: 'rgba(15, 23, 42, 0.95)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(148, 163, 184, 0.3)',
            borderRadius: '16px',
            color: 'white',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
            padding: '16px',
          },
          success: {
            iconTheme: {
              primary: '#10B981',
              secondary: 'white',
            },
          },
          error: {
            iconTheme: {
              primary: '#EF4444',
              secondary: 'white',
            },
          },
        }}
      />      {/* Header */}
      <Header
        currentView={currentView}
        onViewChange={setCurrentView}
        isApiOnline={isApiOnline}
      />

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* API Status Warning */}
        {!isApiOnline && (
          <div className="mb-6 p-4 bg-red-500/20 border border-red-500/30 rounded-lg backdrop-blur-sm">
            <div className="flex items-center space-x-3">
              <div className="text-red-400 text-xl">⚠️</div>
              <div>
                <h3 className="text-red-300 font-medium">API Offline</h3>
                <p className="text-red-200/70 text-sm">
                  A WorkoutAPI não está respondendo. Verifique se o servidor está rodando em{' '}
                  <code className="bg-red-500/20 px-1 rounded">http://127.0.0.1:8000</code>
                </p>
                <p className="text-red-200/50 text-xs mt-1">
                  Execute: <code className="bg-red-500/20 px-1 rounded">.\run.ps1</code> no diretório da API
                </p>
              </div>
              <button
                onClick={checkApiHealth}
                className="ml-auto bg-red-500/20 hover:bg-red-500/30 text-red-300 px-3 py-1 rounded text-sm transition-colors"
              >
                🔄 Tentar novamente
              </button>
            </div>
          </div>
        )}

        {/* Page Content */}
        <div className="fade-in">
          {renderCurrentView()}
        </div>
      </main>

      {/* Footer */}
      <footer className="glass border-t border-white/10 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
            <div className="flex items-center space-x-4">
              <div className="text-white/70 text-sm">
                🏋️‍♂️ <strong>WorkoutAPI Frontend</strong> - React + Vite + TypeScript
              </div>
            </div>
            <div className="flex items-center space-x-6 text-sm text-white/50">
              <a 
                href="http://127.0.0.1:8000/docs" 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:text-white transition-colors"
              >
                📚 API Docs
              </a>
              <a 
                href="http://127.0.0.1:8000/redoc" 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:text-white transition-colors"
              >
                📖 ReDoc
              </a>
              <div className="flex items-center space-x-2">
                <span>Projeto DIO</span>
                <div className="w-1 h-1 bg-white/30 rounded-full"></div>
                <span>FastAPI + React</span>
              </div>
            </div>
          </div>
        </div>
      </footer>
      </div>
    </div>
  );
}

export default App;
