# Sozialleistungs Explorer

A static web app for searching and filtering social benefits by law, target group, and topic.

The app is built with Next.js and exports a static site for GitHub Pages. It includes source data from the [original `sozialleistungen` repository](https://github.com/ifo-institute/sozialleistungen) as a Git submodule, supplemented by [`sozialleistungs-metadata.yml`](sozialleistungs-metadata.yml). This project does not maintain the submodule data; please refer to the original repository for its maintenance and updates.

## Development

Install dependencies and start the development server:

```bash
npm ci
npm run dev
```

Create the production static export locally:

```bash
npm run build
```

The generated site is written to `out/`. The GitHub Actions workflow uploads that directory as the GitHub Pages artifact and deploys it when changes are pushed to `main`.

## Data and licensing

The application code in this repository is licensed under the [MIT License](LICENSE).

The data included through the [`sozialleistungen`](sozialleistungen/) submodule is licensed separately under [Creative Commons Attribution-ShareAlike 4.0 International (CC BY-SA 4.0)](sozialleistungen/LICENSE). The MIT License does not relicense or replace that data license. Please refer to the [original repository](https://github.com/ifo-institute/sozialleistungen) for the data's provenance, maintenance, and reuse requirements.

The metadata file [`sozialleistungs-metadata.yml`](sozialleistungs-metadata.yml) provides law names and links to legal or information sources used by the app. Those external sources may have their own terms.

## Source

The [original data repository](https://github.com/ifo-institute/sozialleistungen) contains references to the underlying publication and methodology.
