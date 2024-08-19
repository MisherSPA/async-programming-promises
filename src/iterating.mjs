import setText , {appendText} from './results.mjs';

export async function get(){
    const response = await axios.get('http://localhost:3000/orders/1');
    const data = JSON.stringify(response.data);
    setText(data);
}

export async function getCatch(){
    try{
        const response = await axios.get('http://localhost:3000/orders/123');
        const data = JSON.stringify(response.data);
        setText(data);
    }catch(error){
        setText(error);
    }
    
}

export async function chain(){
    const {data} = await axios.get("http://localhost:3000/orders/1");
    const {data: addresses} = await axios.get(`http://localhost:3000/addresses/${data.shippingAddress}`);
    
    setText(`City: ${JSON.stringify(addresses.city)}`)
}

export async function concurrent(){
    const orderStatus = axios.get("http://localhost:3000/orderStatuses");
    const orders = axios.get("http://localhost:3000/orders");
    setText("");
    const {data: statuses} = await orderStatus;
    const {data: order} = await orders;
    
    appendText(JSON.stringify(statuses));
    appendText(JSON.stringify(order[0]))
}

export async function parallel(){
    setText("");
    await Promise.all([
        (async ()=>{
            const {data} = await axios.get("http://localhost:3000/orderStatuses");
            appendText(JSON.stringify(data));
        })(),
        (async ()=>{
            const {data} = await axios.get("http://localhost:3000/orders");
            appendText(JSON.stringify(data));
        })()

    ]);
}