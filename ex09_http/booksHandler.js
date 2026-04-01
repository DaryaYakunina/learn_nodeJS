export const booksHandler = (req, res) => {

    const {method, url} = req; //это то же самое, что const method = req.method; const url = req.url;
    
    console.log("url = ", url);

    const urlSplitted = url.split('?'); // отсекаем в url части до знака вопроса и после
    const urlString = urlSplitted[0];
    const queryString = urlSplitted[1]; //FIXME:

    const urlArr = urlString.split('/'); // разбиваем url на составляющие между слэшами

    console.log("urlArr = ", urlArr, urlArr.length);

    let id = 0;
    if (urlArr.length === 4) {
        id = +urlArr[urlArr.length-1]; //FIXME:
    }

    switch (method){
        case 'POST':
            res.writeHead(201, { 'Content-Type': 'application/json'}); // 201 указываем, когда чего-то создаем
            res.end (`
                {
                    "id": 1,
                    "name": "Преступление и наказание",
                    "author": "Ф.М. Достоевский",
                    "description": "«Преступление и наказание» Ф.М. Достоевского — это психологический и философский роман о бедном студенте Родионе Раскольникове, который убивает старуху-процентщицу, чтобы проверить свою теорию о разделении людей на «право имеющих» (Наполеонов) и «тварей дрожащих». "
                }`
            );
            return;
        case 'GET':

            if (id) {
                res.writeHead(200, { 'Content-Type': 'application/json'}); // 200 указываем, когда ничего нового не создаем
                res.end (`
                    {
                        "id": 123,
                        "name": "Преступление и наказание",
                        "author": "Ф.М. Достоевский",
                        "description": "«Преступление и наказание» Ф.М. Достоевского — это психологический и философский роман о бедном студенте Родионе Раскольникове, который убивает старуху-процентщицу, чтобы проверить свою теорию о разделении людей на «право имеющих» (Наполеонов) и «тварей дрожащих». "
                    }`
                );
            } else {
                res.writeHead(200, { 'Content-Type': 'application/json'}); // 200 указываем, когда ничего нового не создаем
                res.end (`
                    [{
                        "id": 1,
                        "name": "Преступление и наказание",
                        "author": "Ф.М. Достоевский",
                        "description": "«Преступление и наказание» Ф.М. Достоевского — это психологический и философский роман о бедном студенте Родионе Раскольникове, который убивает старуху-процентщицу, чтобы проверить свою теорию о разделении людей на «право имеющих» (Наполеонов) и «тварей дрожащих». "
                    }]`
                );
            }
            return;
        case 'PATCH':
        case 'PUT':

            res.writeHead(200, { 'Content-Type': 'application/json'}); 
            res.end (`
                {
                    "id": 1,
                    "name": "Преступление и наказание...",
                    "author": "Ф.М. Достоевский",
                    "description": "«Преступление и наказание» Ф.М. Достоевского — это психологический и философский роман о бедном студенте Родионе Раскольникове, который убивает старуху-процентщицу, чтобы проверить свою теорию о разделении людей на «право имеющих» (Наполеонов) и «тварей дрожащих». "
                }`
            );
            return;
        case 'DELETE':
            res.writeHead(204); // заголовки вторым параметром не выставляем, потому что в запросе delete нет контента
            res.end (null);
            return;
    }
    
    res.writeHead(500, { 'Content-Type': 'application/json'});
    res.end (JSON.stringify( 
        {
            status: "error", 
            message: "method not implemented!"} 
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