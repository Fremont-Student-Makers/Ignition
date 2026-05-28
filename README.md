# Ignition

Ignition is a minimal educational rocketry website created by Dylan Kwok as part of Fremont Student Makers.

## What’s included

- Single-page static site
- Navigation and footer loaded from JSON embedded in `index.html`
- One small questionnaire form with light JavaScript handling
- No Vite, no build step, no framework dependency
- Content-first structure designed to stay easy to edit by hand

## Editing

Open `index.html`, `styles.css`, and `main.js` directly in VS Code.

## GitHub Pages deployment

1. Push the repository to GitHub.
2. In repository settings, enable GitHub Pages from the `main` branch and root folder.
3. Keep the `CNAME` file at the repo root to use `ignition.fremontstudentmakers.org`.
4. Add the DNS record GitHub Pages asks for in your domain provider.
5. Wait for DNS propagation, then verify the site.

## Maintenance

- Update the nav or footer by editing the JSON inside `index.html`.
- Update page content directly in `index.html`.
- Adjust questionnaire behavior in `main.js`.
- No package install or build command is required.
- Keep future growth small: add sections, lists, and simple cards before considering anything more complex.
- For regional coverage, start with broad country or region groupings before trying to add location lookup or maps.
