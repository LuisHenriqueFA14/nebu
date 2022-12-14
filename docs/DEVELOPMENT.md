# Development

These informations should help you when developing the project. =)

## Stack

- `TypeScript`: JavaScript superset that allows us to define types for variables.
- `Serverless`: Framework for using and developing *serverless functions*.
- `Prisma`: ORM to universalize different database functions.
- `Jest`: Tool to perform automated tests.
- `MongoDB`: Non-relational database used.
- `JWT`: Framework that helps with the use of cookies and authentication.
- `BcryptJS`: Encryption of passwords for storage in the database.

## Database fields

### User:

- `Id` → String (*uuid*)
- `E-mail` → String
- `Username` → String
- `Name` → String
- `Password` → String (*bcrypt*)
- `Projects` → String[] (*uuid[]*)
- `Accounts` → String[] (``${plataforma};${username}``)
- `Picture` → String

### Projects

- `Id` → String (*uuid*)
- `Owner` → String (*uuid*)
- `Title` → String
- `Description` → String
- `Path` → String (``${username}/${title}``)
- `Platform` → String
- `Link` → String
- `Tags` → String[]

## Files

### Folder structure:

```tsx
- prisma/               // Prisma settings
- dist/                 // Files transpiled to JavScript
- src/
    - __tests__/        // Codes for performing automated tests.
        - functions/    // Store the *handler* of each function.
        - services/     // Codes that perform connection services.
        - utils/        // Codes with some useful functionality.
        - database/     // Files that connect the database with the application.
```

### Configuration files

```tsx
- netlify.toml          // Netlify serverless settings.
- tsconfig.json         // TypeScript settings.
- babel.config.js       // Babel settings.
- jest.config.js        // Jest settings.
- .env                  // Private environment files.
- .gitignore            // Files to be ignored by *git*.
```

## Testing

You can execute the unit tests executing:

```bash
yarn test
# or
npm run test
```

## Contributing

You can contribute with the project creating an `issue` or opening a `pull request`. =)

Thank you! <3
