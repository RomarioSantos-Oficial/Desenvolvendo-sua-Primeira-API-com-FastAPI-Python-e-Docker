import axios from 'axios';
import type { 
  Atleta, 
  AtletaCreate, 
  Categoria, 
  CategoriaCreate, 
  CentroTreinamento, 
  CentroTreinamentoCreate 
} from '../types/api';

const API_BASE_URL = 'http://127.0.0.1:8000';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor para log de requests (desenvolvimento)
api.interceptors.request.use((config) => {
  console.log(`🚀 ${config.method?.toUpperCase()} ${config.url}`, config.data);
  return config;
});

api.interceptors.response.use(
  (response) => {
    console.log(`✅ ${response.status} ${response.config.url}`, response.data);
    return response;
  },
  (error) => {
    console.error(`❌ ${error.response?.status} ${error.config?.url}`, error.response?.data);
    return Promise.reject(error);
  }
);

// Serviços da API
export const categoriaService = {
  // Listar todas as categorias
  getAll: async (): Promise<Categoria[]> => {
    const response = await api.get('/categoria/');
    return response.data;
  },

  // Buscar categoria por ID
  getById: async (id: number): Promise<Categoria> => {
    const response = await api.get(`/categoria/${id}`);
    return response.data;
  },

  // Criar nova categoria
  create: async (categoria: CategoriaCreate): Promise<Categoria> => {
    const response = await api.post('/categoria/', categoria);
    return response.data;
  },

  // Atualizar categoria - API REAL implementada!
  update: async (id: number, categoria: CategoriaCreate): Promise<Categoria> => {
    const response = await api.patch(`/categoria/${id}`, categoria);
    return response.data;
  },

  // Deletar categoria - API REAL implementada!
  delete: async (id: number): Promise<void> => {
    await api.delete(`/categoria/${id}`);
  },
};

export const centroTreinamentoService = {
  // Listar todos os centros
  getAll: async (): Promise<CentroTreinamento[]> => {
    const response = await api.get('/centro_treinamento/');
    return response.data;
  },

  // Buscar centro por ID
  getById: async (id: number): Promise<CentroTreinamento> => {
    const response = await api.get(`/centro_treinamento/${id}`);
    return response.data;
  },

  // Criar novo centro
  create: async (centro: CentroTreinamentoCreate): Promise<CentroTreinamento> => {
    const response = await api.post('/centro_treinamento/', centro);
    return response.data;
  },

  // Atualizar centro - API REAL implementada!
  update: async (id: number, centro: CentroTreinamentoCreate): Promise<CentroTreinamento> => {
    const response = await api.patch(`/centro_treinamento/${id}`, centro);
    return response.data;
  },

  // Deletar centro - API REAL implementada!
  delete: async (id: number): Promise<void> => {
    await api.delete(`/centro_treinamento/${id}`);
  },
};

export const atletaService = {
  // Listar todos os atletas
  getAll: async (): Promise<Atleta[]> => {
    const response = await api.get('/atleta/');
    return response.data;
  },

  // Buscar atleta por ID
  getById: async (id: number): Promise<Atleta> => {
    const response = await api.get(`/atleta/${id}`);
    return response.data;
  },

  // Criar novo atleta
  create: async (atleta: AtletaCreate): Promise<Atleta> => {
    const response = await api.post('/atleta/', atleta);
    return response.data;
  },

  // Atualizar atleta
  update: async (id: number, atleta: Partial<AtletaCreate>): Promise<Atleta> => {
    const response = await api.patch(`/atleta/${id}`, atleta);
    return response.data;
  },

  // Deletar atleta
  delete: async (id: number): Promise<void> => {
    await api.delete(`/atleta/${id}`);
  },
};

// Verificar se a API está online
export const healthCheck = async (): Promise<boolean> => {
  try {
    const response = await api.get('/');
    return response.status === 200;
  } catch (error) {
    return false;
  }
};

export default api;