import React from 'react'
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css'
import SERVER_URL from '../ServerUrl';




const confirmDelete = (devEui) => {

        const token = window.sessionStorage.getItem("jwt");



        confirmAlert({
                message: 'Are you sure you want to delete this device?', buttons: [
                        {
                                label: 'Yes',
                                onClick: () => {
                                        fetch(SERVER_URL+ '/api/devices2/' + devEui, {

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