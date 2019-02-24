import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';

class HistoryBertasbih extends Component {
    state = { transaksiList: [], transaksiDetailList: [] }

    componentDidMount() {
        axios.get('http://localhost:1997/transaksi', {
            params: {
                username: this.props.username
            }
        }).then((res) => {
            this.setState({ transaksiList: res.data })
        }).catch((err) => {
            console.log(err)
        })
    }

    onBtnDetailClick = (id) => {
        axios.get('http://localhost:1997/transaksiItem', {
            params: {
                transaksiId: id 
            }
        }).then((res) => {
            this.setState({ transaksiDetailList: res.data })
        }).catch(err => {
            console.log(err)
        })
    }

    renderBodyTransaksi = () => {
        var listJSXTransaksi = this.state.transaksiList.map((item) => {
            return (
                <tr key={item.id}>
                    <td>{item.id}</td>
                    <td>{item.username}</td>
                    <td>{item.tglTransaksi}</td>
                    <td>{item.totalItem}</td>
                    <td>Rp. {item.totalPrice}</td>
                    <td><input className="btn btn-primary" type="button" value="Detail" onClick={() => this.onBtnDetailClick(item.id)} /></td>
                </tr> )
            
        })
        return listJSXTransaksi;
    }

    renderBodyDetailTransaksi = () => {
        var listJSXTransaksi = this.state.transaksiDetailList.map((item) => {
            return (
                <tr key={item.id}>
                    <td>{item.id}</td>
                    <td>{item.popokId}</td>
                    <td>{item.nama}</td>
                    <td><img src={item.img} width="50px" alt={item.id} /></td>
                    <td>Rp. {item.harga}</td>
                    <td>{item.quantity}</td>
                </tr> )
            
        })
        return listJSXTransaksi;
    }

    render() {
        return (
            <div className="container-fluid">
                <div className="row">
                    <div className="col-lg-12 text-center">
                        <h1 className="section-heading text-uppercase">History</h1>
                    </div>
                </div>
                <center>
                    <table>
                        <thead>
                            <tr>
                                <th>Id</th>
                                <th>Username</th>
                                <th>Tanggal Transaksi</th>
                                <th>Total Item</th>
                                <th>Total Price</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.renderBodyTransaksi()}
                        </tbody>
                    </table>
                    <h2>Detail Transaksi</h2>
                    <table style={{ marginTop: '30px'}}>
                        <thead>
                            <tr>
                                <th>Id</th>
                                <th>Popok Id</th>
                                <th>Nama</th>
                                <th>Image</th>
                                <th>Harga</th>
                                <th>Quantity</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.renderBodyDetailTransaksi()}
                        </tbody>
                    </table>
                </center>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return { username: state.auth.username }
}

export default connect(mapStateToProps)(HistoryBertasbih);