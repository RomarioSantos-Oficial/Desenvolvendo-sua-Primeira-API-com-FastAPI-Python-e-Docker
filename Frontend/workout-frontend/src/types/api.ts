// Tipos da API WorkoutAPI
export interface Categoria {
  id: number;
  nome: string;
}

export interface CentroTreinamento {
  id: number;
  nome: string;
  endereco: string;
  proprietario: string;
}

export interface Atleta {
  id: number;
  nome: string;
  cpf: string;
  idade: number;
  peso: number;
  altura: number;
  sexo: 'M' | 'F';
  categoria_id: number;
  centro_treinamento_id: number;
  categoria?: Categoria;
  centro_treinamento?: CentroTreinamento;
}

// DTOs para criação
export interface CategoriaCreate {
  nome: string;
}

export interface CentroTreinamentoCreate {
  nome: string;
  endereco: string;
  proprietario: string;
}

export interface AtletaCreate {
  nome: string;
  cpf: string;
  idade: number;
  peso: number;
  altura: number;
  sexo: 'M' | 'F';
  categoria: {
    nome: string;
  };
  centro_treinamento: {
    nome: string;
  };
}

// Tipo auxiliar para o formulário
export interface AtletaFormData {
  nome: string;
  cpf: string;
  idade: number;
  peso: number;
  altura: number;
  sexo: 'M' | 'F';
  categoria_id: number;
  centro_treinamento_id: number;
}

// Response types
export interface ApiResponse<T> {
  data: T;
  message?: string;
}

export interface ApiError {
  detail: string;
}