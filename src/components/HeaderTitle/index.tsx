import React from 'react';
import { Container } from './styles';

const HeaderTitle: React.FC = ({children}) => {
    return (
        <Container>
            <li>
                <h2>{children}</h2>
                <span></span>
            </li>
        </Container>
    );
}

export default HeaderTitle;