// Menu from restaurantmenu.pdf ("Fastfood Menu"). Dish names are still placeholders in the PDF.
const MENU = {
  tacos: [
    { name: "Option 1", desc: "Name of the dish", price: 9.0, tags: [] },
    { name: "Option 2", desc: "Name of the dish", price: 9.0, tags: [] },
  ],
  donuts: [
    { name: "Option 1", desc: "Name of the dish", price: 9.0, tags: [] },
  ],
  burger: [
    { name: "Option 1", desc: "Name of the dish", price: 9.0, tags: [] },
    { name: "Option 2", desc: "Name of the dish", price: 9.0, tags: [] },
  ],
  pizza: [
    { name: "Option 1", desc: "Name of the dish", price: 9.0, tags: [] },
    { name: "Option 2", desc: "Name of the dish", price: 9.0, tags: [] },
  ],
  drinks: [
    { name: "Option 1", desc: "Name of the dish", price: 9.0, tags: [] },
    { name: "Option 2", desc: "Name of the dish", price: 9.0, tags: [] },
  ],
  fries: [
    { name: "Option 1", desc: "Name of the dish", price: 9.0, tags: [] },
    { name: "Option 2", desc: "Name of the dish", price: 9.0, tags: [] },
  ],
};

const grid = document.getElementById("menu-grid");
const tabs = document.querySelectorAll(".tab");

function formatPrice(value) {
  return "$" + value.toFixed(2);
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

renderMenu("tacos");

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
