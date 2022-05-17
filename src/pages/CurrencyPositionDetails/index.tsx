import React, { useEffect, useState } from 'react';
import HeaderTitle from '../../components/HeaderTitle';
import { BoxReport, Container, ContainerTable, ContentReport, ContentTable, CounterPagination, DataDescription, DateBar, FooterTable, InfoDescription, PaginationActions, PaginationContainer, TextDescription } from './styles';

import { Button, DatePicker, Divider, Input, InputGroup } from 'rsuite';
import down from '../../assets/downCurrency.png';
import up from '../../assets/upCurrencyGreen.png';
import ITable from '../../models/Table';
import HeaderTableColumn from '../../components/HeaderTableColumn';
import { FaArrowRight, FaCalendar, FaDollarSign, FaSearch } from 'react-icons/fa';
import { useTable } from '../../hooks/Table';
import api from '../../services/api';
import ICurrencyPositionDetails from '../../models/CurrencyPositionDetail';
import { Link, useParams } from 'react-router-dom';
import Paper from '@material-ui/core/Paper';
import { Grid, Table, TableFilterRow, TableHeaderRow } from '@devexpress/dx-react-grid-material-ui';
import { FilteringState, IntegratedFiltering, IntegratedPaging, IntegratedSorting, PagingState, SortingState } from '@devexpress/dx-react-grid';
import moment from 'moment';
import {
    PagingPanel
} from '@devexpress/dx-react-grid-material-ui';

