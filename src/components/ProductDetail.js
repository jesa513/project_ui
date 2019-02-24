import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import Header from './Header';
import queryString from 'query-string';
import { select_product } from '../actions';

class ProductDetail extends Component {

    componentDidMount() {
        console.log(this.props.location.search)
        var params = queryString.parse(this.props.location.search)
        console.log(params)
        var productId = params.productid;
        // var popokId = this.props.match.params.id;
        axios.get(`http://localhost:1997/product/productdetail/${productId}`)
            .then(res => {
                console.log(res)
                this.props.select_product(res.data)
            }).catch(err => {
                console.log(err)
            })
    }

    onBtnAddToCartClick = () => {
        var { id, productname, price } = this.props.product[0];
        var quantity = parseInt(this.refs.tbQuantity.value);
        // console.log(productname);
        // console.log(quantity);
        axios.post('http://localhost:1997/transaksi/cart', {
            username : this.props.username,
            productId: id,
            productname,
            price,
            quantity
        })
        .then((res) => {
            
            alert("Add to Cart Success")
        })
        .catch((err) =>{
            console.log(err)
        })
    }

    // onBtnAddToCartClick = () => {
    //     var { id, productname, price, image } = this.props.product;
    //     var quantity = parseInt(this.refs.tbQuantity.value);

    //     axios.get('http://localhost:1997/cart', {
    //         params: {
    //             username: this.props.username,
    //             productId: id
    //         }
    //     }).then((res) => {
    //         if(res.data.length > 0) {
    //             axios.put('http://localhost:1997/cart/' + res.data[0].id, {
    //                 username : this.props.username,
    //                 productId: id,
    //                 price,
    //                 quantity,
    //                 productname,
    //                 image
    //             }).then((res) => {
    //                 alert('Edit Cart Success!')
    //             }).catch((err) => {
    //                 console.log(err)
    //             })
    //         }
    //         else {
    //             axios.post('http://localhost:1997/cart', {
    //                 username : this.props.username,
    //                 popokId: id,
    //                 price,
    //                 quantity,
    //                 productname,
    //                 image
    //             }).then((res) => {
    //                 alert('Add to Cart Success!')
    //             }).catch((err) => {
    //                 console.log(err)
    //             })
    //         }
    //     }).catch(err => {
    //         console.log(err)
    //     })
    // }

     render() {
         
        var { productname, price, image, deskripsi } = this.props.product;
        return(
            <div>
                 <Header />   
                 <div style={{ margin: '100px' }}>
                </div>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-4">
                    <img src={`http://localhost:1997${image}`} alt={productname} width={200}/>
                        {/* <img alt={img} src={img} className="img-responsive" /> */}
                    </div>
                    <div className="col-8">
                        <div className="row">
                            <h1>{productname}</h1>
                        </div>
                        <div className="row">
                            <h2>Rp. {price}</h2>
                        </div>
                        <div className="row">
                            <p>{deskripsi}</p>
                        </div>
                        <div className="row">
                            <div className="col-3">
                                <input type="number" ref="tbQuantity" defaultValue={1} />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-3">
                                <input type="button" className="btn btn-success" value="Add to Cart" onClick={this.onBtnAddToCartClick} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        )
    }
}

const mapStateToProps = (state) => {
    return { product: state.selectedProduct, username: state.auth.username }
}

export default connect(mapStateToProps, { select_product })(ProductDetail);
