import { buildSupplierGroups } from "./build-suppliers.js";

const pages = [
  { label: "Home", href: "index.html" },
  { label: "Articles", href: "articles.html" },
  { label: "Build", href: "build.html" },
  { label: "Simulate", href: "simulate.html" },
  { label: "Launch", href: "launch.html" },
  { label: "Competitions", href: "competitions.html" },
  { label: "Active Control", href: "electronics.html" },
];

const regionLabels = {
  all: "All regions",
  global: "International / global",
  us: "United States",
  ca: "Canada",
  uk: "United Kingdom",
  eu: "Europe",
  in: "India",
  au: "Australia / New Zealand",
};

const siteSearchIndex = [
  {
    title: "How do I get started?",
    section: "Home",
    summary: "Use the starter form to choose an age group, budget, experience level, and interest level.",
    href: "index.html#start",
    keywords: ["start", "begin", "starter", "first rocket", "how to get started"],
    prompts: ["How do I get started?", "What should I do first?", "Which path is right for me?"],
    featured: true,
  },
  {
    title: "Will this rocket work?",
    section: "Articles",
    summary: "Check stability, motor fit, and recovery before you build too far.",
    href: "articles.html#article-rocket-work",
    keywords: ["work", "fly", "stability", "motor fit", "recovery", "will this rocket work"],
    prompts: ["Will this rocket work?", "How do I know it will fly?", "Is the design good enough?"],
    featured: true,
  },
  {
    title: "Why didn't my rocket fly straight?",
    section: "Articles",
    summary: "There are several possible causes, including wind, launch setup, balance, and fin issues.",
    href: "articles.html#article-fly-straight",
    keywords: ["straight", "drift", "wind", "alignment", "balance", "why didn't my rocket fly straight"],
    prompts: ["Why didn't my rocket fly straight?", "Why did it curve?", "Why did it drift off course?"],
    featured: true,
  },
  {
    title: "Is it legal to launch this?",
    section: "Articles",
    summary: "Check local launch rules, club rules, and aviation guidance before flying.",
    href: "articles.html#article-legal-launch",
    keywords: ["legal", "launch", "rules", "aviation", "permission", "can i launch this"],
    prompts: ["Is it legal to launch this?", "Where can I launch?", "Do I need permission?"],
  },
  {
    title: "What motor should I use?",
    section: "Articles",
    summary: "Match the motor to the rocket, the field, and your experience level.",
    href: "articles.html#article-motor-choice",
    keywords: ["motor", "motor choice", "what motor should i use", "engine", "thrust"],
    prompts: ["What motor should I use?", "Which motor fits this rocket?", "How do I choose a motor?"],
  },
  {
    title: "Why did it come down hard?",
    section: "Articles",
    summary: "Recovery problems usually come from packing, ejection, or an undersized recovery system.",
    href: "articles.html#article-hard-landing",
    keywords: ["hard landing", "recovery", "parachute", "ejection", "came down hard"],
    prompts: ["Why did it come down hard?", "Why did it land hard?", "Why didn't the parachute work?"],
  },
  {
    title: "What glue should I use?",
    section: "Articles",
    summary: "Use beginner-friendly glue for most kits, then move up only when the joint needs it.",
    href: "articles.html#article-glue",
    keywords: ["glue", "adhesive", "pva", "epoxy", "ca", "what glue should i use"],
    prompts: ["What glue should I use?", "Which glue is best for fins?", "What adhesive do I need?"],
  },
  {
    title: "Where do I buy parts?",
    section: "Articles",
    summary: "The supplier list groups kits, launch gear, motors, and finishing supplies.",
    href: "articles.html#article-supplies",
    keywords: ["parts", "suppliers", "buy", "kit", "where do i buy parts"],
    prompts: ["Where do I buy parts?", "Where can I get a starter kit?", "Where do I find motors?"],
  },
  {
    title: "Where should I launch?",
    section: "Launch",
    summary: "Use a safe, legal open field, club range, or approved launch site.",
    href: "launch.html#where-to-launch",
    keywords: ["launch", "field", "range", "where should i launch", "site"],
    prompts: ["Where should I launch?", "What field should I use?", "Where is a safe launch site?"],
  },
  {
    title: "How do I keep fins straight?",
    section: "Build",
    summary: "Use a fin jig, tape, or a simple alignment block while the glue cures.",
    href: "build.html#alignment-jigs",
    keywords: ["fins", "straight", "alignment", "jig", "build quality"],
    prompts: ["How do I keep fins straight?", "How do I align fins?", "How do I stop fins from shifting?"],
  },
  {
    title: "How do I know a rocket will fly well?",
    section: "Simulate",
    summary: "Simulation helps you check stability, altitude, motor fit, and recovery.",
    href: "simulate.html#simulation-topics",
    keywords: ["simulate", "stability", "altitude", "motor fit", "recovery"],
    prompts: ["How do I know a rocket will fly well?", "Should I simulate it?", "What should I check before launch?"],
  },
  {
    title: "When should I try competitions?",
    section: "Competitions",
    summary: "Competition formats make more sense once the basics feel comfortable.",
    href: "competitions.html#competition-options",
    keywords: ["competition", "challenge", "team", "contest", "when should i try competitions"],
    prompts: ["When should I try competitions?", "Is competition too advanced?", "What competition should I start with?"],
  },
  {
    title: "What if I want electronics or control?",
    section: "Active Control",
    summary: "Active control is advanced and should come after launch, build, and simulation basics.",
    href: "electronics.html#active-control-gate",
    keywords: ["electronics", "control", "active control", "advanced", "airbrakes"],
    prompts: ["What if I want electronics or control?", "Is active control too advanced?", "Should I start with electronics?"],
  },
];

