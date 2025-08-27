from datetime import date, datetime

from sqlalchemy import DateTime
from sqlalchemy.sql import func
from sqlalchemy.orm import relationship, Mapped, mapped_column
from sqlalchemy import Integer, String, ForeignKey

from infrastructure.db.entities.base import Base

class Lesson(Base):
    __tablename__ = "lessons"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, autoincrement=True)
    pregnant_id: Mapped[int] = mapped_column(ForeignKey("pregnants.id"), nullable=False)

    class_number: Mapped[int] = mapped_column(Integer, nullable=False)
    class_type: Mapped[str] = mapped_column(String, nullable=False)
    class_date: Mapped[datetime]

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

    pregnant = relationship("Pregnant", lazy="joined")