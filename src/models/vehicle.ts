import { v4 } from "uuid"
import VehicleFuelEnum from "./VehicleFuelEnum"
import VehicleTransmissionEnum from "./VehicleTransmissionEnums"
import VehicleTypeEnum from "./VehicleTypeEnum"
import { ModelMapper } from "./modelMapperInterface"

export interface VehicleDataInterface {
    dealer_id: string
    sk?: string
    make: string
    model: string
    transmission: VehicleTransmissionEnum
    fuelType: VehicleFuelEnum
    mileage: number
    vehicleType: VehicleTypeEnum
    color: string
}

export interface VehicleInterface extends VehicleDataInterface {
    created_at: string
    last_updated: string
}

export default class VehicleModel implements ModelMapper {
    private _dealerId: string
    private _vehicleId: string
    private _make: string
    private _model: string
    private _transmission: VehicleTransmissionEnum
    private _fuelType: VehicleFuelEnum
    private _mileage: number
    private _vehicleType: VehicleTypeEnum
    private _vehicleColor: string

    constructor({ sk = v4(), dealer_id, vehicleType, make, model, mileage, transmission, color, fuelType }: VehicleDataInterface) {
        this._dealerId = dealer_id
        this._vehicleId = sk
        this._make = make
        this._model = model
        this._transmission = transmission
        this._fuelType = fuelType
        this._mileage = mileage
        this._vehicleType = vehicleType
        this._vehicleColor = color
    }

    getMappedObject = <VehicleInterface>() =>
        ({
            dealer_id: this._dealerId,
            sk: `vehicle_${this._vehicleId}`,
            make: this._make,
            model: this._model,
            transmission: this._transmission,
            fuelType: this._fuelType,
            mileage: this._mileage,
            vehicleType: this._vehicleType,
            color: this._vehicleColor,
            created_at: new Date().toISOString(),
            last_updated: new Date().toISOString(),
        } as VehicleInterface)
}
