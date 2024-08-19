import setText, {appendText, showWaiting, hideWaiting} from "./results.mjs";

export function get() {
    axios.get('http://localhost:3000/orders/1')
    .then(response => {
        setText(JSON.stringify(response));
    });
}

export function getCatch() {
    axios.get('http://localhost:3000/orders/1')
    .then(response => {
        setText(response.data);
    }).catch(error => {
        setText(error);
    });
}

export function chain() {
    axios.get("http://localhost:3000/orders/1").then(({data})=>{
        return axios.get("http://localhost:3000/addresses/${data.shippingAddress}");
    })
    .then(({data})=>{
        setText(`City: ${data.city}`);
    });
}

export function chainCatch() {
    axios.get("http://localhost:3000/orders/1").then(({data})=>{
        return axios.get("http://localhost:3000/addresses/${data.shippingAddress}");
    })
    .then(({data})=>{
        setText(`City: ${data.my.city}`);
    })
    .catch(error => setText(error));
}

export function final() {
    showWaiting();
    axios.get("http://localhost:3000/orders/1")
    .then(({data})=>{
        return axios.get("http://localhost:3000/addresses/${data.shippingAddress}");
    })
    .then(({data})=>{
        setText(`City: ${data.my.city}`);
    })
    .catch(error => setText(error))
    .finally(hideWaiting);
}