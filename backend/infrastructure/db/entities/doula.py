from datetime import datetime

from sqlalchemy import DateTime
from sqlalchemy.sql import func
from sqlalchemy import String, Integer
from sqlalchemy.orm import Mapped, mapped_column
from infrastructure.db.entities.base import Base

class Doula(Base):
    __tablename__ = "doulas"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, index=True)
    name: Mapped[str] = mapped_column(String(120), nullable=False)
    email: Mapped[str] = mapped_column(String(255), unique=True, nullable=False)
    phone: Mapped[str] = mapped_column(String, unique=True, nullable=False)

    create_date: Mapped[datetime] = mapped_column(
        DateTime(timezone=True),
        nullable=False,
        server_default=func.now(),
    )
    update_date: Mapped[datetime] = mapped_column(
        DateTime(timezone=True),
        nullable=False,
        server_default=func.now(),
        onupdate=func.now(),
    )