import { booksHandler } from "./booksHandler.js";
import { usersHandler } from "./usersHandler.js";
import { defaultHandler } from "./defaultHandler.js";

export const mainHandler = (req, res) => {

    const url = req.url;
    //console.log(`url = ${url}`);

    if (url.startsWith('/api')) {
        if (url.startsWith('/api/books')) 
        {
            return booksHandler(req, res);
        }
        
        if (url.startsWith('/api/users'))
        {
            return usersHandler(req, res);
        }
    } 
    
    return defaultHandler(req, res);  
};





















// тело функции callback в изначальном варианте из первой лекции
// (req, res) => {

//     //console.log('req.headers:', req.headers);
//     console.log('Request detected! '+'method '+ req.method + ' url '+ req.url);


//     : 'text/html', //'application/json'
//           'My-Custom-Header-89': 'My Custom Header Value'
//         })res.writeHead(200, 
//         { 'Content-Type';

//     res.end (
//         `<b>Hello from Nodejs server</b>
//         <form action='/some/endpoint'>
//         <span>Enter your name:</span>
//         <input type="text" name="username"></input>
//         <button type="submit">send</button>
//         </form>`
// );

//     // res.end(JSON.stringify({
//     // data: 'Hello World!',
//     // }));
// };