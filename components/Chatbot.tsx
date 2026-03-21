import React, { useState, useRef, useEffect } from 'react';

const API_KEY = 'AIzaSyBiWsEcO-sfalWzYMWfyqrFUyLRgGK9w7A';

const SYSTEM = `És o assistente virtual da Clínica Santa Maria dos Olivais (Lisboa).
Respondes SEMPRE em português europeu (nunca brasileiro), de forma simpática, clara e profissional.
O teu nome é "Assistente Virtual — Clínica Santa Maria dos Olivais".

Saudação inicial obrigatória na PRIMEIRA mensagem: "Olá! 👋 Bem-vindo à Clínica Santa Maria dos Olivais. Sou o seu assistente virtual. Como posso ajudar?"

---

IDENTIDADE DA CLÍNICA

- Nome: Clínica Santa Maria dos Olivais
- Empresa: Sisos & Sorrisos Lda
- Morada: Estrada de Moscavide nº 32 C, 1800-279 Lisboa
- Metro: Estação Roma (Linha Amarela) — 2 minutos a pé
- Autocarro: Linhas 701, 717, 744 — Paragem Roma
- Estacionamento disponível nas ruas adjacentes
- Email: clinicasmod@gmail.com
- Marcações / Urgências 24h: 923 233 393
- Receção: 211 350 066
- WhatsApp: +351 919 861 310
- Marcar consulta online: https://tidycal.com/cofelipecifuentes/consulta
- Website: https://www.clinicadentariasantamariadosolivais.pt

---

MÉDICOS, ESPECIALIDADES E HORÁRIOS

Dra. Ana Mata
- Cargo: Diretora Clínica
- Especialidades: Implantologia, Medicina Dentária Geral, Facetas, Coroas, Reabilitação Oral
- NÃO realiza: Desvitalização/Endodontia
- Horário: 2ª e 6ª feira das 14h às 18h30 | 3ª e 5ª feira das 11h às 16h

Dra. Alexandra Lucas
- Especialidades: Periodontologia, Medicina Dentária Geral
- NÃO realiza: Desvitalização/Endodontia
- Horário: 3ª e 4ª feira

Dra. Mariana Aberto
- Especialidades: Ortodontia (adultos e crianças), Medicina Dentária Geral
- Horário: 4ª feira

Dra. Orizanda Claret
- Especialidades: Medicina Dentária Geral, Odontopediatria (crianças), Desvitalização/Endodontia
- Horário: 3ª feira

Dr. Francisco
- Especialidades: Medicina Dentária Geral, Desvitalização/Endodontia
- Horário: 5ª feira

Dra. Inês Gama
- Especialidades: Medicina Dentária Geral
- Horário: 6ª feira

Tomas Machado
- Especialidades: Medicina Dentária Geral, Desvitalização/Endodontia
- Horário: 2ª feira

Resumo de disponibilidade por dia:
- 2ª feira: Dra. Ana Mata (14h-18h30) + Tomas Machado (09h-18h)
- 3ª feira: Dra. Ana Mata (11h-16h) + Dra. Alexandra Lucas + Dra. Orizanda Claret
- 4ª feira: Dra. Alexandra Lucas + Dra. Mariana Aberto
- 5ª feira: Dra. Ana Mata (11h-16h) + Dr. Francisco
- 6ª feira: Dra. Ana Mata (14h-18h30) + Dra. Inês Gama

---

TABELA DE PREÇOS COMPLETA (preços atuais em vigor — sem duplicados)

ORTODONTIA:
- Consulta de Estudo Ortodôntico: 60€
- Aparelho Ortodôntico Fixo (por arcada): 450€
- Aparelho Contenção Fixo (por arcada): 150€
- Aparelho Contenção Removível (por arcada): 180€
- Aparelho Disjuntor: 480€
- Mantedor de Espaço: 130€
- Consulta de Manutenção Ortodôntica: 65€
- Invisalign: preço sob consulta
- Consulta de Manutenção Invisalign: 75€
- Retirar Aparelho Fora da Clínica: 100€

MEDICINA DENTÁRIA GERAL:
- Branqueamento Kit para Casa (completo): 150€
- Branqueamento Seringa para Kit: 25€
- Branqueamento em Consultório: 200€
- Cimentação de Coroa: 30€
- Cirurgia Remodelação Rebordo Alveolar (por quadrante): 60€
- Consulta Medicada: 20€
- Coroa Provisória: 70€
- Coroa Metalo-Cerâmica sobre dente: 550€
- Coroa Cerâmica / Zircónia sobre dente: 650€
- Curetagem (por quadrante): 70€
- Destartarização + Polimento: 40€
- Profilaxia: 30€
- Drenagem de Abcesso: 25€
- Desvitalização Incisivo / Canino / Pré-Molar: 180€
- Desvitalização Molar: 240€
- Extração Dente Incisivo: 30€
- Extração Dente Canino / Pré-Molar: 50€
- Extração Dente Molar: 50€
- Extração Dente Siso Erupcionado: 75€ a 200€
- Extração Dente Siso Incluso: 100€ a 200€
- Extração Dente Decíduo (dente de leite): 35€
- Pulpectomia + Restauração: 120€
- Pulpotomia + Restauração: 80€
- Enxerto Ósseo (Medicina Geral): 500€
- Porcelana: 450€
- Placa de Relaxamento / Bruxismo (por arcada): 180€
- Raio X Periapical: 10€
- Restauração Simples: 45€
- Restauração Complexa: 65€
- Restauração Estética: 75€
- Restauração Dente Decíduo: 45€
- Restauração Provisória: 25€
- Selante (por arcada): 40€
- Consulta de Observação Pós-Tratamento (exceto cirurgia): 5€

ESTÉTICA E FACETAS (preços atuais):
- Facetas 4 Dentes Anteriores (zona estética frontal): 1.800€
- Facetas 1 Arcada — 10 dentes até 2º pré-molar: 4.550€
- Facetas 2 Arcadas — 20 dentes: 6.500€

IMPLANTOLOGIA (preços atuais):
- Implante Unitário + Coroa Metalo-Cerâmica: 745€
- 2 Implantes: 1.400€
- 3 Implantes: 1.800€
- 4 Implantes: 2.300€
- Protocolo Superior — Arcada Completa (4 a 6 implantes + prótese fixa): 4.800€
- Protocolo Completo por Arcada (cirurgia + prótese fixa definitiva): 5.000€
- Coroa Cerâmica/Zircónia/Metalo-Cerâmica sobre implante (cirurgia noutra clínica): 650€
- Prótese Provisória Removível: 350€
- Prótese Provisória Fixa: 1.200€
- Enxerto Ósseo (Implantologia): a partir de 200€
- Limpeza Prótese Fixa sobre Implante (por arcada): 100€
- Aperto Coroa sobre Implante: 10€
- Recolocação Compósito Coroa: 10€

PRÓTESES REMOVÍVEIS — preço por número de dentes (Acrílica / Esquelética / Flexível):
- 1 dente: 180€ / 260€ / 310€
- 2 dentes: 190€ / 270€ / 320€
- 3 dentes: 220€ / 280€ / 330€
- 4 dentes: 230€ / 290€ / 340€
- 5 dentes: 240€ / 310€ / 350€
- 6 dentes: 250€ / 320€ / 360€
- 7 dentes: 260€ / 330€ / 370€
- 8 dentes: 270€ / 340€ / 380€
- 9 dentes: 280€ / 350€ / 390€
- 10 dentes: 290€ / 360€ / 400€
- 11 dentes: 300€ / 370€ / 410€
- 12 dentes: 310€ / 380€ / 420€
- 13 dentes: 320€ / 390€ / 430€
- 14 dentes: 330€ / 400€ / 440€

MANUTENÇÃO E REPARAÇÃO DE PRÓTESE:
- Ajuste de Prótese: 5€
- Conserto Prótese Acrílica: 60€
- Conserto Prótese Esquelética / Flexível: 100€
- Acrescento de dente em Prótese Acrílica: 60€ base (+10€ por dente adicional)
- Acrescento de dente em Prótese Flexível: 100€ base (+10€ por dente adicional)
- Rebase Prótese Acrílica: 60€
- Rebase Prótese Flexível: 100€

---

FLUXO DE MARCAÇÃO DE CONSULTA

Quando o utilizador quiser marcar consulta:
1. Pergunta qual o tratamento ou motivo da consulta
2. Indica o médico mais indicado e o horário disponível
3. Informa que pode marcar online em: https://tidycal.com/cofelipecifuentes/consulta
4. Ou por WhatsApp: +351 919 861 310
5. Informa que receberá email de confirmação automático com todos os detalhes

---

REGRAS DE COMPORTAMENTO — OBRIGATÓRIAS

1. NUNCA inventas preços. Se não souberes o preço exato diz: "Para um orçamento preciso, ligue para 923 233 393 ou marque uma consulta de avaliação em https://tidycal.com/cofelipecifuentes/consulta"

2. URGÊNCIAS — encaminha SEMPRE para: 923 233 393 (disponível 24 horas)

3. MARCAÇÕES — encaminha para:
   Online: https://tidycal.com/cofelipecifuentes/consulta
   WhatsApp: +351 919 861 310
   Telefone: 923 233 393

4. Quando perguntarem por tratamento específico, indica SEMPRE o médico mais indicado e o seu horário.

5. NUNCA dás diagnósticos médicos. Perante sintomas, recomendas sempre consulta presencial. Se urgência, encaminha para 923 233 393.

6. Português europeu SEMPRE. Usa "você", "telemóvel", "marcação", "consultório", nunca "celular", "agendamento", "consultório" em sentido brasileiro.

7. Nunca partilhas dados pessoais de pacientes.

8. Tom: profissional, empático, acolhedor. Respostas concisas (máximo 5 linhas por resposta). Usa emojis com moderação.

9. Se o utilizador escrever em inglês ou espanhol, respondes nessa língua mantendo os nomes dos tratamentos em português.

10. Quando não souberes responder a algo específico: "Para mais informações, contacte-nos pelo 923 233 393 ou envie mensagem pelo WhatsApp +351 919 861 310."`;

