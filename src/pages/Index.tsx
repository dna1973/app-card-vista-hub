
import { AppCard } from "@/components/AppCard";

const apps = [
  {
    id: 1,
    name: "TaskFlow Pro",
    description: "Gerenciador de tarefas intuitivo com colaboração em tempo real e análise de produtividade avançada.",
    image: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=400&h=300&fit=crop&crop=center",
    link: "https://taskflow-pro.com"
  },
  {
    id: 2,
    name: "DataViz Studio",
    description: "Plataforma de visualização de dados com dashboards interativos e relatórios personalizáveis.",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&fit=crop&crop=center",
    link: "https://dataviz-studio.com"
  },
  {
    id: 3,
    name: "CloudSync",
    description: "Solução de sincronização de arquivos na nuvem com criptografia de ponta a ponta e backup automático.",
    image: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=400&h=300&fit=crop&crop=center",
    link: "https://cloudsync-app.com"
  },
  {
    id: 4,
    name: "CodeMentor AI",
    description: "Assistente de programação com IA que oferece sugestões de código e revisão automática.",
    image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400&h=300&fit=crop&crop=center",
    link: "https://codementor-ai.com"
  },
  {
    id: 5,
    name: "EcoTracker",
    description: "Aplicativo de sustentabilidade para monitorar pegada de carbono e adotar práticas eco-friendly.",
    image: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=400&h=300&fit=crop&crop=center",
    link: "https://ecotracker-app.com"
  },
  {
    id: 6,
    name: "FitnessPro",
    description: "Plataforma completa de fitness com treinos personalizados, nutrição e acompanhamento de progresso.",
    image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop&crop=center",
    link: "https://fitnesspro-app.com"
  }
];

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-gray-200 sticky top-0 z-10">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">WebApps Gallery</h1>
              <p className="text-sm text-gray-600 mt-1">Descubra aplicações web incríveis</p>
            </div>
            <div className="text-sm text-gray-500">
              {apps.length} aplicações disponíveis
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Explore Aplicações
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600"> Web Inovadoras</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
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

        {/* Call to Action */}
        <div className="text-center mt-16">
          <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-8 border border-gray-200">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Tem uma aplicação para compartilhar?
            </h3>
            <p className="text-gray-600 mb-6">
              Entre em contato conosco para incluir sua aplicação web em nossa galeria.
            </p>
            <button className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-3 rounded-lg font-medium hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 transform hover:scale-105">
              Enviar Aplicação
            </button>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white/80 backdrop-blur-md border-t border-gray-200 mt-20">
        <div className="container mx-auto px-6 py-8">
          <div className="text-center text-gray-600">
            <p>&copy; 2024 WebApps Gallery. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
