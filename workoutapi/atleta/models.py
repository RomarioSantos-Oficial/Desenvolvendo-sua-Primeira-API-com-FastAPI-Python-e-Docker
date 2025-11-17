from contrib.model import BaseModel
from sqlalchemy.orm import Mapped, mapped_column, relationship
from sqlalchemy import String, Integer, Float, ForeignKey

class AtletaModel(BaseModel):
    __tablename__ = "atletas"
    
    pk_id: Mapped[int] = mapped_column(Integer, primary_key=True)
    nome: Mapped[str] = mapped_column(String(50), nullable=False)
    cpf: Mapped[str] = mapped_column(String(11), unique=True, nullable=False)
    idade: Mapped[int] = mapped_column(Integer, nullable=False)
    peso: Mapped[float] = mapped_column(Float, nullable=False)
    altura: Mapped[float] = mapped_column(Float, nullable=False)
    sexo: Mapped[str] = mapped_column(String(1), nullable=False)
    categoria: Mapped['CategoriaModel'] = relationship(back_populates="atletas")
    categoria_id: Mapped[int] = mapped_column(ForeignKey('categorias.pk_id'))
    centro_treinamento: Mapped['CentroTreinamentoModel'] = relationship(back_populates="atletas")
    centro_treinamento_id: Mapped[int] = mapped_column(ForeignKey('centro_treinamento.pk_id'))
    
    