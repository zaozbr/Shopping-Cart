import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Typography, Button, Container } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles';

const ContainerRecipe = withStyles(theme => ({
  root: {
    width: '25%',
    display: 'inline-flex',
    flexFlow: 'column wrap',
    alignContent: 'right',
    textAlign:  'right',
    float: 'right'
  },
}))(Container);

class Recipe extends Component{
    componentWillUnmount() {
    }

    render(){
  
        return(

                    <ContainerRecipe>
                        <Typography component="p" variant="h6"><b>Total: </b>R$ {this.props.total},00</Typography>
                        <Button size="small" color="primary" variant="contained" className="right">Finalizar Compra</Button>
                    </ContainerRecipe>
        )
    }
}

const mapStateToProps = (state)=>{
    return{
        addedItems: state.addedItems,
        total: state.total,
        totalAtCart: state.totalAtCart
    }
}

const mapDispatchToProps = (dispatch)=>{
    return{
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Recipe)
