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
    updateMilestones();
}

function buttonClick(type, forauto) {
    if (type === "auto") {
        totalClickCount += forauto;
        count.textContent = totalClickCount;
    }
    if (type === "manual") {
        updatePerClick();
        totalClickCount += parseInt(countperClick.textContent);
        count.textContent = totalClickCount;
    }
    updateMilestones();
}

button.addEventListener("click", function () {
    buttonClick("manual",0);
});

const shopItems = [
    {
        name: "Flour",
        icon: "img/flour.png",
        description: "Flour clicks for you, baking you cupcakes.",
        cost: 10,
        startingCost: 10,
    },
    {
        name: "Strawberry",
        icon: "img/strawberry.png",
        description: "Strawberry multiplies the value of each click by 2.",
        cost: 50,
        startingCost: 50,
    },
    {
        name: "Chocolate",
        icon: "img/chocolate.png",
        description: "Chocolate multiplies the value of each click by 4.",
        cost: 85,
        startingCost: 85,
    },
    {
        name: "Sugar",
        icon: "img/sugar.png",
        description: "Sugar multiplies current cupcakes by 2. <br><strong>Important!</strong> It only multiplies the total cupcakes amount after deducting the cost of the item.",
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
            <h3>
              <img src="${item.icon}" alt="${item.name}" onerror="this.style.display='none'" />
              ${item.name}
            </h3>
            <p>${item.description}</p>
        </div>
        <button onclick="buyItem('${item.name}')">
            ${item.cost} cupcakes
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

        if (item.name !== "Sugar") {
        item.cost = item.startingCost * ((amount + 1)**3);
        createShopItems();
        }

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
        buttonClick("auto", 1);
        }
    }
}, 1000);

const milestones = [
    { label: "First Bite", target: 10 },
    { label: "Cupcake Lover", target: 100 },
    { label: "Baker", target: 500 },
    { label: "Master Baker", target: 1000 },
    { label: "Cupcake Legend", target: 10000 },
    { label: "Cupcake Deity", target: 1000000 }
];

const reachedMilestones = new Set();

function updateMilestones() {
    milestones.forEach((milestone) => {
        const done = totalClickCount >= milestone.target;

        if (done && !reachedMilestones.has(milestone.target)) {
        reachedMilestones.add(milestone.target);
        showMilestonePopup(milestone.label);
        }
    });
}

function showMilestonePopup(label) {
  const popup = document.createElement("div");
  popup.className = "milestone-popup";
  popup.textContent = `Milestone reached: ${label}!`;
  document.body.appendChild(popup);
  setTimeout(() => popup.classList.add("slide-in"), 10);
    setTimeout(() => {
        popup.style.left = "-300px";
        setTimeout(() => popup.remove(), 400);
    }, 2000);
}

createShopItems();
updateItemsOwned();
updatePerClick();
updateMilestones();