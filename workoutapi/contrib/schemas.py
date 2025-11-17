from pydantic import BaseModel, Field
from typing_extensions import Annotated
from pydantic.types import UUID4
from datetime import datetime
    
class BaseSchema(BaseModel):
    class Config:
        extra = "forbid"
        from_attributes = True
        
class OutMixin(BaseSchema):
    id: Annotated[UUID4, Field(description="Identificador", example="550e8400-e29b-41d4-a716-446655440002")]
    created_at: Annotated[datetime, Field(description="Data de criação", example="2024-01-01T12:00:00")]
