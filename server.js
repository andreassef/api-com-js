const http = require('http'); // com o modulo http do nodejs conseguimos fazer requisições http
const app = require('./src/config/custom-express'); // estamos trazendo as funcionalidades do modulo que criamos.

app.listen(3000, function(){ // aqui setamos a porta que servirá como nosso servidor e retornando um callback
    console.log("Servidor rodando na porta 3000");
});




// app.get('/livros', function(req, resp) {
//     resp.send(
//         `
//             <html>
//                 <head>
//                     <meta charset="utf-8">
//                 </head>
//                 <body>
//                     <h1> Listagem de livros </h1>
//                 </body> 
//             </html>
//         `
//     );
// });
// app.get('/', function(req, resp) {
//     resp.send(
//         `
//         <html>
//         <head>
//         <meta charset="utf-8">
//         </head>
//         <body>
//         <h1> Casa do Código </h1>
//         </body> 
//         </html>
//         `
//         );
//     });
    

// const servidor = http.createServer(function(req, resp){

//     let html = '';

//     if (req.url == '/') {
//         html = `
//         <html>
//             <head>
//                 <meta charset="utf-8">
//             </head>
//             <body>
//                 <h1> Casa do Código </h1>
//             </body> 
//         </html>`
//     } else if (req.url == '/livros')
//         html = `
//         <html>
//             <head>
//                 <meta charset="utf-8">
//             </head>
//             <body>
//                 <h1> Listagem de livros </h1>
//             </body> 
//         </html>
//         `;

//     resp.end(html);
// });
// servidor.listen(3000);

