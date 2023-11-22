export class CustomerService {
  getProductsSmall() {
    return fetch("mocDatas/users.json")
      .then((res) => res.json())
      .then((d) => d.data);
  }

  getProducts() {
    return fetch("data/products.json")
      .then((res) => res.json())
      .then((d) => d.data);
  }

  getProductsWithOrdersSmall() {
    return fetch("mocDatas/users.json")
      .then((res) => res.json())
      .then((d) => d.data);
  }

  getCustomersLarge() {
    return fetch("mocDatas/users.json")
      .then((res) => res.json())
      .then((d) => d.data);
  }

  getCustomers(params) {
    const queryParams = params
      ? Object.keys(params)
          .map(
            (k) => encodeURIComponent(k) + "=" + encodeURIComponent(params[k])
          )
          .join("&")
      : "";
    return fetch(
      "https://www.primefaces.org/data/customers?" + queryParams
    ).then((res) => res.json());
  }

  getCustomersMedium() {
    return fetch("http://localhost:8000/board")
      .then((res) => res.json())
      .then((data) => data);
  }
}
