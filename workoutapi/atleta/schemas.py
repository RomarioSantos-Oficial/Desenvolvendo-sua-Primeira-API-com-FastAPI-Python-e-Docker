from typing import Annotated, Optional
from pydantic import Field, PositiveFloat
from categorias.schemas import CategoriaIn
from centro_treinamento.schemas import CentroTreinamentoAtletas

from contrib.schemas import BaseSchema, OutMixin


class Atleta(BaseSchema):
    nome: Annotated[str, Field(description='Nome do atleta', example='Joao', max_length=50)]
    cpf: Annotated[str, Field(description='CPF do atleta', example='12345678900', max_length=11)]
    idade: Annotated[int, Field(description='Idade do atleta', example=25)]
    peso: Annotated[PositiveFloat, Field(description='Peso do atleta', example=75.5)]
    altura: Annotated[PositiveFloat, Field(description='Altura do atleta', example=1.70)]
    sexo: Annotated[str, Field(description='Sexo do atleta', example='M', max_length=1)]
    categoria: Annotated[CategoriaIn, Field(description='Categoria do atleta')]
    centro_treinamento: Annotated[CentroTreinamentoAtletas, Field(description='Centro de treinamento do atleta')]


class AtletaIn(Atleta):
    pass


class AtletaOut(Atleta, OutMixin):
    pass

class AtletaUpdate(BaseSchema):
    nome: Annotated[Optional[str], Field(None, description='Nome do atleta', example='Joao', max_length=50)]
    cpf: Annotated[Optional[str], Field(None, description='CPF do atleta', example='12345678900', max_length=11)]
    idade: Annotated[Optional[int], Field(None, description='Idade do atleta', example=25)]
    peso: Annotated[Optional[PositiveFloat], Field(None, description='Peso do atleta', example=75.5)]
    altura: Annotated[Optional[PositiveFloat], Field(None, description='Altura do atleta', example=1.70)]
    sexo: Annotated[Optional[str], Field(None, description='Sexo do atleta', example='M', max_length=1)]
    categoria_id: Annotated[Optional[int], Field(None, description='ID da categoria do atleta')]
    centro_treinamento_id: Annotated[Optional[int], Field(None, description='ID do centro de treinamento do atleta')]