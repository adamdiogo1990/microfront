export const removeHour = (val:any) => {
    if(val){
        let retorno = val.split("T");
        return retorno[0];
    }
}