const featuredSearchPrompts = [
  "Will this rocket work?",
  "Why didn't my rocket fly straight?",
  "Is it legal to launch this?",
  "What motor should I use?",
  "How do I keep fins straight?",
  "How do I know a rocket will fly well?",
];

function currentPath() {
  const path = window.location.pathname.split("/").pop() || "index.html";
  return path === "" ? "index.html" : path;
}

function renderNav() {
  const header = document.getElementById("site-header");
  if (!header) return;

  const activePath = currentPath();
  const navLinks = pages
    .map((page) => {
      const active = page.href === activePath;
      return `<a class="nav-link${active ? " is-active" : ""}" href="${page.href}">${page.label}</a>`;
    })
    .join("");

  header.innerHTML = `
    <div class="container header-grid">
      <button class="button-logo" type="button" href="index.html" aria-label="Go to homepage">
        <img class="logo" src="brand.svg" alt="Ignition logo" />
      </button>
      <button class="nav-toggle" type="button" aria-expanded="false" aria-controls="site-nav">
        <span></span><span></span><span></span>
        <span class="sr-only">Toggle navigation</span>
      </button>
      <nav class="main-nav" id="site-nav" aria-label="Primary navigation">
        ${navLinks}
      </nav>
    </div>
  `;

  const toggle = header.querySelector(".nav-toggle");
  const nav = header.querySelector(".main-nav");
  toggle?.addEventListener("click", () => {
    const open = nav.classList.toggle("is-open");
    toggle.setAttribute("aria-expanded", String(open));
  });
}

function renderFooter() {
  const footer = document.getElementById("site-footer");
  if (!footer) return;

  const year = new Date().getFullYear();

  footer.innerHTML = `
    <div class="container footer-grid">
      <p>Ignition keeps rocketry simple, beginner-friendly, and easy to navigate.</p>
      <div class="footer-contact">
        <p>Contact: <a href="mailto:info@fremontstudentmakers.org">info@fremontstudentmakers.org</a></p>
      </div>
      <p class="copyright">© ${year} Fremont Student Makers</p>
    </div>
  `;
}

