import React, {Component} from 'react'
import { validateAll } from 'indicative/validator'
import './form_style.css';
import './Admin.css';
import SuccessAlert from './succes_alert';


export default class UploadDevice extends Component {

    constructor(props) {
        super(props);

        this.state = {
            name : "",
            devEui: "",
            app_eui: "",
            activation: "",
            encryption: "",
            dev_addr: "",
            nwkskey: "",
            appskey: "",
            app_key: "",
            device_class: "",
            counters_size: 0,
            band: "",
            categories:[],
            tags:[],
            categoryId: 0,
            isUploaded: false,
            errors: {},
            errs: '',
            success: "",
            reset: false,
            adr: "{\"datarate\": null,\"mode\": \"on\",\"tx_power\": null}",
        }
    }
    
    handleChange = (event) => {
        this.setState(
            {
                [event.target.name]: event.target.value,
            }
        );

        const data = this.state
        const rules= {
            name : 'string',
            devEui: 'string|min:16',
            app_eui: 'string|min:16',
            activation: 'string|min:3',
            encryption: 'string',
            dev_addr: 'string',
            nwkskey: 'string',
            appskey: 'string',
            app_key: 'string',
            device_class: 'string',
            band: 'string',
            categoryId: 'required',
        }
        const messages = {
            required: 'This {{field}} is required',
            string: 'Input contains invalid characters',
            'devEui.min': 'Device eui requires 16 characters',
            'app_eui.min': 'app_eui is too short'
        }

        validateAll(data, rules, messages).then(() =>{
            console.log('success')
        }).catch((errors) =>{
            const formattedErrors={}
            errors.forEach( error => formattedErrors[error.field] = error.message)
            this.setState({errors:formattedErrors})
        })
    }
    upload = (data) =>{

        fetch('http://localhost:8081/api/devices2/',
        {
            crossDomain: true,
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        })
        .then((response) => {
            if (response.status === 201) {
                this.setState({
                    isUploaded: true,
                    success: <SuccessAlert
                                dev_eui={this.state.devEui}/>,
                })
            }
            else{
                this.setState({errs:this.state.devEui+ "\n device eui already exists"})
            }
        })
        .catch((error) => {
            console.error(error);
            this.setState({errs:error.toString()})
        });
    }

    fetchDeviceCategories = () => {

        const token = window.sessionStorage.getItem("jwt");
        fetch('http://localhost:8081/api/device/categories/',
            {
                headers: { 'Authorization': token }
            })
            .then((response) => response.json())
            .then((responseData) => {
                this.setState({
                    categories: responseData
                });
            })
            .catch(err => console.error(err));
    }

    handleSubmit = (event) => {
        event.preventDefault();
        console.log(this.state.categoryId)
        const device = {
            name : this.state.name,
            devEui: this.state.devEui,
            app_eui: this.state.app_eui,
            activation: this.state.activation,
            encryption: this.state.encryption,
            dev_addr: this.state.dev_addr,
            nwkskey: this.state.nwkskey,
            appskey: this.state.app_key,
            app_key: this.state.app_key,
            device_class: this.state.device_class,
            counters_size: this.state.counters_size,
            band: this.state.band,
            categoryId:this.state.categoryId,
            adr: this.state.adr
        };
        console.log("after submit"+this.state.adr.mode)
        this.upload(device)
    }

    handleReset =(event) =>{
        this.setState(
            {
                success: <SuccessAlert
                        reset={true}
                        />,
            }
            
        );
        console.log(this.state.reset)
    }

    componentDidMount(){
        this.fetchDeviceCategories();
    }

