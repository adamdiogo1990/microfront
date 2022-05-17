import DefaultModel from "./DefaultModel";

export default interface ICurrencyPosition extends DefaultModel{
    currency:string;
    openPosition:string;
    cam:string;
    positionWithoutContract: string;
    diffWithoutContract: string;
    positionWithContract: string;
    diffWithContract: string;
    date: string;
}