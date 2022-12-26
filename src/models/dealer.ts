import { ModelMapper } from "./modelMapperInterface"
import { v4 } from "uuid"

interface DealerDataInterface {
    dealer_id?: string
    dealer_name: string
}

export interface DealerInterface extends DealerDataInterface {
    created_at: string
    last_updated: string
}

export default class Dealer implements ModelMapper {
    private _dealerId: string
    private _dealerName: string

    constructor({ dealer_id = v4(), dealer_name }: DealerDataInterface) {
        this._dealerId = dealer_id
        this._dealerName = dealer_name
    }

    getMappedObject = <DealerInterface>() => ({
        dealer_id: `dealer_${this._dealerId}`,
        dealer_name: this._dealerName,
        created_at: new Date().toISOString(),
        last_updated: new Date().toISOString(),
    }) as DealerInterface
}
