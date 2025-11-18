from sqlalchemy.orm import Mapped, mapped_column
from sqlalchemy import Integer, DateTime
from database.database import Base
from datetime import datetime

class BaseModel(Base):
    __abstract__ = True
    
    # Chave primária inteira auto-incrementada (padrão SQLite)
    id: Mapped[int] = mapped_column(Integer, primary_key=True, autoincrement=True)
    created_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow)