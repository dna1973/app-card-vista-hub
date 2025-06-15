
-- Criar tabela para aplicações web
CREATE TABLE public.apps (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT NOT NULL,
  image TEXT NOT NULL,
  link TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Criar tabela de perfis de usuário
CREATE TABLE public.profiles (
  id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  email TEXT,
  is_admin BOOLEAN DEFAULT FALSE,
  is_approved BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Habilitar RLS nas tabelas
ALTER TABLE public.apps ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Políticas para a tabela apps
CREATE POLICY "Todos podem visualizar apps" 
  ON public.apps 
  FOR SELECT 
  USING (true);

CREATE POLICY "Apenas admins podem inserir apps" 
  ON public.apps 
  FOR INSERT 
  WITH CHECK (EXISTS(SELECT 1 FROM public.profiles WHERE profiles.id = auth.uid() AND profiles.is_admin = true));

CREATE POLICY "Apenas admins podem atualizar apps" 
  ON public.apps 
  FOR UPDATE 
  USING (EXISTS(SELECT 1 FROM public.profiles WHERE profiles.id = auth.uid() AND profiles.is_admin = true));

CREATE POLICY "Apenas admins podem deletar apps" 
  ON public.apps 
  FOR DELETE 
  USING (EXISTS(SELECT 1 FROM public.profiles WHERE profiles.id = auth.uid() AND profiles.is_admin = true));

-- Políticas para a tabela profiles
CREATE POLICY "Usuários podem ver seu próprio perfil" 
  ON public.profiles 
  FOR SELECT 
  USING (auth.uid() = id);

CREATE POLICY "Admins podem ver todos os perfis" 
  ON public.profiles 
  FOR SELECT 
  USING (EXISTS(SELECT 1 FROM public.profiles WHERE profiles.id = auth.uid() AND profiles.is_admin = true));

CREATE POLICY "Admins podem atualizar perfis" 
  ON public.profiles 
  FOR UPDATE 
  USING (EXISTS(SELECT 1 FROM public.profiles WHERE profiles.id = auth.uid() AND profiles.is_admin = true));

-- Função para criar perfil automaticamente quando usuário se registra
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = ''
AS $$
BEGIN
  INSERT INTO public.profiles (id, email, is_admin, is_approved)
  VALUES (new.id, new.email, false, false);
  RETURN new;
END;
$$;

-- Trigger para criar perfil automaticamente
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();

-- Inserir alguns apps de exemplo
INSERT INTO public.apps (name, description, image, link) VALUES
('TaskFlow Pro', 'Gerenciador de tarefas intuitivo com colaboração em tempo real e análise de produtividade avançada.', 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=400&h=300&fit=crop&crop=center', 'https://taskflow-pro.com'),
('DataViz Studio', 'Plataforma de visualização de dados com dashboards interativos e relatórios personalizáveis.', 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&fit=crop&crop=center', 'https://dataviz-studio.com'),
('CloudSync', 'Solução de sincronização de arquivos na nuvem com criptografia de ponta a ponta e backup automático.', 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=400&h=300&fit=crop&crop=center', 'https://cloudsync-app.com');
