# Nebu

This repository contains the serverless backend of Nebu.

## Usage

To install the dependencies run this on your terminal:

```bash
yarn --prod
# or
npm i --production
```

You need to configure some `.env` variables before getting started, such as:

```bash
DATABASE_URL="<YOUR_MONGODB_URL>"
JWT_SECRET_TOKEN="<YOUR_JWT_SECRET_TOKEN>"
```

To run the serverless functions you need to have installed the [netlify cli](https://github.com/netlify/cli). After installing the cli, run this:

```bash
netlify dev
```

Wait some seconds and then the development environment will be ready!

## Functions

After the steps, the functions will be available at `http://localhost:8888/.netlify/functions/<FUNCTION>`

And the functions are:

### Users:

- `cadaster`
- `login`
- `update`
- `update_password`
- `info`
- `search`

### Projects:

- `create`
- `update_project`
- `project_info`
- `search_project`
- `delete_project`

For more details, take a look at the [functions docs](docs/FUNCTIONS.md).

## Development

If you want to help in the project development, install the dev dependencies:

```bash
yarn i
# or
npm i
```

And learn about the project with the [development docs](docs/DEVELOPMENT.md).
