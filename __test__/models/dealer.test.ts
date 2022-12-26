import {describe, expect, test} from '@jest/globals';
import DealerModel, { DealerInterface } from '@models/Dealer';


describe("Dealer model tests", () => {
    test('dealer model should generate a valid dealer object', () => {
        const dealerObject = new DealerModel({ dealer_name: 'ahmed'}).getMappedObject<DealerInterface>()
        expect(dealerObject.dealer_id).toBeDefined()
        expect(dealerObject.created_at).toBeDefined()
        expect(dealerObject.last_updated).toBeDefined()
        expect(dealerObject.dealer_name).toBe("ahmed")
    })
})
