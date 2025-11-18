from pydantic import BaseModel, Field
from typing_extensions import Annotated
from datetime import datetime
    
class BaseSchema(BaseModel):
    class Config:
        extra = "forbid"
        from_attributes = True
        
class OutMixin(BaseSchema):
    id: Annotated[int, Field(description="Identificador", example=1)]
    created_at: Annotated[datetime, Field(description="Data de criação", example="2024-01-01T12:00:00")]
