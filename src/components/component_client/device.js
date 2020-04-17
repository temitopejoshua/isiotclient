import React, { Component } from 'react';
import { Redirect } from 'react-router-dom'
import BounceLoader from 'react-spinners/BounceLoader'
import MapContainer from './Map'
import Deletedevice from './Deletedevice'


export default class Device extends Component {
  constructor(props) {
    super(props)
    this.state = {
      device: {},
      loading: true,
      location: [
        { latitude: 47.359423, longitude: -122.021071 },
      ]

    }
  }



  componentWillMount(props) {
    // The dynamic URL segment we're interested in, "id",
    // is stored in the "params" property.
    const { match: { params } } = this.props;

    const token = window.sessionStorage.getItem("jwt");
    fetch('http://localhost:8081/api/devices/' + params.id,
      {
        headers: { 'Authorization': token }
      })
      .then((response) => response.json())
      .then((responseData) => {
        this.setState({
          device: responseData.device,
          loading: false,
        });

      })

  }

  render() {

    if (sessionStorage.getItem("isAuthenticated") !== 'true') {

      return <Redirect to="/login" />
    }
    return (

      <div>


        <div class="loaderTemp" hidden={!this.state.loading}>

          <div>
            <BounceLoader

              size={100}
              color={"grey"}
              loading={this.state.loading}

            />
          </div>

        </div>



        <div hidden={this.state.loading}>

          <div class="row">
            <div class="col-md-3 pl-4 pr-4 pt-5">
              <div class="device">
                <p class="head"><small>
                  <span class="float-left">{this.state.device.tags}</span>
                  <span class="float-right">{this.state.device.encryption}</span>
                  <span class="float-right">{this.state.device.activation}</span>
                </small>
                </p>

                <p>{this.state.device.dev_eui} <small class="float-right">--:--:--</small></p>
              </div>
            </div>

            <div class="col-md-9 mine p-3">
              <div class="row">
                <div class="col-md-12">
                  <div class="row">
                    <div class="col-md-4">
                      <h4>Device management</h4>
                      <h6><small>Device EUI</small></h6>
                      <p>{this.state.device.dev_eui}</p>

                      <h6><small>Application EUI</small></h6>
                      <p>{this.state.device.app_eui}</p>

                      <h6><small>Tags</small></h6>
                      <input type="text" class="input-a" defaultValue={this.state.device.tags} />
                    </div>

                    <div class="col-md-4">
                      <div class="row">
                        <div class="col-md-4">
                          <p><small>Uplink</small></p>
                          <div class="check">
                            <input type="checkbox" id="ch1" class="checkbox-custom" />
                            <label for="ch1"></label>
                          </div>
                        </div>

                        <div class="col-md-4">
                          <p><small>Downlink</small></p>
                          <div class="check">
                            <input type="checkbox" id="ch3" checked class="checkbox-custom" />
                            <label for="ch3"></label>
                          </div>
                        </div>

                        <div class="col-md-4 mt-4">
                          <button type="button" class=" btn-danger mt-3" onClick={Deletedevice.bind(this, this.state.device.dev_eui)} >Delete</button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="col-md-12 mt-5">
                  <div class="row">
                    <div class="col-md-4">
                      <h4 class="">Security</h4>
                      <h6><small>Application key</small></h6>
                      <input type="text" class="input-a mb-3" defaultValue={this.state.device.app_eui} />

                      <h6><small>Device address</small></h6>
                      <p>{this.state.device.dev_addr}</p>

                      <h6><small>Network session key</small></h6>
                      <p>{this.state.device.nwkskey}</p>

                      <h6><small>Application session key</small></h6>
                      <p>{this.state.device.appskey}</p>
                    </div>
                    <div class="col-md-4">
                      <div class="row">
                        <div class="col-md-4">
                          <p><small>Activation</small></p>
                          <div class="check">
                            <input type="checkbox" id="ch5" class="checkbox-custom" />
                            <label for="ch5"></label>
                          </div>
                        </div>

                        <div class="col-md-4">
                          <p><small>Encryption</small></p>
                          <div class="check">
                            <input type="checkbox" id="ch6" class="checkbox-custom" />
                            <label for="ch6"></label>
                          </div>
                        </div>

                        <div class="col-md-4"></div>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="col-md-12 mt-5">
                  <div class="row">
                    <div class="col-md-4">
                      <h4 class="">LoRa</h4>
                      <h6>Counters</h6>

                      <div class="row">
                        <div class="col-md-6">
                          <p><small><i class="fa fa-stats-up"></i> Uplink</small></p>
                          <p>4543</p>
                        </div>

                        <div class="col-md-6">
                          <p><small><i class="fa fa-stats-up"></i> Uplink</small></p>
                          <p>4543</p>
                        </div>
                      </div>

                      <h6>Delays</h6>

                      <div class="row">
                        <div class="col-md-6">
                          <p><small><i class="fa fa-arrow-left"></i> RX1, s</small></p>
                          <p>1</p>
                        </div>

                        <div class="col-md-6">
                          <p><small><i class="fa fa-stats-up"></i> RX2, s</small></p>
                          <p>5</p>
                        </div>
                      </div>
                    </div>

                    <div class="col-md-4"></div>
                  </div>
                </div>

                <div class="col-md-6">

                </div>

                <div class="col-md-12 mb-5">
                  <MapContainer location={this.state.location} />
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    );
  }
}