    render() {
        const categoryOptions = this.state.categories.map((deviceCategory, key) =>
                <option key={deviceCategory.id} value={deviceCategory.id}>
                    {deviceCategory.name}
                </option>
        );

            return (
                <div>
                <button class="btn btn-success mt-4" data-toggle="modal" data-target="#exampleModalScrollable"><i class="fas fa-plus"></i> &nbsp; Create Device</button>

                <div class="modal" id="exampleModalScrollable" tabindex="-1" role="dialog" aria-labelledby="exampleModalScrollableTitle" aria-hidden="true">
                <div class="modal-dialog modal-dialog-scrollable" role="document">
                    <div class="modal-content">
                    <div class="modal-header">
                    <h5 className="modal-title text-center" id="exampleModalScrollableTitle">Upload Device</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                    </button>
                    </div>
                    <div class="modal-body">
                    
                    <div className="">
                    <form method="POST" id="upload-form" onSubmit={this.handleSubmit}>
                    {this.state.success}
                        <div className="form-row">
                        <div className="form-group col-md-6">
                            <label htmlFor="name">Name</label>
                          <input placeholder="Name" name="name" onChange={this.handleChange} type="text" className="form-control" required></input>
                        </div>
            
                        <div className="form-group col-md-6">
                            <label htmlFor="">Device EUI</label>
                            <input placeholder="Device eui" name="devEui" onChange={this.handleChange} className="form-control" required></input>
                            <p className="validationError">{this.state.errors.devEui}</p>
                        </div>
                        </div>
                        <div className="form-row">
                        <div className="form-group col-md-6">
                            <label htmlFor="">Application Key</label>
                            <input type='text' class="form-control" name='app_key'  placeholder="Application Key" onChange={this.handleChange} required></input>
                        </div>
                        <div className="form-group col-md-6">
                            <label htmlFor="">Application EUI</label>
                            <input type="text" class="form-control"  name='app_eui'  placeholder="App eui" onChange={this.handleChange} required></input>
                        </div>
                        </div>
                        <div class="form-row">
                        <div class="form-group col-md-3">
                            <label htmlFor="">Encryption</label>
                            <input type='text'  class="form-control" name='encryption'  placeholder="Encryption" onChange={this.handleChange} required></input>
                        </div>
                        <div class="form-group col-md-3">
                            <label htmlFor="activation">Activation</label>
                            <select id="activation" class="form-control" form="upload-form" name="activation" onChange={this.handleChange} required>
                            <option >Choose ...</option>
                            <option value="ABP">ABP</option>
                            <option value="OTAA">OTAA</option>
                            </select>
                            <p class="validationError">{this.state.errors.activation}</p>
                        </div>
                        <div class="form-group col-md-6">
                            <label htmlFor="">Device Addr</label>
                            <input type='text' class="form-control" name='dev_addr' placeholder="Device Addr" onChange={this.handleChange} required></input>
                        </div>
                        </div>
                        <div class="form-row">
                        <div class="form-group col-md-6">
                            <label for="">Network Key</label>
                            <input type='text' class="form-control" name='nwkskey' placeholder="Network Key" onChange={this.handleChange} required></input>
                        </div>
                        <div class="form-group col-md-6">
                            <label htmlFor="">Apps Key</label>
                            <input type='text' class="form-control" name='appskey' placeholder="Apps Key" onChange={this.handleChange} required></input>
                        </div>
                        </div>
                        <div class="form-row">
                        <div class="form-group col-md-6">
                            <label htmlFor="">Counter Size</label>
                            <input type='number' class="form-control" name='counters_size' placeholder="Counter Size" onChange={this.handleChange} required></input>
                        </div>
                        <div class="form-group col-md-6">
                            <label htmlFor="activation">Device Category</label>
                            <select id="categoryId" class="form-control" type="number" name="categoryId" onChange={this.handleChange} required>
                            <option>Choose ...</option>
                            {categoryOptions}
                            </select>   
                        </div>
                        </div>
                        <div class="form-row">
                        <div class="form-group col-md-6">
                            <label htmlFor="">Band</label>
                            <input type='text' class="form-control" name='band' placeholder="Enter band" onChange={this.handleChange} required></input>
                        </div>
                        <div class="form-group col-md-6">
                            <label htmlFor="">Device Class</label>
                            <input type='text' class="form-control" name='device_class' placeholder="Enter Device Class" onChange={this.handleChange} required></input>
                        </div>
                        </div>
                        <div className="modal-footer">
                        <button type="reset" class="btn btn-danger" onClick={this.handleReset}>Reset</button>
                        <button type="submit" class="btn btn-primary" >Save</button>
                        </div>
                    </form>
                    <p className="validationError text-center">{this.state.errs}</p>
                    </div> 
                    </div>
                    </div>
                    </div>
                    </div>
                </div>
            );
        }
    }