function getSearchSuggestions(itemList) {
  const suggestions = [];
  const seen = new Set();

  itemList.forEach((item) => {
    (item.prompts || []).forEach((prompt) => {
      const key = normalizeText(prompt);
      if (seen.has(key)) return;
      seen.add(key);
      suggestions.push(prompt);
    });
  });

  return suggestions.slice(0, 6);
}

function scoreSearchItem(item, query) {
  const normalizedQuery = normalizeText(query);
  if (!normalizedQuery) return item.featured ? 1 : 0;

  const queryTokens = normalizedQuery.split(/\s+/).filter(Boolean);
  const haystack = [item.title, item.section, item.summary, ...(item.keywords || []), ...(item.prompts || [])]
    .join(" ")
    .toLowerCase();

  let score = 0;

  if (haystack.includes(normalizedQuery)) score += 30;

  queryTokens.forEach((token) => {
    if (token.length < 2) return;
    if (haystack.includes(token)) score += 8;
  });

  (item.keywords || []).forEach((keyword) => {
    const normalizedKeyword = normalizeText(keyword);
    if (normalizedKeyword && normalizedQuery.includes(normalizedKeyword)) score += 12;
  });

  return score;
}

function searchSite(query) {
  const normalizedQuery = normalizeText(query);

  return siteSearchIndex
    .map((item) => ({
      ...item,
      score: scoreSearchItem(item, normalizedQuery),
    }))
    .filter((item) => item.score > 0 || !normalizedQuery)
    .sort((left, right) => right.score - left.score || left.title.localeCompare(right.title));
}

function renderHomeSearch() {
  if (currentPath() !== "index.html") return;

  const input = document.querySelector("[data-site-search]");
  const results = document.querySelector("[data-search-results]");
  const suggestions = document.querySelector("[data-search-suggestions]");
  const countLabel = document.querySelector("[data-search-count]");

  if (!input || !results || !suggestions || !countLabel) return;

  const makeSuggestionButton = (label) => `<button type="button" class="search-chip" data-search-prompt="${label.replaceAll('"', '&quot;')}">${label}</button>`;

  const setSuggestions = (items) => {
    const prompts = getSearchSuggestions(items);
    suggestions.innerHTML = prompts.length
      ? prompts.map((prompt) => makeSuggestionButton(prompt)).join("")
      : featuredSearchPrompts.map((prompt) => makeSuggestionButton(prompt)).join("");

    suggestions.querySelectorAll("[data-search-prompt]").forEach((button) => {
      button.addEventListener("click", () => {
        input.value = button.getAttribute("data-search-prompt") || "";
        update();
      });
    });
  };

  const renderResults = (items, query) => {
    if (!items.length) {
      results.innerHTML = `
        <div class="search-empty card">
          <h3>No exact match yet</h3>
          <p class="muted">Try one of the prompts above, or search for a broader term like launch, build, simulate, or legal.</p>
        </div>
      `;
      countLabel.textContent = `No exact matches for "${query}".`;
      return;
    }

    results.innerHTML = items.slice(0, 6).map((item) => `
      <article class="card search-result-card">
        <div class="search-result-meta">
          <p class="eyebrow">${item.section}</p>
          <h3>${item.title}</h3>
        </div>
        <p>${item.summary}</p>
        <a class="button-secondary search-result-link" href="${item.href}">Open</a>
      </article>
    `).join("");

    countLabel.textContent = query
      ? `Showing ${Math.min(items.length, 6)} result${items.length === 1 ? "" : "s"} for "${query}".`
      : "Showing popular prompts from across the site.";
  };

  const update = () => {
    const query = input.value.trim();
    const matches = searchSite(query);

    setSuggestions(matches.length ? matches : siteSearchIndex.filter((item) => item.featured));
    renderResults(matches, query);
  };

  input.addEventListener("input", update);
  setSuggestions(siteSearchIndex.filter((item) => item.featured));
  renderResults(searchSite(""), "");
}

