-- Insertar un usuario de ejemplo
INSERT INTO users (username, email, password_hash, is_active, created_at)
VALUES ('admin', 'admin@mail.com', 'hash_aqui', 1, SYSDATETIME());
GO
