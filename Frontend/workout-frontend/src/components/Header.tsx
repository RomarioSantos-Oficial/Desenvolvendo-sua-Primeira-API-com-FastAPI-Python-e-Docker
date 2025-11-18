import React from 'react';

interface HeaderProps {
  currentView: string;
  onViewChange: (view: string) => void;
  isApiOnline: boolean;
}

const Header: React.FC<HeaderProps> = ({ currentView, onViewChange, isApiOnline }) => {
  const menuItems = [
    { id: 'dashboard', label: '🏠 Dashboard', icon: '📊' },
    { id: 'atletas', label: '🏃‍♂️ Atletas', icon: '👤' },
    { id: 'categorias', label: '🏷️ Categorias', icon: '🏆' },
    { id: 'centros', label: '🏢 Centros', icon: '🏋️' },
  ];

  return (
    <header className="backdrop-blur-xl bg-white/5 border-b border-white/10 sticky top-0 z-50 shadow-2xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18">
          {/* Logo */}
          <div className="flex items-center space-x-4">
            <div className="bg-gradient-to-r from-orange-500 to-red-500 rounded-xl p-3 shadow-lg">
              <span className="text-3xl filter drop-shadow-lg">🏋️‍♂️</span>
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-yellow-400 via-orange-400 to-red-400 bg-clip-text text-transparent drop-shadow-lg">WorkoutAPI</h1>
              <p className="text-sm text-white/80 font-medium">Fitness Management System</p>
            </div>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex space-x-2">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => onViewChange(item.id)}
                className={`
                  px-6 py-3 rounded-xl text-sm font-medium transition-all duration-300 backdrop-blur-sm
                  ${currentView === item.id
                    ? 'bg-orange-500/30 text-orange-200 border border-orange-400/50 shadow-xl scale-105'
                    : 'text-white/80 hover:text-white hover:bg-white/15 hover:scale-105'
                  }
                `}
              >
                <span className="mr-2 text-lg filter drop-shadow-sm">{item.icon}</span>
                {item.label.split(' ')[1]}
              </button>
            ))}
          </nav>

          {/* API Status */}
          <div className="flex items-center space-x-3">
            <div className={`
              flex items-center px-4 py-2 rounded-xl text-sm font-medium backdrop-blur-sm border
              ${isApiOnline 
                ? 'bg-green-500/25 text-green-200 border-green-400/40 shadow-lg' 
                : 'bg-red-500/25 text-red-200 border-red-400/40 shadow-lg'
              }
            `}>
              <div className={`
                w-3 h-3 rounded-full mr-3 animate-pulse shadow-md
                ${isApiOnline ? 'bg-green-400' : 'bg-red-400'}
              `} />
              API {isApiOnline ? 'Online' : 'Offline'}
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className="md:hidden py-3 border-t border-white/10">
          <div className="flex space-x-2 overflow-x-auto">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => onViewChange(item.id)}
                className={`
                  flex-shrink-0 px-3 py-2 rounded-lg text-xs font-medium transition-all duration-200
                  ${currentView === item.id
                    ? 'bg-white/20 text-white'
                    : 'text-white/70 hover:text-white hover:bg-white/10'
                  }
                `}
              >
                <span className="mr-1">{item.icon}</span>
                {item.label.split(' ')[1]}
              </button>
            ))}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;