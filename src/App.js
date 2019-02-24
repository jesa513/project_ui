import React, { Component } from 'react';
import Header from './components/Header';
import SignIn from './components/SignIn';
import Home from './components/Home';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';
import Cookies from 'universal-cookie';
import { withRouter } from 'react-router-dom';
import { keepSignin, cookieChecked } from './actions';
import Register from './components/Register';
import Product from './components/Product';
import ProductDetail from './components/ProductDetail';
import ProductItem from './components/ProductItem';
import Cart from './components/Cart';
import History from './components/History';
import Verified from './components/Verified';
import WaitingVerification from './components/WaitingVerification';
import Equipment from './components/Equipment';
import EquipmentDetail from './components/EquipmentDetail';
import EquipmentItem from './components/EquipmentItem';


const cookies = new Cookies();

class App extends Component {
  state = { content: 'Ini Content' }

  componentDidMount() {
      const username = cookies.get('Ferguso');
      if(username !== undefined) {
          this.props.keepSignin(username);
      }
      else {
        this.props.cookieChecked();
      }
  }

  // onBtnOKClick = () => {
  //   this.setState({ content: 'Ini Comberan' })
  // }

  render() {
    if (this.props.cookie) {
      return (
        <div>
          <Header  />
          <div>
            <Route exact path="/" component={Home} />
            <Route path="/signin" component={SignIn} />
            <Route path="/register" component={Register} />
            <Route path="/product" component={Product} />
            <Route path="/productdetail" component={ProductDetail} /> 
            <Route path="/productitem" component={ProductItem} />
            <Route path="/equipment" component={Equipment} />
            <Route path="/equipmentdetail" component={EquipmentDetail} /> 
            <Route path="/equipmentitem" component={EquipmentItem} />
            <Route path="/cart" component={Cart} />
            <Route path="/history" component={History} />
            <Route path="/waitingverification" component={WaitingVerification}/> 
            <Route path="/verified" component={Verified}/> 
          </div>
        </div>
      );
    }
    
    return (<div>
              <center><h1>Loading...</h1></center>
          </div>);
  }
}

const mapStateToProps = (state) => {
    return { cookie: state.auth.cookie }
}

export default withRouter(connect(mapStateToProps, { keepSignin, cookieChecked })(App));

// class Manusia {
//   constructor(bertasbih, kucing) {
//     this.nama = bertasbih
//     this.umur = kucing
//   }
// }

// var Andi = new Manusia('Andi', 25);
// var Budi = new Manusia('Budi', 27);