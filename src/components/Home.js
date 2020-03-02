import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { addToCart, setInitials } from './actions/cartActions'
import { getData } from './actions/index'
import classes from './MaterialClass'
import Card from '@material-ui/core/Card'
import CardActionArea from '@material-ui/core/CardActionArea'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart'
import Grid from '@material-ui/core/Grid'
import Container from '@material-ui/core/Container'
import { withStyles } from '@material-ui/core/styles'

const StyledAddShoppingCartIcon = withStyles(theme => ({
  root: {
    margin: '-3px 0'
  },
}))(AddShoppingCartIcon);

class Home extends Component{

    componentDidMount() {
        this.props.getData();
    }

    handleClick = (id)=>{
        this.props.addToCart(id);
    }

    render(){
        
        let itemList = this.props.items.map((item, index)=>{
            return(
              <Grid item key={item} xs={12} sm={6} md={4} >
                <Card key={item.id}>
                  <div className={ item.quantity < 1 && 'disabled' }>
                    <Link to={'/product/'+item.id} className='neutral'>
                    <CardActionArea>
                        <CardMedia
                            src={item.picture}
                            title={item.title}
                            component="img"
                            alt={item.title}
                            style={{padding: 5+'px', backgroundColor: '#fff', borderColor: '#fff'}}
                            />
                        <CardContent>
                          <Typography gutterBottom variant="subtitle2" component="h4" align="justify" style={{minHeight: 110 + 'px'}}>
                          {item.title}
                          </Typography>
                          <div class="priceBlock">
                            <Typography variant="button" color="textSecondary" component="p">
                              Por apenas:
                            </Typography>
                            <Typography variant="h6" color="textSecondary" component="p">
                              R$ {item.price},00
                            </Typography>
                            Ou em 6x de R$ {parseInt(item.price / 6)},00 sem juros
                          </div>
                          <div class="outOfStock">
                            <Typography variant="button" color="textSecondary" component="p">
                              ..
                            </Typography>
                            <Typography variant="h6" color="textSecondary" component="p">
                              PRODUTO ESGOTADO
                            </Typography>
                            <span>..</span>
                          </div>
                        </CardContent>
                    </CardActionArea>
                    </Link>
                    <CardActions key={item.id} style={{flexFlow: 'column'}}>
                        <Button className={'ativo'}   size="large" variant="contained" color="primary"  width="100%" 
                          onClick={()=>{this.handleClick(item.id)}}>
                          <Typography variant="subtitle2" component="p">Adicionar ao carrinho </Typography> <AddShoppingCartIcon />
                        </Button>
                        <Button className={'inativo'} size="large" variant="contained" color="primary"  width="100%" onClick={()=>{return null}}>
                          <Typography variant="subtitle2" component="span">Adicionar ao carrinho </Typography> <StyledAddShoppingCartIcon />
                        </Button>
                    </CardActions> 
                  </div>
                </Card>
              </Grid>
            )
        });

        return(
          <Container className={classes.container} maxWidth="md">
            <Typography variant="h5" component="h2">Nossos Produtos:</Typography>
            <Grid container spacing={4}>
              {itemList}
            </Grid>
          </Container>
        )
    }
};    

const mapStateToProps = (state) => {
    return {
        items: state.items,
        total: state.total,
        totalAtCart: state.totalAtCart
    }
}
const mapDispatchToProps= (dispatch)=>{
    
    return{
        addToCart: (id)=>{dispatch(addToCart(id))},
        getData: ()=>{dispatch(getData())},
        setInitials: (id)=>{dispatch(setInitials(id))}
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Home)