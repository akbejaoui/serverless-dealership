import * as dealerService from '@services/dealerService'
import * as vehicleService from '@services/vehicleService';

export default {
  Query: {
    dealers: () => dealerService.getAllDealers(),
    dealer: (_, args) => dealerService.getDealer(args.dealer_id),
  },
  Mutation: {
    createDealer: (_, args) => dealerService.createDealer(args),
    updateDealer: (_, args) => dealerService.updateDealer(args),
    deleteDealer: (_, args) => dealerService.deleteDealer(args),
  },
  Dealer: {
    vehicles: dealer => vehicleService.getAllVehiclesByDealer(dealer.dealer_id),
  },
};