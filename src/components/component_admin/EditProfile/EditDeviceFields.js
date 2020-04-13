import React from 'react'
import SkyLight from 'react-skylight'



class EditDeviceFields extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            name:'',
            devEui:'',
            device_class:'',
        }
    }

    handleChange = (event) => {
        this.setState(
            { [event.target.name]: event.target.value }
        );
    }

    // Save details
    handleSubmit = (event) => {
        event.preventDefault();
        var details = { name: this.state.name,
                        devEui: this.state.devEui,
                        device_class: this.state.device_class
                        };
        this.props.handleEdit(details);
        this.refs.addDialog.hide();
        this.props.fetchData()
        
    }

    cancelSubmit = (event) => {
        event.preventDefault();
        this.refs.addDialog.hide();
        this.props.fetchData()

    }

    render() {
        return (
            <div>
                <SkyLight hideOnOverlayClicked ref="addDialog">
                    <form className="">
                        <h4 className="text-center">Edit Device Information</h4>
                        <label>Device Name</label>
                        <input type='text' className="form-control" placeholder="Enter Name" defaultValue={this.props.data.name} name='name' onChange={this.handleChange} /><br/>
                        <label>Device EUI</label>
                        <input type='text' className="form-control" placeholder="Enter Device Eui" defaultValue={this.props.data.devEui} name='devEui' onChange={this.handleChange} /><br/>
                        <label>Device Class</label>
                        <input type='text' className="form-control" placeholder="Enter Device Class" defaultValue={this.props.data.device_class} name='deviceClass' onChange={this.handleChange} /><hr/>
                        <div className="text-center">
                        <button onClick={this.cancelSubmit} className="btn btn-danger modal-btn">Cancel</button>
                        <button onClick={this.handleSubmit} type="Submit" className="btn btn-primary modal-btn">Save</button>
                        </div>
                    </form>
                </SkyLight>
                <div>
                <button onClick={() => this.refs.addDialog.show()} className="btn btn-primary">Update Device</button>
                </div>
            </div>
        );
    }
}
export default EditDeviceFields;










// import React from 'react'
// import SkyLight from 'react-skylight'



// class EditDeviceFields extends React.Component {

//     constructor(props) {
//         super(props);
//         this.state = {
//             name:'',
//             devEui:'',
//             device_class:'',
//         }
//     }

//     handleChange = (event) => {
//         this.setState(
//             { [event.target.name]: event.target.value }
//         );
//     }

//     // Save details
//     handleSubmit = (event) => {
//         event.preventDefault();
//         var details = { name: this.state.name,
//                         devEui: this.state.devEui,
//                         device_class: this.state.device_class
//                         };
//         this.props.handleEdit(details);
//         this.refs.addDialog.hide();
//         this.props.fetchData()
        
//     }

//     cancelSubmit = (event) => {
//         event.preventDefault();
//         this.refs.addDialog.hide();
//         this.props.fetchData()

//     }

//     render() {
//         return (
//             <div>
//                 <SkyLight hideOnOverlayClicked ref="addDialog">
//                     <form className="">
//                         <h4 className="text-center">Edit Device Information</h4>
//                         <label>Device Name</label>
//                         <input type='text' className="form-control" placeholder="Enter Name" defaultValue={this.props.data.name} name='name' onChange={this.handleChange} /><br/>
//                         <label>Device EUI</label>
//                         <input type='text' className="form-control" placeholder="Enter Device Eui" defaultValue={this.props.data.devEui} name='devEui' onChange={this.handleChange} /><br/>
//                         <label>Device Class</label>
//                         <input type='text' className="form-control" placeholder="Enter Device Class" defaultValue={this.props.data.device_class} name='deviceClass' onChange={this.handleChange} /><hr/>
//                         <div className="text-center">
//                         <button onClick={this.cancelSubmit} className="btn btn-danger modal-btn">Cancel</button>
//                         <button onClick={this.handleSubmit} type="Submit" className="btn btn-primary modal-btn">Save</button>
//                         </div>
//                     </form>
//                 </SkyLight>
//                 <div>
//                 <button onClick={() => this.refs.addDialog.show()} className="btn btn-primary">Update Device</button>
//                 </div>
//             </div>
//         );
//     }
// }
// export default EditDeviceFields;