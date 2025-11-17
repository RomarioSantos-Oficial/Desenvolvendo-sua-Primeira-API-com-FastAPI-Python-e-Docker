from sqlalchemy.orm import Mapped, mapped_column
from uuid import uuid4
from sqlalchemy import String
from database.database import Base
from datetime import datetime

class BaseModel(Base):
    __abstract__ = True
    
    # SQLite compatível - usar String em vez de UUID
    id: Mapped[str] = mapped_column(String(36), primary_key=True, default=lambda: str(uuid4()))
    created_at: Mapped[datetime] = mapped_column(default=datetime.utcnow)