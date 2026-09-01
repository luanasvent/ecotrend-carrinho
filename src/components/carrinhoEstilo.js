export const styles = {
  sidebarOverlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.4)',
    display: 'flex',
    justifyContent: 'flex-end',
    zIndex: 9999
  },
  sidebarContainer: {
    width: '380px',
    height: '100%',
    backgroundColor: '#ffffff',
    padding: '24px',
    display: 'flex',
    flexDirection: 'column',
    boxSizing: 'border-box',
    fontFamily: 'sans-serif'
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottom: '1px solid #eaeaea',
    paddingBottom: '16px'
  },
  botaoFechar: {
    background: 'none',
    border: 'none',
    fontSize: '18px',
    cursor: 'pointer',
    color: '#888'
  },
  corpoCarrinho: {
    flex: 1,
    overflowY: 'auto',
    padding: '16px 0'
  },
  carrinhoVazio: {
    textAlign: 'center',
    color: '#777',
    marginTop: '50px',
    fontSize: '14px',
    lineHeight: '1.6'
  },
  cardItem: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '12px',
    borderBottom: '1px solid #f5f5f5'
  },
  subtext: {
    margin: '4px 0 0 0',
    color: '#666',
    fontSize: '13px'
  },
  botaoLixeira: {
    backgroundColor: 'transparent',
    border: 'none',
    cursor: 'pointer',
    fontSize: '14px',
    color: '#e53935'
  },
  footer: {
    borderTop: '1px solid #eaeaea',
    paddingTop: '16px'
  },
  totalRow: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '16px',
    fontSize: '16px'
  },
  botaoFinalizar: {
    width: '100%',
    backgroundColor: '#2e7d32',
    color: '#fff',
    border: 'none',
    padding: '14px',
    borderRadius: '6px',
    fontSize: '15px',
    fontWeight: 'bold',
    cursor: 'pointer'
  },
  sucessoWrapper: {
    textAlign: 'center',
    color: '#2e7d32',
    padding: '40px 10px',
    fontSize: '16px',
    fontWeight: '500',
    lineHeight: '1.5'
  },
  spinnerArea: {
    textAlign: 'center',
    color: '#555',
    fontSize: '13px',
    padding: '10px'
  }
};
