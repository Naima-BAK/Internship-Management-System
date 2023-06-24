import React from "react";
import BarChart from "./BarChart";
import CircleChart from "./CircleChart";
import { Card, CardBody, CardTitle } from 'reactstrap';

const Dashboard = () => {
    // ...

    return (
        <div>
            <h1>Dashboard</h1>

            <div className="row">
                <div className="col-md-4">
                    <Card>
                        <CardBody>
                            <CardTitle>Total students</CardTitle>
                            <p>11</p>
                        </CardBody>
                    </Card>
                </div>

                <div className="col-md-4">
                    <Card>
                        <CardBody>
                            <CardTitle>Toal students with internship</CardTitle>
                            <p>400</p>
                        </CardBody>
                    </Card>
                </div>

                <div className="col-md-4">
                    <Card>
                        <CardBody>
                            <CardTitle>Total teachers</CardTitle>
                            <p>200</p>
                        </CardBody>
                    </Card>
                </div>
            </div>

            <div className="row">
                <div className="col-md-4">
                    <Card>
                        <CardBody>
                            <CardTitle>Total internship</CardTitle>
                            <p>11</p>
                        </CardBody>
                    </Card>
                </div>

                <div className="col-md-4">
                    <Card>
                        <CardBody>
                            <CardTitle>Toal students with internship</CardTitle>
                            <p>400</p>
                        </CardBody>
                    </Card>
                </div>

                <div className="col-md-4">
                    <Card>
                        <CardBody>
                            <CardTitle>Total teachers</CardTitle>
                            <p>200</p>
                        </CardBody>
                    </Card>
                </div>
            </div>
            <div className="row">
                <div className="col-md-4" >
                    <Card >
                        <CardBody style={{ width: '500px', backgroundColor: '#ced4da' }}>
                            <CardTitle>Total teachers</CardTitle>
                            <p>   <BarChart /></p>

                        </CardBody>
                    </Card>
                </div>
                {/* #f8f9fa;
    --bs-gray-200: #e9ecef;
    --bs-gray-300: #dee2e6;
    --bs-gray-400: #ced4da; */}
                <div className="col-md-4">
                    <Card >
                        <CardBody style={{ backgroundColor: '#e9ecef' }}>
                            <CardTitle>Total teachers</CardTitle>
                            <CircleChart />
                        </CardBody>
                    </Card>
                </div>
                <div className="col-md-4">
                    <Card >
                        <CardBody style={{ backgroundColor: '#dee2e6' }}>
                            <CardTitle>Total teachers</CardTitle>
                            <CircleChart />
                        </CardBody>
                    </Card>
                </div>
            </div>

        </div>
    );
}
export default Dashboard;
