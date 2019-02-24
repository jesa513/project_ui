import React, { Component } from 'react';
import Example from './Example';
import { connect } from 'react-redux';
import axios from 'axios';

class Home extends Component {
    // state = { listProduct: [] }

    // componentWillMount() {
    //     axios.get('http://localhost:1997/product/listproduct')
    //         .then((res) => {
    //             this.setState({ listProduct: res.data })
    //         }).catch((err) => {
    //             console.log(err)
    //         })
    // }

    // renderListPopok = () => {
    //     var listJSXPopok = this.state.listProduct.map((item) => {
    //         return (
    //             <div>
    //                 <h3>{item.nama}</h3>
    //                 <p>{item.description}</p>
    //             </div>
    //         )
    //     })
    //     return listJSXPopok;
    // }

    render() {
        // console.log(this.state.listPopok)
        return(
            <div>
                <h1>GOoffice.com</h1>
                <Example />
            </div>
        );
    }
}


export default Home;
