import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    MDBNavbar,
    MDBContainer,
    MDBIcon,
    MDBNavbarNav,
    MDBNavbarItem,
    MDBNavbarLink,
    MDBNavbarToggler,
    MDBNavbarBrand,
    MDBCollapse,
} from 'mdb-react-ui-kit';
import SearchBar from 'material-ui-search-bar';
import { Button, Card, ClickAwayListener, IconButton } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import MenuItem from '@mui/material/MenuItem';
import { useStateValue } from '../../state/StateProvider';

export default function NavHeader() {
    const navigate = useNavigate();
    const authenticated = true;
    const [showMenu, setShowMenu] = useState(false);
    const [showNav, setShowNav] = useState(false);
    const [data, setData] = useState({ search: '' });
    const goSearch = (e) => {
        navigate({
            pathname: '/search/',
            search: '?search=' + data.search,
        });
        window.location.reload();
    };
    return (
        <div>
            <MDBNavbar expand='lg' light style={{ backgroundColor: '#34495e' }}>
                <MDBContainer fluid>
                    <MDBNavbarBrand style={{ color: "#fff" }} href='/app' className='mx-5'>Nep E-Book</MDBNavbarBrand>
                    <MDBNavbarToggler
                        type='button'
                        data-target='#navbarColor02'
                        aria-controls='navbarColor02'
                        aria-expanded='false'
                        aria-label='Toggle navigation'
                        onClick={() => setShowNav(!showNav)}
                    >
                        <MDBIcon icon='bars' fas />
                    </MDBNavbarToggler>
                    <MDBCollapse show={showNav} navbar>
                        <MDBNavbarNav className='me-auto mb-2 mb-lg-0'>
                            <MDBNavbarItem className='active'>
                                <MDBNavbarLink aria-current='page' href='/app' style={{ color: "#fff" }}>
                                    Home
                                </MDBNavbarLink>
                            </MDBNavbarItem>
                            <MDBNavbarItem>
                                <MDBNavbarLink style={{ color: "#fff" }} href='/about'>About Us</MDBNavbarLink>
                            </MDBNavbarItem>
                            <MDBNavbarItem>
                                <MDBNavbarLink style={{ color: "#fff" }} href='/contact'>Feedback</MDBNavbarLink>
                            </MDBNavbarItem>
                        </MDBNavbarNav>
                        <SearchBar
                            value={data.search}
                            onChange={(newValue) => setData({ search: newValue })}
                            onRequestSearch={() => goSearch(data.search)}
                        />
                        {/* {
                            !authenticated ? (<Button variant="contained" className='btn btn-success' href='/login' style={{
                                marginLeft: '20px',
                                padding: '10px'
                            }}>
                                LogIn
                            </Button>) : (
                                <>
                                    <Button variant="contained" color="success" href='/logout' style={{
                                        marginLeft: '20px',
                                        padding: '10px'
                                    }}>
                                        LogOut
                                    </Button>
                                    <Button variant="contained" color="success" href='/admin' style={{
                                        marginLeft: '20px',
                                        padding: '10px'
                                    }}>
                                        AddBook
                                    </Button>
                                </>

                            )
                        } */}
                        <Button variant="contained" className='btn btn-success' href='/login' style={{
                            marginLeft: '20px',
                            padding: '10px'
                        }}>
                            LogIn
                        </Button>

                        <Button variant="contained" color="success" href='/logout' style={{
                            marginLeft: '20px',
                            padding: '10px'
                        }}>
                            LogOut
                        </Button>
                        <Button variant="contained" color="success" href='/admin' style={{
                            marginLeft: '20px',
                            padding: '10px'
                        }}>
                            AddBook
                        </Button>

                    </MDBCollapse>
                </MDBContainer>
            </MDBNavbar>
        </div>
    )
}
