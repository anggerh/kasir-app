import axios from "axios";
import React, { Component } from "react";
import { Col, Container, Row } from "react-bootstrap";
import swal from "sweetalert";
import { Hasil, ListCategories, Menus } from "../components";
import { API_URL } from "../utils/constants";
export default class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      menus: [],
      chooseCategory: "Makanan",
      keranjang: [],
    };
  }

  componentDidMount() {
    axios
      .get(API_URL + "products?category.nama=" + this.state.chooseCategory)
      .then((res) => {
        const menus = res.data;
        this.setState({ menus });
      })
      .catch((e) => {
        console.log(e.message);
      });

    this.getListKeranjang();
  }

  // componentDidUpdate(prevState) {
  //   if (this.state.keranjang !== prevState.keranjang) {
  //     axios
  //       .get(API_URL + "keranjang")
  //       .then((res) => {
  //         const keranjang = res.data;
  //         this.setState({ keranjang });
  //       })
  //       .catch((e) => {
  //         console.log(e.message);
  //       });
  //   }
  // }

  getListKeranjang = () => {
    axios
      .get(API_URL + "keranjang")
      .then((res) => {
        const keranjang = res.data;
        this.setState({ keranjang });
      })
      .catch((e) => {
        console.log(e.message);
      });
  };

  changeCategory = (value) => {
    this.setState({
      chooseCategory: value,
      menus: [],
    });

    axios
      .get(API_URL + "products?category.nama=" + value)
      .then((res) => {
        const menus = res.data;
        this.setState({ menus });
      })
      .catch((e) => {
        console.log(e.message);
      });
  };

  checkIn = (value) => {
    axios
      .get(API_URL + "keranjang?product.id=" + value.id)
      .then((res) => {
        if (res.data.length === 0) {
          const keranjang = {
            jumlah: 1,
            total_harga: value.harga,
            product: value,
          };

          axios
            .post(API_URL + "keranjang", keranjang)
            .then((res) => {
              this.getListKeranjang();
              swal({
                title: "Masuk Keranjang",
                text: "Menambahkan " + keranjang.product.nama + " ke Keranjang",
                icon: "success",
                button: false,
                timer: 1500,
              });
            })
            .catch((e) => {
              console.log(e.message);
            });
        } else {
          const keranjang = {
            jumlah: res.data[0].jumlah + 1,
            total_harga: res.data[0].total_harga + value.harga,
            product: value,
          };

          axios
            .put(API_URL + "keranjang/" + res.data[0].id, keranjang)
            .then((res) => {
              this.getListKeranjang();
              swal({
                title: "Masuk Keranjang",
                text: "Menambahkan " + keranjang.product.nama + " ke Keranjang",
                icon: "success",
                button: false,
                timer: 1500,
              });
            })
            .catch((e) => {
              console.log(e.message);
            });
        }
      })
      .catch((e) => {
        console.log(e.message);
      });
  };

  render() {
    const { menus, chooseCategory, keranjang } = this.state;
    return (
      <div className="mt-3">
        <Container fluid>
          <Row>
            <ListCategories
              changeCategory={this.changeCategory}
              chooseCategory={chooseCategory}
            />
            <Col className="mt-3">
              <h4>
                <strong>Daftar Produk</strong>
              </h4>
              <hr />
              <Row className="overflow-auto menu">
                {menus &&
                  menus.map((menu) => (
                    <Menus key={menu.id} menu={menu} checkIn={this.checkIn} />
                  ))}
              </Row>
            </Col>
            <Hasil
              keranjang={keranjang}
              {...this.props}
              getListKeranjang={this.getListKeranjang}
            />
          </Row>
        </Container>
      </div>
    );
  }
}
