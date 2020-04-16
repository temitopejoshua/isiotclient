import React,{useState} from 'react';
import {Alert} from 'reactstrap';

const SuccessAlert = ({dev_eui, reset}) =>{
    const[visible, setVisible] = useState(true);
    const onDismiss = () => setVisible(false);
    console.log(reset)
    if(reset){
        return (
            <Alert color="danger" isOpen={false} toggle={onDismiss}>
                Device with Eui {dev_eui} Successfully Created!
            </Alert>
        );
    }
    else{

    return (
        <Alert color="success" isOpen={visible} toggle={onDismiss}>
            Device with Eui {dev_eui} Successfully Created!
        </Alert>
    );
 }
}
export default SuccessAlert;
