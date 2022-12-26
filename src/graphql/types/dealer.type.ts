export default `
    type Dealer @cacheControl(maxAge: 3600, scope: PUBLIC){
        dealer_id: ID!
        sk: String
        dealer_name: String
        created_at: String
        last_updated: String
        vehicles: [Vehicle]
    }

    type Query {
        dealers: [Dealer]
        dealer(dealer_id: ID!): Dealer
    }

    type Mutation {
        createDealer(
            dealer_name: String!
          ): Dealer
        updateDealer(
            dealer_id: ID!
            dealer_name: String!
          ): Dealer
        deleteDealer(
            dealer_id: ID!
          ): Dealer
    }

    enum CacheControlScope {
        PUBLIC
        PRIVATE
      }
      
    directive @cacheControl(
        maxAge: Int
        scope: CacheControlScope
        inheritMaxAge: Boolean
      ) on FIELD_DEFINITION | OBJECT | INTERFACE | UNION
`