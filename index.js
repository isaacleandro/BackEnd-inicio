
const http = require('http');

const PORT = 3000;

const requestHandler = (req, res) => {
    res.setHeader('Content-Type', 'application/json');

    const url = req.url.split('?')[0];

    if (url === '/cars' && req.method === 'GET') {
        const cars = [
            { id: 1, brand: 'BMW', model: 'X5' },
            { id: 2, brand: 'Audi', model: 'Q7' },
            { id: 3, brand: 'Monza', model: 'SLE' }
        ]

        let response;

        if (Boolean(req.url.split('?')[1])) {
            const idParam = req.url.split('?')[1];

            idTofind = Number(idParam.split('=')[1]);

            response = cars.find(car => car.id === idTofind);
        } else {
            response = cars;
        }

        res.writeHead(200);
        res.end(JSON.stringify(response));

    } else if (req.url === '/api' && req.method === 'POST') {
        let body = '';

        req.on('data', chunk => {
            body += chunk.toString();
        });

        req.on('end', () => {
            const data = JSON.parse(body);

            const response = {
                message: 'Data received sucessfully',
                data: data,
                timestamp: new Date().toISOString()
            }; ''

            res.writeHead(200);
            res.end(JSON.stringify(response));
        })

    } else {
        res.writeHead(404);
        res.end(JSON.stringify({ error: 'Not found' }));
    }
};

const server = http.createServer(requestHandler);
server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

//Split = quebra uma string transformando em um inteiro ou um array

//Some = verifica se pelo menos um
//Filter = mostra todos
//Find = mostra apenas um
//Every = verifica se todos sao true ou false
//Reduce = acumula que for sendo verificado
//Map = transforma em outro array ou modifica 
//Sort = ordena

