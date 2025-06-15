
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { AppCard } from "@/components/AppCard";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Button } from "@/components/ui/button";
import { LogOut, Settings } from 'lucide-react';

interface App {
  id: string;
  name: string;
  description: string;
  image: string;
  link: string;
}

const Index = () => {
  const { user, profile, signOut } = useAuth();
  const navigate = useNavigate();
  const [apps, setApps] = useState<App[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user && !profile?.is_approved) {
      navigate('/auth');
      return;
    }
    fetchApps();
  }, [user, profile, navigate]);

  const fetchApps = async () => {
    const { data, error } = await supabase
      .from('apps')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) {
      console.error('Error fetching apps:', error);
    } else {
      setApps(data || []);
    }
    setLoading(false);
  };

  if (!user || !profile?.is_approved) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-700">
        {/* Header */}
        <header className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-700 sticky top-0 z-10">
          <div className="container mx-auto px-6 py-4">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">WebApps Gallery</h1>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Descubra aplicações web incríveis</p>
              </div>
              <div className="flex items-center space-x-4">
                <ThemeToggle />
                <Button onClick={() => navigate('/auth')}>
                  Fazer Login
                </Button>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="container mx-auto px-6 py-12">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              Explore Aplicações
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600"> Web Inovadoras</span>
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Descubra uma coleção curada de aplicações web modernas, cada uma projetada para resolver problemas específicos e melhorar sua produtividade.
            </p>
          </div>

          {/* Public Apps Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {apps.slice(0, 3).map((app) => (
              <AppCard
                key={app.id}
                name={app.name}
                description={app.description}
                image={app.image}
                link={app.link}
              />
            ))}
          </div>

          <div className="text-center mt-12">
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Faça login para ver todas as aplicações disponíveis
            </p>
            <Button
              onClick={() => navigate('/auth')}
              className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-3 rounded-lg font-medium hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 transform hover:scale-105"
            >
              Acessar Sistema
            </Button>
          </div>
        </main>

        {/* Footer */}
        <footer className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-md border-t border-gray-200 dark:border-gray-700 mt-20">
          <div className="container mx-auto px-6 py-8">
            <div className="text-center text-gray-600 dark:text-gray-400">
              <p>&copy; 2024 WebApps Gallery. Todos os direitos reservados.</p>
            </div>
          </div>
        </footer>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-700 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-300">Carregando aplicações...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-700">
      {/* Header */}
      <header className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-700 sticky top-0 z-10">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">WebApps Gallery</h1>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Descubra aplicações web incríveis</p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-sm text-gray-500 dark:text-gray-400">
                {apps.length} aplicações disponíveis
              </div>
              <ThemeToggle />
              {profile?.is_admin && (
                <Button
                  onClick={() => navigate('/admin')}
                  variant="outline"
                  size="sm"
                >
                  <Settings className="w-4 h-4 mr-2" />
                  Admin
                </Button>
              )}
              <Button
                onClick={signOut}
                variant="outline"
                size="sm"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Sair
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Explore Aplicações
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600"> Web Inovadoras</span>
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Descubra uma coleção curada de aplicações web modernas, cada uma projetada para resolver problemas específicos e melhorar sua produtividade.
          </p>
        </div>

        {/* Apps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {apps.map((app) => (
            <AppCard
              key={app.id}
              name={app.name}
              description={app.description}
              image={app.image}
              link={app.link}
            />
          ))}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-md border-t border-gray-200 dark:border-gray-700 mt-20">
        <div className="container mx-auto px-6 py-8">
          <div className="text-center text-gray-600 dark:text-gray-400">
            <p>&copy; 2024 WebApps Gallery. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
