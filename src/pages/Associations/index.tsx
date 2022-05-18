import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import SubjectIcon from '@mui/icons-material/Subject';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import GroupIcon from '@mui/icons-material/Group';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import { AccordionTitle, ClauseBTN, ClauseText, ClientsBTN, ContentForm, HeaderContent, InputContent, MenuSpace, NaturezaBTN, ProductsBTN, ProductsText, Title } from './styles';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import { TextField } from 'unform-material-ui';
import { useCallback, useEffect, useRef, useState } from 'react';
import api from '../../services/api';
import Products from '../Products';
import Clients from '../Clients';
import Natureza from '../Natureza';


const Associations: React.FC = () => {

    const [open, setOpen] = useState(false);
    const [reload, setReload] = useState<any>('');
    const [clauses, setClauses] = useState<any>([]);
    const [tab, setTab] = useState<any>('Clauses')
    const formRef = useRef<FormHandles>(null);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    useEffect(() => {
        async function fetchResult() {
            let response = await api.get('clauses');
            setClauses(response.data);
            console.log("clauses", clauses)
        }
        fetchResult()
    }, [reload]);

    const handleSubmit = useCallback(async (data: any) => {
        let response = await api.post('clauses', data);
        setReload(Math.random());
        console.log("response", response)
        handleClose()
    }, []);

    return (
        <>
            <div>
                <MenuSpace>
                    <ClauseBTN onClick={() => setTab('Clauses')}>
                        <SubjectIcon></SubjectIcon>
                        <ClauseText>Clauses</ClauseText>
                    </ClauseBTN>
                    <ProductsBTN onClick={() => setTab('Products')}>
                        <AccountBalanceWalletIcon></AccountBalanceWalletIcon>
                        <ProductsText>Products</ProductsText>
                    </ProductsBTN>
                    <ClientsBTN onClick={() => setTab('Clients')}>
                        <GroupIcon></GroupIcon>
                        <ProductsText>Clients</ProductsText>
                    </ClientsBTN>
                    <NaturezaBTN onClick={() => setTab('Natureza')}>
                        <GroupIcon></GroupIcon>
                        <ProductsText>Natureza</ProductsText>
                    </NaturezaBTN>
                </MenuSpace>
                {
                    tab == 'Clauses' && (
                        <>

                            <HeaderContent>
                                <Title>Clauses</Title>
                                <Button onClick={handleClickOpen} size="small" variant="outlined">Add Clause</Button>
                            </HeaderContent>
                            {
                                clauses.map((c: any) => {
                                    return (
                                        <Accordion key={c.id} className='accordion-btg'>
                                            <AccordionSummary
                                                expandIcon={<ExpandMoreIcon />}
                                                aria-controls="panel1a-content"
                                                id="panel1a-header"
                                            >
                                                <Typography>
                                                    <AccordionTitle>{c.title}</AccordionTitle>
                                                </Typography>
                                            </AccordionSummary>
                                            <AccordionDetails>
                                                <Typography>
                                                    {c.text}
                                                </Typography>
                                            </AccordionDetails>
                                        </Accordion>
                                    )
                                })
                            }

                            <Dialog open={open} onClose={handleClose} fullWidth maxWidth='md'>
                                <Form ref={formRef} onSubmit={handleSubmit}>
                                    <DialogTitle>
                                        <Title>Add Clause</Title>
                                    </DialogTitle>
                                    <DialogContent>
                                        <DialogContentText>

                                            <ContentForm>
                                                <InputContent>
                                                    <TextField name='title' fullWidth id="outlined-basic" label="Title" variant="outlined" />
                                                </InputContent>
                                                <InputContent>
                                                    <TextField name='text' fullWidth multiline id="outlined-basic" label="Text" variant="outlined" />
                                                </InputContent>
                                            </ContentForm>

                                        </DialogContentText>
                                    </DialogContent>
                                    <DialogActions>
                                        <Button variant="outlined" onClick={handleClose}>Cancel</Button>
                                        <Button variant="outlined" type='submit'>Confirm</Button>
                                    </DialogActions>
                                </Form>
                            </Dialog>
                        </>
                    )
                }

                {
                    tab == 'Products' && (
                        <Products></Products>
                    )
                }

                {
                    tab == 'Clients' && (
                        <Clients></Clients>
                    )
                }

                {
                    tab == 'Natureza' && (
                        <Natureza></Natureza>
                    )
                }


            </div>
        </>

    )
}

export default Associations;