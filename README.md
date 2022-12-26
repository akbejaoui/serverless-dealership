# Serverless GraphQL TypeScript DynamoDB dealership example ![GitHub](https://img.shields.io/github/license/mashape/apistatus.svg)

## Prerequistes

* AWS installed and configured with ``` aws configure ```
* NodeJs (use version in .nvmrc file)
* Serverless installed globally with ``` yarn add -g serverless ```
* Docker installed to run dynamodb locally

## How to get started

Move to dynamodb folder in the root of the project and run

```
docker-compose up -d
```
this will start dynamodb locally


To run Unit tests
```
yarn run unit:test
```

to run the project offline 
```
yarn run dev
```

to deploy to dev stage
```
yarn run deploy
```

## Graphql
### Mutations

```
# to create a new dealer

    mutation {
        createDealer(dealer_name: "abejaoui inc") {
            dealer_id
            sk
            dealer_name
            created_at
            last_updated
        }
    }
```

```
# to update dealer

mutation {
        updateDealer(dealer_id: ":dealer_id", dealer_name: "instamotion"){
            dealer_name
            dealer_id
            last_updated
        }
    }
```

```
# to delete dealer
mutation {
        deleteDealer(dealer_id: ":dealer_id") {}
    }
```

```
# to create vehicle
mutation {
    createVehicle (
        model: "A5",
        make: "AUDI",
        mileage: 12344,
        transmission: AUTO,
        fuelType: PETROL,
        vehicleType: SUV,
        color: "black",
        dealer_id: ":dealer_id") {
        model
        make
    }
}
```

```
# to update vehicle
 mutation {
        updateVehicle(
            dealer_id: ":dealer_id",
            sk: ":vehicle_id",
            transmission: AUTO,
            fuelType: PETROL,
            vehicleType: SUV
        ){
            transmission
            fuelType
            vehicleType
            last_updated
        }
    }
```

```
# to delete a vehicle
 mutation {
        deleteVehicle(dealer_id: ":dealer_id", sk: ":vehicle_id") {
            dealer_id
        }
    }
```

### Queries

```
# fetch all vehicles with dealer name
 {
    vehicles {
        sk
        model
        dealer {
            dealer_name
        }
    }
}
```

```
# fetch all dealers with all vehicles attached to each dealer
{
    dealers {
        dealer_id
        sk
        dealer_name
        created_at
        vehicles {
            make
            model
        }
    }
}
```

