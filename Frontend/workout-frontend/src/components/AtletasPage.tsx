import React, { useEffect, useState } from 'react';
import { atletaService, categoriaService, centroTreinamentoService } from '../services/api';
import type { Atleta, AtletaFormData, Categoria, CentroTreinamento } from '../types/api';
import toast from 'react-hot-toast';

const AtletasPage: React.FC = () => {
  const [atletas, setAtletas] = useState<Atleta[]>([]);
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [centros, setCentros] = useState<CentroTreinamento[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [editingAtleta, setEditingAtleta] = useState<Atleta | null>(null);
  const [deletingAtleta, setDeletingAtleta] = useState<Atleta | null>(null);

  const [formData, setFormData] = useState<AtletaFormData>({
    nome: '',
    cpf: '',
    idade: 0,
    peso: 0,
    altura: 0,
    sexo: 'M',
    categoria_id: 0,
    centro_treinamento_id: 0,
  });

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
    } catch (error) {
      console.error('Erro ao carregar dados:', error);
      toast.error('Erro ao carregar dados');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // Encontrar categoria e centro selecionados
      const categoriaSelecionada = categorias.find(c => c.id === formData.categoria_id);
      const centroSelecionado = centros.find(c => c.id === formData.centro_treinamento_id);
      
      if (!categoriaSelecionada) {
        toast.error('Por favor, selecione uma categoria');
        return;
      }
      
      if (!centroSelecionado) {
        toast.error('Por favor, selecione um centro de treinamento');
        return;
      }

      // Converter para o formato esperado pela API
      const dadosApi = {
        nome: formData.nome,
        cpf: formData.cpf,
        idade: formData.idade,
        peso: formData.peso,
        altura: formData.altura,
        sexo: formData.sexo,
        categoria: {
          nome: categoriaSelecionada.nome
        },
        centro_treinamento: {
          nome: centroSelecionado.nome
        }
      };
      
      if (editingAtleta) {
        // Modo edição - usar PATCH para manter o ID
        console.log('🔍 Editando atleta ID:', editingAtleta.id, 'com dados:', formData);
        
        const dadosPatch = {
          nome: formData.nome,
          cpf: formData.cpf,
          idade: formData.idade,
          peso: formData.peso,
          altura: formData.altura,
          sexo: formData.sexo,
          categoria_id: formData.categoria_id,
          centro_treinamento_id: formData.centro_treinamento_id
        };
        
        console.log('📤 Enviando PATCH com todos os dados:', dadosPatch);
        const atletaAtualizado = await atletaService.update(editingAtleta.id, dadosPatch);
        console.log('📥 Atleta atualizado pela API:', atletaAtualizado);
        
        setAtletas(atletas.map(a => a.id === editingAtleta.id ? atletaAtualizado : a));
        toast.success(`Atleta ${atletaAtualizado.nome} atualizado! (ID preservado: ${editingAtleta.id})`);
      } else {
        // Modo criação
        const novoAtleta = await atletaService.create(dadosApi);
        setAtletas([...atletas, novoAtleta]);
        toast.success(`Atleta ${novoAtleta.nome} criado com sucesso!`);
      }
      
      setShowForm(false);
      resetForm();
    } catch (error: any) {
      console.error('Erro ao criar atleta:', error);
      let errorMessage = 'Erro ao criar atleta';
      
      if (error.response?.data?.detail) {
        if (Array.isArray(error.response.data.detail)) {
          // Erro de validação com múltiplos campos
          const errors = error.response.data.detail.map((err: any) => 
            `${err.loc?.[1] || 'Campo'}: ${err.msg}`
          ).join(', ');
          errorMessage = `Erro de validação: ${errors}`;
        } else {
          errorMessage = error.response.data.detail;
        }
      }
      
      toast.error(errorMessage);
    }
  };

  const resetForm = () => {
    setFormData({
      nome: '',
      cpf: '',
      idade: 0,
      peso: 0,
      altura: 0,
      sexo: 'M',
      categoria_id: 0,
      centro_treinamento_id: 0,
    });
    setEditingAtleta(null);
  };

  const handleEditAtleta = (atleta: Atleta) => {
    console.log('🔧 Editando atleta:', atleta); // Debug
    setEditingAtleta(atleta);
    
    // Encontrar os IDs das categorias e centros baseados nos nomes retornados pela API
    const categoriaId = categorias.find(c => c.nome === atleta.categoria?.nome)?.id || 0;
    const centroId = centros.find(c => c.nome === atleta.centro_treinamento?.nome)?.id || 0;
    
    setFormData({
      nome: atleta.nome,
      cpf: atleta.cpf,
      idade: atleta.idade,
      peso: atleta.peso,
      altura: atleta.altura,
      sexo: atleta.sexo,
      categoria_id: categoriaId,
      centro_treinamento_id: centroId,
    });
    setShowForm(true);
  };

  const handleDeleteAtleta = async (atleta: Atleta) => {
    try {
      await atletaService.delete(atleta.id);
      setAtletas(atletas.filter(a => a.id !== atleta.id));
      toast.success(`Atleta ${atleta.nome} removido com sucesso!`);
      setDeletingAtleta(null);
    } catch (error) {
      console.error('Erro ao remover atleta:', error);
      toast.error('Erro ao remover atleta');
    }
  };

  const filteredAtletas = atletas.filter(atleta =>
    atleta.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
    atleta.cpf.includes(searchTerm)
  );

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
            <span className="mr-3">🏃‍♂️</span>
            Gestão de Atletas
          </h1>
          <p className="text-white/70 mt-1">
            {atletas.length} atleta{atletas.length !== 1 ? 's' : ''} cadastrado{atletas.length !== 1 ? 's' : ''}
          </p>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          data-action="new-atleta"
          className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-6 py-2 rounded-lg font-medium hover:from-blue-600 hover:to-blue-700 transition-all duration-200 flex items-center space-x-2"
        >
          <span>{showForm ? '❌' : '➕'}</span>
          <span>{showForm ? 'Cancelar' : 'Novo Atleta'}</span>
        </button>
      </div>

      {/* Search */}
      <div className="glass rounded-lg p-4">
        <input
          type="text"
          placeholder="🔍 Buscar por nome ou CPF..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      {/* Form */}
      {showForm && (
        <div className="glass rounded-xl p-6 slide-in">
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-white flex items-center">
              <span className="mr-2">🏃‍♂️</span>
              {editingAtleta ? 'Editar Atleta' : 'Novo Atleta'}
            </h2>
            {editingAtleta && (
              <div className="mt-3 p-3 bg-blue-500/10 border border-blue-500/20 rounded-lg">
                <p className="text-blue-300 text-sm flex items-center">
                  <span className="mr-2">💡</span>
                  <strong>Preservar ID:</strong> Altere apenas <strong>nome</strong> ou <strong>idade</strong> para manter o mesmo ID.
                </p>
                <p className="text-blue-200 text-xs mt-1">
                  ID atual: <span className="font-mono bg-blue-500/20 px-2 py-1 rounded">{editingAtleta.id}</span>
                  {" "} | Categoria e Centro serão preservados
                </p>
              </div>
            )}
          </div>
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-white/70 text-sm font-medium mb-2">Nome</label>
              <input
                type="text"
                required
                value={formData.nome}
                onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
                className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Nome completo do atleta"
              />
            </div>
            
            <div>
              <label className="block text-white/70 text-sm font-medium mb-2">CPF</label>
              <input
                type="text"
                required
                value={formData.cpf}
                onChange={(e) => setFormData({ ...formData, cpf: e.target.value.replace(/\D/g, '') })}
                className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="12345678901"
                maxLength={11}
              />
            </div>

            <div>
              <label className="block text-white/70 text-sm font-medium mb-2">Idade</label>
              <input
                type="number"
                required
                min="1"
                max="120"
                value={formData.idade}
                onChange={(e) => setFormData({ ...formData, idade: parseInt(e.target.value) || 0 })}
                className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="25"
              />
            </div>

            <div>
              <label className="block text-white/70 text-sm font-medium mb-2">Peso (kg)</label>
              <input
                type="number"
                required
                min="1"
                step="0.1"
                value={formData.peso}
                onChange={(e) => setFormData({ ...formData, peso: parseFloat(e.target.value) || 0 })}
                className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="75.5"
              />
            </div>

            <div>
              <label className="block text-white/70 text-sm font-medium mb-2">Altura (m)</label>
              <input
                type="number"
                required
                min="0.5"
                max="3"
                step="0.01"
                value={formData.altura}
                onChange={(e) => setFormData({ ...formData, altura: parseFloat(e.target.value) || 0 })}
                className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="1.80"
              />
            </div>

            <div>
              <label className="block text-white/70 text-sm font-medium mb-2">Sexo</label>
              <select
                required
                value={formData.sexo}
                onChange={(e) => setFormData({ ...formData, sexo: e.target.value as 'M' | 'F' })}
                className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="M">👨 Masculino</option>
                <option value="F">👩 Feminino</option>
              </select>
            </div>

            <div>
              <label className="block text-white/70 text-sm font-medium mb-2">Categoria</label>
              <select
                required
                value={formData.categoria_id}
                onChange={(e) => setFormData({ ...formData, categoria_id: parseInt(e.target.value) })}
                className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Selecione uma categoria</option>
                {categorias.map((categoria) => (
                  <option key={categoria.id} value={categoria.id}>
                    {categoria.nome}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-white/70 text-sm font-medium mb-2">Centro de Treinamento</label>
              <select
                required
                value={formData.centro_treinamento_id}
                onChange={(e) => setFormData({ ...formData, centro_treinamento_id: parseInt(e.target.value) })}
                className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Selecione um centro</option>
                {centros.map((centro) => (
                  <option key={centro.id} value={centro.id}>
                    {centro.nome}
                  </option>
                ))}
              </select>
            </div>

            <div className="md:col-span-2 flex space-x-4">
              <button
                type="submit"
                className="bg-gradient-to-r from-green-500 to-green-600 text-white px-6 py-2 rounded-lg font-medium hover:from-green-600 hover:to-green-700 transition-all duration-200"
              >
                ✅ Criar Atleta
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

      {/* Athletes List */}
      <div className="glass rounded-xl overflow-hidden">
        <div className="p-6 border-b border-white/10">
          <h2 className="text-xl font-semibold text-white">
            Lista de Atletas ({filteredAtletas.length})
          </h2>
        </div>
        
        {filteredAtletas.length === 0 ? (
          <div className="p-12 text-center">
            <div className="text-6xl mb-4">🏃‍♂️</div>
            <p className="text-white/70 text-lg">
              {searchTerm ? 'Nenhum atleta encontrado' : 'Nenhum atleta cadastrado ainda'}
            </p>
            {!searchTerm && (
              <button
                onClick={() => setShowForm(true)}
                className="mt-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white px-6 py-2 rounded-lg font-medium hover:from-blue-600 hover:to-blue-700 transition-all duration-200"
              >
                ➕ Cadastrar Primeiro Atleta
              </button>
            )}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-white/5">
                <tr>
                  <th className="text-center p-4 text-white/70 font-medium">
                    <div className="flex items-center justify-center space-x-1">
                      <span>🆔</span>
                      <span>ID API</span>
                    </div>
                  </th>
                  <th className="text-left p-4 text-white/70 font-medium">Atleta</th>
                  <th className="text-left p-4 text-white/70 font-medium">CPF</th>
                  <th className="text-left p-4 text-white/70 font-medium">Idade</th>
                  <th className="text-left p-4 text-white/70 font-medium">Físico</th>
                  <th className="text-left p-4 text-white/70 font-medium">Categoria</th>
                  <th className="text-left p-4 text-white/70 font-medium">Centro</th>
                  <th className="text-center p-4 text-white/70 font-medium">Ações</th>
                </tr>
              </thead>
              <tbody>
                {filteredAtletas.map((atleta, index) => (
                  <tr
                    key={atleta.id}
                    className="border-t border-white/5 hover:bg-white/5 transition-colors"
                    style={{ animationDelay: `${index * 0.05}s` }}
                  >
                    <td className="p-4 text-center">
                      <div className="inline-flex items-center justify-center">
                        <span className="bg-blue-500/20 text-blue-300 px-3 py-2 rounded-lg font-mono font-bold text-sm hover:bg-blue-500/30 transition-colors cursor-pointer" title="Use este ID na API docs">
                          {atleta.id}
                        </span>
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center space-x-3">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm ${
                          atleta.sexo === 'M' ? 'bg-blue-500/20 text-blue-300' : 'bg-pink-500/20 text-pink-300'
                        }`}>
                          {atleta.sexo === 'M' ? '👨' : '👩'}
                        </div>
                        <div>
                          <p className="text-white font-medium">{atleta.nome}</p>
                          <p className="text-white/50 text-sm">{atleta.sexo === 'M' ? 'Masculino' : 'Feminino'}</p>
                        </div>
                      </div>
                    </td>
                    <td className="p-4 text-white/70 font-mono text-sm">
                      {atleta.cpf}
                    </td>
                    <td className="p-4 text-white">
                      {atleta.idade} anos
                    </td>
                    <td className="p-4 text-white/70">
                      <div className="text-sm">
                        <div>{atleta.peso}kg</div>
                        <div>{atleta.altura}m</div>
                      </div>
                    </td>
                    <td className="p-4">
                      <span className="inline-block bg-gradient-to-r from-purple-500/20 to-purple-600/20 text-purple-300 px-3 py-1 rounded-full text-sm">
                        {atleta.categoria?.nome || 'N/A'}
                      </span>
                    </td>
                    <td className="p-4 text-white/70 text-sm">
                      {atleta.centro_treinamento?.nome || 'N/A'}
                    </td>
                    <td className="p-4">
                      <div className="flex items-center justify-center space-x-2">
                        <button
                          onClick={() => handleEditAtleta(atleta)}
                          className="p-2 bg-blue-500/20 text-blue-300 rounded-lg hover:bg-blue-500/30 transition-colors"
                          title="Editar atleta"
                        >
                          ✏️
                        </button>
                        <button
                          onClick={() => setDeletingAtleta(atleta)}
                          className="p-2 bg-red-500/20 text-red-300 rounded-lg hover:bg-red-500/30 transition-colors"
                          title="Excluir atleta"
                        >
                          🗑️
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Modal de Confirmação de Exclusão */}
      {deletingAtleta && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="glass rounded-xl p-6 m-4 max-w-md w-full">
            <h3 className="text-lg font-bold text-white mb-4">
              🗑️ Confirmar Exclusão
            </h3>
            <p className="text-white/70 mb-6">
              Tem certeza que deseja excluir o atleta <strong className="text-white">{deletingAtleta.nome}</strong>?
              Esta ação não pode ser desfeita.
            </p>
            <div className="flex space-x-3">
              <button
                onClick={() => setDeletingAtleta(null)}
                className="flex-1 bg-gray-500/20 text-white px-4 py-2 rounded-lg hover:bg-gray-500/30 transition-colors"
              >
                Cancelar
              </button>
              <button
                onClick={() => handleDeleteAtleta(deletingAtleta)}
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

export default AtletasPage;