import React, { useEffect, useState } from 'react';
import { centroTreinamentoService } from '../services/api';
import type { CentroTreinamento, CentroTreinamentoCreate } from '../types/api';
import toast from 'react-hot-toast';

const CentrosPage: React.FC = () => {
  const [centros, setCentros] = useState<CentroTreinamento[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [editingCentro, setEditingCentro] = useState<CentroTreinamento | null>(null);
  const [deletingCentro, setDeletingCentro] = useState<CentroTreinamento | null>(null);

  const [formData, setFormData] = useState<CentroTreinamentoCreate>({
    nome: '',
    endereco: '',
    proprietario: '',
  });

  useEffect(() => {
    loadCentros();
  }, []);

  const loadCentros = async () => {
    try {
      setLoading(true);
      const data = await centroTreinamentoService.getAll();
      setCentros(data);
    } catch (error) {
      console.error('Erro ao carregar centros:', error);
      toast.error('Erro ao carregar centros de treinamento');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingCentro) {
        // Usando API REAL de UPDATE!
        const centroAtualizado = await centroTreinamentoService.update(editingCentro.id, formData);
        setCentros(centros.map(c => c.id === editingCentro.id ? centroAtualizado : c));
        toast.success(`Centro "${centroAtualizado.nome}" atualizado com sucesso!`);
      } else {
        const novoCentro = await centroTreinamentoService.create(formData);
        setCentros([...centros, novoCentro]);
        toast.success(`Centro "${novoCentro.nome}" criado com sucesso!`);
      }
      setShowForm(false);
      resetForm();
    } catch (error: any) {
      const errorMessage = error.response?.data?.detail || `Erro ao ${editingCentro ? 'atualizar' : 'criar'} centro de treinamento`;
      toast.error(errorMessage);
    }
  };

  const resetForm = () => {
    setFormData({
      nome: '',
      endereco: '',
      proprietario: '',
    });
    setEditingCentro(null);
  };

  const handleEditCentro = (centro: CentroTreinamento) => {
    setEditingCentro(centro);
    setFormData({
      nome: centro.nome,
      endereco: centro.endereco,
      proprietario: centro.proprietario,
    });
    setShowForm(true);
  };

  const handleDeleteCentro = async (centro: CentroTreinamento) => {
    try {
      // Usando API REAL de DELETE!
      await centroTreinamentoService.delete(centro.id);
      setCentros(centros.filter(c => c.id !== centro.id));
      toast.success(`Centro ${centro.nome} removido com sucesso!`);
      setDeletingCentro(null);
    } catch (error: any) {
      console.error('Erro ao remover centro:', error);
      const errorMessage = error.response?.data?.detail || 'Erro ao remover centro';
      toast.error(errorMessage);
    }
  };

  const filteredCentros = centros.filter(centro =>
    centro.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
    centro.endereco.toLowerCase().includes(searchTerm.toLowerCase()) ||
    centro.proprietario.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Ícones aleatórios para centros
  const centroIcons = ['🏢', '🏋️‍♂️', '🏟️', '🏪', '🏬', '🏛️', '🏗️', '🏭'];
  const centroColors = [
    'from-blue-500 to-blue-600',
    'from-purple-500 to-purple-600',
    'from-green-500 to-green-600',
    'from-red-500 to-red-600',
    'from-orange-500 to-orange-600',
    'from-pink-500 to-pink-600',
    'from-indigo-500 to-indigo-600',
    'from-teal-500 to-teal-600',
  ];

  const getCentroStyle = (id: number) => {
    const iconIndex = id % centroIcons.length;
    const colorIndex = id % centroColors.length;
    return {
      icon: centroIcons[iconIndex],
      color: centroColors[colorIndex]
    };
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6 fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white flex items-center">
            <span className="mr-3">🏢</span>
            Centros de Treinamento
          </h1>
          <p className="text-white/70 mt-1">
            {centros.length} centro{centros.length !== 1 ? 's' : ''} cadastrado{centros.length !== 1 ? 's' : ''}
          </p>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          data-action="new-centro"
          className="bg-gradient-to-r from-purple-500 to-purple-600 text-white px-6 py-2 rounded-lg font-medium hover:from-purple-600 hover:to-purple-700 transition-all duration-200 flex items-center space-x-2"
        >
          <span>{showForm ? '❌' : '➕'}</span>
          <span>{showForm ? 'Cancelar' : 'Novo Centro'}</span>
        </button>
      </div>

      {/* Search */}
      <div className="backdrop-blur-xl bg-white/10 rounded-2xl p-6 border border-white/20 shadow-2xl">
        <input
          type="text"
          placeholder="🔍 Buscar centro..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full bg-white/10 border border-white/20 rounded-xl px-6 py-4 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent backdrop-blur-sm"
        />
      </div>

      {/* Form */}
      {showForm && (
        <div className="glass rounded-xl p-6 slide-in">
          <h2 className="text-xl font-semibold text-white mb-6 flex items-center">
            <span className="mr-2">{editingCentro ? '✏️' : '➕'}</span>
            {editingCentro ? 'Editar Centro de Treinamento' : 'Novo Centro de Treinamento'}
          </h2>
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="md:col-span-2">
              <label className="block text-white/70 text-sm font-medium mb-2">Nome do Centro</label>
              <input
                type="text"
                required
                value={formData.nome}
                onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
                className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="Ex: Academia Central, CT King, Fitness Plus..."
              />
            </div>
            
            <div className="md:col-span-2">
              <label className="block text-white/70 text-sm font-medium mb-2">Endereço Completo</label>
              <input
                type="text"
                required
                value={formData.endereco}
                onChange={(e) => setFormData({ ...formData, endereco: e.target.value })}
                className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="Rua das Flores, 123, Centro - São Paulo/SP"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-white/70 text-sm font-medium mb-2">Proprietário</label>
              <input
                type="text"
                required
                value={formData.proprietario}
                onChange={(e) => setFormData({ ...formData, proprietario: e.target.value })}
                className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="Nome do proprietário ou responsável"
              />
            </div>

            <div className="md:col-span-2 flex space-x-4">
              <button
                type="submit"
                className="bg-gradient-to-r from-green-500 to-green-600 text-white px-6 py-2 rounded-lg font-medium hover:from-green-600 hover:to-green-700 transition-all duration-200"
              >
                {editingCentro ? '✅ Atualizar Centro' : '✅ Criar Centro'}
              </button>
              <button
                type="button"
                onClick={() => { setShowForm(false); resetForm(); }}
                className="bg-white/10 border border-white/20 text-white px-6 py-2 rounded-lg font-medium hover:bg-white/20 transition-all duration-200"
              >
                ❌ Cancelar
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Centers Grid */}
      {filteredCentros.length === 0 ? (
        <div className="glass rounded-xl p-12 text-center">
          <div className="text-6xl mb-4">🏢</div>
          <p className="text-white/70 text-lg mb-6">
            {searchTerm ? 'Nenhum centro encontrado' : 'Nenhum centro de treinamento cadastrado ainda'}
          </p>
          {!searchTerm && (
            <div className="space-y-4">
              <p className="text-white/50">
                Centros de treinamento são os locais onde os atletas praticam suas atividades
              </p>
              <button
                onClick={() => setShowForm(true)}
                className="bg-gradient-to-r from-purple-500 to-purple-600 text-white px-6 py-2 rounded-lg font-medium hover:from-purple-600 hover:to-purple-700 transition-all duration-200"
              >
                ➕ Cadastrar Primeiro Centro
              </button>
            </div>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredCentros.map((centro, index) => {
            const style = getCentroStyle(centro.id);
            return (
              <div
                key={centro.id}
                className="glass rounded-xl p-6 hover:scale-105 transition-all duration-200"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex items-start space-x-4">
                  <div className={`flex-shrink-0 w-16 h-16 rounded-xl bg-gradient-to-r ${style.color} flex items-center justify-center`}>
                    <span className="text-3xl">{style.icon}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-white font-semibold text-lg mb-2">{centro.nome}</h3>
                    <div className="space-y-2">
                      <div className="flex items-start space-x-2">
                        <span className="text-white/50 text-sm">📍</span>
                        <p className="text-white/70 text-sm flex-1">{centro.endereco}</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="text-white/50 text-sm">👤</span>
                        <p className="text-white/70 text-sm">{centro.proprietario}</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="text-white/50 text-sm">🆔</span>
                        <p className="text-white/70 text-sm">ID: <span className="text-purple-300 font-mono font-bold bg-purple-500/20 px-2 py-1 rounded">{centro.id}</span></p>
                        <span className="text-white/40 text-xs">(Use na API)</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Actions */}
                <div className="flex items-center justify-between mt-6 pt-4 border-t border-white/10">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                    <span className="text-white/50 text-sm">Centro ativo</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => handleEditCentro(centro)}
                      className="bg-blue-500/20 hover:bg-blue-500/30 text-blue-300 px-3 py-1 rounded-md text-sm transition-colors duration-200 flex items-center space-x-1"
                      data-action="edit-centro"
                    >
                      <span>✏️</span>
                      <span>Editar</span>
                    </button>
                    <button
                      onClick={() => setDeletingCentro(centro)}
                      className="bg-red-500/20 hover:bg-red-500/30 text-red-300 px-3 py-1 rounded-md text-sm transition-colors duration-200 flex items-center space-x-1"
                      data-action="delete-centro"
                    >
                      <span>🗑️</span>
                      <span>Excluir</span>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Statistics */}
      {centros.length > 0 && (
        <div className="glass rounded-xl p-6">
          <h3 className="text-lg font-semibold text-white mb-6 flex items-center">
            <span className="mr-2">📊</span>
            Estatísticas dos Centros
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-white mb-2">{centros.length}</div>
              <div className="text-white/50 text-sm">Total de Centros</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-400 mb-2">
                {new Set(centros.map(c => c.proprietario)).size}
              </div>
              <div className="text-white/50 text-sm">Proprietários Únicos</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-400 mb-2">100%</div>
              <div className="text-white/50 text-sm">Centros Ativos</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-400 mb-2">
                {Math.round(centros.reduce((acc, centro) => acc + centro.endereco.length, 0) / centros.length) || 0}
              </div>
              <div className="text-white/50 text-sm">Chars Médios Endereço</div>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deletingCentro && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 fade-in">
          <div className="glass rounded-xl p-6 max-w-md w-full mx-4 slide-in">
            <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
              <span className="mr-2">⚠️</span>
              Confirmar Exclusão
            </h3>
            <p className="text-white/70 mb-6">
              Tem certeza que deseja excluir o centro <strong>"{deletingCentro.nome}"</strong>?
              Esta ação não pode ser desfeita.
            </p>
            <div className="flex space-x-4">
              <button
                onClick={() => handleDeleteCentro(deletingCentro)}
                className="bg-gradient-to-r from-red-500 to-red-600 text-white px-6 py-2 rounded-lg font-medium hover:from-red-600 hover:to-red-700 transition-all duration-200 flex items-center space-x-2"
              >
                <span>🗑️</span>
                <span>Sim, Excluir</span>
              </button>
              <button
                onClick={() => setDeletingCentro(null)}
                className="bg-white/10 border border-white/20 text-white px-6 py-2 rounded-lg font-medium hover:bg-white/20 transition-all duration-200"
              >
                ❌ Cancelar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Quick Tips */}
      {centros.length < 3 && (
        <div className="glass rounded-xl p-6">
          <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
            <span className="mr-2">💡</span>
            Dicas para Centros de Treinamento
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <span className="text-2xl">📍</span>
                <div>
                  <h4 className="text-white font-medium">Endereço Completo</h4>
                  <p className="text-white/70 text-sm">Inclua rua, número, bairro e cidade para facilitar a localização</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <span className="text-2xl">👤</span>
                <div>
                  <h4 className="text-white font-medium">Proprietário</h4>
                  <p className="text-white/70 text-sm">Nome do responsável pelo centro de treinamento</p>
                </div>
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <span className="text-2xl">🏷️</span>
                <div>
                  <h4 className="text-white font-medium">Nome Descritivo</h4>
                  <p className="text-white/70 text-sm">Use nomes claros como "Academia Central" ou "CT King"</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <span className="text-2xl">✅</span>
                <div>
                  <h4 className="text-white font-medium">Verificar Dados</h4>
                  <p className="text-white/70 text-sm">Confira todas as informações antes de salvar</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CentrosPage;