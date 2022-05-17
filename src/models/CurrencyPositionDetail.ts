import DefaultModel from "./DefaultModel";

export default interface ICurrencyPositionDetails extends DefaultModel{
   openPosition:string;
   cam:string;
   positionWithoutContract: string;
   positionWithContract: string;
   date: string;
   trades: ITrade[];

}

export interface ITrade {
    coin:string;
    trade:string;
    side:string;
    amount:string;
    status: string;
    contractId: string;
    hour: string;
}