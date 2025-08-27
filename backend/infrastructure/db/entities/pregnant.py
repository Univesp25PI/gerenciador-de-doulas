from datetime import date, datetime

from sqlalchemy import DateTime
from sqlalchemy.sql import func
from sqlalchemy.orm import relationship, Mapped, mapped_column
from sqlalchemy import Integer, String, ForeignKey

from infrastructure.db.entities.base import Base

class Pregnant(Base):
    __tablename__ = "pregnants"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, autoincrement=True)
    doula_id: Mapped[int] = mapped_column(ForeignKey("doulas.id"), nullable=False)

    name: Mapped[str] = mapped_column(String(120), nullable=False)
    age: Mapped[int] = mapped_column(Integer, nullable=False)
    email: Mapped[str] = mapped_column(String(255), nullable=False, unique=True)
    phone: Mapped[str] = mapped_column(String(30), nullable=False)
    first_pregnancy: Mapped[bool]
    lmp_date: Mapped[date]
    comorbidities: Mapped[str] = mapped_column(String, nullable=False, default="")
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

    doula = relationship("Doula", lazy="joined")