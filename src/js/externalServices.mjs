const baseURL = import.meta.env.VITE_SERVER_URL;
function convertToJson(res) {
  if (res.ok) {
    return res.json();
  } else {
    throw { name: 'servicesError', message: res.JSON };
  }
}

export async function getProductsByCategory(category) {
  const response = await fetch(baseURL + `/products/search/${category}`);
  const data = await convertToJson(response);
  return data.Result;
  
}

export async function getProductById(id) {
  const response = await fetch(baseURL + `/product/${id}`);
  const product = await convertToJson(response);
  return product.Result;
}

export async function findCategoryById(id) {
  const response = await fetch(baseURL + `/product/${id}`);
  const product = await convertToJson(response);
  return product.Result.Category;
}

export async function checkout(payload) {
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "authentication": "1234",
    },
    body: JSON.stringify(payload),
  };
  console.log("fetching data...");
  return await fetch(baseURL + "/checkout/", options).then(convertToJson);
}