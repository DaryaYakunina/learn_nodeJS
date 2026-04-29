import DataSource from "./dataSource.js";

const dataSource = new DataSource('db/database.json');

export const booksHandler = (req, res) => {

    const {method, url} = req; //это то же самое, что const method = req.method; const url = req.url;
    
    console.log("url = ", url);

    const urlSplitted = url.split('?'); // отсекаем в url части до знака вопроса и после
    const urlString = urlSplitted[0];
    const queryString = urlSplitted[1]; //FIXME:

    const urlArr = urlString.split('/'); // разбиваем url на составляющие между слэшами

    console.log("urlArr = ", urlArr, urlArr.length);
    console.log ('METHOD = ', method);

    let id = 0;
    if (urlArr.length === 4) {
        id = +urlArr[urlArr.length-1]; //FIXME:
    }

    let re = null;
    let bodyText = '';

    switch (method) {
    case 'POST':
        bodyText = '';

        req.on('data', (chunk) => {
            console.log('Body data chunk detected!');
            bodyText += chunk;
        }); // метод on означает - "при наступлении какого-то события", data - название события, которое прослушиваем
            // chunk - это частичка данных
            // при большом объеме данных это событие on наступает несколько раз до тех пор, пока не придет событие end

        req.on('end', () => {
            try {

                console.log('Body end detected! bodyText = ', bodyText);
                const body = JSON.parse(bodyText); // так как изначально в запросе данные мы посылаем в формате JSON, а в create должен передаваться 
                                                    // объект, мы сначала вызываем parse для данных, а результат метода create превращаем обратно в json
                re = JSON.stringify(dataSource.create(body));
                res.writeHead(201, { 'Content-Type': 'application/json'}); // 201 указываем, когда чего-то создаем
                res.end (re);
            } catch(e) {
                res.writeHead(500, { 'Content-Type': 'application/json'});
                res.end (JSON.stringify( 
                    {
                        status: "error", 
                        message: e.toString()
                    }));
            }
         });

        //с появлением обработчиков событий data и end код данного case начал выполняться ассинхронно, поэтому чтобы
        //передать в create полный body, данный кусок кода был перенесен в обработчик события end
        // const body = {};
        // re = JSON.stringify(dataSource.create(body));
        // res.writeHead(201, { 'Content-Type': 'application/json'}); // 201 указываем, когда чего-то создаем
        // res.end (re);
        // return;

        return;
    case 'GET':
        if (id) {
            re = JSON.stringify(dataSource.getOne(id));
            res.writeHead(200, { 'Content-Type': 'application/json'}); // 200 указываем, когда ничего нового не создаем
            res.end (re);
        } else {
            re = JSON.stringify(dataSource.getAll());
            res.writeHead(200, { 'Content-Type': 'application/json'}); // 200 указываем, когда ничего нового не создаем
            res.end (re);
        }
        return;
    case 'PATCH':
    case 'PUT':
        bodyText = '';
        
        req.on('data', (chunk) => {
            console.log('Body data chunk detected!');
            bodyText += chunk;
        }); // метод on означает - "при наступлении какого-то события", data - название события, которое прослушиваем
            // chunk - это частичка данных
            // при большом объеме данных это событие on наступает несколько раз до тех пор, пока не придет событие end

        req.on('end', () => {
            try {
                console.log('Body end detected! bodyText = ', bodyText);
                const body = JSON.parse(bodyText); // так как изначально в запросе данные мы посылаем в формате JSON, а в create должен передаваться 
                                                    // объект, мы сначала вызываем parse для данных, а результат метода create превращаем обратно в json
                dataSource.update(id, body);
                re = JSON.stringify(dataSource.getOne(id));
                res.writeHead(200, { 'Content-Type': 'application/json'}); // 201 указываем, когда чего-то создаем
                res.end (re);
            } catch(e) {
                res.writeHead(500, { 'Content-Type': 'application/json'});
                res.end (JSON.stringify( 
                    {
                        status: "error", 
                        message: e.toString()
                    }));
            }
        });

        return;
    case 'DELETE':
        dataSource.delete(id);
        res.writeHead(204); // заголовки вторым параметром не выставляем, потому что в запросе delete нет контента
        res.end (null);
        return;
    }
    
    res.writeHead(501, { 'Content-Type': 'application/json'});
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