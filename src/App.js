import React, { Component } from "react";
import Navi from "./components/Navi";
import CatagoryList from "./components/CatagoryList";
import ProductList from "./components/ProductList";
import { Container, Row, Col } from "reactstrap";
import alertify from "alertifyjs";
import { Switch, Route } from "react-router-dom";
import NotFound from "./NotFound";
import CartList from "./components/CartList";
import FormDeneme1 from "./components/FormDeneme1";
import FormDeneme2 from "./components/FormDeneme2";

export default class App extends Component {
  state = { currentCategory: "", products: [], sepet: [] };
  changeCategory = category => {
    // "Bu bir fonksiyon degiskenidir" tanımlaması şeklinde tanımlıyoruz. "Category" burada dışarıdan alınan degiskendir
    this.setState({ currentCategory: category.categoryName });
    this.getProducts(category.id);
  };

  componentDidMount() {
    this.getProducts();
  }

  getProducts = categoryId => {
    let url = "http://localhost:3000/products";
    if (categoryId) {
      //console.log("Buraya girdim")
      url += "?categoryId=" + categoryId;
      //console.log(categoryId);
      //console.log(url);
    }
    fetch(url)
      .then(response => response.json())
      .then(data => this.setState({ products: data }));
  };
  addToCart = product => {
    let yeniSepet = this.state.sepet;
    var addedItem = yeniSepet.find(c => c.product.id === product.id);
    if (addedItem) {
      addedItem.quantity += 1;
    } else {
      yeniSepet.push({ product: product, quantity: 1 });
    }
    this.setState({ sepet: yeniSepet });
    alertify.success(product.productName + " Sepete eklendi", 1.5); //Sepete eklendikçe sağ alttan bildirim yollama olayı 1 Saniye görünmesi için 1
  };

  removeFromCart = product => {
    let newCart = this.state.sepet.filter(c => c.product.id !== product.id);
    this.setState({ sepet: newCart });
    alertify.error(product.productName + " Ürün Sepetten Silindi", 3);
  };

  render() {
    let CategoryInfo = { title: "Category List", baskaBisey: "Bisey" };
    let ProductInfo = { title: "Product List", degisikBisey: "Degisik" };
    return (
      <div>
        <Container>
          <Navi sepet={this.state.sepet} removeFromCart={this.removeFromCart} />

          <Row>
            <Col xs="3">
              <CatagoryList
                currentCategory={this.state.currentCategory}
                changeCategory={this.changeCategory}
                info={CategoryInfo}
              />
            </Col>
            <Col xs="9">
              <Switch>
                <Route 
                  exact 
                  path="/"
                  render={props => ( // BURADA PRODUCTLIST'İ DE COMPONENT GİBİ GÖNDERE BİLİRDİK FAKAT PROPS LARI OLDUĞU İÇİN BU ŞEKİLDE YAPTIK YOKSA PROPSLARI ProductList.js sayfasına gönderemezdik.
                    <ProductList
                      {...props}
                      info={ProductInfo}
                      addToCart={this.addToCart}
                      currentCategory={this.state.currentCategory}
                      products={this.state.products}
                    />
                  )}
                />
                <Route path="/sepet"  render={props => ( // BURADA PRODUCTLIST'İ DE COMPONENT GİBİ GÖNDERE BİLİRDİK FAKAT PROPS LARI OLDUĞU İÇİN BU ŞEKİLDE YAPTIK YOKSA PROPSLARI ProductList.js sayfasına gönderemezdik.
                    <CartList
                    {...props}
                      removeFromCart={this.removeFromCart}
                      sepet={this.state.sepet}
                    />
                  )} />
                  <Route path="/form1" component={FormDeneme1} />
                  <Route path="/form2" component={FormDeneme2} />
                <Route component={NotFound} />
              </Switch>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}
