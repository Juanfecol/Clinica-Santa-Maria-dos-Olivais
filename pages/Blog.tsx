import React from 'react';
import { ArticleCard } from '../components/ArticleCard';

const articles = [
  {
    id: "1",
    title: "Como prevenir a sensibilidade dentária",
    excerpt: "Dicas essenciais para manter o seu sorriso saudável e sem dor no dia a dia.",
    category: "Prevenção",
    date: "12 Abr 2026",
    image: "https://picsum.photos/seed/blog1/600/400"
  },
  {
    id: "2",
    title: "Mitos sobre o branqueamento dentário",
    excerpt: "Desmistificamos o que é verdade e o que é mito sobre este tratamento estético popular.",
    category: "Estética",
    date: "10 Abr 2026",
    image: "https://picsum.photos/seed/blog2/600/400"
  },
  {
    id: "3",
    title: "A importância da higiene oral nas crianças",
    excerpt: "Como criar hábitos saudáveis desde cedo para um sorriso duradouro.",
    category: "Odontopediatria",
    date: "05 Abr 2026",
    image: "https://picsum.photos/seed/blog3/600/400"
  }
];

const Blog: React.FC = () => {
  return (
    <div className="max-w-6xl mx-auto px-4 py-16 animate-fade-in-up">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold text-clinic-blue mb-4">Blog de Saúde Oral</h1>
        <p className="text-lg text-gray-600">Dicas e informações úteis da nossa equipa clínica.</p>
      </div>
      <div className="grid md:grid-cols-3 gap-8">
        {articles.map((article) => (
          <ArticleCard key={article.id} article={article} />
        ))}
      </div>
    </div>
  );
};

export default Blog;