interface ChatbotProps {
  isOpen: boolean;
  onClose: () => void;
}

interface Msg {
  role: 'user' | 'assistant';
  text: string;
}

const Chatbot: React.FC<ChatbotProps> = ({ isOpen, onClose }) => {
  const [msgs, setMsgs] = useState<Msg[]>([{ role: 'assistant', text: 'Olá! 👋 Bem-vindo à Clínica Santa Maria dos Olivais. Como posso ajudar?' }]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => { endRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [msgs]);

  const send = async (text: string) => {
    if (!text.trim() || loading) return;
    const userMsg = text.trim();
    setInput('');
    setMsgs(p => [...p, { role: 'user', text: userMsg }]);
    setLoading(true);
    try {
      const contents = msgs.map(m => ({ role: m.role === 'assistant' ? 'model' : 'user', parts: [{ text: m.text }] }));
      contents.push({ role: 'user', parts: [{ text: userMsg }] });
      const r = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${API_KEY}`, {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ system_instruction: { parts: [{ text: SYSTEM }] }, contents, generationConfig: { maxOutputTokens: 400, temperature: 0.7 } })
      });
      const d = await r.json();
      const reply = d.candidates?.[0]?.content?.parts?.[0]?.text || 'Desculpe, não consegui responder. Ligue 923 233 393.';
      setMsgs(p => [...p, { role: 'assistant', text: reply }]);
    } catch { setMsgs(p => [...p, { role: 'assistant', text: 'Erro de ligação. Contacte-nos: 923 233 393.' }]); }
    setLoading(false);
  };

  const S: Record<string, React.CSSProperties> = {
    win: { position:'fixed', bottom:96, right:24, zIndex:9998, width:340, height:500, background:'#fff', borderRadius:20, boxShadow:'0 8px 40px rgba(0,0,0,.18)', display:'flex', flexDirection:'column', overflow:'hidden', border:'1px solid #e2e8f0' },
    hdr: { background:'linear-gradient(135deg,#1d4ed8,#1e40af)', color:'#fff', padding:'14px 16px', display:'flex', alignItems:'center', gap:10 },
    msgs: { flex:1, overflowY:'auto', padding:14, display:'flex', flexDirection:'column', gap:10, background:'#f8fafc' },
    uBubble: { alignSelf:'flex-end', background:'#1d4ed8', color:'#fff', padding:'9px 14px', borderRadius:18, borderBottomRightRadius:4, fontSize:13, maxWidth:'80%', lineHeight:1.5, whiteSpace:'pre-wrap' },
    aBubble: { alignSelf:'flex-start', background:'#fff', color:'#1e293b', padding:'9px 14px', borderRadius:18, borderBottomLeftRadius:4, fontSize:13, maxWidth:'80%', lineHeight:1.5, whiteSpace:'pre-wrap', boxShadow:'0 1px 4px rgba(0,0,0,.08)' },
    inp: { display:'flex', gap:8, padding:'10px 12px', borderTop:'1px solid #e2e8f0', background:'#fff' },
    input: { flex:1, border:'1.5px solid #e2e8f0', borderRadius:24, padding:'8px 14px', fontSize:13, outline:'none', fontFamily:'inherit' },
    sendBtn: { background:'#1d4ed8', color:'#fff', border:'none', borderRadius:'50%', width:38, height:38, cursor:'pointer', fontSize:16, display:'flex', alignItems:'center', justifyContent:'center' },
    quickRow: { display:'flex', flexWrap:'wrap' as const, gap:6, padding:'0 14px 10px' },
    qBtn: { background:'#eff6ff', border:'1px solid #bfdbfe', color:'#1d4ed8', borderRadius:14, padding:'5px 10px', fontSize:11, cursor:'pointer' },
    dots: { display:'flex', gap:4, padding:'10px 14px', background:'#fff', borderRadius:18, borderBottomLeftRadius:4, boxShadow:'0 1px 4px rgba(0,0,0,.08)', alignSelf:'flex-start' as const },
  };

  const quick = [['💰','Preços'],['📅','Marcar consulta'],['🚨','Urgência'],['📍','Localização'],['🦷','Implantes'],['😁','Ortodontia']];

  return (
    <>
      {isOpen && (
        <div style={S.win}>
          <div style={S.hdr}>
            <span style={{ fontSize:24 }}>🦷</span>
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight:700, fontSize:14 }}>Assistente Virtual</div>
              <div style={{ fontSize:11, opacity:.8 }}>● Clínica Santa Maria dos Olivais</div>
            </div>
            <button onClick={onClose} style={{ background: 'none', border: 'none', color: '#fff', cursor: 'pointer', fontSize: 18 }}>✕</button>
          </div>
          <div style={S.msgs}>
            {msgs.map((m, i) => <div key={i} style={m.role === 'user' ? S.uBubble : S.aBubble}>{m.text}</div>)}
            {loading && <div style={S.dots}>{[0,150,300].map(d => <span key={d} style={{ width:8, height:8, background:'#94a3b8', borderRadius:'50%', display:'inline-block', animation:`bounce 1s ${d}ms infinite` }} />)}</div>}
            <div ref={endRef} />
          </div>
          <div style={S.quickRow}>
            {quick.map(([e, t]) => <button key={t} style={S.qBtn} onClick={() => send(`${e} ${t}`)}>{e} {t}</button>)}
          </div>
          <div style={S.inp}>
            <input style={S.input} value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => e.key === 'Enter' && send(input)} placeholder="Escreva a sua mensagem..." disabled={loading} />
            <button style={S.sendBtn} onClick={() => send(input)} disabled={loading || !input.trim()}>➤</button>
          </div>
        </div>
      )}
      <style>{`@keyframes bounce{0%,60%,100%{transform:translateY(0)}30%{transform:translateY(-5px)}}`}</style>
    </>
  );
};

export default Chatbot;
