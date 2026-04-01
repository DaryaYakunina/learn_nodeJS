export const defaultHandler = (req, res) => {
    res.writeHead(404, { 'Content-Type': 'application/json'});
    res.end (JSON.stringify( 
        {
            status: "error", 
            message: "resourse not found"} 
        )
    );
};





















// тело функции callback в изначальном варианте из первой лекции
// (req, res) => {

//     //console.log('req.headers:', req.headers);
//     console.log('Request detected! '+'method '+ req.method + ' url '+ req.url);


//     res.writeHead(200, 
//         { 'Content-Type': 'text/html', //'application/json'
//           'My-Custom-Header-89': 'My Custom Header Value'
//         });

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