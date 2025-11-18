from contrib.schemas import BaseSchema
from pydantic import Field
from typing_extensions import Annotated

class CentroTreinamentoIn(BaseSchema):
     nome: Annotated[str, Field(description="Nome do Centro de Treinamento", example="Ct Kings", max_length=20)]
     endereco: Annotated[str, Field(description="Endereço do Centro de Treinamento", example="Rua dos Bobos, 0", max_length=60)]
     proprietario: Annotated[str, Field(description="Proprietário do Centro de Treinamento", example="João Silva", max_length=20)]
     
class CentroTreinamentoAtletas(BaseSchema):
     nome: Annotated[str, Field(description="Nome do Centro de Treinamento", example="Ct Kings", max_length=20)]
     
class CentroTreinamentoOut(CentroTreinamentoIn):
    id: Annotated[int, Field(description="ID do Centro de Treinamento", example=1)]