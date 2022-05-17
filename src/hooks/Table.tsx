import React, { createContext, useCallback, useContext, useState } from 'react';



interface TableData {
    totalRecords: number;
    currentPage: number;
    firstRecordOnPage: number;
    lastRecordOnPage: number;
    pageSize?: number;
    totalPages: number;
    reload: number;
    setTotalPages(value: number): void;
    setCurrentPage(value: number): void;
    setTotalRecords(value: number): void;
    setFirstRecordOnPage(value: number): void;
    setLastRecordOnPage(value: number): void;
    setReload(value: number): void;
}


const TableContext = createContext<TableData>(
    {
        totalPages:0,
        currentPage:1,
        totalRecords: 10,
        reload: 0
    } as TableData,
);

const TableProvider: React.FC = ({ children }) => {
    const [totalPages, setTotalPages] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalRecords, setTotalRecords] = useState(10);
    const [reload, setReload] = useState(0);
    const [firstRecordOnPage, setFirstRecordOnPage] = useState(0);
    const [lastRecordOnPage, setLastRecordOnPage] = useState(0);

    return (<TableContext.Provider
        value={{
            totalPages,
            currentPage,
            totalRecords,
            firstRecordOnPage,
            setFirstRecordOnPage,
            lastRecordOnPage,
            setLastRecordOnPage,
            reload,
            setTotalPages,
            setCurrentPage,
            setTotalRecords,
            setReload
        }}
    >
        {children}
    </TableContext.Provider>
    )
}

function useTable() {
    const context = useContext(TableContext);
    const { totalPages, currentPage, totalRecords, reload, firstRecordOnPage, setFirstRecordOnPage, lastRecordOnPage, setLastRecordOnPage, setTotalPages, setCurrentPage, setTotalRecords, setReload } = context;

    if (!context) {
        throw new Error('useAuth must be used whithin an TableProvider');
    }

    return { totalPages, currentPage, totalRecords, reload, setTotalPages, firstRecordOnPage, setFirstRecordOnPage, lastRecordOnPage, setLastRecordOnPage, setCurrentPage, setTotalRecords, setReload }
}

export { TableProvider, useTable }