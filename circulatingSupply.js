// Ce handler est la fonction principale que Vercel va exécuter.
export default async function handler(request, response) {
  try {
    // 1. On appelle l'API de CoinGecko pour récupérer les données de Jokinthebox.
    const coingeckoResponse = await fetch('https://api.coingecko.com/api/v3/coins/jokinthebox');
    const data = await coingeckoResponse.json();

    // 2. On extrait la valeur de l'offre en circulation.
    const circulatingSupply = data.market_data.circulating_supply;

    // 3. On configure la réponse pour qu'elle soit du texte brut.
    response.setHeader('Content-Type', 'text/plain');

    // 4. On envoie la valeur numérique comme réponse, et c'est tout.
    response.status(200).send(String(circulatingSupply));

  } catch (error) {
    // En cas d'erreur, on envoie un message clair.
    response.status(500).send('Error fetching data from CoinGecko API');
  }
}