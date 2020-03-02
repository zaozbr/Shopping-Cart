import React, { Component } from 'react'
import { connect } from 'react-redux'
import { addToCart, setInitials } from './actions/cartActions'
import { getData } from './actions/index'
import classes from './MaterialClass'
import Card from '@material-ui/core/Card'
import CardMedia from '@material-ui/core/CardMedia'
import CardActionArea from '@material-ui/core/CardActionArea'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import Container from '@material-ui/core/Container'
import Button from '@material-ui/core/Button'
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart'
import { withStyles } from '@material-ui/core/styles'

const StyledContainer = withStyles(theme => ({
    root: {
        flexFlow: 'row nowrap',
        justifyContent: 'right',
        textAlign: 'right',
        padding: '5% 0 0 0 '
    },
}))(Container);

const inactiveButton = withStyles(theme => ({
    root: {
        opacity: 1,
        zIndex: 1,
        backgroundColor: 'lightgray',
        boxShadow: 'none',
        position: 'relative !important'
    },
}))(Button);




class Cart extends Component{
 
    componentDidMount() {
        this.props.getData();
    }

    handleAddToCart = (id)=>{
        this.props.addToCart(id);
    }

    render(){
        let id = parseInt(this.props.match.params.id);
        let actualStock = this.props.items;
        let item = actualStock.find(e => e.id === id);
        if(!item){
            let actualLocation = window.location.href;
            let rooth = "http://" +actualLocation.split('/')[2];
            window.location.assign(rooth);
        }

        let holder = (
            <Grid item key={item}>
                <Card key={item.id}>
                    <CardActionArea component="div" className={ item.quantity < 1 && 'disabled' }>
                        <Container className={'conteudo coluna1'} >
                            <CardMedia
                                className={classes.cardMedia}
                                src={item.picture}
                                title={item.title}
                                component="img"
                                alt={item.title}
                                style={{padding: 5+'px', backgroundColor: '#fff', borderColor: '#fff'}}
                                />
                            <Typography variant="h5" component="span"><b>Preço:</b> R${item.price},00</Typography>
                            <Typography fontSize={'1rem'} component="span"><b>Quantidade: {item.quantityInCart || 0}</b></Typography><br/>
                        </Container>   
                        <Container className={'conteudo coluna2'} >
                            <CardContent 
                                className = {[classes.cardContent, ' '].join(' ')}
                                >
                                <Typography component="h5" variant="h5">
                                    {item.title}
                                </Typography>
                                <Typography variant="body2" color="textSecondary">
                                {item.description}
                                </Typography>
                                <StyledContainer key={item.id} >
                                    {item.quantity > 0 &&
                                        <Button className={classes.Button}  size="large" variant="contained" color="primary"  width="100%" onClick={()=>{this.handleAddToCart(item.id)}}>
                                            <Typography variant="subtitle2" component="p">Adicionar ao carrinho </Typography> <AddShoppingCartIcon />
                                        </Button>
                                    }
                                    {item.quantity < 1 &&
                                        <inactiveButton className={[classes.button].join(' ')} size="large" variant="contained" color="primary"  width="100%" onClick={()=>{return null}}>
                                            <Typography variant="subtitle2" component="span">Produto Esgotado</Typography>
                                        </inactiveButton>
                                    }
                                </StyledContainer>
                            </CardContent>
                        </Container>
                    </CardActionArea>
                </Card>
            </Grid>                                               
        );
        const addedItems =
            (
            <div>
                <Grid 
                    className={classes.cardGrid}
                    spacing={4}>
                    {holder}        
                </Grid>
            </div>
            ) 

       return(
        <Container 
            className={[classes.cardGrid, 'cart'].join(' ')}
            maxWidth="md">
            <Typography variant="h5" component="h2">Produto: {item.id}</Typography>
            <br/>
            {addedItems}
        </Container>

        )
    }
}


const mapStateToProps = (state)=>{
    return{
        items: state.items,
        total: state.total,
        totalAtCart: state.totalAtCart
    }
}
const mapDispatchToProps = (dispatch)=>{
    return{
        addToCart: (id)=>{dispatch(addToCart(id))},
        getData: ()=>{dispatch(getData())},
        setInitials: (id)=>{dispatch(setInitials(id))}
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Cart);