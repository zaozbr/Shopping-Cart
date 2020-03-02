import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { removeItem, addQuantity, subtractQuantity } from './actions/cartActions'
import Recipe from './Recipe'
import classes from './MaterialClass'
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import RemoveCircleIcon from '@material-ui/icons/RemoveCircle';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';

class Cart extends Component{
 
    componentDidMount() {
        //this.props.setClassTheme();
    }

    //to remove the item completely
    handleRemove = (id)=>{
        this.props.removeItem(id);
    }
    //to add the quantity
    handleAddQuantity = (id)=>{
        this.props.addQuantity(id);
    }
    //to substruct from the quantity
    handleSubtractQuantity = (id)=>{
        this.props.subtractQuantity(id);
    }

    render(){
        let holder = (
            this.props.addedItems.map((item, index) =>{
                return(
                    <Grid item key={item}>
                        <Card key={item.id}>
                            <CardActionArea component="div" className={ this['props']['items'][index]['quantity'] < 1 && 'disabled' }>
                                <Container className={'conteudo coluna1'} >
                                    <CardMedia
                                        className={classes.cardMedia}
                                        src={item.picture}
                                        title={item.title}
                                        component="img"
                                        alt={item.title}
                                        style={{padding: 5+'px', backgroundColor: '#fff', borderColor: '#fff'}}
                                        />
                                    <Typography variant="h5" component="span"><b>Price:</b> R${item.price},00</Typography>
                                    <Typography fontSize={'1rem'} component="span"><b>Quantity: {item.quantityInCart}</b></Typography><br/>
                                    <CardActions className="add-remove">
                                        
                                        <Link to="/cart"><AddCircleIcon  className="material-icons" onClick={()=>{this.handleAddQuantity(item.id)}}/></Link>
                                        <Link to="/cart"><RemoveCircleIcon  className="material-icons" onClick={()=>{this.handleSubtractQuantity(item.id)}}/></Link>
                                        <Link to="/cart" className={'remove'}>
                                            <DeleteForeverIcon onClick={()=>{this.handleRemove(item.id)}}/></Link>
                                    </CardActions>
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
                                    </CardContent>
                                </Container>
                            </CardActionArea>
                        </Card>
                    </Grid>                                               
                ) 
            })
        );
        let addedItems = this.props.addedItems.length ?
            (
            <div>
                <Grid 
                    className={classes.cardGrid}
                    spacing={4}>
                    {holder}        
                </Grid>
                <br/>
                <Recipe />
            </div>
            ) :
            ( <Typography variant="h6" component="p" spacing={4}>Seu carrinho está vazio.</Typography> )

       return(
        <Container 
            className={[classes.cardGrid, 'cart'].join(' ')}
            maxWidth="md">
            <Typography variant="h5" component="h2">Meu Carrinho:</Typography>
            <br/>
            {addedItems}
        </Container>

        )
    }
}


const mapStateToProps = (state)=>{
    return{
        items: state.items,
        totalAtCart: state.totalAtCart,
        addedItems: state.addedItems
    }
}
const mapDispatchToProps = (dispatch)=>{
    return{
        removeItem: (id)=>{dispatch(removeItem(id))},
        addQuantity: (id)=>{dispatch(addQuantity(id))},
        subtractQuantity: (id)=>{dispatch(subtractQuantity(id))}
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Cart);