function renderRegionPanel() {
  const path = currentPath();
  if (path === "electronics.html" || path === "articles.html") return;

  if (document.querySelector("[data-region-panel]")) return;

  const hero = document.querySelector(".hero-grid");
  const header = document.getElementById("site-header");

  const panel = document.createElement("section");
  panel.className = "section region-panel";
  panel.setAttribute("data-region-panel", "true");
  panel.innerHTML = `
    <div class="section-heading">
      <p class="eyebrow">Region selector</p>
      <h2>Show information for your country or region</h2>
    </div>
    <div class="region-toolbar">
      <label for="site-region-select">Relevant for</label>
      <select id="site-region-select" data-region-select>
        <option value="all">All regions</option>
        <option value="global">International / global</option>
        <option value="us">United States</option>
        <option value="ca">Canada</option>
        <option value="uk">United Kingdom</option>
        <option value="eu">Europe</option>
        <option value="in">India</option>
        <option value="au">Australia / New Zealand</option>
      </select>
      <p class="region-status">Showing boxes relevant to <strong data-region-current>All regions</strong>.</p>
    </div>
  `;

  // Prefer inserting after the hero card; fall back to after the header.
  if (hero && hero.parentNode) {
    hero.insertAdjacentElement("afterend", panel);
  } else if (header) {
    header.insertAdjacentElement("afterend", panel);
  }
}

function getSupplierLogoUrl(domain) {
  return `https://logo.clearbit.com/${domain}`;
}

