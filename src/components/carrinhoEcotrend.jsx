import React, { useState, useEffect } from 'react';

export default function CarrinhoEcoTrend({ carrinho, setCarrinho, isOpen, onClose }) {
  const [carregando, setCarregando] = useState(false);
  const [mensagemSucesso, setMensagemSucesso] = useState('');

  useEffect(() => {
    const dadosLocais = localStorage.getItem('ecotrend_cart');
    if (dadosLocais) setCarrinho(JSON.parse(dadosLocais));
  }, [setCarrinho]);

  useEffect(() => {
    localStorage.setItem('ecotrend_cart', JSON.stringify(carrinho));
  }, [carrinho]);

  const removerDoCarrinho = (id) => {
    setCarrinho(carrinho.filter(item => item.id !== id));
  };

  const calcularTotal = () => {
    return carrinho.reduce((total, p) => total + (p.preco * p.quantidade), 0).toFixed(2);
  };

  const finalizarCompraCheckout = async () => {
    if (carrinho.length === 0) return;

    setCarregando(true);
    setMensagemSucesso('');

    try {
      const resposta = await fetch('https://typicode.com', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          pedido: carrinho,
          totalPago: calcularTotal(),
          data: new Date().toLocaleDateString('pt-BR')
        })
      });

      const dadosServidor = await resposta.json();
      console.log('[API] Resposta recebida:', dadosServidor);

      if (resposta.ok) {
        setMensagemSucesso("Sua compra foi processada com sucesso!");
        setCarrinho([]); 
      } else {
        throw new Error("Erro na comunicação com a API.");
      }
    } catch (erro) {
      alert(`Falha no Checkout: ${erro.message}`);
    } finally {
      setCarregando(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div style={styles.sidebarOverlay}>
      <div style={styles.sidebarContainer}>
        <div style={styles.header}>
          <h3>Sacola ecotrend</h3>
          <button onClick={onClose} style={styles.botaoFechar}>X</button>
        </div>

        {mensagemSucesso ? (
          <div style={styles.sucessoWrapper}>
            <p>{mensagemSucesso}</p>
          </div>
        ) : (
          <>
            <div style={styles.corpoCarrinho}>
              {carrinho.length === 0 ? (
                <div style={styles.carrinhoVazio}>
                  <p>Seu carrinho está limpo. Adicione produtos saudáveis.</p>
                </div>
              ) : (
                carrinho.map((item) => (
                  <div key={item.id} style={styles.cardItem}>
                    <div>
                      <h4>{item.nome}</h4>
                      <p style={styles.subtext}>Qtd: {item.quantidade} x R$ {item.preco.toFixed(2)}</p>
                    </div>
                    <button onClick={() => removerDoCarrinho(item.id)} style={styles.botaoLixeira}>
                      Remover
                    </button>
                  </div>
                ))
              )}
            </div>

            {carrinho.length > 0 && (
              <div style={styles.footer}>
                <div style={styles.totalRow}>
                  <span>Subtotal:</span>
                  <strong>R$ {calcularTotal()}</strong>
                </div>

                {carregando ? (
                  <div style={styles.spinnerArea}>
                    <p>Comunicando com a API...</p>
                  </div>
                ) : (
                  <button onClick={finalizarCompraCheckout} style={styles.botaoFinalizar}>
                    Concluir Pedido Verde
                  </button>
                )}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

const styles = {
  sidebarOverlay: { position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.4)', display: 'flex', justifyContent: 'flex-end', zIndex: 9999 },
  sidebarContainer: { width: '380px', height: '100%', backgroundColor: '#ffffff', padding: '24px', display: 'flex', flexDirection: 'column', boxSizing: 'border-box', fontFamily: 'sans-serif' },
 
  header: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #eaeaea', paddingBottom: '16px' },
  botaoFechar: { background: 'none', border: 'none', fontSize: '18px', cursor: 'pointer', color: '#888' },
 
  corpoCarrinho: { flex: 1, overflowY: 'auto', padding: '16px 0' },
  carrinhoVazio: { textAlign: 'center', color: '#777', marginTop: '50px', fontSize: '14px', lineHeight: '1.6' },
  
  cardItem: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px', borderBottom: '1px solid #f5f5f5' },
  subtext: { margin: '4px 0 0 0', color: '#666', fontSize: '13px' },
  botaoLixeira: { backgroundColor: 'transparent', border: 'none', cursor: 'pointer', fontSize: '14px', color: '#e53935' },
  
  footer: { borderTop: '1px solid #eaeaea', paddingTop: '16px' },
  totalRow: { display: 'flex', justifyContent: 'space-between', marginBottom: '16px', fontSize: '16px' },
  
  botaoFinalizar: { width: '100%', backgroundColor: '#2e7d32', color: '#fff', border: 'none', padding: '14px', borderRadius: '6px', fontSize: '15px', fontWeight: 'bold', cursor: 'pointer' },
  sucessoWrapper: { textAlign: 'center', color: '#2e7d32', padding: '40px 10px', fontSize: '16px', fontWeight: '500', lineHeight: '1.5' },
  spinnerArea: { textAlign: 'center', color: '#555', fontSize: '13px', padding: '10px' }
};
