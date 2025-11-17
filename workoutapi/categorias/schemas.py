from contrib.schemas import BaseSchema
from pydantic import Field
from pydantic.types import UUID4
from typing_extensions import Annotated

class CategoriaIn(BaseSchema):
     nome: Annotated[str, Field(description="Nome da Categoria", example="Scale", max_length=10)]
     
class CategoriaOut(CategoriaIn):
    id: Annotated[UUID4, Field(description="ID da Categoria")]