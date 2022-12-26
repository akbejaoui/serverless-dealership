import * as dealerService from '@services/dealerService'
import * as vehicleService from '@services/vehicleService';

export default {
  Query: {
    vehicles: () => vehicleService.getAllVehicles(),
    vehicle: (_, args) => vehicleService.getVehicle(args.id),
  },
  Mutation: {
    createVehicle: (_, args) => vehicleService.createVehicle(args),
    updateVehicle: (_, args) => vehicleService.updateVehicle(args),
    deleteVehicle: (_, args) => vehicleService.deleteVehicle(args),
  },
  Vehicle: {
    dealer: vehicle => dealerService.getDealer(vehicle.dealer_id),
  },
};