let baseURL = import.meta.env.VITE_SERVER_URL;

if (baseURL.slice(-1) !== '/') {
  baseURL += '/';
}
function convertToJson(res) {
  if (res.ok) {
    return res.json();
  } else {
    throw { name: 'servicesError', message: res.JSON };
  }
}

export async function getProductsByCategory(category) {
  if (sessionStorage.getItem('userSearch') === 'true') {
    let tents_request = await fetch(baseURL + `/products/search/tents`);
    let sleeping_bags_request = await fetch(baseURL + `/products/search/sleeping-bags`);
    let backpacks_request = await fetch(baseURL + `/products/search/backpacks`);
    let hammocks_request = await fetch(baseURL + `/products/search/hammocks`);

    let tents = await convertToJson(tents_request);
    let sleeping_bags = await convertToJson(sleeping_bags_request);
    let backpacks = await convertToJson(backpacks_request);
    let hammocks = await convertToJson(hammocks_request);

    const combinedArray = [...tents.Result, ...sleeping_bags.Result, ...backpacks.Result, ...hammocks.Result];

    return combinedArray;

  } else {
    const response = await fetch(baseURL + `products/search/${category}`);
    const data = await convertToJson(response);
    return data.Result;
  }

}


export async function getProductById(id) {
  const response = await fetch(baseURL + `product/${id}`);
  const product = await convertToJson(response);
  return product.Result;
}

export async function findCategoryById(id) {
  const response = await fetch(baseURL + `product/${id}`);
  const product = await convertToJson(response);
  return product.Result.Category;
}

export async function checkout(payload) {
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  };
  return await fetch(baseURL + "checkout/", options).then(convertToJson);
}

export async function loginRequest(creds){
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(creds),
  };
  const response =  await fetch(baseURL + "/login", options).then(convertToJson);
  return response.Result;
}

export async function getOrders(token){
  const options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      'Authorization': `Bearer ${token}`
    } 
    
  };
  const response =  await fetch(baseURL + "/orders", options).then(convertToJson);
  return response.Result;
}