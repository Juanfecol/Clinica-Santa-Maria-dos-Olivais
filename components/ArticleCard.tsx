import React from 'react';
import { Link } from 'react-router-dom';

interface Article {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  image: string;
}

export const ArticleCard: React.FC<{ article: Article }> = ({ article }) => (
  <div className="bg-white rounded-3xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-2xl transition-all duration-300 group">
    <div className="h-48 overflow-hidden">
      <img src={article.image} alt={article.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
    </div>
    <div className="p-6">
      <span className="text-xs font-bold text-clinic-purple uppercase tracking-widest">{article.category}</span>
      <h3 className="text-xl font-bold text-clinic-blue mt-2 mb-3 group-hover:text-clinic-purple transition-colors">{article.title}</h3>
      <p className="text-gray-600 text-sm mb-4">{article.excerpt}</p>
      <div className="flex justify-between items-center text-xs text-gray-400">
        <span>{article.date}</span>
        <Link to={`/blog/${article.id}`} className="text-clinic-blue font-bold hover:text-clinic-lime transition-colors">Ler mais →</Link>
      </div>
    </div>
  </div>
);
