import React ,{Component} from 'react';
import Backdrop from '../Backdrop/Backdrop';
import classes from './Modal.module.css';
import Aux from '../../../hoc/Auxiliary/Aux'

class Modal extends Component {
    shouldComponentUpdate(nextProps,nextState){
        return nextProps.show !== this.props.show || nextProps.children !== this.props.children ;
    }
    componentDidUpdate(){
       
    }
    render(){
        return (
            <Aux>
                <Backdrop modalClose={this.props.modalClose} show={this.props.show} />
                <div className={classes.Modal}
                    style={
                            {
                            transform : this.props.show ? 'translateY(0)' : 'translateY(-100vh)',
                            opacity : this.props.show ? '1' : '0',
                        
                            }
                        }
                >
                    {this.props.children}
                </div>
            </Aux>
            )
        }    
    }  


export default Modal;