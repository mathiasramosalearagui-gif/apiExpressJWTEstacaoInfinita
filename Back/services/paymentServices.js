import { MercadoPagoConfig, Preference } from 'mercadopago';

// Lê o token que vocês salvaram no arquivo .env
const client = new MercadoPagoConfig({ 
  accessToken: process.env.MERCADOPAGO_ACCESS_TOKEN 
});

export const criarPreferenciaPagamento = async (carrinho) => {
  const preference = new Preference(client);

  const resultado = await preference.create({
    body: {
      items: carrinho.map(item => ({
        id: item.id,
        title: item.nome,
        quantity: Number(item.quantidade),
        unit_price: Number(item.preco),
        currency_id: 'BRL'
      })),
      back_urls: {
        success: 'http://localhost:8080/sucesso', // URL padrão do Front em React (Vite)
        failure: 'http://localhost:8080/erro',
        pending: 'http://localhost:8080/pendente'
      },
      auto_return: 'approved',
    }
  });

  return resultado.id; // Retorna o ID da comanda gerada
};
