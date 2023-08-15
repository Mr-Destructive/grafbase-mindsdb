# MindsDB Grafbase GraphQL API

A GraphQL API for MindsDB using Grafbase. It allows you to interact with MindsDB databases, projects, models, and more through a GraphQL interface.


https://github.com/Mr-Destructive/grafbase-mindsdb/assets/40317114/0ff1386d-a896-49b1-9cff-a1830c3851a7

## Features

- Query MindsDB databases, projects, models, tables, and views
- Create, update, and delete databases, projects, models, tables, and views
- Make predictions using MindsDB models
- Run SQL queries directly on MindsDB databases
- Leverages Grafbase for auto-generated GraphQL schema and resolvers

## Getting Started

### Prerequisites

- Node.js (recommended v20)
- MindsDB instance running
- Grafbase CLI

### Installation

```
git clone https://github.com/mr-destructive/grafbase-mindsdb
cd grafbase-mindsdb
npm install
```

## Usage

Get the local Graphbase server running

```
grafbase dev
```

The GraphQL playground will now be available at `http://localhost:4000`.

See the Grafbase docs for more info on configuring and deploying your API.

## Contributing

Pull requests are welcome! Feel free to open issues for any bugs or desired features.

## License

This project is licensed under the MIT license. See LICENSE for more info.
