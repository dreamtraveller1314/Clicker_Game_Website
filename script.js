const button = document.getElementById("click-button");
const count = document.getElementById("click-count");
let totalClickCount = 0;

function buttonClick() {
  totalClickCount++;

  count.textContent = totalClickCount;
}

button.addEventListener("click", function () {
  buttonClick();
});

const shopItems = [
  {
    name: "Cat",
    description: "Cats click for you, earning you money.",
    cost: 10,
    startingCost: 10,
  },
  {
    name: "Multiplier",
    description: "Multiplies the value of each click by 2.",
    cost: 50,
    startingCost: 50,
  },
];

function createShopItems() {
  document.querySelectorAll(".shop-item").forEach((element) => {
    element.remove();
  });

  shopItems.forEach((item) => {
    const shopItem = document.createElement("div");
    shopItem.className = "shop-item";

    shopItem.innerHTML = `
      <div>
        <h3>${item.name}</h3>
        <p>${item.description}</p>
      </div>
      <button onclick="buyItem('${item.name}')">
        Buy $${item.cost}
      </button>
    `;

    shopContainer.appendChild(shopItem);
  });
}

function buyItem(itemName) {
  const item = shopItems.find((i) => i.name === itemName);
  if (totalClickCount >= item.cost) {
    totalClickCount -= item.cost;
    count.textContent = totalClickCount;

    let amount = 1;

    const itemInArray = itemsOwned.find((obj) => obj.name === item.name);
    if (itemInArray) {
      itemInArray.amount++;
      console.log(`Found ${item.name}, added 1!`);
      amount = itemInArray.amount;
    } else {
      itemsOwned.push({ name: item.name, amount: 1 });
      console.log(`Added ${item.name} to itemsOwned!`);
    }

    console.log(`Bought ${itemName}!`);
  } else {
    console.log(`Not enough clicks! Need ${item.cost}`);
  }
}

setInterval(() => {
  const catOwned = itemsOwned.find((i) => i.name === "Cat");
  if (catOwned) {
    for (let i = 0; i < catOwned.amount; i++) {
      buttonClick();
    }
  }
}, 1000); 



function buttonClick() {
  console.log("Button was clicked!");

  const multiplierOwned = itemsOwned.find((i) => i.name === "Multiplier");
  const multiplierCount = multiplierOwned ? multiplierOwned.amount : 0;

  totalClickCount = totalClickCount + 1 * 2 ** multiplierCount;

  count.textContent = totalClickCount;
}

function buyItem(itemName) {
  const item = shopItems.find((i) => i.name === itemName);
  if (totalClickCount >= item.cost) {
    totalClickCount -= item.cost;
    count.textContent = totalClickCount;

    let amount = 1;

    const itemInArray = itemsOwned.find((obj) => obj.name === item.name);
    if (itemInArray) {
      itemInArray.amount++;
      console.log(`Found ${item.name}, added 1!`);
      amount = itemInArray.amount;
    } else {
      itemsOwned.push({ name: item.name, amount: 1 });
      console.log(`Added ${item.name} to itemsOwned!`);
    }

    item.cost = item.startingCost + item.startingCost * amount ** 2;
    createShopItems(); 

    console.log(`Bought ${itemName}!`);
  } else {
    console.log(`Not enough clicks! Need ${item.cost}`);
  }
}

const shopContainer = document.getElementById("shop-items");
let itemsOwned = [];

createShopItems();