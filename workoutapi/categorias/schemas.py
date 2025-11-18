from contrib.schemas import BaseSchema
from pydantic import Field
from typing_extensions import Annotated

class CategoriaIn(BaseSchema):
     nome: Annotated[str, Field(description="Nome da Categoria", example="Scale", max_length=50)]
     
class CategoriaOut(CategoriaIn):
    id: Annotated[int, Field(description="ID da Categoria", example=1)]