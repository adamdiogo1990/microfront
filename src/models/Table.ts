import React from "react";

export default interface ITable{
    id:number;
    column:string;
    name:string;
    orderCrescent: boolean;
    ordered: boolean;
    width: string;
    icon?: React.Component;
}