import React from 'react'

export default function Notification() {
    return (
        <div className="tab-pane" id="notification">
            <h6>NOTIFICATION SETTINGS</h6>
            <hr />
            <form>
                <div className="form-group">
                    <label className="d-block mb-0">Security Alerts</label>
                    <div className="small text-muted mb-3">Receive security alert notifications via email
                    </div>
                    <div className="custom-control custom-checkbox">
                        <input type="checkbox" className="custom-control-input" id="customCheck1" checked />
                        <label className="custom-control-label" for="customCheck1">Email each time a
                            vulnerability is found</label>
                    </div>
                    <div className="custom-control custom-checkbox">
                        <input type="checkbox" className="custom-control-input" id="customCheck2" checked />
                        <label className="custom-control-label" for="customCheck2">Email a digest summary of
                            vulnerability</label>
                    </div>
                </div>
                <div className="form-group mb-0">
                    <label className="d-block">SMS Notifications</label>
                    <ul className="list-group list-group-sm">
                        <li className="list-group-item has-icon">
                            Comments
                            <div className="custom-control custom-control-nolabel custom-switch ml-auto" >
                                <input type="checkbox" className="custom-control-input" id="customSwitch1"
                                    checked />
                                <label className="custom-control-label" for="customSwitch1"></label>
                            </div>
                        </li>
                        <li className="list-group-item has-icon">
                            Updates From People
                            <div className="custom-control custom-control-nolabel custom-switch ml-auto" >
                                <input type="checkbox" className="custom-control-input" id="customSwitch2" />
                                <label className="custom-control-label" for="customSwitch2"></label>
                            </div>
                        </li>
                        <li className="list-group-item has-icon">
                            Reminders
                            <div className="custom-control custom-control-nolabel custom-switch ml-auto" >
                                <input type="checkbox" className="custom-control-input" id="customSwitch3"
                                    checked />
                                <label className="custom-control-label" for="customSwitch3"></label>
                            </div>
                        </li>
                        <li className="list-group-item has-icon">
                            Events
                            <div className="custom-control custom-control-nolabel custom-switch ml-auto" >
                                <input type="checkbox" className="custom-control-input" id="customSwitch4"
                                    checked />
                                <label className="custom-control-label" for="customSwitch4"></label>
                            </div>
                        </li>
                        <li className="list-group-item has-icon">
                            Pages You Follow
                            <div className="custom-control custom-control-nolabel custom-switch ml-auto" >
                                <input type="checkbox" className="custom-control-input" id="customSwitch5" />
                                <label className="custom-control-label" for="customSwitch5"></label>
                            </div>
                        </li>
                    </ul>
                </div>
            </form>
        </div>

    )
}
