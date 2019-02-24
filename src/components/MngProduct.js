import React, { Component } from 'react';
import axios from 'axios';
import '../support/css/bunting.css';
import { CustomInput } from 'reactstrap';


class MngProduct extends Component {
    state= { productList: [], AddProductImage: 'Pilih Gambar', EditProductImage: 'Pilih Gambar', selectedEditProductId: 0 }
    
    
    componentDidMount() {
        axios.get('http://localhost:1997/product/listproduct')
        .then((res) => {
            this.setState({ productList: res.data })
        })
    }

    onBtnAddClick = () => {
        if(document.getElementById("AddProductImage").files[0] !== undefined) {
            var formData = new FormData()
            var headers = {
                headers: 
                {'Content-Type': 'multipart/form-data'}
            }

            var data = {
                productname: this.refs.AddProductName.value,
                category: this.refs.AddProductCategory.value,
                price: this.refs.AddProductPrice.value,
                deskripsi: this.refs.AddProductDeskripsi.value,
            }

            if(document.getElementById('AddProductImage')){
                formData.append('image', document.getElementById('AddProductImage').files[0])
            }
            formData.append('data', JSON.stringify(data))

            axios.post("http://localhost:1997/product/addproduct", formData, headers)
            .then((res) => {
                alert("Add Product Success")
                this.setState({ productList: res.data })
            })
            .catch((err) =>{
                console.log(err)
            })
        }
        else {
            alert('Image harus diisi!')
        }
    }



    onBtnDeleteClick = (id) => {
        if(window.confirm('Are you sure to delete?')) {
            axios.delete('http://localhost:1997/product/deleteproduct/' + id)
            .then((res) => {
                alert('Delete Success');
                this.setState({ productList: res.data })
            })
            .catch((err) => {
                alert('Error')
                console.log(err);
            })
        }
    }

    onBtnUpdateClick = (id) => {
        var formData = new FormData()
        var headers = {
            headers: 
            {'Content-Type': 'multipart/form-data'}
        }

        var data = {
            productname: this.refs.EditProductName.value,
            category: this.refs.EditProductCategory.value,
            price: this.refs.EditProductPrice.value,
            deskripsi: this.refs.EditProductDeskripsi.value
        }

        if(document.getElementById('EditProductImage')){
            formData.append('image', document.getElementById('EditProductImage').files[0])
        }
        formData.append('data', JSON.stringify(data))

        axios.put("http://localhost:1997/product/editproduct/" + id, formData, headers)
        .then((res) => {
            alert("Edit Product Success")
            this.setState({ productList: res.data, selectedEditProductId: 0 })
        })
        .catch((err) =>{
            console.log(err)
        })
    }

    onAddFileImageChange = () => {
        if(document.getElementById("AddProductImage").files[0] !== undefined) {
            this.setState({AddProductImage: document.getElementById("AddProductImage").files[0].name})
        }
        else {
            this.setState({AddProductImage: 'Pilih Gambar'})
        }
    }

    onEditFileImageChange = () => {
        if(document.getElementById("EditProductImage").files[0] !== undefined) {
            this.setState({EditProductImage: document.getElementById("EditProductImage").files[0].name})
        }
        else {
            this.setState({EditProductImage: 'Pilih Gambar'})
        }
    }


    renderProductList = () => {
        var listJSX = this.state.productList.map((item) => {
            if(item.id === this.state.selectedEditProductId) {
                return (
                    <tr>
                        <td></td>
                        <td><input type="text" ref="EditProductName" defaultValue={item.productname} /></td>
                        <td><input type="text" ref="EditProductCategory" defaultValue={item.category} /></td>
                        <td><CustomInput type="file" id="EditProductImage" name="EditProductImage" label={this.state.EditProductImage} onChange={this.onEditFileImageChange} /></td>
                        <td><input type="number" ref="EditProductPrice" defaultValue={item.price} /></td>
                        <td><input type="text" ref="EditProductDeskripsi" defaultValue={item.deskripsi} /></td>
                        <td><input type="button" class="btn btn-primary" value="Cancel" onClick={() => this.setState({ selectedEditProductId: 0 })} /></td>
                        <td><input type="button" class="btn btn-primary" value="Save" onClick={() => this.onBtnUpdateClick(item.id)} /></td>
                    </tr>
                )
            }
            return (
                <tr>
                    <td>{item.id}</td>
                    <td>{item.productname}</td>
                    <td>{item.category}</td>
                    <td><img src={`http://localhost:1997${item.image}`} alt={item.productname} width={800} /></td>
                    <td>{item.price}</td>
                    <td>{item.deskripsi}</td>
                    <td><input type="button" class="btn btn-primary" value="Edit" onClick={() => this.setState({selectedEditProductId:item.id})} /></td>
                    <td><input type="button" class="btn btn-danger" value="Delete" onClick={() => this.onBtnDeleteClick(item.id)} /></td>  
                </tr>
            )
        })
        return listJSX;
    }


    render() {
        return (
            <div style={{ margin: '100px' }}>
            <div>
            <table className="table">
                  <thead className="thead-dark">
                            <tr>
                            <th>Id</th>
                            <th>Nama Produk</th>
                            <th>Kategori</th>
                            <th>Image</th>
                            <th>Harga</th>
                            <th>Deskripsi</th>
                            <th></th>
                            </tr>
                    </thead>
                        <tbody>
                            {this.renderProductList()}
                        </tbody>
                        <tfoot>
                            <tr>
                            <th scope="row"></th>
                                <td><input type="text" ref="AddProductName" /></td>
                                <td><input type="text" ref="AddProductCategory" /></td>
                                <td><CustomInput type="file" id="AddProductImage" name="AddProductImage" label={this.state.AddProductImage} onChange={this.onAddFileImageChange} /></td>
                                <td><input type="number" ref="AddProductPrice" /></td>
                                <td><input type="text" ref="AddProductDeskripsi" /></td>
                                <td><input type="button" class="btn btn-success" value="Add" onClick={this.onBtnAddClick} /></td>
                            </tr>
                        </tfoot>
                        </table>
                 </div>
                </div>
        );
    }
}


export default MngProduct;