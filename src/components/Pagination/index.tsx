import React, { useContext, useEffect, useState } from 'react';
import { useTable } from '../../hooks/Table';
import { ContentPagination, ContainerButton } from './styles';

const Pagination: React.FC = () => {
    const {totalPages, currentPage, reload, setCurrentPage,setReload} = useTable();

    const changePage = (num:any) => {
        if(num !== currentPage){
            setCurrentPage(num)
            setReload(reload + 1)
        }
    };

    const prevPage = () => {
        if(currentPage > 1){
            setCurrentPage(currentPage - 1)
            setReload(reload + 1)
        }
    }

    const nextPage = () => {
        if(currentPage !== totalPages){
            setCurrentPage(currentPage + 1)
            setReload(reload + 1)
        }
    }
    
    return (
        <ContentPagination>
            <ContainerButton onClick={prevPage}>
                <span> {"<"}</span>
            </ContainerButton>
            {Array.from(Array(totalPages), (e, i) => {
                return (
                    <ContainerButton key={i} theme={{ active: currentPage === i + 1 }} onClick={() => changePage(i + 1)}>
                        <span>{i + 1 }</span>
                    </ContainerButton>
                )
            })}
            <ContainerButton onClick={nextPage}>
                <span> {">"} </span>
            </ContainerButton>
        </ContentPagination>
    );
}

export default Pagination;