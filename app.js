// Constantes.
const REGULAR_TYPE = 21;
const LOWER_TYPE = 4;
const EXEMPT_TYPE = 0;

// Entrada.
const products = [
  {
    description: "Goma de borrar",
    price: 0.25,
    tax: LOWER_TYPE,
    stock: 2,
    units: 0,
  },
  {
    description: "Lápiz H2",
    price: 0.4,
    tax: LOWER_TYPE,
    stock: 5,
    units: 0,
  },
  {
    description: "Cinta rotular",
    price: 9.3,
    tax: REGULAR_TYPE,
    stock: 2,
    units: 0,
  },
  {
    description: "Papelera plástico",
    price: 2.75,
    tax: REGULAR_TYPE,
    stock: 5,
    units: 0,
  },
  {
    description: "Escuadra",
    price: 8.4,
    tax: REGULAR_TYPE,
    stock: 3,
    units: 0,
  },
  {
    description: "Pizarra blanca",
    price: 5.95,
    tax: REGULAR_TYPE,
    stock: 2,
    units: 0,
  },
  {
    description: "Afilador",
    price: 1.2,
    tax: LOWER_TYPE,
    stock: 10,
    units: 0,
  },
  {
    description: "Libro ABC",
    price: 19,
    tax: EXEMPT_TYPE,
    stock: 2,
    units: 0,
  },
];

function handleChangeInput(e, item) { 
  let num  = parseInt(e.target.value) < 0 ? 0 : parseInt(e.target.value);
  item.units = num;
  e.target.value = num;
  
  isCalculateDisable(products);
}
function isCalculateDisable(object) {
  let calculateDisable = true;
  for (const item of object) {
    calculateDisable = item.units === 0 && calculateDisable ? true : false;
  }
  document.querySelector(".calculate").disabled = calculateDisable;
}

function createItem(item, index) {
  const nodeType = ["div", "span", "span", "input"];
  let itemNode, node;
  for (i = 0; i < nodeType.length; i++) {
    if (i === 0) itemNode = document.createElement(nodeType[i]);
    else {
      node = document.createElement(nodeType[i]);
      if (nodeType[i] === "span") {
        node.innerText =
          i === 1
            ? index + 1 + "."
            : item.description + " - " + item.price + "€/ud";
      }
      if (nodeType[i] === "input") {
        node.setAttribute("type", "number");
        node.setAttribute("value", item.units);
        node.setAttribute("max", item.stock);
        node.setAttribute("min", 0);
        node.addEventListener("change", (e) => handleChangeInput(e, item));
      }
      if (i > 2) itemNode.lastChild.appendChild(node);
      else itemNode.appendChild(node);
    }
  }
  itemNode.setAttribute("class", "item");
  document.querySelector(".cart").appendChild(itemNode);
}

function createCart(object) {
  for (var i in object) {
    createItem(object[i], parseInt(i));
  }
}

function createFooterCart() {
  let nodeClass = ["subtotal", "taxes", "total"];
  let nodeText = ["Subtotal", "IVA", "TOTAL"];

  for (var i in nodeClass) {
    fatherNode = document.createElement("div");
    node1 = document.createElement("span");
    node1.innerText = nodeText[i];
    node2 = document.createElement("span");
    node2.setAttribute("class", nodeClass[i]);
    node2.innerText = "0 €";
    fatherNode.appendChild(node1);
    fatherNode.appendChild(node2);
    document.querySelector(".footerCart").appendChild(fatherNode);
  }
}

let calculateTaxes = (tax, price) => (tax / 100) * price;
let calculatePriceItem = (price, unit) => price * unit;
let calculateTotal = (subtotal, tax) => subtotal + tax;
function handleCalculate() {
  let subtotal = 0;
  let taxes = 0;
  for (var i of products) {
    if (i.units !== 0) {
      subtotal += calculatePriceItem(i.price, i.units);
      taxes += calculateTaxes(i.tax, calculatePriceItem(i.price, i.units));
    }
  }
  document.querySelector(".subtotal").innerText = subtotal.toFixed(2) + " €";
  document.querySelector(".taxes").innerText = taxes.toFixed(2) + " €";
  document.querySelector(".total").innerText =
    calculateTotal(subtotal, taxes).toFixed(2) + " €";
}

function print(object) {
  createCart(object);
  createFooterCart();
}

document.querySelector(".calculate").addEventListener("click", handleCalculate);

print(products);
