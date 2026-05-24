function parseJsonScript(id) {
  const element = document.getElementById(id);
  if (!element) return null;
  try {
    return JSON.parse(element.textContent || "null");
  } catch {
    return null;
  }
}

function renderNav(navData) {
  const header = document.getElementById("site-header");
  if (!header || !navData) return;

  const groupsMarkup = navData.groups
    .map((group) => {
      const itemsMarkup = group.items
        .map(
          (item) => `<a class="nav-link" href="#${item.anchor}">${item.label}</a>`,
        )
        .join("");

      return `
        <details class="nav-group ${group.tone}">
          <summary>${group.label}</summary>
          <div class="nav-group-menu">${itemsMarkup}</div>
        </details>
      `;
    })
    .join("");

  header.innerHTML = `
    <div class="container header-grid">
      <a class="brand" href="#home">Ignition</a>
      <button class="nav-toggle" type="button" aria-expanded="false" aria-controls="site-nav">
        <span></span><span></span><span></span>
        <span class="sr-only">Toggle navigation</span>
      </button>
      <nav class="main-nav" id="site-nav" aria-label="Primary navigation">
        ${groupsMarkup}
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

function renderFooter(footerData) {
  const footer = document.getElementById("site-footer");
  if (!footer || !footerData) return;

  footer.innerHTML = `
    <div class="container footer-grid">
      <p>${footerData.credit}</p>
      <nav class="footer-nav" aria-label="Footer navigation">
        ${footerData.links.map((link) => `<a href="#${link.anchor}">${link.label}</a>`).join("")}
      </nav>
    </div>
  `;
}

function wireQuestionnaire() {
  const form = document.getElementById("starter-form");
  const result = document.getElementById("starter-result");
  if (!form || !result) return;

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const data = new FormData(form);
    const experience = data.get("experience");
    const goal = data.get("goal");
    const club = data.get("club");

    let message = "Start with a small starter kit and a local launch group.";

    if (experience === "new" && goal === "kit") {
      message = club === "yes"
        ? "Start with a beginner kit and bring it to a club launch for help with setup."
        : "Start with a beginner kit, then look for a local club or launch day before flying.";
    } else if (experience === "some" && goal === "build") {
      message = club === "yes"
        ? "Try a slightly larger kit and ask your club about recovery and motor choices."
        : "Build one more simple rocket first, then join a club for your next step.";
    } else if (experience === "lot" && goal === "club") {
      message = "You are ready for club launches, safety review, and more advanced recovery practice.";
    }

    result.textContent = message;
  });
}

renderNav(parseJsonScript("nav-data"));
renderFooter(parseJsonScript("footer-data"));
wireQuestionnaire();
