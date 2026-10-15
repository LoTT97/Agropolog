// Placeholder menu data — replace with the real menu later.
const MENU = {
  starters: [
    { name: "Garden Bruschetta", desc: "Wood-fired sourdough, heirloom tomatoes, basil, cold-pressed olive oil.", price: 6.5, tags: ["V"] },
    { name: "Smoked Trout Pâté", desc: "River trout, horseradish cream, pickled shallots, rye crackers.", price: 8.0, tags: [] },
    { name: "Roasted Beet Salad", desc: "Golden and red beets, goat cheese, toasted walnuts, honey dressing.", price: 7.5, tags: ["V", "GF"] },
    { name: "Village Cheese Board", desc: "Three local cheeses, fig jam, farm honey, grilled bread.", price: 11.0, tags: ["V"] },
    { name: "Pumpkin Soup", desc: "Roasted pumpkin, ginger, coconut cream, toasted seeds.", price: 5.5, tags: ["VG", "GF"] },
  ],
  mains: [
    { name: "Fire-Grilled Lamb", desc: "Slow-marinated lamb shoulder, rosemary potatoes, mint yogurt.", price: 18.5, tags: ["GF"] },
    { name: "Farmhouse Chicken", desc: "Free-range chicken, wild mushroom sauce, buttered greens.", price: 15.0, tags: [] },
    { name: "Mountain Trout", desc: "Pan-seared trout, brown butter, capers, seasonal vegetables.", price: 16.5, tags: ["GF"] },
    { name: "Wild Mushroom Risotto", desc: "Arborio rice, forest mushrooms, aged cheese, truffle oil.", price: 13.5, tags: ["V", "GF"] },
    { name: "Stuffed Peppers", desc: "Peppers filled with rice, herbs and vegetables, baked in tomato sauce.", price: 11.5, tags: ["VG"] },
    { name: "Beef Short Rib", desc: "12-hour braised short rib, celeriac purée, red wine jus.", price: 21.0, tags: ["GF"] },
  ],
  desserts: [
    { name: "Baklava", desc: "Layers of filo, walnuts and farm honey syrup.", price: 5.0, tags: ["V"] },
    { name: "Apple Crumble", desc: "Orchard apples, cinnamon oat crumble, vanilla ice cream.", price: 6.0, tags: ["V"] },
    { name: "Dark Chocolate Tart", desc: "70% chocolate, sea salt, whipped cream.", price: 6.5, tags: ["V"] },
    { name: "Seasonal Sorbet", desc: "Three scoops made from this week's fruit.", price: 4.5, tags: ["VG", "GF"] },
  ],
  drinks: [
    { name: "Homemade Lemonade", desc: "Fresh lemons, mint, a touch of honey.", price: 3.0, tags: ["V", "GF"] },
    { name: "Elderflower Spritz", desc: "House elderflower cordial, sparkling water, lime.", price: 3.5, tags: ["VG", "GF"] },
    { name: "Local Red Wine", desc: "Glass of Vranac from a family vineyard nearby.", price: 5.0, tags: ["VG", "GF"] },
    { name: "Craft Lager", desc: "Unfiltered lager from a small regional brewery, 0.5 l.", price: 4.0, tags: ["VG"] },
    { name: "Turkish Coffee", desc: "Served with a piece of lokum.", price: 2.0, tags: ["V"] },
  ],
};

const grid = document.getElementById("menu-grid");
const tabs = document.querySelectorAll(".tab");

function formatPrice(value) {
  return "€" + value.toFixed(2);
}

function renderMenu(category) {
  grid.innerHTML = MENU[category]
    .map(
      (item) => `
      <article class="menu-item">
        <div class="menu-item-head">
          <h3>${item.name}${
            item.tags.length
              ? `<span class="tags">${item.tags.map((t) => `<span class="tag">${t}</span>`).join("")}</span>`
              : ""
          }</h3>
          <span class="dots"></span>
          <span class="price">${formatPrice(item.price)}</span>
        </div>
        <p>${item.desc}</p>
      </article>`
    )
    .join("");
}

tabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    tabs.forEach((t) => {
      t.classList.toggle("active", t === tab);
      t.setAttribute("aria-selected", t === tab);
    });
    renderMenu(tab.dataset.category);
  });
});

renderMenu("starters");

// Mobile navigation
const toggle = document.querySelector(".nav-toggle");
const links = document.querySelector(".nav-links");

toggle.addEventListener("click", () => {
  const open = links.classList.toggle("open");
  toggle.setAttribute("aria-expanded", open);
});

links.addEventListener("click", (e) => {
  if (e.target.tagName === "A") {
    links.classList.remove("open");
    toggle.setAttribute("aria-expanded", "false");
  }
});

// Reservation form (demo only — no backend yet)
const form = document.getElementById("reservation-form");
const status = document.getElementById("form-status");
const dateInput = form.querySelector('input[name="date"]');
dateInput.min = new Date().toISOString().split("T")[0];

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const data = new FormData(form);
  status.textContent = `Thanks, ${data.get("name")}! We've received your request for ${data.get("guests")} on ${data.get("date")} at ${data.get("time")}.`;
  form.reset();
});

document.getElementById("year").textContent = new Date().getFullYear();