function getSupplierInitials(name) {
  return name
    .split(/\s+/)
    .map((part) => part[0])
    .filter(Boolean)
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

function normalizeText(value) {
  return String(value || "").toLowerCase().trim();
}

function supplierMatchesRegion(itemRegions, selectedRegion) {
  if (selectedRegion === "all") return true;
  return itemRegions.includes("global") || itemRegions.includes(selectedRegion);
}

function supplierMatchesQuery(item, query) {
  if (!query) return true;

  const haystack = [item.name, item.summary, item.delivery, item.domain, ...(item.regions || [])]
    .join(" ")
    .toLowerCase();

  return haystack.includes(query);
}

function renderBuildSuppliers() {
  if (currentPath() !== "build.html") return;

  const searchInput = document.querySelector("[data-supplier-search]");
  const regionSelect = document.querySelector("[data-supplier-region]");
  const countLabel = document.querySelector("[data-supplier-count]");
  const supplierCards = [];

  buildSupplierGroups.forEach((group) => {
    const container = document.querySelector(`[data-supplier-group="${group.id}"]`);
    if (!container) return;

    container.innerHTML = group.items
      .map((item) => {
        const initials = getSupplierInitials(item.name);
        const regions = item.regions.join(",");

        return `
          <article class="card supplier-card" data-supplier-card data-group="${group.id}" data-name="${item.name}" data-summary="${item.summary}" data-delivery="${item.delivery}" data-regions="${regions}">
            <a class="supplier-logo" href="${item.href}" target="_blank" rel="noreferrer noopener" aria-label="Visit ${item.name}">
              <img src="${getSupplierLogoUrl(item.domain)}" alt="${item.name} logo" loading="lazy" onerror="this.hidden=true; this.nextElementSibling.hidden=false" />
              <span class="supplier-logo-fallback" hidden>${initials}</span>
            </a>
            <div class="supplier-body">
              <a class="supplier-name" href="${item.href}" target="_blank" rel="noreferrer noopener">${item.name}</a>
              <p class="supplier-delivery">${item.delivery}</p>
              <p>${item.summary}</p>
            </div>
          </article>
        `;
      })
      .join("");

    supplierCards.push(...container.querySelectorAll("[data-supplier-card]"));
  });

  if (!searchInput || !regionSelect || !countLabel || !supplierCards.length) return;

  const applyFilters = () => {
    const query = normalizeText(searchInput.value);
    const region = regionSelect.value;
    let visibleCount = 0;

    supplierCards.forEach((card) => {
      const itemRegions = (card.getAttribute("data-regions") || "").split(",").map((value) => value.trim()).filter(Boolean);
      const matches = supplierMatchesRegion(itemRegions, region) && supplierMatchesQuery(
        {
          name: card.getAttribute("data-name"),
          summary: card.getAttribute("data-summary"),
          delivery: card.getAttribute("data-delivery"),
          domain: card.querySelector(".supplier-name")?.textContent || "",
          regions: itemRegions,
        },
        query,
      );

      card.hidden = !matches;
      if (matches) visibleCount += 1;
    });

    countLabel.textContent =
      visibleCount === supplierCards.length
        ? `Showing all ${visibleCount} suppliers.`
        : `Showing ${visibleCount} of ${supplierCards.length} suppliers.`;
  };

  searchInput.addEventListener("input", applyFilters);
  regionSelect.addEventListener("change", applyFilters);
  applyFilters();
}

function getRegionStorageKey() {
  return "ignition-region";
}

function getRegionLabel(region) {
  return regionLabels[region] || regionLabels.all;
}

function regionApplies(itemRegions, selectedRegion) {
  if (selectedRegion === "all") {
    return true;
  }

  const regions = itemRegions
    .split(",")
    .map((region) => region.trim())
    .filter(Boolean);

  return regions.includes("global") || regions.includes(selectedRegion);
}

function wireRegionFilters() {
  const selects = document.querySelectorAll("[data-region-select]");
  if (!selects.length) return;

  const storageKey = getRegionStorageKey();
  const savedRegion = localStorage.getItem(storageKey) || "all";

  const applyRegion = (region) => {
    document.querySelectorAll("[data-region-item]").forEach((item) => {
      const itemRegions = item.getAttribute("data-regions") || "global";
      item.hidden = !regionApplies(itemRegions, region);
    });

    document.querySelectorAll("[data-region-current]").forEach((label) => {
      label.textContent = getRegionLabel(region);
    });
  };

  selects.forEach((select) => {
    const initialValue = regionLabels[savedRegion] ? savedRegion : select.value;
    select.value = initialValue;
    applyRegion(initialValue);

    select.addEventListener("change", () => {
      const region = select.value;
      localStorage.setItem(storageKey, region);
      applyRegion(region);
    });
  });

  window.addEventListener("storage", (event) => {
    if (event.key !== storageKey || !event.newValue) return;
    const region = event.newValue;
    selects.forEach((select) => {
      select.value = region;
    });
    applyRegion(region);
  });
}

function getBudgetLabel(value) {
  const labels = {
    1: "Very low",
    2: "Starter kit",
    3: "Flexible",
    4: "Higher budget",
    5: "Open budget",
  };

  return labels[value] || "Starter kit";
}

function getExperienceLabel(value) {
  const labels = {
    0: "New",
    1: "Beginner",
    2: "Some experience",
    3: "Confident",
    4: "Advanced",
  };

  return labels[value] || "Beginner";
}

function getInterestLabel(value) {
  const labels = {
    0: "Low",
    1: "Basic",
    2: "Balanced",
    3: "Focused",
    4: "High",
  };

  return labels[value] || "Balanced";
}

function chooseRoute(formData) {
  const build = Number(formData.get("build") || 0);
  const electronics = Number(formData.get("electronics") || 0);
  const experience = Number(formData.get("experience") || 0);
  const budget = Number(formData.get("budget") || 1);

  const recommendations = [];

  const addRecommendation = (page, title, note, reason) => {
    recommendations.push({ page, title, note, reason });
  };

  if (experience <= 0) {
    addRecommendation(
      "build.html",
      "Build",
      "Start with a beginner kit and follow the instructions step by step.",
      "No experience should always begin with a kit so the process stays simple and guided."
    );
    addRecommendation(
      "launch.html",
      "Launch",
      "Learn the basics of safe first flights and launch-day setup.",
      "A first kit is easier to understand when you also learn how launch day works."
    );
    addRecommendation(
      "simulate.html",
      "Simulate",
      "See how a simple rocket is likely to behave before you build more advanced designs.",
      "Simulation helps you understand the hobby without adding complexity yet."
    );
  } else if (electronics >= 3) {
    addRecommendation(
      "electronics.html",
      "Active Control",
      "Explore aerodynamic guidance, airbrakes, thrust vector control, and payload systems.",
      "High electronics interest should point straight to the Active Control page."
    );
    addRecommendation(
      "build.html",
      "Build",
      "Use a kit as a base, then move toward more custom assembly.",
      "Electronics projects are easier when you already know the airframe basics."
    );
    addRecommendation(
      "launch.html",
      "Launch",
      "Review the launch process so your electronics can fly safely.",
      "Even advanced projects need a safe launch path."
    );
  } else if (budget >= 4 && experience >= 3) {
    addRecommendation(
      "build.html",
      "Build",
      "Move beyond kits and start building your own rockets.",
      "A higher budget and more experience make custom building realistic."
    );
    addRecommendation(
      "competitions.html",
      "Competitions",
      "Look at certification paths and challenge flights.",
      "With more experience, competition and certification paths make sense."
    );
    addRecommendation(
      "simulate.html",
      "Simulate",
      "Check stability and altitude before investing in larger builds.",
      "More advanced projects should still be simulated first."
    );
  } else if (build <= 1) {
    addRecommendation(
      "build.html",
      "Build",
      "Start with a kit instead of custom parts.",
      "Low build interest usually means a kit will be the easiest and most enjoyable start."
    );
    addRecommendation(
      "launch.html",
      "Launch",
      "See what happens on a first flight day.",
      "It helps to understand launch basics before trying more complex work."
    );
    addRecommendation(
      "simulate.html",
      "Simulate",
      "Use a simulator once you are comfortable with a kit.",
      "Simulation is useful later, after the first build is familiar."
    );
  } else {
    addRecommendation(
      "build.html",
      "Build",
      "A kit gives you a clear next step and a manageable first project.",
      "A kit is still the most reliable starting point for most users."
    );
    addRecommendation(
      "launch.html",
      "Launch",
      "Learn the first-flight process and safety checks.",
      "Launch knowledge keeps the hobby grounded and practical."
    );
    addRecommendation(
      "simulate.html",
      "Simulate",
      "Compare simple design choices before you upgrade.",
      "Simulation helps once the basics are in place."
    );
  }

  return recommendations.slice(0, 3);
}

function syncStarterOutputs(form) {
  const outputs = {
    age: form.querySelector('[data-output="age"]'),
    budget: form.querySelector('[data-output="budget"]'),
    experience: form.querySelector('[data-output="experience"]'),
    build: form.querySelector('[data-output="build"]'),
    electronics: form.querySelector('[data-output="electronics"]'),
  };

  const ageSelect = form.querySelector('select[name="age"]');

  const getAgeLabel = () => {
    return ageSelect?.selectedOptions?.[0]?.textContent?.trim() || "High School";
  };

  const update = () => {
    const data = new FormData(form);
    const budget = Number(data.get("budget") || 2);
    const experience = Number(data.get("experience") || 1);
    const build = Number(data.get("build") || 2);
    const electronics = Number(data.get("electronics") || 1);

    if (outputs.age) outputs.age.textContent = getAgeLabel();
    if (outputs.budget) outputs.budget.textContent = getBudgetLabel(budget);
    if (outputs.experience) outputs.experience.textContent = getExperienceLabel(experience);
    if (outputs.build) outputs.build.textContent = getInterestLabel(build);
    if (outputs.electronics) outputs.electronics.textContent = getInterestLabel(electronics);
  };

  form.querySelectorAll('input[type="range"], select[name="age"]').forEach((input) => {
    input.addEventListener("input", update);
    input.addEventListener("change", update);
  });

  update();
}

function wireQuestionnaire() {
  const form = document.getElementById("starter-form");
  const results = document.getElementById("starter-results");
  const result = document.getElementById("starter-result");
  const note = document.getElementById("starter-note");
  const options = document.getElementById("starter-options");
  if (!form || !results || !result || !note || !options) return;

  syncStarterOutputs(form);

  const aside = form.parentElement?.querySelector(".recommendation-card");
  const introMuted = aside?.querySelector("p.muted");
  const reset = form.querySelector("#starter-reset");

  const renderOptions = (recommendations) => {
    options.innerHTML = recommendations
      .map(
        (item, index) => `
          <li class="starter-option">
            <a class="button-${index === 0 ? "primary" : "secondary"}" href="${item.page}">${item.title}</a>
            <p>${item.reason}</p>
            <p>${item.note}</p>
          </li>`
      )
      .join("");
  };

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const data = new FormData(form);
    const recommendations = chooseRoute(data);
    const primary = recommendations[0];

    results.hidden = false;
    if (introMuted) introMuted.hidden = true;
    result.textContent = primary.title;
    note.textContent = primary.reason;
    renderOptions(recommendations);
  });

  if (reset) {
    reset.addEventListener("click", () => {
      form.reset();
      syncStarterOutputs(form);
      results.hidden = true;
      if (introMuted) introMuted.hidden = false;
      result.textContent = "";
      note.textContent = "";
      options.innerHTML = "";
    });
  }
}

