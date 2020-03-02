import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { setInitials } from './actions/cartActions'
import { getData } from './actions/index.js'

import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import ShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import Badge from '@material-ui/core/Badge';
import { withStyles } from '@material-ui/core/styles';

const StyledBadge = withStyles(theme => ({
  badge: {
    right: -6,
    top: -12,
    border: `1px solid ${theme.palette.background.paper}`,
    padding: '2px',
    backgroundColor: '#FFF',
    fontSize: '10px',
    opacity: 0.8
  },
}))(Badge);

const StyledShoppingCartIcon = withStyles(theme => ({
  root: {
    marginBottom: -4,
    left: 12
  },
}))(ShoppingCartIcon);

class Navbar extends Component {

    componentDidMount() {
    }

    toggleClass(qual) {
        this.setState({ linkAtivo: qual });
    };

    render() {
        return(
            <Container className='topo'>
                <CssBaseline />
                <AppBar position="static" color="default" elevation={0} >
                    <Toolbar >
                    <Typography variant="h5" componente="h1" color="inherit" noWrap >
                        Loja 
                    </Typography>
                    <nav>
                        <Link to={{
                                    pathname: '/',
                                    state: { linkAtivado: 'produto' }
                                }} 
                            variant="button" 
                            color="textPrimary" 
                            >Produtos</Link>
                        <Link to={{
                                    pathname: '/cart',
                                    state: { linkAtivado: 'cart' }
                                }} 
                            variant="button" 
                            color="textPrimary" 
                             >
                          Meu carrinho
                          <StyledShoppingCartIcon style={{ fontSize: 18 }} />
                          <StyledBadge badgeContent={this.props.totalAtCart} color="secondary"/>
                          <Typography variant="h5" color="inherit" noWrap component="h5">
                              Total: R$ {this.props.total},00
                          </Typography>
                        </Link>
                    </nav>
                    </Toolbar>
                </AppBar>
            </Container>
        )
    }
}

const mapStateToProps = (state)=>{
    return {
        total: state.total,
        totalAtCart: state.totalAtCart
    }
}

const mapDispatchToProps= (dispatch)=>{

    return{
        getData: ()=>{dispatch(getData())},
        setInitials: (id)=>{dispatch(setInitials(id))}
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Navbar);