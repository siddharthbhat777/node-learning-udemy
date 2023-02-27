const { buildSchema } = require("graphql");

// '!' means the field is required
module.exports = buildSchema(`
    type TestData {
        text: String!
        views: Int!
    }

    type RootQuery {
        hello: TestData
    }

    schema {
        query: RootQuery
    }
`);