function wireActiveControlGate() {
  if (currentPath() !== "electronics.html") return;

  const body = document.body;
  const form = document.getElementById("active-control-check");
  const shell = document.getElementById("active-control-shell");
  const warning = document.getElementById("active-control-warning");
  const warningLabel = document.getElementById("active-control-warning-label");
  const warningTitle = document.getElementById("active-control-warning-title");
  const warningMessage = document.getElementById("active-control-warning-message");
  const warningReasons = document.getElementById("active-control-warning-reasons");
  const dismissButton = warning?.querySelector("[data-warning-close]");

  if (!form || !shell || !warning || !warningLabel || !warningTitle || !warningMessage || !warningReasons || !dismissButton) {
    return;
  }

  const regionLabelMap = {
    all: "All regions",
    global: "International / global",
    us: "United States",
    ca: "Canada",
    uk: "United Kingdom",
    eu: "Europe",
    in: "India",
    au: "Australia / New Zealand",
    other: "Other / not listed",
  };

  const showWarning = ({ approved, reasons, region }) => {
    warning.hidden = false;
    shell.hidden = false;
    body.classList.add("active-control-unlocked");
    warning.classList.toggle("control-warning--approved", approved);
    warning.classList.toggle("control-warning--danger", !approved);
    warningLabel.textContent = approved ? "Approved with caution" : "Do not try this yet";
    warningTitle.textContent = approved
      ? "You can continue, but this is still advanced and dangerous."
      : "Stop here and learn more before trying active control.";
    warningMessage.textContent = approved
      ? "You passed the basic screening, but this still demands care, supervision, and honest range discipline."
      : "This is advanced work and can injure you or other people if you rush it.";
    warningReasons.innerHTML = reasons.map((reason) => `<li>${reason}</li>`).join("");
    shell.hidden = false;
    localStorage.setItem("ignition-region", region);
  };

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const data = new FormData(form);
    const launches = Number(data.get("launches") || 0);
    const designed = Number(data.get("designed") || 0);
    const region = String(data.get("region") || "other");
    const acknowledged = data.get("acknowledge") === "on";

    const reasons = [];
    const regionLabel = regionLabelMap[region] || regionLabelMap.other;

    if (launches < 3) {
      reasons.push(`You have only launched ${launches} rocket${launches === 1 ? "" : "s"}; this is too early for active control.`);
    }

    if (designed < 1) {
      reasons.push("You should first design and simulate at least one rocket before trying this.");
    }

    if (region === "other") {
      reasons.push(`Your region is listed as ${regionLabel}, so local rules may not allow this kind of project.`);
    }

    if (!acknowledged) {
      reasons.push("You must acknowledge that this project is dangerous before continuing.");
    }

    const approved = reasons.length === 0;

    if (approved) {
      showWarning({
        approved: true,
        reasons: ["You meet the basic starter criteria, but this remains advanced and dangerous."],
        region,
      });
    } else {
      showWarning({
        approved: false,
        reasons,
        region,
      });
    }
  });

  dismissButton.addEventListener("click", () => {
    warning.hidden = true;
  });
}

