import React, { Component } from 'react';
import axios from 'axios';
import EquipmentItem from './EquipmentItem';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';



class Equipment extends Component {
    state = { productList: [], searchProductList: [] }

    componentDidMount() {
      axios.get('http://localhost:1997/product/equipment')
            .then((res) => {
                this.setState({ productList: res.data, searchProductList: res.data  })
            }).catch((err) => {
                console.log(err)
            })
    }

    // onBtnSearchClick = () => {
    //     var nama = this.refs.searchNama.value;
    //     var merk = this.refs.searchMerk.value;
    //     var hargaMin = parseInt(this.refs.hargaMinSearch.value);
    //     var hargaMax = parseInt(this.refs.hargaMaxSearch.value);

    //     var arrSearch = this.state.listPopok.filter((item) => {
    //         return item.merk.includes(merk) 
    //                 && item.harga >= hargaMin
    //                 && item.harga <= hargaMax
    //                 && item.nama.toLowerCase().includes(nama.toLowerCase())
    //     })

    //     this.setState({ searchListPopok: arrSearch })
    // }

    // renderListProduct = () => {
    //     var total = 12;
    //     var size = 4;
    //     var check = true;
    //     var listJSXProduct = this.state.searchListProduct.map((item) => {
    //         if(total === 0 && check === true) {
    //             size = 6;
    //             total = 12;
    //             check = false;
    //         }
    //         else if(total === 0 && check === false){
    //             size = 4;
    //             total = 12;
    //             check = true;
    //         }
    //         total -= size;

    //         return (
    //             <ProductItem size={size} popok={item} key={item.id} />
    //         )
    //     })
    //     return listJSXProduct;
    // }


    renderProductList = () => {
        var total = 12;
        var size = 2;
        var check = true;
        var listJSXProduct = this.state.searchProductList.map((item) => {
            if(total === 0 && check === true) {
                size = 4;
                total = 12;
                check = false;
            }
            else if(total === 0 && check === false){
                size = 2;
                total = 12;
                check = true;
            }
            total -= size;

            return (
                <EquipmentItem size={size} product={item} key={item.id} />
            
            )
        })
        return listJSXProduct;
    }




    // renderProductList = () => {
    //     var listJSX = this.state.productList.map((item) => {
    //         return (
    //             <div>
    //             <div>
    //             <img src={`http://localhost:1997${item.image}`} alt={item.productname} width={150}/>
    //             </div>    
    //             <div className="portfolio-caption">
    //             </div>
    //             </div>
                
    //         )
    //     })
    //     return listJSX;
    // }

    render() {
        if(this.props.username !== "") {
            if(this.props.product.id !== 0) {
                return <Redirect to={`/equipmentdetail?productid=${this.props.product.id}&namaproduct=${this.props.product.productname}`} />
            }
        return (
            <div>

            <section className="bg-light" id="portfolio">
                <div className="container-fluid">
                    <div className="row">
                    <div className="col-lg-12 text-center">
                    <h2 className="section-heading text-uppercase"> List Equipment</h2>
                    </div>
                    </div>
                    <div className="row">
                    
                        {this.renderProductList()} 
                        </div>
                    
                    </div>
                
                    </section>
                </div>
      
        )}
        
        return <Redirect to='/signin' />
      }
    }


const mapStateToProps = (state) => {
    // console.log(state.selectedProduct)
    return { username: state.auth.username, product: state.selectedProduct }
    
}

    export default connect(mapStateToProps)(Equipment);