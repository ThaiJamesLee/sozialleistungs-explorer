# Sozialleistungs Explorer

A static web app for searching and filtering social benefits by law, target group, and topic.

The app is built with Next.js and exports a static site for GitHub Pages. The source data is maintained in the [`sozialleistungen`](sozialleistungen/) Git submodule and supplemented by [`sozialleistungen-metadata.yml`](sozialleistungen-metadata.yml).

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

The data in the [`sozialleistungen`](sozialleistungen/) submodule is licensed separately under [Creative Commons Attribution-ShareAlike 4.0 International (CC BY-SA 4.0)](sozialleistungen/LICENSE). The MIT License does not relicense or replace that data license. Please preserve the required attribution and ShareAlike terms when reusing or adapting the submodule data.

The metadata file [`sozialleistungs-metadata.yml`](sozialleistungs-metadata.yml) provides law names and links to legal or information sources used by the app. Those external sources may have their own terms.

## Source

The data repository includes references to the underlying publication and methodology in [`sozialleistungen/README.md`](sozialleistungen/README.md).
