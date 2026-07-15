import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronUp } from 'lucide-react';

export const EvaluationInfo: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="my-8 border rounded-lg border-gray-200 overflow-hidden shadow-sm bg-white">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex justify-between items-center p-4 bg-gray-50 hover:bg-gray-100 transition"
      >
        <span className="font-semibold text-gray-800">Sobre a nossa avaliação</span>
        {isOpen ? <ChevronUp className="text-gray-500" /> : <ChevronDown className="text-gray-500" />}
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="px-4 pb-4"
          >
            <p className="mt-4 text-gray-700">A avaliação é o primeiro passo para cuidar do seu sorriso! 😊</p>
            <p className="font-bold mt-2 text-gray-800">O que inclui:</p>
            <ul className="list-disc pl-5 mt-1 text-gray-600 space-y-1">
              <li>Exame clínico completo</li>
              <li>Avaliação da saúde oral</li>
              <li>Plano de tratamento personalizado</li>
              <li>Orçamento detalhado</li>
              <li>RX Periapical</li>
            </ul>
            <p className="font-bold mt-4 text-lg text-blue-600">Custo: 20€</p>
            <p className="mt-2 font-bold text-gray-800">Quer agendar a sua avaliação? 📅</p>
            <p className="mt-2 text-xs text-gray-500 italic">* Valor não dedutível do tratamento.</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
