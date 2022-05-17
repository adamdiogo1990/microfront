import React from 'react';
import { Container, Logo } from './styles';
import logo from '../../assets/logo.png'

const NavBar: React.FC = ({children}) => {
    return (
        <Container>
            <Logo>
                <img src={logo} alt="Logo" />
            </Logo>
        </Container>
    );
}

export default NavBar;