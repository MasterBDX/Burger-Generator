import React,{Component} from 'react';
import Aux from '../Auxiliary/Aux';
import Modal from '../../components/UI/Modal/Modal';


const errorHandler = (WrappedComponent,axios)=>{
    return class extends Component {
        state  = {error:null}
        
        componentDidMount(){
            axios.interceptors.request.use(req => {
                this.setState({error:null})
                return req
            })
            axios.interceptors.response.use(res => res,error=>{
                this.setState({error:error})
            })
        }
        
        errorModalHandler = ()=>{
            this.setState({error:null})
        }
        

        render(){
            
            return <Aux>
                        <Modal modalClose={this.errorModalHandler} show={this.state.error}>
                            {this.state.error ?this.state.error.message :null }
                        </Modal>
                        <WrappedComponent {...this.props} />
                    </Aux>
        }
    }
}


export default errorHandler