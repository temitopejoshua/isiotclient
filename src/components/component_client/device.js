import React, { Component } from 'react';
import { Redirect } from 'react-router-dom'
import BounceLoader from 'react-spinners/BounceLoader'
import { ThemeProvider } from 'react-bootstrap';
import GoogleApiWrapper from './Map'



export default class Device extends Component {
  constructor(props) {
    super(props)
    this.state = {
      device: {},
      loading: true
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
          loading: false
        });
      })
    console.log("This is the id " + params.id)
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
                <div class="col-md-6">
                  <h4>Device management</h4>
                  <h6><small>Device EUI</small></h6>
                  <p>{this.state.device.dev_eui}</p>

                  <h6><small>Application EUI</small></h6>
                  <p>{this.state.device.app_eui}</p>

                  <h6><small>Tags</small></h6>
                  <input type="text" class="input-a" defaultValue={this.state.device.tags} />

                  <h4 class="mt-5">Security</h4>
                  <h6><small>Application key</small></h6>
                  <input type="text" class="input-a mb-3" defaultValue={this.state.device.app_eui} />

                  <h6><small>Device address</small></h6>
                  <p>{this.state.device.dev_addr}</p>

                  <h6><small>Network session key</small></h6>
                  <p>{this.state.device.nwkskey}</p>

                  <h6><small>Application session key</small></h6>
                  <p>{this.state.device.appskey}</p>

                  <h4 class="mt-5">LoRa</h4>
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

                  <h4 class="mt-5">Radio</h4>

                  <h6><small>Last activity</small></h6>
                  <p>Saturday 11 04 2020 15:08:39</p>

                  <h6><small>Band</small></h6>
                  <input type="text" class="input-a mb-3" />

                  <h4 class="mt-5">ADR</h4>
                  <div class="row">
                    <div class="col-md-6">
                      <h6><small>Mode</small></h6>
                    </div>

                    <div class="col-md-6">
                      <h6><small>Current</small></h6>
                      <p>not set</p>
                    </div>
                  </div>
                </div>

                <div class="col-md-6">
                  <div class="check">
                    <input type="checkbox" id="ch1" class="checkbox-custom" />
                    <label for="ch1"></label>
                  </div>
                </div>

                <div class="col-md-12 mb-5">
                  <GoogleApiWrapper />
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    );
  }
}

