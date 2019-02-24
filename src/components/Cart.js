import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import '../support/css/tablewarna.css';



class Cart extends Component {
    state = { cartList: [], selectedIdEdit: 0, totalPrice: 0 }

    componentDidMount() {
        this.getCartList();
    }

    getCartList = () => {
        console.log('Ini cart list')
        console.log(this.props.username)
        if(this.props.username !== '') {
            axios.get(`http://localhost:1997/transaksi/daftarcart/${this.props.username}`)
            .then((res) => {
                console.log(res)
                var price = 0;
                res.data.forEach(element => {
                    price += (element.quantity * element.price);
                });
                this.setState({ cartList: res.data, selectedIdEdit: 0, totalPrice: price })
            }).catch((err) => {
                console.log(err)
            })
        }
        
    }


    onBtnSaveClick = (id) => {
        // var productname = this.refs.productnameEdit.value;
        // var price = this.refs.priceEdit.value;
        var quantity = this.refs.quantityEdit.value;
        

        axios.put('http://localhost:1997/transaksi/editcart/' + id, {
            quantity
        }).then((res) => {
            this.setState({ listProduct: res.data, selectedIdEdit: 0 })
        }).catch((err) => {
            alert('tidak bisa diedit')
            console.log(err);
        })
    }


    onBtnDeleteClick = (id) => {
        if(window.confirm('Are you sure to delete?')) {
            console.log('ini id')
            console.log(id)
            axios.delete('http://localhost:1997/transaksi/deletecart/' + id)
            .then((res) => {
                alert('Delete Success');
                this.setState({ listProduct: res.data })
            })
            .catch((err) => {
                alert('Error')
                console.log(err);
            })
        }
    }


    // onBtnCheckoutClick = () => {

    //     if(window.confirm('Are you sure to Checkout?')) {
    //     axios.post('http://localhost:1997/transaksi/datatransaksi',{
    //         username: this.props.username,
    //         tglTransaksi: new Date(),
    //         totalPrice: this.state.totalPrice,
    //         totalItem: this.state.cartList.length

    //     }).then((res) => {
    //        console.log('masuk ke transaksi item')  
    //        console.log(res.data[0])  
    //        this.state.cartList.forEach((item) => {
    //           axios.post('http://localhost:1997/transaksi/transaksiitem', {
    //             // transaksiId: res.data,
    //             productId: item.productId,
    //             productname: item.productname,
    //             price: item.price,
    //             quantity: item.quantity
    //           }).then((res) => {
    //             console.log(res.data)  
    //             console.log('add success' + item.productId)
    //           }).catch((err) => {
    //             console.log(err)
    //             console.log('error post transaksi item')
    //           })
    //            axios.delete(`http://localhost:1997/transaksi/hapusdaftarcart/${this.props.username}`)
    //        }).then((res) => {
    //            console.log('delete success')
    //        }).catch((err) => {
    //            console.log('belum berhasil dihapus')
    //        })
          
    //     }).catch((err) => {
    //         console.log('data transaksi tidak berhasil dipost')
    //     })

    //     }
    // }




    onBtnCheckoutClick = () => {
        if(window.confirm('Are you sure to Checkout?')) {
            axios.post('http://localhost:1997/transaksi/datatransaksi', {
                username: this.props.username,
                tglTransaksi: new Date(),
                totalPrice: this.state.totalPrice,
                totalItem: this.state.cartList.length
            }).then((res) => {
                console.log('setelah insert data transaksi')
                this.state.cartList.forEach((item) => {
                    console.log('ini adalah res.data')
                    console.log(res.data)
                    axios.post('http://localhost:1997/transaksi/transaksiitem', {
                        transaksiId: res.data.insertId,
                        productId: item.productId,
                        productname: item.productname,
                        price: item.price,
                        quantity: item.quantity
                    }).then((res) => {
                        console.log('add success' + item.productId)
                    }).catch((err) => {
                        console.log(err)
                    })
                    axios.delete(`http://localhost:1997/transaksi/hapusdaftarcart/${this.props.username}`)
                            .then((res) => {
                                console.log('delete success' + item.productId)
                                this.getCartList();
                            }).catch((err) => {
                                console.log(err)
                            })
                })
            }).catch((err) => {
                console.log('data transaksi berhasil di post')
            })
        }
    }
   




    renderBodyProduct = () => {
        var listJSXProduct = this.state.cartList.map((item) => {
            if(item.id !== this.state.selectedIdEdit) {
                return (
                    <tr>
                    <td>{item.id}</td>
                    <td>{item.productname}</td>
                    <td>Rp. {item.price}</td>
                    <td>{item.quantity}</td>
                    <td>Rp. {item.price * item.quantity}</td>
                    <td><input className="btn btn-primary" type="button" value="Edit" onClick={() => this.setState({ selectedIdEdit: item.id })} /></td>
                    <td><input className="btn btn-danger" type="button" value="Remove" onClick={() => this.onBtnDeleteClick(item.id)} /></td>
                </tr> )
            }
            
            return (
                <tr>
                    {/* <td>{item.id}</td>
                    <td>
                        <input 
                            type="text" 
                            defaultValue={item.productname}
                            ref="productnameEdit"
                        />
                    </td>
                    <td>
                        <input
                            type="number"
                            ref="priceEdit"
                            defaultValue={item.price}
                        />
                    </td> */}
                    <td>
                        <input
                            type="number"
                            ref="quantityEdit"
                            defaultValue={item.quantity}
                        />
                    </td>

                    
                    <td><input className="btn btn-primary" type="button" value="Save" onClick={() => this.onBtnSaveClick(item.id)} /></td>
                    <td><input className="btn btn-danger" type="button" value="Cancel" onClick={() => this.setState({ selectedIdEdit: 0 })} /></td>
                </tr> )

        })
        return listJSXProduct;
    }


    render() {
        return (
            <div className="container-fluid">
                <div className="row">
                    <div className="col-lg-12 text-center">
                        <h1 className="section-heading text-uppercase"><center>Cart</center></h1>
                    </div>
                </div>
                    <table>
                        <thead>
                            <tr>
                                <th>Id</th>
                                <th>Nama Product</th>
                                <th>Harga</th>
                                <th>Quantity</th>
                                <th>Total Harga</th>
                                <th></th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.renderBodyProduct()}
                        </tbody>
                    </table>
                    <div>
                        <h2>Total Price : Rp. {this.state.totalPrice}</h2>
                    </div>
                    <div className="col-4">
                        <input type="button" className="btn btn-success" value="Checkout" onClick={this.onBtnCheckoutClick} />
                        
                        {/* <form>
                        <input type="button" value="Put Your Text Here" onclick="window.location.href='http://www.hyperlinkcode.com/button-links.php'" />
                        </form> */}

                    </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    console.log('ini map state to props cart')
    console.log(state.auth)
    return { username: state.auth.username };
    // return { username: state.auth.username };
}

export default connect(mapStateToProps)(Cart);