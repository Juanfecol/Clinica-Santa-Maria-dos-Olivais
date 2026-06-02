import React from 'react';
import { useLanguage } from '../context/LanguageContext';

const educationalVideos = [
  { title: "Educação Infantil", src: "https://clinica-santa-maria-dos-olivais.b-cdn.net/educa_criancas.mp4" },
  { title: "Cuidado Implantes", src: "https://clinica-santa-maria-dos-olivais.b-cdn.net/educa_cuidado_implantes_MANUTENCAOADAWARNESS.mp4" },
  { title: "Convite Dente Banado", src: "https://clinica-santa-maria-dos-olivais.b-cdn.net/educa_dentebanado_ALEXINVITACION2.mp4" },
  { title: "Gestão da Dor", src: "https://clinica-santa-maria-dos-olivais.b-cdn.net/educa_dor.mp4" },
  { title: "Prevenção Geral", src: "https://clinica-santa-maria-dos-olivais.b-cdn.net/educa_dr_tomas_PREVENCAO.mp4" },
  { title: "Facetas Dentárias", src: "https://clinica-santa-maria-dos-olivais.b-cdn.net/educa_facetas_dentarias.mp4" },
  { title: "Saúde Gengival", src: "https://clinica-santa-maria-dos-olivais.b-cdn.net/educa_GINGIVASCORTO.mp4" },
  { title: "Implantes Dentários", src: "https://clinica-santa-maria-dos-olivais.b-cdn.net/educa_implantes_dra_IMPLANTESAD01.mp4" },
  { title: "O que são Implantes?", src: "https://clinica-santa-maria-dos-olivais.b-cdn.net/educa_implantes.mp4" },
  { title: "Convite Revisão", src: "https://clinica-santa-maria-dos-olivais.b-cdn.net/educa_invita_revision_TOMASINVITACION.mp4" },
  { title: "Limpeza Dentária GBT", src: "https://clinica-santa-maria-dos-olivais.b-cdn.net/educa_limpeza_dentaria_gbt.mp4" },
  { title: "Manutenção Implantes", src: "https://clinica-santa-maria-dos-olivais.b-cdn.net/educa_MANTENIMIENTOIMPLANTES.mp4" },
  { title: "Facetas (Convite)", src: "https://clinica-santa-maria-dos-olivais.b-cdn.net/educa_marcar_facetas_MARIANAINVITACION01.mp4" },
  { title: "Alineadores", src: "https://clinica-santa-maria-dos-olivais.b-cdn.net/educa_MARIANAALINEADORES.mp4" },
  { title: "Prevenção (Convite)", src: "https://clinica-santa-maria-dos-olivais.b-cdn.net/educa_prevencion_ALEXINVITACION.mp4" },
  { title: "Prevenção Geral", src: "https://clinica-santa-maria-dos-olivais.b-cdn.net/educa_prevencion_GENERALISTA.mp4" },
  { title: "Problema Silencioso", src: "https://clinica-santa-maria-dos-olivais.b-cdn.net/educa_PROBLEMASILENCIOSO.mp4" },
  { title: "Problemas Periodontais", src: "https://clinica-santa-maria-dos-olivais.b-cdn.net/educa_PROBLEMASPERIODONTALES.mp4" },
  { title: "Próteses Fixas", src: "https://clinica-santa-maria-dos-olivais.b-cdn.net/educa_protesis_parte_PROTESISFIXAS.mp4" },
  { title: "Solução Facetas", src: "https://clinica-santa-maria-dos-olivais.b-cdn.net/educa_solucion_facetas_MARIANAINVITACION02.mp4" },
  { title: "Limpeza e Destartarização", src: "https://clinica-santa-maria-dos-olivais.b-cdn.net/Limpieza%20y%20destartarizacion%2C%20Educativo%20FEED.MP4" }
];

const Blog: React.FC = () => {
  const { t } = useLanguage();

  return (
    <div className="max-w-7xl mx-auto px-6 py-20 bg-clinic-bg">
      <div className="text-center mb-16">
        <h1 className="text-5xl font-bold text-clinic-blue mb-4">{t("Blog Educativo")}</h1>
        <p className="text-xl text-gray-600">{t("Dicas e conselhos de saúde oral em vídeo.")}</p>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {educationalVideos.map((video, index) => (
          <div key={index} className="bg-white p-4 rounded-3xl shadow-xl border border-gray-100 flex flex-col gap-4">
            <div className="aspect-[9/16] rounded-2xl overflow-hidden bg-black">
                <video 
                  src={video.src} 
                  className="w-full h-full object-cover" 
                  controls 
                  playsInline 
                  preload="none"
                  poster={`${video.src}#t=0.1`}
                />
            </div>
            <h3 className="text-lg font-bold text-clinic-blue text-center px-2">{t(video.title)}</h3>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Blog;
