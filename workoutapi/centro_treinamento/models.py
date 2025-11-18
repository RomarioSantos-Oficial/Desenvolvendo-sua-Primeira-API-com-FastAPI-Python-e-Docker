from contrib.model import BaseModel
from sqlalchemy.orm import Mapped, mapped_column, relationship
from sqlalchemy import String

class CentroTreinamentoModel(BaseModel):
    __tablename__ = "centro_treinamento"
    
    nome: Mapped[str] = mapped_column(String(50), unique=True, nullable=False)
    endereco: Mapped[str] = mapped_column(String(60), nullable=False)
    proprietario: Mapped[str] = mapped_column(String(20), nullable=False)
    atletas: Mapped[list['AtletaModel']] = relationship(back_populates="centro_treinamento")