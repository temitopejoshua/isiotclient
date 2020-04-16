import React from 'react'
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css'



const confirmDelete = (devEui) => {

        const token = window.sessionStorage.getItem("jwt");



        confirmAlert({
                message: 'Are you sure you want to delete this device?', buttons: [
                        {
                                label: 'Yes',
                                onClick: () => {
                                        fetch("http://localhost:8081/api/devices2/" + devEui, {

                                                headers: { 'Authorization': token },
                                                method: 'DELETE'

                                        })
                                                .then(window.location.reload())
                                                .catch(err => console.error(err))
                                }
                        },
                        {
                                label: 'No',
                        }
                ]
        })
}


export default confirmDelete;