import fs from 'node:fs';
import path from 'node:path';
import * as yaml from 'js-yaml';
import Explorer, { type Benefit, type Metadata } from './explorer';

type Source = Record<string, Record<string, Benefit[]>>;

function loadBenefits(): Benefit[] {
  const sourcePath = path.join(process.cwd(), 'sozialleistungen', 'sozialleistungen.yml');
  const source = yaml.load(fs.readFileSync(sourcePath, 'utf8')) as Source;

  return Object.entries(source).flatMap(([law, groups]) =>
    Object.entries(groups).flatMap(([group, benefits]) =>
      benefits.map((benefit) => ({ ...benefit, law, group })),
    ),
  );
}

function loadMetadata(): Metadata {
  const metadataPath = path.join(process.cwd(), 'sozialleistungen-metadata.yml');
  return yaml.load(fs.readFileSync(metadataPath, 'utf8')) as Metadata;
}

export default function Home() {
  return <Explorer benefits={loadBenefits()} metadata={loadMetadata()} />;
}