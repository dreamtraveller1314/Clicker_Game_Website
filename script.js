const button = document.getElementById("click-button");
const count = document.getElementById("click-count");
const shopContainer = document.getElementById("shop-items");
const countperClick = document.getElementById("count-per-click");
let itemsOwned = [];
let totalClickCount = 0;

function updatePerClick() {
    const multiplierStrawberry = itemsOwned.find((i) => i.name === "Strawberry");
    const multiplierStrawberryAmount = multiplierStrawberry ? multiplierStrawberry.amount : 0;
    const multiplierChocolate = itemsOwned.find((i) => i.name === "Chocolate");
    const multiplierChocolateAmount = multiplierChocolate ? multiplierChocolate.amount : 0;
    const perClick = 1 * (2 ** multiplierStrawberryAmount) * (4 ** multiplierChocolateAmount);
    countperClick.textContent = perClick;
}

function buttonClick() {
    updatePerClick();
    totalClickCount += parseInt(countperClick.textContent);
    count.textContent = totalClickCount;
}

button.addEventListener("click", function () {
    buttonClick();
});

const shopItems = [
    {
        name: "Flour",
        description: "Flour clicks for you, baking you cookies.",
        cost: 10,
        startingCost: 10,
    },
    {
        name: "Strawberry",
        description: "Strawberry multiplies the value of each click by 2.",
        cost: 50,
        startingCost: 50,
    },
    {
        name: "Chocolate",
        description: "Chocolate multiplies the value of each click by 4.",
        cost: 85,
        startingCost: 85,
    },
    {
        name: "Sugar",
        description: "Sugar multiplies current cookies by 2.",
        cost: 100,
        startingCost: 100,
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

        if (item.name === "Sugar") {
        totalClickCount *= 2;
        count.textContent = totalClickCount;
        }

        item.cost = item.startingCost * (amount + 1);
        createShopItems();
        alert(`Bought ${itemName}!`);
        updateItemsOwned();
        updatePerClick();
    } else {
        alert(`Not enough clicks! Need ${item.cost}`);
    }
}

function updateItemsOwned() {
    const itemsPanel = document.getElementById("stats-items");
    itemsPanel.innerHTML = "";
    if (itemsOwned.length === 0) {
        itemsPanel.innerHTML = "<p>Nothing yet!</p>";
        return;
    }
    itemsOwned.forEach((item) => {
        const row = document.createElement("div");
        row.className = "owned-row";
        row.innerHTML = `
        <span>${item.name}</span>
        <span>${item.amount}</span>
        `;
        itemsPanel.appendChild(row);
    });
}

setInterval(() => {
    const flourOwned = itemsOwned.find((i) => i.name === "Flour");
    if (flourOwned) {
        for (let i = 0; i < flourOwned.amount; i++) {
        buttonClick();
        }
    }
}, 1000);

createShopItems();
updateItemsOwned();
updatePerClick();