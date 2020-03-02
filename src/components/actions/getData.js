let getData = async ()=> {
    return new Promise(function (resolve, reject) {
        const req = new XMLHttpRequest();
        req.open('GET', 'http://localhost:3000/products');
    
        req.onload = async () => {
            if (req.status === 200) {
                resolve({
                    items: await JSON.parse(req.responseText),
                    addedItems: [],
                    total: 0
                });
            } else {
                reject(Error(req.statusText));
            }
        }
    
        // Handle network errors
        req.onerror = function () {
            reject(Error("Network Error"));
        };
    
        // Make the request
        req.send();
    });
};

export default new Promise(async $export => {
const resposta = await getData();
$export(
    {my: resposta});
});