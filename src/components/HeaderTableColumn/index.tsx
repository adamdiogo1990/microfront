import React from 'react';
import { FaSort, FaSortDown, FaSortUp } from 'react-icons/fa';

const HeaderTableColumn: React.FC<any> = ({children,col,...rest}) => {
    return (
        <>
            <th {...rest}>
                {children}
                {!col.ordered && (<FaSort className={'faSort'}></FaSort>)}
                {col.ordered && col.orderCrescent && (<FaSortUp className={'faSortActive'}></FaSortUp>)}
                {col.ordered && !col.orderCrescent && (<FaSortDown className={'faSortActive'}></FaSortDown>)}
            </th> 
        </>
    );
}

export default HeaderTableColumn;