function initHeroCarousel() {
  const setup = () => {
    const hero = document.querySelector('.hero-grid');
    if (!hero) return;
    const grid = hero.querySelector('.photo-grid');
    if (!grid) return;

    const isMobile = window.matchMedia('(max-width:699px)').matches;

    if (isMobile && !grid.dataset.carousel) {
      grid.dataset.carousel = 'true';
      grid.classList.add('photo-carousel');

      const controls = document.createElement('div');
      controls.className = 'photo-carousel-controls';
      controls.innerHTML = `
        <button class="carousel-prev" aria-label="Previous image">‹</button>
        <div class="carousel-dots" role="tablist"></div>
        <button class="carousel-next" aria-label="Next image">›</button>
      `;

      hero.appendChild(controls);

      const slides = Array.from(grid.querySelectorAll('.photo-slot'));
      const dotsContainer = controls.querySelector('.carousel-dots');

      slides.forEach((s, i) => {
        const btn = document.createElement('button');
        btn.type = 'button';
        btn.className = 'carousel-dot';
        btn.dataset.index = i;
        btn.setAttribute('aria-label', `Go to slide ${i + 1}`);
        dotsContainer.appendChild(btn);
      });

      const dots = Array.from(dotsContainer.children);

      const updateActive = (index) => {
        grid.dataset.active = index;
        dots.forEach((d, i) => d.classList.toggle('is-active', i === index));
      };

      const scrollToIndex = (index) => {
        const slide = slides[index];
        if (!slide) return;
        grid.scrollTo({ left: slide.offsetLeft - grid.offsetLeft, behavior: 'smooth' });
        updateActive(index);
      };

      controls.querySelector('.carousel-prev').addEventListener('click', () => {
        const current = Number(grid.dataset.active || 0);
        scrollToIndex(Math.max(0, current - 1));
      });

      controls.querySelector('.carousel-next').addEventListener('click', () => {
        const current = Number(grid.dataset.active || 0);
        scrollToIndex(Math.min(slides.length - 1, current + 1));
      });

      dots.forEach((dot) => {
        dot.addEventListener('click', () => scrollToIndex(Number(dot.dataset.index)));
      });

      let scrollTimer;
      grid.addEventListener('scroll', () => {
        clearTimeout(scrollTimer);
        scrollTimer = setTimeout(() => {
          const scrollLeft = grid.scrollLeft;
          let best = 0;
          let bestDiff = Infinity;
          slides.forEach((s, i) => {
            const diff = Math.abs(s.offsetLeft - grid.offsetLeft - scrollLeft);
            if (diff < bestDiff) { bestDiff = diff; best = i; }
          });
          updateActive(best);
        }, 80);
      });

      updateActive(0);
    } else if (!isMobile && grid.dataset.carousel) {
      // teardown
      delete grid.dataset.carousel;
      grid.classList.remove('photo-carousel');
      const controls = hero.querySelector('.photo-carousel-controls');
      if (controls) controls.remove();
      grid.removeAttribute('style');
    }
  };

  window.addEventListener('resize', setup);
  document.addEventListener('DOMContentLoaded', setup);
  // run once immediately
  setup();
}

renderNav();
renderFooter();
renderHomeSearch();
renderRegionPanel();
renderBuildSuppliers();
wireQuestionnaire();
wireRegionFilters();
wireActiveControlGate();
initHeroCarousel();
