import { makeStyles } from '@material-ui/core/styles'

const getStyles = function() {
    return makeStyles({
         root: {
         maxWidth: '30%',
         },
         MuiCardMediaRoot: {
             backgroundSize: 'cover',
             backgroundRepeat: 'no-repeat',
             backgroundPosition: 'center',
             maxHeight: 290+'px',
             maxWidth: 98+'%',
             paddingLeft: 1+'%',
             paddingTop: 1+'%',
             height: 2900+'px',
             width: 1000+'px',
             display: 'inline-block',
             float: 'left',
             backgroundColor: '#fff'
         }
         
     });
 };
const Classex = ()=>{ 
    var useStyles = getStyles();
    return useStyles(); 
};

  
  
export default Classex;