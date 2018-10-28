# raisin-theme
A frontend build for OLAT

Based on  @unic/estatico-boilerplate

## Dependencies

 - GraphicMagick

## Installation

```bash
# Use git to get boilerplate subpackage from monorepo
# We are only interested in the current directory, so we can get rid of everthing else via `git filter-branch`
git clone https://github.com/tomgross/raisin-theme.git
cd raisin-theme

# Install correct node version
yarn install

```

## Usage

- Run default task, building everything and starting web server: `$ npm run gulp -- --dev --watch`
- Run specific task: `$ npm run html -- --dev`

See `gulpfile.js` for details.

## License

Apache 2.0.
