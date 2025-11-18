import React, { useEffect, useState } from 'react';
import { categoriaService } from '../services/api';
import type { Categoria, CategoriaCreate } from '../types/api';
import toast from 'react-hot-toast';

const CategoriasPage: React.FC = () => {
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [editingCategoria, setEditingCategoria] = useState<Categoria | null>(null);
  const [deletingCategoria, setDeletingCategoria] = useState<Categoria | null>(null);

  const [formData, setFormData] = useState<CategoriaCreate>({
    nome: '',
  });

  useEffect(() => {
    loadCategorias();
  }, []);

  const loadCategorias = async () => {
    try {
      setLoading(true);
      const data = await categoriaService.getAll();
      setCategorias(data);
    } catch (error) {
      console.error('Erro ao carregar categorias:', error);
      toast.error('Erro ao carregar categorias');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingCategoria) {
        // Usando API REAL de UPDATE!
        const categoriaAtualizada = await categoriaService.update(editingCategoria.id, formData);
        setCategorias(categorias.map(c => c.id === editingCategoria.id ? categoriaAtualizada : c));
        toast.success(`Categoria "${categoriaAtualizada.nome}" atualizada com sucesso!`);
      } else {
        const novaCategoria = await categoriaService.create(formData);
        setCategorias([...categorias, novaCategoria]);
        toast.success(`Categoria "${novaCategoria.nome}" criada com sucesso!`);
      }
      setShowForm(false);
      resetForm();
    } catch (error: any) {
      const errorMessage = error.response?.data?.detail || `Erro ao ${editingCategoria ? 'atualizar' : 'criar'} categoria`;
      toast.error(errorMessage);
    }
  };

  const resetForm = () => {
    setFormData({ nome: '' });
    setEditingCategoria(null);
  };

  const handleEditCategoria = (categoria: Categoria) => {
    setEditingCategoria(categoria);
    setFormData({ nome: categoria.nome });
    setShowForm(true);
  };

  const handleDeleteCategoria = async (categoria: Categoria) => {
    try {
      // Usando API REAL de DELETE!
      await categoriaService.delete(categoria.id);
      setCategorias(categorias.filter(c => c.id !== categoria.id));
      toast.success(`Categoria ${categoria.nome} removida com sucesso!`);
      setDeletingCategoria(null);
    } catch (error: any) {
      console.error('Erro ao remover categoria:', error);
      const errorMessage = error.response?.data?.detail || 'Erro ao remover categoria';
      toast.error(errorMessage);
    }
  };

  const filteredCategorias = categorias.filter(categoria =>
    categoria.nome.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Categorias predefinidas com ícones e cores
  const categoriaIcons: { [key: string]: { icon: string; color: string } } = {
    'Scale': { icon: '⚖️', color: 'from-blue-500 to-blue-600' },
    'Olympic Weightlifting': { icon: '🏋️‍♂️', color: 'from-red-500 to-red-600' },
    'CrossFit': { icon: '💪', color: 'from-orange-500 to-orange-600' },
    'Powerlifting': { icon: '🏋️‍♀️', color: 'from-purple-500 to-purple-600' },
    'Bodybuilding': { icon: '💪', color: 'from-green-500 to-green-600' },
    'Strongman': { icon: '🦍', color: 'from-gray-600 to-gray-700' },
    'Fitness': { icon: '🏃‍♂️', color: 'from-pink-500 to-pink-600' },
    'Yoga': { icon: '🧘‍♀️', color: 'from-indigo-500 to-indigo-600' },
    'Pilates': { icon: '🤸‍♀️', color: 'from-teal-500 to-teal-600' },
  };

  const getCategoriaStyle = (nome: string) => {
    return categoriaIcons[nome] || { icon: '🏆', color: 'from-gray-500 to-gray-600' };
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
            <span className="mr-3">🏷️</span>
            Gestão de Categorias
          </h1>
          <p className="text-white/70 mt-1">
            {categorias.length} categoria{categorias.length !== 1 ? 's' : ''} cadastrada{categorias.length !== 1 ? 's' : ''}
          </p>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          data-action="new-categoria"
          className="bg-gradient-to-r from-green-500 to-green-600 text-white px-6 py-2 rounded-lg font-medium hover:from-green-600 hover:to-green-700 transition-all duration-200 flex items-center space-x-2"
        >
          <span>{showForm ? '❌' : '➕'}</span>
          <span>{showForm ? 'Cancelar' : 'Nova Categoria'}</span>
        </button>
      </div>

      {/* Search */}
      <div className="backdrop-blur-xl bg-white/10 rounded-2xl p-6 border border-white/20 shadow-2xl">
        <input
          type="text"
          placeholder="🔍 Buscar categoria..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full bg-white/10 border border-white/20 rounded-xl px-6 py-4 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent backdrop-blur-sm"
        />
      </div>

      {/* Form */}
      {showForm && (
        <div className="backdrop-blur-xl bg-white/10 rounded-2xl p-8 border border-white/20 shadow-2xl slide-in">
          <h2 className="text-2xl font-bold text-white mb-8 flex items-center drop-shadow-lg">
            <span className="mr-3 text-3xl filter drop-shadow-md">✨</span>
            {editingCategoria ? 'Editar Categoria' : 'Nova Categoria'}
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-white/70 text-sm font-medium mb-2">Nome da Categoria</label>
              <input
                type="text"
                required
                value={formData.nome}
                onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
                className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="Ex: CrossFit, Powerlifting, Bodybuilding..."
              />
              <p className="text-white/50 text-sm mt-1">
                Dica: Use nomes descritivos como "CrossFit", "Olympic Weightlifting", etc.
              </p>
            </div>

            <div className="flex space-x-4">
              <button
                type="submit"
                className="bg-gradient-to-r from-green-500 to-green-600 text-white px-6 py-2 rounded-lg font-medium hover:from-green-600 hover:to-green-700 transition-all duration-200"
              >
                {editingCategoria ? '✅ Atualizar Categoria' : '✅ Criar Categoria'}
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

      {/* Categories Grid */}
      {filteredCategorias.length === 0 ? (
        <div className="glass rounded-xl p-12 text-center">
          <div className="text-6xl mb-4">🏷️</div>
          <p className="text-white/70 text-lg mb-6">
            {searchTerm ? 'Nenhuma categoria encontrada' : 'Nenhuma categoria cadastrada ainda'}
          </p>
          {!searchTerm && (
            <div className="space-y-4">
              <p className="text-white/50">
                Categorias organizam os atletas por modalidade esportiva
              </p>
              <button
                onClick={() => setShowForm(true)}
                className="bg-gradient-to-r from-green-500 to-green-600 text-white px-6 py-2 rounded-lg font-medium hover:from-green-600 hover:to-green-700 transition-all duration-200"
              >
                ➕ Cadastrar Primeira Categoria
              </button>
            </div>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredCategorias.map((categoria, index) => {
            const style = getCategoriaStyle(categoria.nome);
            return (
              <div
                key={categoria.id}
                className="glass rounded-xl p-6 hover:scale-105 transition-all duration-200 cursor-pointer"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className={`inline-flex items-center justify-center w-16 h-16 rounded-xl bg-gradient-to-r ${style.color} mb-4`}>
                  <span className="text-3xl">{style.icon}</span>
                </div>
                <h3 className="text-white font-semibold text-lg mb-2">{categoria.nome}</h3>
                <div className="flex items-center space-x-2 mb-4">
                  <span className="text-white/50 text-sm">🆔 API ID:</span>
                  <span className="bg-green-500/20 text-green-300 px-3 py-1 rounded-lg font-mono font-bold text-sm hover:bg-green-500/30 transition-colors cursor-pointer" title="Use este ID na API docs">
                    {categoria.id}
                  </span>
                </div>
                
                {/* Ações */}
                <div className="flex items-center justify-between pt-4 border-t border-white/10">
                  <span className="text-white/50 text-sm">Categoria ativa</span>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleEditCategoria(categoria);
                      }}
                      className="p-2 bg-blue-500/20 text-blue-300 rounded-lg hover:bg-blue-500/30 transition-colors"
                      title="Editar categoria"
                    >
                      ✏️
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setDeletingCategoria(categoria);
                      }}
                      className="p-2 bg-red-500/20 text-red-300 rounded-lg hover:bg-red-500/30 transition-colors"
                      title="Excluir categoria"
                    >
                      🗑️
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Quick Add Suggestions */}
      {categorias.length < 5 && (
        <div className="glass rounded-xl p-6">
          <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
            <span className="mr-2">💡</span>
            Sugestões de Categorias
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
            {['CrossFit', 'Powerlifting', 'Bodybuilding', 'Olympic Weightlifting', 'Strongman'].map((nome) => {
              const exists = categorias.some(c => c.nome === nome);
              if (exists) return null;
              
              const style = getCategoriaStyle(nome);
              return (
                <button
                  key={nome}
                  onClick={() => {
                    setFormData({ nome });
                    setShowForm(true);
                  }}
                  className="p-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg transition-all duration-200 text-center"
                >
                  <div className="text-2xl mb-1">{style.icon}</div>
                  <div className="text-white/70 text-sm">{nome}</div>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Statistics */}
      {categorias.length > 0 && (
        <div className="glass rounded-xl p-6">
          <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
            <span className="mr-2">📊</span>
            Estatísticas
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-white">{categorias.length}</div>
              <div className="text-white/50 text-sm">Total de Categorias</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-400">
                {categorias.filter(c => ['CrossFit', 'Powerlifting', 'Bodybuilding'].includes(c.nome)).length}
              </div>
              <div className="text-white/50 text-sm">Modalidades Populares</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-400">100%</div>
              <div className="text-white/50 text-sm">Categorias Ativas</div>
            </div>
          </div>
        </div>
      )}

      {/* Modal de Confirmação de Exclusão */}
      {deletingCategoria && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="glass rounded-xl p-6 m-4 max-w-md w-full">
            <h3 className="text-lg font-bold text-white mb-4">
              🗑️ Confirmar Exclusão
            </h3>
            <p className="text-white/70 mb-6">
              Tem certeza que deseja excluir a categoria <strong className="text-white">{deletingCategoria.nome}</strong>?
              Esta ação não pode ser desfeita.
            </p>
            <div className="flex space-x-3">
              <button
                onClick={() => setDeletingCategoria(null)}
                className="flex-1 bg-gray-500/20 text-white px-4 py-2 rounded-lg hover:bg-gray-500/30 transition-colors"
              >
                Cancelar
              </button>
              <button
                onClick={() => handleDeleteCategoria(deletingCategoria)}
                className="flex-1 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors"
              >
                Excluir
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CategoriasPage;