const fs = require('node:fs');
const path = require('node:path');
const yaml = require('js-yaml');
const Ajv = require('ajv/dist/2020');

const inputPath = process.env.INPUT_FILE || 'sozialleistungen/sozialleistungen.yml';
const absoluteInputPath = path.resolve(process.cwd(), inputPath);
const schemaPath = path.join(__dirname, 'sozialleistungen.schema.json');

try {
	const document = yaml.load(fs.readFileSync(absoluteInputPath, 'utf8'));
	const schema = JSON.parse(fs.readFileSync(schemaPath, 'utf8'));
	const ajv = new Ajv({ allErrors: true, strict: true });
	const validate = ajv.compile(schema);

	if (!validate(document)) {
		const errors = validate.errors
			.map((error) => `${error.instancePath || '/'} ${error.message}`)
			.join('\n');
		throw new Error(`YAML validation failed:\n${errors}`);
	}

	console.log(`Validated ${inputPath} successfully.`);
} catch (error) {
	console.error(error instanceof Error ? error.message : error);
	process.exitCode = 1;
}
