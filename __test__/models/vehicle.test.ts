import { describe, expect, test } from "@jest/globals"

import VehicleTransmissionEnum from "@models/vehicleTransmissionEnums"
import VehicleModel, { VehicleInterface } from "@models/vehicle"

const vehicleData = {
    dealer_id: "dealer_random_id",
    make: "Audi",
    model: "A4",
    transmission: VehicleTransmissionEnum.AUTO,
}

describe("Vehicle model tests", () => {
    test("vehicle model should generate a valid vehicle object", () => {
        const vehicleObject = new VehicleModel(vehicleData as VehicleInterface).getMappedObject<VehicleInterface>()
        expect(vehicleObject.dealer_id).toBeDefined()
        expect(vehicleObject.created_at).toBeDefined()
        expect(vehicleObject.last_updated).toBeDefined()
        expect(vehicleObject.sk).toBeDefined()
        expect(vehicleObject.make).toBe(vehicleData.make)
        expect(vehicleObject.dealer_id).toBe(vehicleData.dealer_id)
    })
})
