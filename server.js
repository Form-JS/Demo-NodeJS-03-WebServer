const http = require('http');
const { URL, URLSearchParams } = require('url');

// Génération d'un objet "server"
const server = http.createServer((request, response) => {
    // Ce callback se lance a chaque requete recu
    console.log('Requete recu !');

    // Analyse de l'IncomingMessage (Requete recu)
    console.log(`Info de la requete : ${request.method} ${request.url}`);

    // Parcours des informations contenu dans l'url
    const urlParse = new URL(request.url, `http://${request.headers.host}`);
    const urlInfo = new URLSearchParams(urlParse.searchParams);
    console.log(urlInfo);

    const firstname = urlInfo.get('firstname');
    const age = urlInfo.get('age') !== null ? parseInt(urlInfo.get('age')) : null;

    // Exemple de rendu (sans utiliser de moteur de template!)
    const page = `<!DOCTYPE html>
    <html lang="fr">
    <head>
        <title>Demo WebServer</title>
        <meta charset="utf-8">
    </head>
    <body>
        <h1>Hello World ♥</h1>
        <p>Ceci est une demo!</p>
        <h2>Les parametres</h2>
        <ul>
            <li>Firstname : ${firstname}</li>
            <li>Age: ${age}</li>
        </ul>
    </body>
    </html>
    `;

    // Création de la reponse
    // - Définition header
    response.writeHead(200, { "Content-Type": "text/html" });
    // - Définition du contenu
    response.write(page);
    // - Envoi de la réponse
    response.end();
});

// Lancement du serveur sur le port "1234"
server.listen(1234, () => {
    console.log('Server start on port 1234');
});