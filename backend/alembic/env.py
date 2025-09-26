from logging.config import fileConfig
from sqlalchemy import engine_from_config, pool
from alembic import context

from infrastructure.config.settings import settings
from infrastructure.db.entities import Base

# Configura Alembic
config = context.config

# Logging
if config.config_file_name is not None:
    fileConfig(config.config_file_name)

# Define a URL síncrona vinda do settings
config.set_main_option("sqlalchemy.url", settings.sqlalchemy_sync_url)
print("SQLAlchemy URL usada pelo Alembic:", config.get_main_option("sqlalchemy.url"))

# Importa metadata dos models
target_metadata = Base.metadata

def run_migrations_offline():
    url = config.get_main_option("sqlalchemy.url")
    context.configure(
        url=url,
        target_metadata=target_metadata,
        literal_binds=True,
        dialect_opts={"paramstyle": "named"},
    )
    with context.begin_transaction():
        context.run_migrations()

def run_migrations_online():
    connectable = engine_from_config(
        config.get_section(config.config_ini_section, {}),
        prefix="sqlalchemy.",
        poolclass=pool.NullPool,
    )

    with connectable.connect() as connection:
        context.configure(
            connection=connection,
            target_metadata=target_metadata,
        )
        with context.begin_transaction():
            context.run_migrations()

if context.is_offline_mode():
    run_migrations_offline()
else:
    run_migrations_online()
