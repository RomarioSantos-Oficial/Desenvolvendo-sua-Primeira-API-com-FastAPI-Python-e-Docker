from typing import TYPE_CHECKING
from sqlalchemy import ForeignKey, Integer, String, Float
from sqlalchemy.orm import Mapped, mapped_column, relationship
from contrib.model import BaseModel

if TYPE_CHECKING:
    from categorias.models import CategoriaModel
    from centro_treinamento.models import CentroTreinamentoModel


class AtletaModel(BaseModel):
    __tablename__ = 'atletas'

    nome: Mapped[str] = mapped_column(String(50), nullable=False)
    cpf: Mapped[str] = mapped_column(String(11), unique=True, nullable=False)
    idade: Mapped[int] = mapped_column(Integer, nullable=False)
    peso: Mapped[float] = mapped_column(Float, nullable=False)
    altura: Mapped[float] = mapped_column(Float, nullable=False)
    sexo: Mapped[str] = mapped_column(String(1), nullable=False)
    categoria: Mapped['CategoriaModel'] = relationship(back_populates="atletas", lazy='selectin')
    categoria_id: Mapped[int] = mapped_column(ForeignKey("categorias.id"))
    centro_treinamento: Mapped['CentroTreinamentoModel'] = relationship(back_populates="atletas", lazy='selectin')
    centro_treinamento_id: Mapped[int] = mapped_column(ForeignKey("centro_treinamento.id"))