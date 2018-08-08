# @unic/estatico-boilerplate [WIP]

Demo repo based on old Estático. Tasks were completely replaced with new ones and the source files were adapted where necessary.

## Installation

```bash
# Use git to get boilerplate subpackage from monorepo
git clone https://github.com/unic/estatico-nou.git
cd estatico-nou
git filter-branch --subdirectory-filter packages/estatico-boilerplate

# Optionally use Docker container, see below

# Install correct node version
nvm install

# Install npm packages
npm install
```

## Usage

- Run default task, building everything and starting web server: `$ npm run gulp -- --dev --watch`
- Run specific task: `$ npm run html -- --dev`

See `gulpfile.js` for details.

## Docker

```bash
# Create image (only initially and after changes to the Dockerfile)
docker build -t estatico .

# Start container and mount project directory
docker container run -it -p 9000:9000 -p 35729:35729 -v $(pwd):/app estatico /bin/bash

# Continue above (nvm is preinstalled in the box)
```

## License

Apache 2.0.
