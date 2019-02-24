import React, { Component } from 'react';
import { connect } from 'react-redux';
import Cookies from 'universal-cookie';
import { Redirect } from 'react-router-dom';
import { onUserRegister } from '../actions';

const cookies = new Cookies();

class Register extends Component {

    componentWillReceiveProps(newProps) {
        if(newProps.username !== '') {
            cookies.set('Ferguso', newProps.username, { path: '/' });
        }
    }

    onBtnRegisterClick = () => {

        var nama= this.refs.nama.value;
        var perusahaan= this.refs.perusahaan.value;
        var alamat= this.refs.alamat.value;
        var telepon= this.refs.telepon.value;
        var username= this.refs.username.value;
        var email= this.refs.email.value;
        var password= this.refs.password.value;

        this.props.onUserRegister({ nama, perusahaan, alamat, telepon, username, email, password });

    }


    renderError = () => {
        if(this.props.error.length > 0) {
            return <p className="alert alert-danger">{this.props.error}</p>;
        }
    }

    renderButton = () => {
        if(this.props.loading) {
            return <i className="fa fa-spinner fa-spin" style={{ fontSize: '54px' }}/>
        }
        return <input type="button" name="submit" id="submit" className="submit" defaultValue="Register" onClick={this.onBtnRegisterClick} />
    }

    render() {
        if(this.props.username === '') {
            return (
                <div className="bodyRegister">
                    <div className="main">
                        <div className="container">
                            <form className="appointment-form" id="appointment-form">
                                <h2>Registration Form</h2>
                                <div className="form-group-1">
                                    <input ref="nama" type="text" name="nama" id="nama" placeholder="Nama" required />
                                    <input ref="perusahaan" type="text" name="perusahaan" id="perusahaan" placeholder="Nama Perusahaan" required />
                                    <input ref="alamat" type="text" name="alamat" id="alamat" placeholder="Alamat" required />
                                    <input ref="telepon" type="number" name="telepon" id="telepon" placeholder="Telepon" required />
                                    <input ref="username" type="text" name="username" id="username" placeholder="Username" required />
                                    <input ref="email" type="email" name="email" id="email" placeholder="Email" required />
                                    <input ref="password" type="password" name="password" id="password" placeholder="Password" required />
                                </div>
                                <div>
                                    {this.renderError()}
                                </div>
                                <div className="form-submit">
                                    {this.renderButton()}
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )
        }
        
        return <Redirect to='/waitingverification' />
    }
}

const mapStateToProps = (state) => {
    return { username: state.auth.username, loading: state.auth.loading, error: state.auth.error };
}

export default connect(mapStateToProps, { onUserRegister })(Register);