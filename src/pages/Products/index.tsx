import { Autocomplete, Button, Chip, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import { FormHandles } from "@unform/core";
import { useRef, useState } from "react";
import { BoxContent, Content, ContentForm, HeaderContent, InputContent, Left, Tags, Title, TitleContent } from "./styles"

const Products: React.FC = () => {

    const [open, setOpen] = useState(false);

    const [product, setProduct] = useState('');


    const clausesList: any = [
        { title: 'Clause 1', id: 1 },
        { title: 'Clause 2', id: 1 },
        { title: 'Clause 3', id: 1 },
        { title: 'Clause 4', id: 1 },
        { title: 'Clause 5', id: 1 },
        { title: 'Clause 6', id: 1 },
        { title: 'Clause 7', id: 1 },
        { title: 'Clause 8', id: 1 }
    ]

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleChange = (event: any) => {
        setProduct(event.target.value as string);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <>
            <HeaderContent>
                <Title>Products</Title>
                <Button onClick={handleClickOpen} size="small" variant="outlined">Add Association</Button>
            </HeaderContent>
            <Content>
                <BoxContent>
                    <Left>
                        <TitleContent>
                            Product 01
                        </TitleContent>
                        <Tags>
                            <Chip label="Clause 1" color="primary" />
                            <Chip label="Clause 2" color="primary" />
                            <Chip label="Clause 3" color="primary" />
                        </Tags>
                    </Left>
                </BoxContent>

                <BoxContent>
                    <Left>
                        <TitleContent>
                            Product 01
                        </TitleContent>
                        <Tags>
                            <Chip label="Clause 1" color="primary" />
                            <Chip label="Clause 2" color="primary" />
                        </Tags>
                    </Left>
                </BoxContent>

                <BoxContent>
                    <Left>
                        <TitleContent>
                            Product 01
                        </TitleContent>
                        <Tags>
                            <Chip label="Clause 1" color="primary" />
                            <Chip label="Clause 3" color="primary" />
                        </Tags>
                    </Left>
                </BoxContent>

                <BoxContent>
                    <Left>
                        <TitleContent>
                            Product 01
                        </TitleContent>
                        <Tags>
                            <Chip label="Clause 1" color="primary" />
                            <Chip label="Clause 2" color="primary" />
                        </Tags>
                    </Left>
                </BoxContent>
                <BoxContent>
                    <Left>
                        <TitleContent>
                            Product 01
                        </TitleContent>
                        <Tags>
                            <Chip label="Clause 1" color="primary" />
                            <Chip label="Clause 2" color="primary" />
                        </Tags>
                    </Left>
                </BoxContent>
                <BoxContent>
                    <Left>
                        <TitleContent>
                            Product 01
                        </TitleContent>
                        <Tags>
                            <Chip label="Clause 1" color="primary" />
                        </Tags>
                    </Left>
                </BoxContent>
            </Content>

            <Dialog open={open} onClose={handleClose} fullWidth maxWidth='md'>
                <DialogTitle>
                    <Title>Add Product Association</Title>
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>

                        <ContentForm>
                            <InputContent>
                                <InputLabel id="demo-simple-select-label">Product</InputLabel>
                                <Select
                                    fullWidth
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={product}
                                    label="Product"
                                    onChange={handleChange}
                                >
                                    <MenuItem value={10}>Product 01</MenuItem>
                                    <MenuItem value={20}>Product 01</MenuItem>
                                    <MenuItem value={30}>Product 03</MenuItem>
                                </Select>
                            </InputContent>
                            <InputContent>
                                <Autocomplete
                                    multiple
                                    id="tags-outlined"
                                    options={clausesList}
                                    getOptionLabel={(option: any) => option.title}
                                    filterSelectedOptions
                                    renderInput={(params: any) => (
                                        <TextField
                                            {...params}
                                            label="Select Clauses"
                                            placeholder="Select Clauses"
                                        />
                                    )}
                                />
                            </InputContent>
                        </ContentForm>

                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button variant="outlined" onClick={handleClose}>Cancel</Button>
                    <Button variant="outlined" type='submit'>Confirm</Button>
                </DialogActions>
            </Dialog>
        </>
    )
}

export default Products