import React, {Component} from 'react';
import {connect} from 'react-redux';



class WaitingVerification extends Component {
    render (){
        return (
              
            <div style={{ margin: '100px' }}>
            <div>
                <h2>Please attention </h2>
                <p> Please check your email for verification account</p>
                <p> If you don't get any email confirmation, please click button below for resend email</p>
                <input type='button' value = "Resend Email" />
            </div>
            </div>
        
        )
    }
}

export default WaitingVerification;