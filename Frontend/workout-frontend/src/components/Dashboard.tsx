import React, { useEffect, useState } from 'react';
import { atletaService, categoriaService, centroTreinamentoService } from '../services/api';
import type { Atleta, Categoria, CentroTreinamento } from '../types/api';

interface DashboardStats {
  totalAtletas: number;
  totalCategorias: number;
  totalCentros: number;
  atletasPorSexo: { M: number; F: number };
  idadeMedia: number;
  pesoMedio: number;
}

interface DashboardProps {
  onNavigate?: (view: string) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ onNavigate }) => {
  const [stats, setStats] = useState<DashboardStats>({
    totalAtletas: 0,
    totalCategorias: 0,
    totalCentros: 0,
    atletasPorSexo: { M: 0, F: 0 },
    idadeMedia: 0,
    pesoMedio: 0,
  });
  const [atletas, setAtletas] = useState<Atleta[]>([]);
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [centros, setCentros] = useState<CentroTreinamento[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      const [atletasData, categoriasData, centrosData] = await Promise.all([
        atletaService.getAll(),
        categoriaService.getAll(),
        centroTreinamentoService.getAll(),
      ]);

      setAtletas(atletasData);
      setCategorias(categoriasData);
      setCentros(centrosData);

      // Calcular estatísticas
      const atletasPorSexo = atletasData.reduce(
        (acc, atleta) => {
          acc[atleta.sexo]++;
          return acc;
        },
        { M: 0, F: 0 }
      );

      const idadeMedia = atletasData.length > 0 
        ? atletasData.reduce((sum, atleta) => sum + atleta.idade, 0) / atletasData.length
        : 0;

      const pesoMedio = atletasData.length > 0
        ? atletasData.reduce((sum, atleta) => sum + atleta.peso, 0) / atletasData.length
        : 0;

      setStats({
        totalAtletas: atletasData.length,
        totalCategorias: categoriasData.length,
        totalCentros: centrosData.length,
        atletasPorSexo,
        idadeMedia,
        pesoMedio,
      });
    } catch (error) {
      console.error('Erro ao carregar dados:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
      </div>
    );
  }

  const statCards = [
    {
      title: 'Total de Atletas',
      value: stats.totalAtletas,
      icon: '🏃‍♂️',
      color: 'from-blue-500 to-blue-600',
      description: `${stats.atletasPorSexo.M} homens, ${stats.atletasPorSexo.F} mulheres`
    },
    {
      title: 'Categorias',
      value: stats.totalCategorias,
      icon: '🏷️',
      color: 'from-green-500 to-green-600',
      description: 'Modalidades ativas'
    },
    {
      title: 'Centros de Treinamento',
      value: stats.totalCentros,
      icon: '🏢',
      color: 'from-purple-500 to-purple-600',
      description: 'Locais cadastrados'
    },
    {
      title: 'Idade Média',
      value: Math.round(stats.idadeMedia),
      icon: '📊',
      color: 'from-orange-500 to-orange-600',
      description: 'Anos'
    },
    {
      title: 'Peso Médio',
      value: `${stats.pesoMedio.toFixed(1)} kg`,
      icon: '⚖️',
      color: 'from-pink-500 to-pink-600',
      description: 'Média geral'
    },
  ];

  return (
    <div className="space-y-6 fade-in">
      {/* Welcome Section */}
      <div className="text-center py-8">
        <h1 className="text-4xl font-bold text-white mb-2">
          Dashboard WorkoutAPI 🚀
        </h1>
        <p className="text-white/70 text-lg">
          Gestão completa de atletas, categorias e centros de treinamento
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
        {statCards.map((card, index) => (
          <div
            key={card.title}
            className="backdrop-blur-lg bg-white/10 rounded-2xl p-8 hover:scale-105 hover:bg-white/15 transition-all duration-300 border border-white/20 shadow-2xl"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-r ${card.color} mb-6 shadow-lg`}>
              <span className="text-3xl filter drop-shadow-lg">{card.icon}</span>
            </div>
            <h3 className="text-white/80 text-sm font-semibold mb-2 uppercase tracking-wide">{card.title}</h3>
            <p className="text-4xl font-bold text-white mb-2 drop-shadow-md">{card.value}</p>
            <p className="text-white/60 text-sm font-medium">{card.description}</p>
          </div>
        ))}
      </div>

      {/* Recent Data */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Últimos Atletas */}
        <div className="backdrop-blur-lg bg-white/10 rounded-2xl p-8 border border-white/20 shadow-2xl">
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center drop-shadow-lg">
            <span className="mr-3 text-3xl filter drop-shadow-md">🏃‍♂️</span>
            Últimos Atletas
          </h2>
          <div className="space-y-3">
            {atletas.slice(-5).reverse().map((atleta, index) => (
              <div
                key={atleta.id}
                className="flex items-center space-x-4 p-4 bg-white/5 rounded-xl hover:bg-white/15 transition-all duration-300 border border-white/10 hover:border-white/20"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold ${
                  atleta.sexo === 'M' ? 'bg-blue-500/20 text-blue-300' : 'bg-pink-500/20 text-pink-300'
                }`}>
                  {atleta.sexo === 'M' ? '👨' : '👩'}
                </div>
                <div className="flex-1">
                  <p className="text-white font-medium">{atleta.nome}</p>
                  <p className="text-white/50 text-sm">
                    {atleta.idade} anos • {atleta.peso}kg • {atleta.altura}m
                  </p>
                </div>
              </div>
            ))}
            {atletas.length === 0 && (
              <p className="text-white/50 text-center py-4">
                Nenhum atleta cadastrado ainda
              </p>
            )}
          </div>
        </div>

        {/* Categorias e Centros */}
        <div className="space-y-6">
          {/* Categorias */}
          <div className="glass rounded-xl p-6">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center">
              <span className="mr-2">🏷️</span>
              Categorias
            </h2>
            <div className="space-y-2">
              {categorias.map((categoria, index) => (
                <div
                  key={categoria.id}
                  className="flex items-center justify-between p-2 bg-white/5 rounded-lg"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <span className="text-white font-medium">{categoria.nome}</span>
                  <span className="text-white/50 text-sm">#{categoria.id}</span>
                </div>
              ))}
              {categorias.length === 0 && (
                <p className="text-white/50 text-center py-2">
                  Nenhuma categoria cadastrada
                </p>
              )}
            </div>
          </div>

          {/* Centros */}
          <div className="glass rounded-xl p-6">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center">
              <span className="mr-2">🏢</span>
              Centros de Treinamento
            </h2>
            <div className="space-y-3">
              {centros.slice(0, 3).map((centro, index) => (
                <div
                  key={centro.id}
                  className="p-3 bg-white/5 rounded-lg"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <p className="text-white font-medium">{centro.nome}</p>
                  <p className="text-white/50 text-sm">{centro.endereco}</p>
                  <p className="text-white/40 text-xs">Proprietário: {centro.proprietario}</p>
                </div>
              ))}
              {centros.length === 0 && (
                <p className="text-white/50 text-center py-2">
                  Nenhum centro cadastrado
                </p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="backdrop-blur-lg bg-white/10 rounded-2xl p-8 border border-white/20 shadow-2xl">
        <h2 className="text-2xl font-bold text-white mb-6 flex items-center drop-shadow-lg">
          <span className="mr-3 text-3xl filter drop-shadow-md">⚡</span>
          Ações Rápidas
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <button 
            onClick={() => {
              onNavigate?.('atletas');
              // Pequeno delay para garantir que a página carregou antes de tentar abrir o formulário
              setTimeout(() => {
                const newAtletaBtn = document.querySelector('[data-action="new-atleta"]') as HTMLButtonElement;
                if (newAtletaBtn) newAtletaBtn.click();
              }, 100);
            }}
            className="p-6 bg-gradient-to-r from-blue-500/80 to-blue-600/80 rounded-2xl text-white font-semibold hover:from-blue-600/90 hover:to-blue-700/90 transition-all duration-300 hover:scale-105 transform cursor-pointer backdrop-blur-sm border border-blue-400/30 shadow-xl hover:shadow-2xl"
          >
            <span className="text-2xl mb-2 block filter drop-shadow-md">➕</span>
            Novo Atleta
          </button>
          <button 
            onClick={() => {
              onNavigate?.('categorias');
              setTimeout(() => {
                const newCategoriaBtn = document.querySelector('[data-action="new-categoria"]') as HTMLButtonElement;
                if (newCategoriaBtn) newCategoriaBtn.click();
              }, 100);
            }}
            className="p-6 bg-gradient-to-r from-green-500/80 to-green-600/80 rounded-2xl text-white font-semibold hover:from-green-600/90 hover:to-green-700/90 transition-all duration-300 hover:scale-105 transform cursor-pointer backdrop-blur-sm border border-green-400/30 shadow-xl hover:shadow-2xl"
          >
            <span className="text-2xl mb-2 block filter drop-shadow-md">🏷️</span>
            Nova Categoria
          </button>
          <button 
            onClick={() => {
              onNavigate?.('centros');
              setTimeout(() => {
                const newCentroBtn = document.querySelector('[data-action="new-centro"]') as HTMLButtonElement;
                if (newCentroBtn) newCentroBtn.click();
              }, 100);
            }}
            className="p-6 bg-gradient-to-r from-purple-500/80 to-purple-600/80 rounded-2xl text-white font-semibold hover:from-purple-600/90 hover:to-purple-700/90 transition-all duration-300 hover:scale-105 transform cursor-pointer backdrop-blur-sm border border-purple-400/30 shadow-xl hover:shadow-2xl"
          >
            <span className="text-2xl mb-2 block filter drop-shadow-md">🏢</span>
            Novo Centro
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;