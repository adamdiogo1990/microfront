import React, { useEffect, useState } from 'react';
import HeaderTitle from '../../components/HeaderTitle';
import { Container, ContainerTable, ContentTable, CounterPagination, DateBar, Header, PaginationActions, PaginationContainer } from './styles';

import down from '../../assets/downCurrency.png';
import up from '../../assets/upCurrencyGreen.png';
import useWebSocket from 'react-use-websocket';
import { useNavigate } from 'react-router-dom';
import Paper from '@material-ui/core/Paper';
import { Grid, Table, TableFilterRow, TableHeaderRow, TableSelection } from '@devexpress/dx-react-grid-material-ui';
import { FilteringState, IntegratedFiltering, IntegratedSorting, SelectionState, SortingState } from '@devexpress/dx-react-grid';
import moment from 'moment';
import CurrencyPositionDetails from '../CurrencyPositionDetails';
import DatePicker from "react-datepicker";
import Types from '../../hooks/TypesEnum';
import {removeHour} from '../../utils/utils';

import "react-datepicker/dist/react-datepicker.css";

const CurrencyPosition: React.FC = () => {

    const navigate = useNavigate()

    const rows = [
        { id: 0, product: 'DevExtreme', owner: 'DevExpress' },
        { id: 1, product: 'DevExtreme Reactive', owner: 'DevExpress' },
    ];

    const columns = [
        { id: 1, name: 'Currency', title: 'Currency', orderCrescent: true, ordered: false, width: '12%' },
        { id: 2, name: 'OpenPosition', title: 'Open Position', orderCrescent: true, ordered: false, width: '12%' },
        { id: 3, name: 'BacenPosition', title: 'Bacen Position', orderCrescent: true, ordered: false, width: '12%' },
        { id: 5, name: 'TradePosition', title: 'Position Trade', orderCrescent: true, ordered: false, width: '12%' },
        { id: 6, name: 'ContractPosition', title: 'Position Contract', orderCrescent: true, ordered: false, width: '12%' },
        { id: 4, name: 'DiffTrade', title: 'Diff Trade', orderCrescent: true, ordered: false, width: '12%' },
        { id: 7, name: 'DiffContract', title: 'Diff contract', orderCrescent: true, ordered: false, width: '12%' }
    ]


    const [value, setValue] = useState<Date | any>(new Date());
    const [result, setResult] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [valueDate, setValueDate] = useState<any>();
    const [valueId, setValueId] = useState<any>();
    const [selection, setSelection] = useState([]);
    const [showDetails, setShowDetails] = useState(false);
    const [currencys, setCurrency] = useState([]);
    const [updates, setUpdates] = useState<any>([]);
    const [randomValue, setRandomValue] = useState<any>([]);
    const [randomDisplay, setRandomDisplay] = useState<any>([]);
    const [selectedRow, setSelectedRow] = useState<any>({});
    

    //const { lastJsonMessage, sendJsonMessage } = useWebSocket(`ws://localhost:8000/`, {
    const { lastJsonMessage, sendJsonMessage } = useWebSocket(`wss://${process.env.API_ROOT}`, {
        onOpen: (con) => console.log('Connect', con),
        onMessage: async (msg) => {
            let msgResp: any = JSON.parse(msg.data);
            if (moment(value).format('YYYY-MM-DD') == removeHour(msgResp.Date)) {
         
                let updatesList = updates;
                
                //Cenário -> Recebendo JSON de Atualização
                if (!msgResp.PartitionKey) {
                    
                    let values: any = currencys;
                    let newResult = result;
                    newResult = newResult.map((r) => {
                        if (
                            (randomDisplay[`${msgResp.Currency}${Types.BacenName}`] === undefined) 
                            && msgResp.EventType == Types.BacenEvent && r.Currency == msgResp.Currency ) {
                            updatesList.push(msgResp.Currency)
                            setUpdates(updatesList);
                            updateRandomValue(msgResp.EventType,msgResp.UpdateCounter,msgResp.Currency)
                            r.BacenPosition = msgResp.SignedAmount;
                            r.DiffTrade = calcDiffTrade(r.BacenPosition,r.TradePosition);
                            r.DiffContract = calcDiffContract(r.BacenPosition,r.ContractPosition);
                        } else if (
                            (randomDisplay[`${msgResp.Currency}${Types.TradeName}`] === undefined || msgResp.UpdateCounter >= randomDisplay[`${msgResp.Currency}${Types.TradeName}`]) && msgResp.EventType == Types.TradeEvent && r.Currency == msgResp.Currency ) {

                            updatesList.push(msgResp.Currency)
                            setUpdates(updatesList);
                            updateRandomValue(msgResp.EventType,msgResp.UpdateCounter,msgResp.Currency)
                            r.TradePosition = msgResp.SignedAmount;
                            r.DiffTrade = calcDiffTrade(r.BacenPosition,r.TradePosition);
                        } else if (
                            (randomDisplay[`${msgResp.Currency}${Types.ContractName}`] === undefined || msgResp.UpdateCounter >= randomDisplay[`${msgResp.Currency}${Types.ContractName}`]) && msgResp.EventType == Types.ContractEvent && r.Currency == msgResp.Currency ) {
 
                            updatesList.push(msgResp.Currency)
                            setUpdates(updatesList);
                            updateRandomValue(msgResp.EventType,msgResp.UpdateCounter,msgResp.Currency)
                            r.ContractPosition = msgResp.SignedAmount;
                            r.DiffContract = calcDiffContract(r.BacenPosition,r.ContractPosition);
                        } 
                        return r
                    })

                    let exists = values.includes(msgResp.Currency);
                    
                    // Caso a moeda ainda não exista
                    if (!exists) {
                        values.push(msgResp.Currency)
                        setCurrency(values);
                        let results = result;
                        let obj = {
                            Currency: msgResp.Currency,
                            BacenPosition: msgResp.EventType == Types.BacenEvent ? msgResp.SignedAmount : null,
                            TradePosition: msgResp.EventType == Types.TradeEvent ? msgResp.SignedAmount : null,
                            ContractPosition: msgResp.EventType == Types.ContractEvent ? msgResp.SignedAmount : null,
                            OpenPosition: null,
                            DiffTrade: null,
                            DiffContract: null,
                            new: true
                        }
                        obj.DiffTrade = calcDiffTrade(obj.BacenPosition,obj.TradePosition);
                        obj.DiffContract = calcDiffContract(obj.BacenPosition,obj.ContractPosition);
                        newResult.push(obj)
                        updatesList.push(msgResp.Currency)
                        setUpdates(updatesList);
                    }
                    setResult(newResult);
                } else {
                    
                    if (msg.data) {
                        let values: any = currencys;
                        let exists = values.includes(msgResp.Currency);
                        if (!exists) {
                            values.push(msgResp.Currency)
                            setCurrency(values);
                            let results = result;
                            let obj = {
                                Currency: msgResp.Currency,
                                new: true,
                                DiffTrade: null,
                                DiffContract: null,
                                BacenPosition: msgResp.SortKey == Types.BacenKey ? msgResp.SignedAmount : null,
                                OpenPosition: msgResp.SortKey == Types.OpenKey ? msgResp.SignedAmount : null,
                                TradePosition: msgResp.SortKey == Types.TradeKey ? msgResp.SignedAmount : null,
                                ContractPosition: msgResp.SortKey == Types.ContractKey ? msgResp.SignedAmount : null
                            }
                            obj.DiffTrade = calcDiffTrade(obj.BacenPosition,obj.TradePosition);
                            obj.DiffContract = calcDiffContract(obj.BacenPosition,obj.ContractPosition);
                            results.push(obj)
                            setResult(results)
                            updatesList.push(msgResp.Currency)
                            setUpdates(updatesList);
                            updateRandomValue(msgResp.SortKey,msgResp.UpdateCounter,msgResp.Currency)
                        } else {
                            let newResult = result;
                            newResult = newResult.map((r) => {


                                if (r.Currency == msgResp.Currency) {
                                    if ((randomDisplay[`${msgResp.Currency}${Types.BacenName}`] === undefined)  && msgResp.SortKey == Types.BacenKey ) {
                                        r.BacenPosition = msgResp.SignedAmount;
                                        r.DiffTrade = calcDiffTrade(r.BacenPosition,r.TradePosition);
                                        r.DiffContract = calcDiffContract(r.BacenPosition,r.ContractPosition);
                                        updatesList.push(msgResp.Currency)
                                        setUpdates(updatesList);
                                        updateRandomValue(msgResp.SortKey,msgResp.UpdateCounter,msgResp.Currency)
                                    } else if ((randomDisplay[`${msgResp.Currency}${Types.OpenName}`] === undefined || msgResp.UpdateCounter >=randomDisplay[`${msgResp.Currency}${Types.OpenName}`])  && msgResp.SortKey == Types.OpenKey) {
                                        r.OpenPosition = msgResp.SignedAmount;
                                        updatesList.push(msgResp.Currency)
                                        setUpdates(updatesList);
                                        updateRandomValue(msgResp.SortKey,msgResp.UpdateCounter,msgResp.Currency)
                                    } else if ((randomDisplay[`${msgResp.Currency}${Types.TradeName}`] === undefined || msgResp.UpdateCounter >=randomDisplay[`${msgResp.Currency}${Types.TradeName}`])  && msgResp.SortKey == Types.TradeKey) {
                                        r.TradePosition = msgResp.SignedAmount;
                                        r.DiffTrade = calcDiffTrade(r.BacenPosition,r.TradePosition);
                                        updatesList.push(msgResp.Currency)
                                        setUpdates(updatesList);
                                        updateRandomValue(msgResp.SortKey,msgResp.UpdateCounter,msgResp.Currency)
                                    } else if ((randomDisplay[`${msgResp.Currency}${Types.ContractName}`] === undefined || msgResp.UpdateCounter >=randomDisplay[`${msgResp.Currency}${Types.ContractName}`])  && msgResp.SortKey == Types.ContractKey) {
                                        r.ContractPosition = msgResp.SignedAmount;
                                        r.DiffContract = calcDiffContract(r.BacenPosition,r.ContractPosition);
                                        updatesList.push(msgResp.Currency)
                                        setUpdates(updatesList);
                                        updateRandomValue(msgResp.SortKey,msgResp.UpdateCounter,msgResp.Currency)
                                    }
                                }



                                return r
                            })
                            setResult(newResult)
                        }
                    }
                }
                await delay(5000)
                let upd: any = updates.splice(updates.indexOf(msgResp.Currency), 1);
                setUpdates(upd)
                if (updates.length == 0) {
                    setUpdates([])
                }
            }
        },
        onError: (error) => {
            console.log("error", error)
        },
        shouldReconnect: (closeEvent) => true,

    })

    const calcDiffTrade = (positionBacen:any, positionTrade:any):any => {
        if(positionBacen === null || positionTrade === null){
            return 'Missing'
        }else{
            return parseFloat(positionBacen) - parseFloat(positionTrade)
        }
    }

    const calcDiffContract = (positionBacen:any, positionContract:any):any => {
        if(positionBacen === null || positionContract === null){
            return 'Missing'
        }else{
            return parseFloat(positionBacen) - parseFloat(positionContract)
        }
    }

    const updateRandomValue = (type:any,value:any,currency:any) => {
        let typeStr;
        if(type == Types.TradeEvent || type == Types.TradeKey){
            typeStr = Types.TradeName
        }else if(type == Types.BacenEvent || type == Types.BacenKey){
            typeStr = Types.BacenName
        }else if(type == Types.ContractEvent || type == Types.ContractKey){
            typeStr = Types.ContractName
        }else if(type == Types.OpenName){
            typeStr = Types.OpenName
        }
        let actual = randomValue;
        let display = randomDisplay;
        let exists = actual.includes(`${currency}${typeStr}`);
        if (!exists) {
            actual.push(`${currency}${typeStr}`);
            setRandomValue(actual);
            display[`${currency}${typeStr}`] = value;
            setRandomDisplay(display)
        }else{
            if(value > display[`${currency}${typeStr}`]){
                display[`${currency}${typeStr}`] = value;
                setRandomDisplay(display)
            }
        }
    }

    useEffect(() => {
        if (value) {
            setRandomDisplay([])
            setResult([]);
            setCurrency([]);
            let dateValue = moment(value).format('YYYY-MM-DD');
            sendJsonMessage({
                'action': 'broadcastData',
                'data': dateValue
            })
            setInterval(function () {
                sendJsonMessage({
                    'action': 'broadcastData',
                    'data': dateValue
                })
            }, 200000);

        } else {
            setResult([]);
            setLoading(false);
        }

    }, [value]);

    const refresh = () => {
        setResult([]);
        setCurrency([]);
        let dateValue = moment(value).format('YYYY-MM-DD');
        sendJsonMessage({
            'action': 'broadcastData',
            'data': dateValue
        })
    }

    const resetUpdated = (value: any) => {
        let updatesList = updates;
        updatesList[value] = 0;
        setUpdates(updatesList);
    }

    const returnNumb = (val: any) => {
        if(val){
            return val.replace("-", "").replace("$", "");
        }
        
    }

    const returnNum = (val:any,val2:any) => {
        if(val2.row.Currency){
            return returnNumb(formatVal('USD').format(val));
        }else{
            return null
        }    
    }

    const formatVal = (currency:any) => {
        return new Intl.NumberFormat('en-US', {
            style: "currency",
            currency: currency,
            useGrouping: true
        });
    }

    const checkUpdate = (value: any) => {
        let values: any = updates;
        let exists = values.includes(value);
        if (exists) {
            return true
        } else {
            return false;
        }
    }

    const delay = (num: number): Promise<boolean> => {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(true)
            }, num)
        })
    }

    const getRow = (e: any) => {
        setSelectedRow(result[e]);
        let dateValue = moment(result[e].date).format('YYYY-MM-DD');
        setValueDate(dateValue)
        setValueId(result[e].currency)
        setShowDetails(true)
    }

    const back = () => {
        setShowDetails(false)
    }

    const formatCellCustom = (props: any) => {
        return <>
        {
                    parseInt(props.value) < 0 && (
                        <>
                            <span className='downCurrency'>{returnNum(props.value,props)}</span>
                            <div className='downCurrency'>
                                <img src={down} alt="Logo" />
                            </div>
                        </>
                    )
                }
                {
                    parseInt(props.value) == 0 && (
                        <>
                            <span>{returnNum(props.value,props)}</span>
                        </>
                    )
                }
                {
                    parseInt(props.value) > 0 && (
                        <>
                            <span className='upCurrency'>{returnNum(props.value,props)}</span>
                            <div className='upCurrency'><img src={up} alt="Logo" /></div>
                        </>
                    )
                }
                </>
    }

    const Cell = (props: any) => {
        const { column } = props;
        if (column.name === 'Currency') {
            return <td><div className='tdDefault'>
                {props.value}
                {
                    checkUpdate(props.value) && (
                        <div className='new'>Updated</div>
                    )
                }
            </div></td>;
        } else if(
            column.name === 'DiffTrade' || 
            column.name === 'DiffContract'
        ){
            return( <td><div className='tdDefaultIMG bacenOpen'>
                {
                    props.value == 'Missing' ? 'Missing' : formatCellCustom(props)
                } </div></td>)
            
        
        } else if (
            column.name === 'BacenPosition' || 
            column.name === 'OpenPosition' || 
            column.name === 'TradePosition' || 
            column.name === 'ContractPosition') {
            return <td><div className='tdDefaultIMG bacenOpen'>

                {
                    parseInt(props.value) < 0 && (
                        <>
                            <span className='downCurrency'>{returnNum(props.value,props)}</span>
                            <div className='downCurrency'>
                                <img src={down} alt="Logo" />
                            </div>
                        </>
                    )
                }
                {
                    parseInt(props.value) == 0 && (
                        <>
                            <span>{returnNum(props.value,props)}</span>
                        </>
                    )
                }
                {
                    parseInt(props.value) > 0 && (
                        <>
                            <span className='upCurrency'>{returnNum(props.value,props)}</span>
                            <div className='upCurrency'><img src={up} alt="Logo" /></div>
                        </>
                    )
                }
            </div></td>;
        } else {
            return <td><div className='tdDefault'>
                {props.value}
            </div></td>;
        }
        return <Table.Cell {...props} />;
    };

    return (
        <Container>
            {
                !showDetails && (
                    <>
                        <Header>
                            <h1>Posições</h1>
                            <button onClick={() => refresh()}>Atualizar</button>
                        </Header>

                        <HeaderTitle>
                            <span>Posições Cambiais</span>
                        </HeaderTitle>
                        <ContainerTable>
                            <DateBar>
                                <div className="customDatePickerWidth">
                                    <DatePicker dateFormat="dd/MM/yyyy"
                                        selected={value} onChange={(date: Date) => setValue(date)}
                                        value={value} />
                                </div>
                            </DateBar>

                            <ContentTable>
                                <Paper>
                                    <Grid
                                        rows={result}
                                        columns={columns}
                                    >
                                        <SelectionState
                                            selection={selection}
                                            onSelectionChange={(e) => getRow(e)}
                                        />
                                        <SortingState />
                                        <IntegratedSorting />
                                        <FilteringState defaultFilters={[]} />
                                        <Table cellComponent={Cell} />
                                        <TableHeaderRow showSortingControls />
                                        <TableSelection
                                            selectByRowClick
                                            highlightRow
                                            showSelectionColumn={false}
                                        />
                                    </Grid>
                                </Paper>
                            </ContentTable>
                        </ContainerTable>
                    </>
                )}

            {
                showDetails && (
                    <CurrencyPositionDetails
                        data={valueDate}
                        back={back}
                        currency={selectedRow.Currency}
                        openPosition={selectedRow.OpenPosition}
                        bacenPosition={selectedRow.BacenPosition}
                        contractPosition={selectedRow.ContractPosition}
                        tradePosition={selectedRow.TradePosition}
                        diffTrade={selectedRow.DiffTrade}
                        diffContract={selectedRow.DiffContract}
                    ></CurrencyPositionDetails>
                )
            }
        </Container>



    );
}

export default CurrencyPosition;
