import React, { useState } from 'react';
import { useContent } from '../context/ContentContext';
import { Link } from 'react-router-dom';

const Admin: React.FC = () => {
  const { content, updateContent, resetContent } = useContent();
  const [activeTab, setActiveTab] = useState('global');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  
  // Local state for form handling to avoid jittery typing
  const [formData, setFormData] = useState(content);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'admin') {
      setIsAuthenticated(true);
      setFormData(content); // Sync on login
    } else {
      alert('Senha incorreta!');
    }
  };

  const handleSave = () => {
    updateContent(formData);
    alert('Alterações guardadas com sucesso! O site foi atualizado.');
  };

  const handleReset = () => {
    if(window.confirm('Tem a certeza? Isto irá restaurar o site para o conteúdo original.')) {
      resetContent();
      // Reload page to fetch defaults
      window.location.reload();
    }
  };

  // --- GENERIC CHANGE HANDLER ---
  const handleChange = (section: string, field: string | null, value: any, index?: number, subField?: string) => {
    const newData = { ...formData };
    
    if (index !== undefined && subField && field) {
      // Array item update (e.g., stories[0].title)
      newData[section][field][index][subField] = value;
    } else if (index !== undefined && field) {
        // Simple Array item update (e.g., gallery[0])
        newData[section][field][index] = value;
    } else if (field) {
      // Nested Object update (e.g., global.email)
      newData[section][field] = value;
    } else {
        // Root section update (rarely used)
        newData[section] = value;
    }

    setFormData(newData);
  };

  // --- ARRAY MANIPULATION HANDLERS ---
  
  // Add a new item to an array
  const handleAddItem = (section: string, field: string, emptyItem: any) => {
    const newData = { ...formData };
    if (!newData[section][field]) newData[section][field] = [];
    newData[section][field].push(emptyItem);
    setFormData(newData);
  };

  // Remove an item from an array
  const handleRemoveItem = (section: string, field: string, index: number) => {
    if(!window.confirm("Eliminar este item?")) return;
    const newData = { ...formData };
    newData[section][field].splice(index, 1);
    setFormData(newData);
  };

  // Special handler for Global Socials
  const handleSocialChange = (key: string, value: string) => {
      const newData = { ...formData };
      newData.global.socials[key] = value;
      setFormData(newData);
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 font-sans">
        <div className="bg-white p-8 rounded-xl shadow-xl w-full max-w-md">
          <h1 className="text-2xl font-bold text-clinic-blue mb-6 text-center">Painel de Administrador</h1>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-gray-700 mb-2">Senha de Acesso</label>
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-clinic-blue focus:ring-2 outline-none"
                placeholder="Introduza a senha (admin)"
              />
            </div>
            <button type="submit" className="w-full bg-clinic-blue text-white py-3 rounded-lg font-bold hover:bg-clinic-purple transition-colors">
              Entrar
            </button>
            <div className="text-center mt-4">
              <Link to="/" className="text-gray-500 hover:text-clinic-blue text-sm">Voltar ao Site</Link>
            </div>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      {/* Admin Header */}
      <header className="bg-clinic-blue text-white px-6 py-4 shadow-md flex justify-between items-center sticky top-0 z-50">
        <div className="flex items-center gap-4">
          <h1 className="text-xl font-bold">Painel CMS</h1>
          <span className="bg-clinic-lime text-clinic-blue text-xs font-bold px-2 py-1 rounded">Modo Edição Total</span>
        </div>
        <div className="flex items-center gap-4">
          <a href="/#/" target="_blank" className="text-white/80 hover:text-white text-sm"><i className="fas fa-external-link-alt mr-2"></i>Ver Site</a>
          <button onClick={() => setIsAuthenticated(false)} className="text-white/80 hover:text-red-300 text-sm">Sair</button>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-6">
          
          {/* Sidebar Navigation */}
          <div className="w-full md:w-64 flex-shrink-0">
            <div className="bg-white rounded-lg shadow-sm overflow-hidden sticky top-24">
              <nav className="flex flex-col">
                <button 
                  onClick={() => setActiveTab('global')}
                  className={`px-6 py-4 text-left font-medium border-l-4 transition-colors ${activeTab === 'global' ? 'border-clinic-lime bg-blue-50 text-clinic-blue' : 'border-transparent text-gray-600 hover:bg-gray-50'}`}
                >
                  <i className="fas fa-globe w-6"></i> Geral / Menu
                </button>
                <button 
                  onClick={() => setActiveTab('home')}
                  className={`px-6 py-4 text-left font-medium border-l-4 transition-colors ${activeTab === 'home' ? 'border-clinic-lime bg-blue-50 text-clinic-blue' : 'border-transparent text-gray-600 hover:bg-gray-50'}`}
                >
                  <i className="fas fa-home w-6"></i> Página Inicial
                </button>
                <button 
                  onClick={() => setActiveTab('stories')}
                  className={`px-6 py-4 text-left font-medium border-l-4 transition-colors ${activeTab === 'stories' ? 'border-clinic-lime bg-blue-50 text-clinic-blue' : 'border-transparent text-gray-600 hover:bg-gray-50'}`}
                >
                  <i className="fas fa-photo-video w-6"></i> Histórias
                </button>
                <button 
                  onClick={() => setActiveTab('team')}
                  className={`px-6 py-4 text-left font-medium border-l-4 transition-colors ${activeTab === 'team' ? 'border-clinic-lime bg-blue-50 text-clinic-blue' : 'border-transparent text-gray-600 hover:bg-gray-50'}`}
                >
                  <i className="fas fa-user-md w-6"></i> Equipa
                </button>
                <button 
                  onClick={() => setActiveTab('media')}
                  className={`px-6 py-4 text-left font-medium border-l-4 transition-colors ${activeTab === 'media' ? 'border-clinic-lime bg-blue-50 text-clinic-blue' : 'border-transparent text-gray-600 hover:bg-gray-50'}`}
                >
                  <i className="fas fa-images w-6"></i> Galeria e Campanhas
                </button>
              </nav>
            </div>
            
            <div className="mt-6 space-y-3 sticky top-[450px]">
              <button 
                onClick={handleSave}
                className="w-full bg-green-600 text-white py-3 rounded-lg font-bold shadow-lg hover:bg-green-700 transition-transform active:scale-95"
              >
                <i className="fas fa-save mr-2"></i> Guardar Tudo
              </button>
              <button 
                onClick={handleReset}
                className="w-full bg-red-100 text-red-600 py-2 rounded-lg font-semibold hover:bg-red-200 text-sm"
              >
                <i className="fas fa-undo mr-2"></i> Restaurar Original
              </button>
            </div>
          </div>

          {/* Editor Content */}
          <div className="flex-1">
            
            {/* GLOBAL & MENU EDITOR */}
            {activeTab === 'global' && (
              <div className="space-y-8 animate-fade-in-up">
                
                {/* Contact Info */}
                <div className="bg-white rounded-lg shadow-sm p-8">
                  <h2 className="text-2xl font-bold text-gray-800 mb-6 border-b pb-4">Informações de Contacto</h2>
                  <div className="grid grid-cols-1 gap-4">
                    <input type="text" value={formData.global.email} onChange={(e) => handleChange('global', 'email', e.target.value)} className="input-field border p-2 rounded" placeholder="Email" />
                    <input type="text" value={formData.global.phone} onChange={(e) => handleChange('global', 'phone', e.target.value)} className="input-field border p-2 rounded" placeholder="Telefone Fixo" />
                    <input type="text" value={formData.global.mobile} onChange={(e) => handleChange('global', 'mobile', e.target.value)} className="input-field border p-2 rounded" placeholder="Telemóvel / WhatsApp" />
                    <input type="text" value={formData.global.address} onChange={(e) => handleChange('global', 'address', e.target.value)} className="input-field border p-2 rounded" placeholder="Morada" />
                    <input type="text" value={formData.global.socials.instagram} onChange={(e) => handleSocialChange('instagram', e.target.value)} className="input-field border p-2 rounded" placeholder="Link Instagram" />
                    <input type="text" value={formData.global.socials.facebook} onChange={(e) => handleSocialChange('facebook', e.target.value)} className="input-field border p-2 rounded" placeholder="Link Facebook" />
                    <input type="text" value={formData.global.socials.whatsapp} onChange={(e) => handleSocialChange('whatsapp', e.target.value)} className="input-field border p-2 rounded" placeholder="Link WhatsApp (wa.me/...)" />
                  </div>
                </div>

                {/* Navigation Menu */}
                <div className="bg-white rounded-lg shadow-sm p-8">
                  <div className="flex justify-between items-center mb-6 border-b pb-4">
                    <h2 className="text-2xl font-bold text-gray-800">Menu de Navegação</h2>
                    <button onClick={() => handleAddItem('navigation', 'navigation', { label: "Novo Item", path: "/" })} className="bg-clinic-blue text-white px-3 py-1 rounded text-sm hover:bg-clinic-purple">+ Adicionar Item</button>
                  </div>
                  <p className="text-sm text-gray-500 mb-4">Adicione links para criar novos espaços ou redirecionar para páginas existentes.</p>
                  
                  <div className="space-y-3">
                    {/* Note: 'navigation' is array at root, so access is tricky with generic helper. Let's patch generic helper or use specific logic. */}
                    {/* Generic Helper fix: section='navigation' is actually root array? No, context structure is { navigation: [] }. So section is root, field is 'navigation'. */}
                    {formData.navigation.map((item: any, index: number) => (
                      <div key={index} className="flex gap-2 items-center bg-gray-50 p-2 rounded">
                        <input type="text" value={item.label} onChange={(e) => {
                             const newData = { ...formData }; newData.navigation[index].label = e.target.value; setFormData(newData);
                        }} className="border p-2 rounded flex-1" placeholder="Nome do Botão" />
                        <input type="text" value={item.path} onChange={(e) => {
                             const newData = { ...formData }; newData.navigation[index].path = e.target.value; setFormData(newData);
                        }} className="border p-2 rounded flex-1 text-gray-500 text-sm" placeholder="Link (/pagina ou https://...)" />
                        <button onClick={() => {
                             if(!window.confirm("Eliminar?")) return;
                             const newData = { ...formData }; newData.navigation.splice(index, 1); setFormData(newData);
                        }} className="text-red-500 hover:bg-red-100 p-2 rounded"><i className="fas fa-trash"></i></button>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Appointment Services */}
                 <div className="bg-white rounded-lg shadow-sm p-8">
                  <div className="flex justify-between items-center mb-6 border-b pb-4">
                    <h2 className="text-2xl font-bold text-gray-800">Serviços no Formulário</h2>
                     <button onClick={() => {
                        const newData = { ...formData }; newData.appointments.services.push("Novo Serviço"); setFormData(newData);
                     }} className="bg-clinic-blue text-white px-3 py-1 rounded text-sm hover:bg-clinic-purple">+ Adicionar Opção</button>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {formData.appointments.services.map((service: string, index: number) => (
                       <div key={index} className="flex gap-2">
                          <input type="text" value={service} onChange={(e) => {
                              const newData = { ...formData }; newData.appointments.services[index] = e.target.value; setFormData(newData);
                          }} className="border p-2 rounded w-full" />
                          <button onClick={() => {
                               const newData = { ...formData }; newData.appointments.services.splice(index, 1); setFormData(newData);
                          }} className="text-red-500"><i className="fas fa-trash"></i></button>
                       </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* HOME EDITOR */}
            {activeTab === 'home' && (
              <div className="bg-white rounded-lg shadow-sm p-8 animate-fade-in-up">
                <h2 className="text-2xl font-bold text-gray-800 mb-6 border-b pb-4">Editar Página Inicial</h2>
                <div className="space-y-6">
                  <div>
                    <label className="block text-gray-700 font-bold mb-2">Título Principal</label>
                    <input type="text" value={formData.home.heroTitle} onChange={(e) => handleChange('home', 'heroTitle', e.target.value)} className="w-full px-4 py-2 border rounded-lg" />
                  </div>
                  <div>
                    <label className="block text-gray-700 font-bold mb-2">Subtítulo</label>
                    <textarea rows={5} value={formData.home.heroSubtitle} onChange={(e) => handleChange('home', 'heroSubtitle', e.target.value)} className="w-full px-4 py-2 border rounded-lg" />
                  </div>
                  <div>
                     <label className="block text-gray-700 font-bold mb-2">Imagem do Formulário (Marcações)</label>
                     <input type="text" value={formData.appointments.heroImage} onChange={(e) => handleChange('appointments', 'heroImage', e.target.value)} className="w-full px-4 py-2 border rounded-lg text-sm text-gray-500" />
                  </div>
                </div>
              </div>
            )}

            {/* STORIES EDITOR - UNLIMITED ADDITION */}
            {activeTab === 'stories' && (
              <div className="bg-white rounded-lg shadow-sm p-8 animate-fade-in-up">
                <div className="flex justify-between items-center mb-6 border-b pb-4">
                  <h2 className="text-2xl font-bold text-gray-800">Gerir Histórias</h2>
                  <button 
                    onClick={() => handleAddItem('stories', 'stories', { id: Date.now(), type: 'image', title: 'Nova História', src: '', thumbnail: '' })}
                    className="bg-clinic-lime text-clinic-blue font-bold px-4 py-2 rounded shadow hover:bg-clinic-blue hover:text-white transition-colors"
                  >
                    + Adicionar História
                  </button>
                </div>
                
                <div className="space-y-8">
                  {formData.stories.map((story: any, index: number) => (
                    <div key={index} className="bg-gray-50 p-4 rounded-lg border relative group">
                      <button 
                        onClick={() => handleRemoveItem('stories', 'stories', index)}
                        className="absolute top-2 right-2 text-red-400 hover:text-red-600 bg-white rounded-full w-8 h-8 flex items-center justify-center shadow"
                      >
                        <i className="fas fa-trash"></i>
                      </button>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs text-gray-600 mb-1">Título</label>
                          <input type="text" value={story.title} onChange={(e) => handleChange('stories', 'stories', e.target.value, index, 'title')} className="w-full px-3 py-2 bg-white border rounded text-sm" />
                        </div>
                         <div>
                          <label className="block text-xs text-gray-600 mb-1">Tipo (video/image)</label>
                          <select value={story.type} onChange={(e) => handleChange('stories', 'stories', e.target.value, index, 'type')} className="w-full px-3 py-2 bg-white border rounded text-sm">
                            <option value="video">Vídeo</option>
                            <option value="image">Imagem</option>
                          </select>
                        </div>
                        <div className="md:col-span-2">
                           <label className="block text-xs text-gray-600 mb-1">Link da Mídia (Video MP4 ou Imagem)</label>
                           <input type="text" value={story.src} onChange={(e) => handleChange('stories', 'stories', e.target.value, index, 'src')} className="w-full px-3 py-2 bg-white border rounded text-sm font-mono text-xs" placeholder="https://..." />
                        </div>
                        <div className="md:col-span-2">
                           <label className="block text-xs text-gray-600 mb-1">Link Thumbnail (Imagem de Capa)</label>
                           <input type="text" value={story.thumbnail} onChange={(e) => handleChange('stories', 'stories', e.target.value, index, 'thumbnail')} className="w-full px-3 py-2 bg-white border rounded text-sm font-mono text-xs" placeholder="https://..." />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* GALLERY & CAMPAIGNS EDITOR */}
            {activeTab === 'media' && (
              <div className="space-y-8 animate-fade-in-up">
                 
                 {/* Clinic Gallery */}
                 <div className="bg-white rounded-lg shadow-sm p-8">
                    <div className="flex justify-between items-center mb-6">
                       <h2 className="text-2xl font-bold text-gray-800">Galeria da Clínica</h2>
                       <button onClick={() => {
                          const newData = { ...formData }; newData.clinic.gallery.push(""); setFormData(newData);
                       }} className="bg-clinic-blue text-white px-3 py-1 rounded text-sm">+ Foto</button>
                    </div>
                    <div className="space-y-4">
                       {formData.clinic.gallery.map((img: string, index: number) => (
                         <div key={index} className="flex gap-2">
                           <img src={img} className="w-12 h-12 object-cover rounded bg-gray-200" alt="thumb" />
                           <input type="text" value={img} onChange={(e) => {
                              const newData = { ...formData }; newData.clinic.gallery[index] = e.target.value; setFormData(newData);
                           }} className="flex-1 border p-2 rounded text-sm" placeholder="Link da imagem..." />
                            <button onClick={() => {
                               const newData = { ...formData }; newData.clinic.gallery.splice(index, 1); setFormData(newData);
                           }} className="text-red-500 p-2"><i className="fas fa-trash"></i></button>
                         </div>
                       ))}
                    </div>
                 </div>

                 {/* Campaigns */}
                 <div className="bg-white rounded-lg shadow-sm p-8">
                    <div className="flex justify-between items-center mb-6">
                       <h2 className="text-2xl font-bold text-gray-800">Imagens de Campanhas</h2>
                       <button onClick={() => {
                          const newData = { ...formData }; newData.campaigns.push({ src: "", title: "Nova" }); setFormData(newData);
                       }} className="bg-clinic-blue text-white px-3 py-1 rounded text-sm">+ Campanha</button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                       {formData.campaigns.map((camp: any, index: number) => (
                         <div key={index} className="border p-4 rounded bg-gray-50 relative">
                            <button onClick={() => {
                               const newData = { ...formData }; newData.campaigns.splice(index, 1); setFormData(newData);
                           }} className="absolute top-2 right-2 text-red-500"><i className="fas fa-trash"></i></button>
                           
                           <div className="mb-2">
                             <label className="text-xs text-gray-500">Imagem</label>
                             <input type="text" value={camp.src} onChange={(e) => {
                                const newData = { ...formData }; newData.campaigns[index].src = e.target.value; setFormData(newData);
                             }} className="w-full border p-1 rounded text-sm" />
                           </div>
                           <div className="mb-2">
                             <label className="text-xs text-gray-500">Título</label>
                             <input type="text" value={camp.title} onChange={(e) => {
                                const newData = { ...formData }; newData.campaigns[index].title = e.target.value; setFormData(newData);
                             }} className="w-full border p-1 rounded text-sm" />
                           </div>
                           {camp.src && <img src={camp.src} className="h-20 w-auto object-contain mt-2" alt="preview" />}
                         </div>
                       ))}
                    </div>
                 </div>

              </div>
            )}

            {/* TEAM EDITOR (Existing logic preserved, but generic) */}
            {activeTab === 'team' && (
              <div className="bg-white rounded-lg shadow-sm p-8 animate-fade-in-up">
                <h2 className="text-2xl font-bold text-gray-800 mb-6 border-b pb-4">Equipa Médica e Staff</h2>
                
                {/* Medical Team Loop */}
                <h3 className="font-bold text-clinic-blue mb-4">Médicos</h3>
                <div className="space-y-4 mb-8">
                  {formData.team.medical.map((member: any, index: number) => (
                    <div key={index} className="flex gap-4 p-4 border rounded-lg bg-gray-50">
                       <img src={member.img} className="w-16 h-16 rounded-full object-cover" alt="" />
                       <div className="flex-1 space-y-2">
                          <input type="text" value={member.name} onChange={(e) => handleChange('team', 'medical', e.target.value, index, 'name')} className="w-full border p-1 rounded font-bold" />
                          <input type="text" value={member.title} onChange={(e) => handleChange('team', 'medical', e.target.value, index, 'title')} className="w-full border p-1 rounded text-sm" />
                          <input type="text" value={member.img} onChange={(e) => handleChange('team', 'medical', e.target.value, index, 'img')} className="w-full border p-1 rounded text-xs text-gray-400" />
                       </div>
                    </div>
                  ))}
                  <button onClick={() => handleAddItem('team', 'medical', { name: "Novo Médico", title: "Especialidade", img: "", bio: "" })} className="w-full py-2 border-2 border-dashed border-gray-300 text-gray-500 rounded hover:bg-gray-50">+ Adicionar Médico</button>
                </div>
                
                {/* Assistants Team Loop (Simplified view) */}
                 <h3 className="font-bold text-clinic-blue mb-4">Assistentes / Outros</h3>
                 <div className="space-y-4">
                  {formData.team.assistants && formData.team.assistants.map((member: any, index: number) => (
                    <div key={index} className="flex gap-4 p-4 border rounded-lg bg-gray-50 relative">
                       <button onClick={() => {
                          const newData = { ...formData }; newData.team.assistants.splice(index, 1); setFormData(newData);
                       }} className="absolute top-2 right-2 text-red-500"><i className="fas fa-trash"></i></button>
                       <div className="flex-1 space-y-2">
                          <input type="text" value={member.name} onChange={(e) => {
                             const newData = { ...formData }; newData.team.assistants[index].name = e.target.value; setFormData(newData);
                          }} className="w-full border p-1 rounded font-bold" />
                          <input type="text" value={member.img} onChange={(e) => {
                             const newData = { ...formData }; newData.team.assistants[index].img = e.target.value; setFormData(newData);
                          }} className="w-full border p-1 rounded text-xs text-gray-400" />
                       </div>
                    </div>
                  ))}
                   <button onClick={() => {
                       const newData = { ...formData }; 
                       if(!newData.team.assistants) newData.team.assistants = [];
                       newData.team.assistants.push({ name: "Novo", title: "Assistente", img: "", bio: "" }); 
                       setFormData(newData);
                   }} className="w-full py-2 border-2 border-dashed border-gray-300 text-gray-500 rounded hover:bg-gray-50">+ Adicionar Staff</button>
                </div>

              </div>
            )}

          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin;