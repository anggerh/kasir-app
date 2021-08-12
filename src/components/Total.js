import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import React, { Component } from "react";
import { Button, Col, Row } from "react-bootstrap";
import { API_URL } from "../utils/constants";
import { numberWithCommas } from "../utils/utils";

export default class Total extends Component {
  submitTotalBayar = (totalBayar) => {
    const pesanan = {
      total_bayar: totalBayar,
      menus: this.props.keranjang,
    };

    axios.post(API_URL + "pesanan", pesanan).then((res) => {
      this.props.history.push("/success");
    });
  };

  render() {
    const totalBayar = this.props.keranjang.reduce(function (result, item) {
      return result + item.total_harga;
    }, 0);

    return (
      <>
      {/* Web */}
        <div className="fixed-bottom d-none d-md-block">
          <Row>
            <Col md={{ span: 3, offset: 9 }} className="px-4">
              <h4>
                Total Harga :{" "}
                <strong className="float-end me-2">
                  Rp. {numberWithCommas(totalBayar)}
                </strong>
              </h4>
              <Button
                variant="primary"
                className="mb-2 mt-4 me-2 w-100"
                size="lg"
                onClick={() => this.submitTotalBayar(totalBayar)}
              >
                <FontAwesomeIcon icon={faShoppingCart} /> <strong>BAYAR</strong>
              </Button>
            </Col>
          </Row>
        </div>

        {/* Mobile */}
        <div className="d-sm-block d-md-none">
          <Row>
            <Col md={{ span: 3, offset: 9 }} className="px-4">
              <h4>
                Total Harga :{" "}
                <strong className="float-end me-2">
                  Rp. {numberWithCommas(totalBayar)}
                </strong>
              </h4>
              <Button
                variant="primary"
                className="mb-2 mt-4 me-2 w-100"
                size="lg"
                onClick={() => this.submitTotalBayar(totalBayar)}
              >
                <FontAwesomeIcon icon={faShoppingCart} /> <strong>BAYAR</strong>
              </Button>
            </Col>
          </Row>
        </div>
      </>
    );
  }
}