const CurrencyPositionDetails: React.FC<any> = ({ data, currency, openPosition, bacenPosition, contractPosition, tradePosition, diffTrade, diffContract, back }) => {

    const columns = [
        { id: 1, name: 'tradeId', title: 'Trade', orderCrescent: true, ordered: false, width: '14%' },
        { id: 2, name: 'side', title: 'Side', orderCrescent: true, ordered: false, width: '14%' },
        { id: 3, name: 'signedAmount', title: 'Amount', orderCrescent: true, ordered: false, width: '14%' },
        { id: 4, name: 'movementStatus', title: 'Status', orderCrescent: true, ordered: false, width: '14%' },
        { id: 5, name: 'contractNumber', title: 'Contract ID', orderCrescent: true, ordered: false, width: '14%' },
        { id: 7, name: 'originCamMessageCode', title: 'Orig. Event', orderCrescent: true, ordered: false, width: '14%' },
        { id: 8, name: 'numeroControleLb', title: 'Bacen Number', orderCrescent: true, ordered: false, width: '14%' },
        { id: 6, name: 'receivedDateTime', title: 'Hora', orderCrescent: true, ordered: false, width: '14%' }
    ]

    const changeOrder = (id: any) => {
        console.log("change order", id);
    }

    const [value, setValue] = useState(new Date());
    const [result, setResult] = useState<any>();
    const [trades, setTrades] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [pageSize, setPageSize] = useState(100);
    const [pageSizes] = useState([100, 500, 1000]);
    const [currentPage, setCurrentPage] = useState(0);



    useEffect(() => {
        setLoading(true);

        api
            .get(`api/v1/positions/${currency}/${data}`)
            .then((response: any) => {
                response.data.map((r: any) => {
                    r.signedAmount = r.signedAmount.toLocaleString('pt-br', { minimumFractionDigits: 2 });
                    r.receivedDateTime = moment(r.receivedDateTime).format('DD/MM/YYYY HH:mm');
                    r.movementStatus = r.movementStatus ? r.movementStatus : r.tradeStatus;
                    r.originCamMessageCode = r.originCamMessageCode ? r.originCamMessageCode : r.transactionType;
                })
                setTrades(response.data);
            });
    }, [])

    const formatCellCustom = (props: any) => {
        return <>
            {
                parseInt(props) < 0 && (
                    <>
                        <span className='downCurrency'>{returnNum(props)}</span>
                        <div className='downCurrency'>
                            <img src={down} alt="Logo" />
                        </div>
                    </>
                )
            }
            {
                parseInt(props) == 0 && (
                    <>
                        <span>{returnNum(props)}</span>
                    </>
                )
            }
            {
                parseInt(props) > 0 && (
                    <>
                        <span className='upCurrency'>{returnNum(props)}</span>
                        <div className='upCurrency'><img src={up} alt="Logo" /></div>
                    </>
                )
            }
        </>
    }

    const returnNumb = (val: any) => {
        if (val) {
            return val.replace("-", "").replace("$", "").replace(currency, "");
        }

    }

    const returnNum = (val: any) => {
        return returnNumb(formatVal('USD').format(val));
    }

    

    const formatVal = (currency: any) => {
        return new Intl.NumberFormat('en-US', {
            style: "currency",
            currency: currency,
            useGrouping: true
        });
    }

    const Cell = (props: any) => {
        const { column } = props;
        if (column.name === 'side' || column.name === 'movementStatus') {
            return <td><div className={props.value}>{props.value}</div></td>;
        }
        return <Table.Cell {...props} />;
    };


    return (
        <Container>
            <HeaderTitle>
                Posições Cambiais - Detalhes
            </HeaderTitle>
            <ContainerTable>
                <ContentReport>
                    <BoxReport>
                        <FaCalendar size={"20px"} color={"#195ab4"}></FaCalendar>
                        <InfoDescription>
                            <TextDescription>
                                Date
                            </TextDescription>
                            <DataDescription>
                                {moment(data).format('DD/MM/YYYY')}
                            </DataDescription>
                        </InfoDescription>
                    </BoxReport>
                    <BoxReport>
                        <FaDollarSign size={"20px"} color={"#195ab4"}></FaDollarSign>
                        <InfoDescription>
                            <TextDescription>
                                Currency
                            </TextDescription>
                            <DataDescription>
                                {currency}
                            </DataDescription>
                        </InfoDescription>
                    </BoxReport>
                    <BoxReport>
                        <FaDollarSign size={"20px"} color={"#195ab4"}></FaDollarSign>
                        <InfoDescription>
                            <TextDescription>
                                Open Position
                            </TextDescription>
                            <DataDescription>
                                {returnNum(openPosition)}
                            </DataDescription>
                        </InfoDescription>
                    </BoxReport>
                    <BoxReport>
                        <FaDollarSign size={"20px"} color={"#195ab4"}></FaDollarSign>
                        <InfoDescription>
                            <TextDescription>
                                Bacen Position
                            </TextDescription>
                            <DataDescription>
                                {
                                    parseInt(bacenPosition) < 0 && (
                                        <>
                                            <span className='downCurrency'>{returnNum(bacenPosition)}</span>
                                            <div className='downCurrency'>
                                                <img src={down} alt="Logo" />
                                            </div>
                                        </>
                                    )
                                }

                                {
                                    parseInt(bacenPosition) > 0 && (
                                        <>
                                            <span className='upCurrency'>{returnNum(bacenPosition)}</span>
                                            <div className='upCurrency'><img src={up} alt="Logo" /></div>
                                        </>
                                    )
                                }

                                {
                                    parseInt(bacenPosition) == 0 && (
                                        <>
                                            <span >{returnNum(bacenPosition)}</span>
                                        </>
                                    )
                                }

                            </DataDescription>
                        </InfoDescription>
                    </BoxReport>
                    <BoxReport>
                        <FaDollarSign size={"20px"} color={"#195ab4"}></FaDollarSign>
                        <InfoDescription>
                            <TextDescription>
                                Position Contract
                            </TextDescription>
                            <DataDescription>
                                {
                                    parseInt(contractPosition) < 0 && (
                                        <>
                                            <span className='downCurrency'>{returnNum(contractPosition)}</span>
                                            <div className='downCurrency'>
                                                <img src={down} alt="Logo" />
                                            </div>
                                        </>
                                    )
                                }

                                {
                                    parseInt(contractPosition) > 0 && (
                                        <>
                                            <span className='upCurrency'>{returnNum(contractPosition)}</span>
                                            <div className='upCurrency'><img src={up} alt="Logo" /></div>
                                        </>
                                    )
                                }

                                {
                                    parseInt(contractPosition) == 0 && (
                                        <>
                                            <span >{returnNum(contractPosition)}</span>
                                        </>
                                    )
                                }

                            </DataDescription>
                        </InfoDescription>
                    </BoxReport>

                    <BoxReport>
                        <FaDollarSign size={"20px"} color={"#195ab4"}></FaDollarSign>
                        <InfoDescription>
                            <TextDescription>
                                Position trade
                            </TextDescription>
                            <DataDescription>
                                {
                                    parseInt(tradePosition) < 0 && (
                                        <>
                                            <span className='downCurrency'>{returnNum(tradePosition)}</span>
                                            <div className='downCurrency'>
                                                <img src={down} alt="Logo" />
                                            </div>
                                        </>
                                    )
                                }

                                {
                                    parseInt(tradePosition) > 0 && (
                                        <>
                                            <span className='upCurrency'>{returnNum(tradePosition)}</span>
                                            <div className='upCurrency'><img src={up} alt="Logo" /></div>
                                        </>
                                    )
                                }

                                {
                                    parseInt(tradePosition) == 0 && (
                                        <>
                                            <span >{returnNum(tradePosition)}</span>
                                        </>
                                    )
                                }

                            </DataDescription>
                        </InfoDescription>
                    </BoxReport>

                    <BoxReport>
                        <FaDollarSign size={"20px"} color={"#195ab4"}></FaDollarSign>
                        <InfoDescription>
                            <TextDescription>
                                Diff contract
                            </TextDescription>
                            <DataDescription>
                                {diffContract == 'Missing' ? 'Missing' : formatCellCustom(diffContract)}
                            </DataDescription>
                        </InfoDescription>
                    </BoxReport>

                    <BoxReport>
                        <FaDollarSign size={"20px"} color={"#195ab4"}></FaDollarSign>
                        <InfoDescription>
                            <TextDescription>
                                Diff trade
                            </TextDescription>
                            <DataDescription>
                                {diffTrade == 'Missing' ? 'Missing' : formatCellCustom(diffTrade)}
                            </DataDescription>
                        </InfoDescription>
                    </BoxReport>


                </ContentReport>
                <Divider />
                <ContentTable>
                    <Paper>
                        <Grid
                            rows={trades}
                            columns={columns}
                        >
                            <SortingState />
                            <IntegratedSorting />
                            <FilteringState defaultFilters={[]} />
                            <IntegratedFiltering />
                            <PagingState
                                currentPage={currentPage}
                                onCurrentPageChange={setCurrentPage}
                                pageSize={pageSize}
                                onPageSizeChange={setPageSize}
                            />
                            <IntegratedPaging />
                            <Table cellComponent={Cell} />
                            <PagingPanel
                                pageSizes={pageSizes}
                            />
                            <TableHeaderRow showSortingControls />
                            <TableFilterRow />
                        </Grid>
                    </Paper>
                </ContentTable>
            </ContainerTable>
            <FooterTable>
                <Button onClick={() => back()} color="blue" appearance="ghost">
                    Voltar
                </Button>
            </FooterTable>
        </Container>
    );
}

export default CurrencyPositionDetails;