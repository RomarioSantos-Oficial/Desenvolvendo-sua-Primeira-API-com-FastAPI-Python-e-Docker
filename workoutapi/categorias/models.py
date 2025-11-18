from sqlalchemy import String
from sqlalchemy.orm import Mapped, mapped_column, relationship
from contrib.model import BaseModel

class CategoriaModel(BaseModel):
    __tablename__ = "categorias"
    
    nome: Mapped[str] = mapped_column(String(50), unique=True, nullable=False)
    atletas: Mapped[list['AtletaModel']] = relationship(back_populates="categoria")
    