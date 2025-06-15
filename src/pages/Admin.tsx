
import React, { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/sonner';
import { Trash2, Edit, Plus, Users, Check, X } from 'lucide-react';

interface App {
  id: string;
  name: string;
  description: string;
  image: string;
  link: string;
}

interface Profile {
  id: string;
  email: string;
  is_admin: boolean;
  is_approved: boolean;
}

const Admin = () => {
  const { user, profile } = useAuth();
  const navigate = useNavigate();
  const [apps, setApps] = useState<App[]>([]);
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [activeTab, setActiveTab] = useState<'apps' | 'users'>('apps');
  const [loading, setLoading] = useState(true);
  const [editingApp, setEditingApp] = useState<App | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    image: '',
    link: ''
  });

  useEffect(() => {
    if (!user || !profile?.is_admin) {
      navigate('/auth');
      return;
    }
    fetchData();
  }, [user, profile, navigate]);

  const fetchData = async () => {
    setLoading(true);
    await Promise.all([fetchApps(), fetchProfiles()]);
    setLoading(false);
  };

  const fetchApps = async () => {
    const { data, error } = await supabase
      .from('apps')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) {
      toast.error('Erro ao carregar aplicações');
    } else {
      setApps(data || []);
    }
  };

  const fetchProfiles = async () => {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) {
      toast.error('Erro ao carregar usuários');
    } else {
      setProfiles(data || []);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (editingApp) {
      const { error } = await supabase
        .from('apps')
        .update(formData)
        .eq('id', editingApp.id);
      
      if (error) {
        toast.error('Erro ao atualizar aplicação');
      } else {
        toast.success('Aplicação atualizada com sucesso!');
        setEditingApp(null);
        fetchApps();
      }
    } else {
      const { error } = await supabase
        .from('apps')
        .insert([formData]);
      
      if (error) {
        toast.error('Erro ao criar aplicação');
      } else {
        toast.success('Aplicação criada com sucesso!');
        fetchApps();
      }
    }
    
    setShowForm(false);
    setFormData({ name: '', description: '', image: '', link: '' });
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Tem certeza que deseja excluir esta aplicação?')) {
      const { error } = await supabase
        .from('apps')
        .delete()
        .eq('id', id);
      
      if (error) {
        toast.error('Erro ao excluir aplicação');
      } else {
        toast.success('Aplicação excluída com sucesso!');
        fetchApps();
      }
    }
  };

  const handleEdit = (app: App) => {
    setEditingApp(app);
    setFormData({
      name: app.name,
      description: app.description,
      image: app.image,
      link: app.link
    });
    setShowForm(true);
  };

  const handleApproveUser = async (userId: string, approve: boolean) => {
    const { error } = await supabase
      .from('profiles')
      .update({ is_approved: approve })
      .eq('id', userId);
    
    if (error) {
      toast.error('Erro ao atualizar usuário');
    } else {
      toast.success(`Usuário ${approve ? 'aprovado' : 'rejeitado'} com sucesso!`);
      fetchProfiles();
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-700 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-300">Carregando...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-700">
      <div className="container mx-auto px-6 py-8">
        <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-8">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              Painel Administrativo
            </h1>
            <Button
              onClick={() => navigate('/')}
              variant="outline"
            >
              Voltar ao Site
            </Button>
          </div>

          <div className="flex space-x-4 mb-8">
            <Button
              onClick={() => setActiveTab('apps')}
              variant={activeTab === 'apps' ? 'default' : 'outline'}
            >
              Aplicações
            </Button>
            <Button
              onClick={() => setActiveTab('users')}
              variant={activeTab === 'users' ? 'default' : 'outline'}
            >
              <Users className="w-4 h-4 mr-2" />
              Usuários
            </Button>
          </div>

          {activeTab === 'apps' && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                  Gerenciar Aplicações
                </h2>
                <Button
                  onClick={() => {
                    setShowForm(true);
                    setEditingApp(null);
                    setFormData({ name: '', description: '', image: '', link: '' });
                  }}
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Nova Aplicação
                </Button>
              </div>

              {showForm && (
                <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6 mb-6">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                    {editingApp ? 'Editar Aplicação' : 'Nova Aplicação'}
                  </h3>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Nome
                      </label>
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                        required
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-600 dark:text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Descrição
                      </label>
                      <textarea
                        value={formData.description}
                        onChange={(e) => setFormData({...formData, description: e.target.value})}
                        required
                        rows={3}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-600 dark:text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        URL da Imagem
                      </label>
                      <input
                        type="url"
                        value={formData.image}
                        onChange={(e) => setFormData({...formData, image: e.target.value})}
                        required
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-600 dark:text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Link da Aplicação
                      </label>
                      <input
                        type="url"
                        value={formData.link}
                        onChange={(e) => setFormData({...formData, link: e.target.value})}
                        required
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-600 dark:text-white"
                      />
                    </div>
                    <div className="flex space-x-4">
                      <Button type="submit">
                        {editingApp ? 'Atualizar' : 'Criar'}
                      </Button>
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => {
                          setShowForm(false);
                          setEditingApp(null);
                        }}
                      >
                        Cancelar
                      </Button>
                    </div>
                  </form>
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {apps.map((app) => (
                  <div key={app.id} className="bg-white dark:bg-gray-700 rounded-lg shadow-md border border-gray-200 dark:border-gray-600 overflow-hidden">
                    <img
                      src={app.image}
                      alt={app.name}
                      className="w-full h-32 object-cover"
                    />
                    <div className="p-4">
                      <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                        {app.name}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-300 mb-4 line-clamp-2">
                        {app.description}
                      </p>
                      <div className="flex space-x-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleEdit(app)}
                        >
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={() => handleDelete(app.id)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'users' && (
            <div>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
                Gerenciar Usuários
              </h2>
              <div className="bg-white dark:bg-gray-700 rounded-lg shadow-md border border-gray-200 dark:border-gray-600 overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50 dark:bg-gray-600">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                          Email
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                          Status
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                          Admin
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                          Ações
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 dark:divide-gray-600">
                      {profiles.map((profile) => (
                        <tr key={profile.id}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                            {profile.email}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                              profile.is_approved 
                                ? 'bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100' 
                                : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-800 dark:text-yellow-100'
                            }`}>
                              {profile.is_approved ? 'Aprovado' : 'Pendente'}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                              profile.is_admin 
                                ? 'bg-blue-100 text-blue-800 dark:bg-blue-800 dark:text-blue-100' 
                                : 'bg-gray-100 text-gray-800 dark:bg-gray-600 dark:text-gray-100'
                            }`}>
                              {profile.is_admin ? 'Admin' : 'Usuário'}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                            {!profile.is_approved && (
                              <>
                                <Button
                                  size="sm"
                                  onClick={() => handleApproveUser(profile.id, true)}
                                  className="bg-green-600 hover:bg-green-700"
                                >
                                  <Check className="w-4 h-4" />
                                </Button>
                                <Button
                                  size="sm"
                                  variant="destructive"
                                  onClick={() => handleApproveUser(profile.id, false)}
                                >
                                  <X className="w-4 h-4" />
                                </Button>
                              </>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Admin;
