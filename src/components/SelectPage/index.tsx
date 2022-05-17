import React, { useContext, useState } from 'react';
import { useTable } from '../../hooks/Table';
import { ContentSelect, ShowText, Select } from './styles';

const SelectPage: React.FC = () => {
    
    const { setTotalRecords, setCurrentPage, setReload, reload } = useTable();

    const setSelect = (value:any) => {
        setTotalRecords(value);
        setCurrentPage(1);
        setReload(reload + 1);
    }

    return (
        <ContentSelect>
            <ShowText>itens por página</ShowText>
            <Select onChange={(event) => setSelect(event.target.value)}>
                <option value="10">10</option>
                <option value="25">25</option>
                <option value="100">100</option>
            </Select>
        </ContentSelect>
    );
}

export default SelectPage;