export default `
  type Vehicle {
    dealer_id: ID!
    sk: ID!
    make: String
    model: String
    transmission: VehicleTransmissionEnum
    fuelType: VehicleFuelEnum
    mileage: Int
    vehicleType: VehicleTypeEnum
    color: String
    dealer: Dealer
    created_at: String
    last_updated: String
  }

  enum VehicleFuelEnum {
    PETROL
    DIESEL
    ELECTRIC
    LPG
    HYBRID
 }

 enum VehicleTransmissionEnum {
    MANUAL
    SEMI_AUTO
    AUTO
}

enum VehicleTypeEnum {
    CABRIOLET
    COUPE
    ESTATE
    CAR
    SUV
    SALOON
    VAN
    SMALL
    OTHER
}

  type Query {
    vehicles: [Vehicle]
    vehicle(id: ID!): Vehicle
  }

  type Mutation {
    createVehicle(
      dealer_id: ID!
      make: String!
      model: String!
      mileage: Int!
      transmission: VehicleTransmissionEnum!
      fuelType: VehicleFuelEnum!
      vehicleType: VehicleTypeEnum!
      color: String!
    ): Vehicle
    updateVehicle(
      sk: ID!
      dealer_id: ID!
      make: String
      model: String
      mileage: Int
      transmission: VehicleTransmissionEnum
      fuelType: VehicleFuelEnum
      vehicleType: VehicleTypeEnum
      color: String
    ): Vehicle
    deleteVehicle(
      dealer_id: ID!
      sk: ID!
    ): Vehicle
  }
`;