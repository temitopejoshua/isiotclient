import React, { Component } from 'react';



const DeleteDevice = ({id}) =>{

        function deleteDevice(id){
            const url = "http://localhost:8081/api/devices2/" + id
            fetch(url, {
                crossOrigin: true,
                method: 'DELETE',
            })
                .then(res => res.json())
                .catch(error => console.error('Error:', error))
                .then(response => console.log('Success:', response))
        return(
            <p>Successful</p>
        );
}

}
export default DeleteDevice;