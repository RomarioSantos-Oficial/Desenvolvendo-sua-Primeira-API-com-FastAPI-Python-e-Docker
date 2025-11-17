from pydantic import BaseModel, Field
from typing_extensions import Annotated
from pydantic.types import UUID4
from datetime import datetime
    
class BaseSchema(BaseModel):
    class Config:
        extra = "forbid"
        from_attributes = True
        
class OutMixin(BaseSchema):
    id: Annotated[UUID4, Field( description="Identificador")]
    created_at: Annotated[datetime, Field( description="Data de criação")]
