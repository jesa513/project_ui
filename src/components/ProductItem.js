import React, { Component } from 'react';
import { connect } from 'react-redux';
import { select_product } from '../actions';

class ProductItem extends Component {

    onItemClick = () => {
        this.props.select_product(this.props.product);
    }

    render() {
        const { image, productname, deskripsi, price } = this.props.product;
        return (
            <div onClick={this.onItemClick} className={`col-md-${this.props.size} col-sm-6 portfolio-item`}>
                <div className="portfolio-link" data-toggle="modal">
                    <div className="portfolio-hover">
                        <div className="portfolio-hover-content">
                            <i className="fas fa-plus fa-3x" />
                        </div>
                    </div>
                    <img src={`http://localhost:1997${image}`} alt={productname} width={200}/>
                </div>
                <div className="portfolio-caption">
                    <h4>{productname}</h4>
                    <p className="text-muted">{deskripsi}</p>
                    <h4>Rp. {price}</h4>
                </div>
            </div>  
        );
    }
}

export default connect(null, { select_product })(ProductItem);