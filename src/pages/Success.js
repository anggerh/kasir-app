import axios from "axios";
import React, { Component } from "react";
import { Button, Image } from "react-bootstrap";
import { Link } from "react-router-dom";
import { API_URL } from "../utils/constants";

export default class Success extends Component {
  componentDidMount() {
    axios
      .get(API_URL + "keranjang")
      .then((res) => {
        const keranjang = res.data;
        keranjang.map(function (item) {
          return axios
            .delete(API_URL + "keranjang/" + item.id)
            .then((res) => console.log(res))
            .catch((e) => console.log(e));
        });
      })
      .catch((e) => {
        console.log(e.message);
      });
  }

  render() {
    return (
      <div className="mt-4 text-center">
        <Image src="assets/images/success.png" width="500" />
        <h2>Sukses Pesan</h2>
        <p>Terimakasih Sudah Memesan!</p>
        <Button variant="primary" as={Link} to="/">
          Kembali
        </Button>
      </div>
    );
  }
}
