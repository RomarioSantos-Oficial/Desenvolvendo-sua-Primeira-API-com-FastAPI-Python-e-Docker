from pydantic import Field, PositiveFloat
from pydantic.types import UUID4
from contrib.schemas import BaseSchema, OutMixin
from typing_extensions import Annotated

class Atleta(BaseSchema):
    nome: Annotated[str, Field(description="Nome do Atleta", example="João", max_length=50)]
    cpf: Annotated[str, Field(description="CPF do Atleta", example="12345678900", max_length=11)]
    idade: Annotated[int, Field(description="Idade do Atleta", example=25)]
    peso: Annotated[PositiveFloat, Field(description="Peso do Atleta em kg", example=70.5)]
    altura: Annotated[PositiveFloat, Field(description="Altura do Atleta em metros", example=1.75)]
    sexo: Annotated[str, Field(description="Sexo do Atleta", example="M", max_length=1)]

class AtletaIn(Atleta):
    pass
    
class AtletaOut(AtletaIn, OutMixin):
    pass
    