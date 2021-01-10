import React,{Component} from 'react';
import Aux from '../Auxiliary/Aux';
import Modal from '../../components/UI/Modal/Modal';


const errorHandler = (WrappedComponent,axios)=>{
    return class extends Component {
        state  = {error:null}
           
        errorModalHandler = ()=>{
            this.setState({error:null})
        }
        
        render(){
            this.myInterceptorsReq = axios.interceptors.request.use(req => {
                this.setState({error:null})
                return req
            })
            this.myInterceptorsRes = axios.interceptors.response.use(res => res,error=>{
                this.setState({error:error})
            })
            return <Aux>
                        <Modal modalClose={this.errorModalHandler} show={this.state.error}>
                            {this.state.error ?this.state.error.message :null }
                        </Modal>
                        <WrappedComponent {...this.props} />
                    </Aux>
        }
        
        componentWillUnmount(){
            axios.interceptors.request.eject(this.myInterceptorsReq)
            axios.interceptors.response.eject(this.myInterceptorsRes)
        }
    }
}


export default errorHandler