import setText, { appendText } from "./results.mjs";

export function timeout(){
    const wait = new Promise((resolve)=>{
        setTimeout(()=>{
            resolve("Hello");
        }, 1000);
    });
    wait.then(data => setText(data));
}

export function interval(){
    let counter = 0;
    const wait = new Promise((resolve)=>{
        setInterval(()=>{
            console.log(counter);
            resolve(`Counter: ${++counter}`);
        }, 1000);
    });
    wait.then(data => setText(data))
    .finally(()=>{
        appendText(` -- Done ${counter}`);
    });
}

export function clearIntervalChain(){
    let counter = 0;
    let interval;
    const wait = new Promise((resolve)=>{
       interval = setInterval(()=>{
            console.log(counter);
            resolve(`Counter: ${++counter}`);
        }, 1000);
    });
    wait.then(data => setText(data))
    .finally(()=>{
        clearInterval(interval);
    });
}

export function xhr(){
    let request = new Promise((resolve,reject)=>{
        let xhr = new XMLHttpRequest();
        xhr.open("GET", "http://localhost:3000/users/7");
        xhr.withCredentials = false;
        xhr.onload = function(){
            if(xhr.status === 200){
                resolve(xhr.responseText);
            }else{
                reject(xhr.statusText);
            }
            
        };
        xhr.onerror = ()=>{
            reject("Failed");
        }
        xhr.send();
    });
    request.then(data => setText(data))
    .catch(error => setText(error));

}

export function allPromises(){
    const categories = axios.get("http://localhost:3000/itemCategories");
    const statuses = axios.get("http://localhost:3000/orderStatuses");
    const userTypes = axios.get("http://localhost:3000/userTypes")
    const addresses = axios.get("http://localhost:3000/addressesTypes");

    Promise.all([categories, statuses, userTypes, addresses])
    .then(([categories, statuses, userTypes, addresses])=>{
        setText(`Categories: ${categories.data.length}, Statuses: ${statuses.data.length}, User Types: ${userTypes.data.length}, Addresses: ${addresses.data.length}`);
    })
    .catch(error => setText(error));
}

export function allSettled(){
    const categories = axios.get("http://localhost:3000/itemCategories");
    const statuses = axios.get("http://localhost:3000/orderStatuses");
    const userTypes = axios.get("http://localhost:3000/userTypes")
    const addresses = axios.get("http://localhost:3000/addressesTypes");

    Promise.allSettled([categories, statuses, userTypes, addresses])
    .then((values)=>{
        let results = values.map(v => {
            if(v.status === "fulfilled"){
                return `Fullfilled: ${JSON.stringify(v.value.data[0])} `;
            }
            return `Rejected: ${v.reason.message} `;
        });
        setText(results);
    })
    .catch(reasons => setText(reasons));
}

export function race(){
    const users = axios.get("http://localhost:3000/users");
    const backup = axios.get("http://localhost:3001/users");

    Promise.race([users, backup])
    .then(users =>{
        setText(`Users: ${users.data}`);
    })
    .catch(error => setText(error));
}