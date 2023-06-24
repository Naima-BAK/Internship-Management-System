import React from 'react'
import { Helmet } from 'react-helmet';
import NavSetting from './Layouts_setting/NavSetting';
import SideBarSetting from './Layouts_setting/SideBarSetting'
import '../../../assets/admin/css/setting/setting.css'
import AccountSetting from './Account_setting/AccountSetting';
import Security from './securityS_setting/Security';
import EmailHistory from './email_setting/EmailHistory';
import Colors from './colors_setting/Colors';
export default function StudentSetting() {

    return (
        <div className="container">
            <Helmet>
                <script src="https://code.jquery.com/jquery-1.10.2.min.js"></script>
                <script src="https://cdn.jsdelivr.net/npm/bootstrap@4.4.1/dist/js/bootstrap.bundle.min.js"></script>
                <script type="text/javascript" />
            </Helmet>


            <div className="row gutters-sm">
                <NavSetting />

                <div className="col-md-8">
                    <div className="card">
                        <SideBarSetting />

                        <div className="card-body tab-content">
                            <AccountSetting />

                            <Security />
                            <Colors />
                            <EmailHistory />






                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}
