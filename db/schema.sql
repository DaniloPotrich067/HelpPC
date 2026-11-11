-- Help PC — schema PostgreSQL (13+). Idempotente: pode ser executado mais de uma vez.
-- Aplicar: psql "$DATABASE_URL" -f db/schema.sql

BEGIN;

-- =====================================================
-- Orçamentos
-- =====================================================

CREATE TABLE IF NOT EXISTS orcamentos (
  id             uuid         PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at     timestamptz  NOT NULL DEFAULT now(),
  updated_at     timestamptz  NOT NULL DEFAULT now(),
  name           varchar(100) NOT NULL CHECK (char_length(btrim(name)) >= 2),
  phone          varchar(25)  NOT NULL CHECK (char_length(btrim(phone)) >= 8),
  services       text[]       NOT NULL CHECK (cardinality(services) BETWEEN 1 AND 5),
  equipment      varchar(100),
  description    varchar(2000) NOT NULL CHECK (char_length(btrim(description)) >= 10),
  status         varchar(30)  NOT NULL DEFAULT 'a_enviar_mensagem'
                 CHECK (status IN ('a_enviar_mensagem', 'contato_feito', 'em_andamento', 'concluido', 'cancelado')),
  -- HMAC do IP (nunca o IP puro): usado só para limitar abuso.
  client_ip_hash char(64)
);

CREATE INDEX IF NOT EXISTS orcamentos_status_created_idx
  ON orcamentos (status, created_at DESC);
CREATE INDEX IF NOT EXISTS orcamentos_created_idx
  ON orcamentos (created_at DESC);
CREATE INDEX IF NOT EXISTS orcamentos_ip_created_idx
  ON orcamentos (client_ip_hash, created_at DESC);

-- =====================================================
-- Anexos (um por orçamento, até 5 MB, guardados no banco)
-- =====================================================

CREATE TABLE IF NOT EXISTS anexos (
  id           uuid         PRIMARY KEY DEFAULT gen_random_uuid(),
  orcamento_id uuid         NOT NULL UNIQUE REFERENCES orcamentos (id) ON DELETE CASCADE,
  filename     varchar(100) NOT NULL,
  mime_type    varchar(50)  NOT NULL
               CHECK (mime_type IN ('image/jpeg', 'image/png', 'application/pdf')),
  size_bytes   integer      NOT NULL CHECK (size_bytes BETWEEN 1 AND 5242880),
  content      bytea        NOT NULL,
  created_at   timestamptz  NOT NULL DEFAULT now()
);

-- =====================================================
-- Cotações de peças e ferramentas (opcionalmente ligadas a um orçamento)
-- =====================================================

CREATE TABLE IF NOT EXISTS cotacoes (
  id             uuid          PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at     timestamptz   NOT NULL DEFAULT now(),
  updated_at     timestamptz   NOT NULL DEFAULT now(),
  tipo           varchar(10)   NOT NULL CHECK (tipo IN ('peca', 'ferramenta')),
  item           varchar(150)  NOT NULL CHECK (char_length(btrim(item)) >= 2),
  fornecedor     varchar(100)  NOT NULL CHECK (char_length(btrim(fornecedor)) >= 2),
  quantidade     integer       NOT NULL DEFAULT 1 CHECK (quantidade BETWEEN 1 AND 9999),
  preco_unitario numeric(10,2) NOT NULL CHECK (preco_unitario >= 0),
  link           varchar(500),
  observacoes    varchar(1000),
  orcamento_id   uuid          REFERENCES orcamentos (id) ON DELETE SET NULL
);

CREATE INDEX IF NOT EXISTS cotacoes_created_idx ON cotacoes (created_at DESC);
CREATE INDEX IF NOT EXISTS cotacoes_orcamento_idx ON cotacoes (orcamento_id);

-- =====================================================
-- Tentativas de login do painel (anti força bruta)
-- =====================================================

CREATE TABLE IF NOT EXISTS admin_login_attempts (
  id         bigserial   PRIMARY KEY,
  ip_hash    char(64)    NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS admin_login_attempts_ip_created_idx
  ON admin_login_attempts (ip_hash, created_at DESC);

-- =====================================================
-- updated_at automático
-- =====================================================

CREATE OR REPLACE FUNCTION set_updated_at() RETURNS trigger AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS cotacoes_set_updated_at ON cotacoes;
CREATE TRIGGER cotacoes_set_updated_at
  BEFORE UPDATE ON cotacoes
  FOR EACH ROW EXECUTE FUNCTION set_updated_at();

DROP TRIGGER IF EXISTS orcamentos_set_updated_at ON orcamentos;
CREATE TRIGGER orcamentos_set_updated_at
  BEFORE UPDATE ON orcamentos
  FOR EACH ROW EXECUTE FUNCTION set_updated_at();

-- =====================================================
-- Segurança: bloqueia acesso por APIs públicas (ex.: Supabase anon/PostgREST).
-- O app conecta com o papel dono das tabelas, que ignora RLS.
-- =====================================================

ALTER TABLE orcamentos            ENABLE ROW LEVEL SECURITY;
ALTER TABLE cotacoes              ENABLE ROW LEVEL SECURITY;
ALTER TABLE anexos                ENABLE ROW LEVEL SECURITY;
ALTER TABLE admin_login_attempts  ENABLE ROW LEVEL SECURITY;

COMMIT;
