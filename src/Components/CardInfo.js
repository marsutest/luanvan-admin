import Axios from "axios";
import { useEffect, useState } from "react";
export default function CardInfo() {
  const [totalProduct, setTotalProduct] = useState(0);
  const getTotalProduct = () => {
    Axios.get("https://luanvan-server.herokuapp.com/admin/dashboard/get-total-product").then(
      (response) => {
        setTotalProduct(response.data[0].totalProduct);
      }
    );
  };

  const [totalNotConfirmBook, setTotalNotConfirmBook] = useState(0);
  const getTotalNotConfirmBook = () => {
    Axios.get(
      "https://luanvan-server.herokuapp.com/admin/dashboard/get-total-notConfirmBook"
    ).then((response) => {
      setTotalNotConfirmBook(response.data[0].totalNotConfirmBook);
    });
  };

  const [totalOrder, setTotalOrder] = useState(0);
  const getTotalOrder = () => {
    Axios.get("https://luanvan-server.herokuapp.com/admin/dashboard/get-total-order").then(
      (response) => {
        setTotalOrder(response.data[0].totalOrder);
      }
    );
  };

  const [totalSuccessOrder, setTotalSuccessOrder] = useState(0);
  const getTotalSuccessOrder = () => {
    Axios.get(
      "https://luanvan-server.herokuapp.com/admin/dashboard/get-total-success-order"
    ).then((response) => {
      setTotalSuccessOrder(response.data[0].totalSuccessOrder);
    });
  };

  const [totalCancelOrder, setTotalCancelOrder] = useState(0);
  const getTotalCancelOrder = () => {
    Axios.get(
      "https://luanvan-server.herokuapp.com/admin/dashboard/get-total-cancel-order"
    ).then((response) => {
      setTotalCancelOrder(response.data[0].totalCancelOrder);
    });
  };

  const [totalBook, setTotalBook] = useState(0);
  const getTotalBook = () => {
    Axios.get("https://luanvan-server.herokuapp.com/admin/dashboard/get-total-book").then(
      (response) => {
        setTotalBook(response.data[0].totalBook);
      }
    );
  };

  const [totalSoldBook, setTotalSoldBook] = useState(0);
  const getTotalSoldBook = () => {
    Axios.get("https://luanvan-server.herokuapp.com/admin/dashboard/get-total-sold-book").then(
      (response) => {
        setTotalSoldBook(response.data[0].totalSoldBook);
      }
    );
  };

  const [totalOutOfStock, setTotalOutOfStock] = useState(0);
  const getTotalOutOfStock = () => {
    Axios.get(
      "https://luanvan-server.herokuapp.com/admin/dashboard/get-total-out-of-book"
    ).then((response) => {
      setTotalOutOfStock(response.data[0].totalOutOfStock);
    });
  };

  useEffect(() => {
    getTotalProduct();
    getTotalNotConfirmBook();

    getTotalOrder();
    getTotalSuccessOrder();
    getTotalCancelOrder();

    getTotalBook();
    getTotalSoldBook();
    getTotalOutOfStock();
  }, []);
  return (
    <section>
      <div>
        <div className="card-group mb-4">
          <div className="card">
            <div className="card-header">
              <i className="material-icons"> format_list_bulleted </i>
              <span> Th??ng tin s???n ph???m</span>
            </div>
            <div className="card-body">
              <ul className="card-text">
                <li className="d-flex justify-content-between align-items-center">
                  T???ng s???n ph???m:
                  <span className="badge bg-info rounded-pill">
                    {totalProduct}
                  </span>
                </li>
                <li className="d-flex justify-content-between align-items-center">
                  S???n ph???m ch??a duy???t:
                  <span className="badge bg-danger rounded-pill">
                    {totalNotConfirmBook}
                  </span>
                </li>
                <li className="d-flex justify-content-between align-items-center">
                  S???n ph???m ???? h???t h??ng:
                  <span className="badge bg-danger rounded-pill">
                    {totalOutOfStock}
                  </span>
                </li>
              </ul>
            </div>
          </div>
          <div className="card">
            <div className="card-header">
              <i className="material-icons"> format_list_bulleted </i>
              <span> Th??ng tin kho h??ng</span>
            </div>
            <div className="card-body">
              <ul className="card-text">
                <li className="d-flex justify-content-between align-items-center">
                  T???ng s??? h??ng:
                  <span className="badge bg-info rounded-pill">
                    {totalBook}
                  </span>
                </li>
                <li className="d-flex justify-content-between align-items-center">
                  S??? h??ng ???? b??n:
                  <span className="badge bg-info rounded-pill">
                    {totalSoldBook}
                  </span>
                </li>
                <li className="d-flex justify-content-between align-items-center">
                  S??? h??ng t???n trong kho:
                  <span className="badge bg-info rounded-pill">
                    {totalBook - totalSoldBook}
                  </span>
                </li>
              </ul>
            </div>
          </div>
          <div className="card">
            <div className="card-header">
              <i className="material-icons"> format_list_bulleted </i>
              <span> Th??ng tin ????n h??ng</span>
            </div>
            <div className="card-body">
              <ul className="card-text">
                <li className="d-flex justify-content-between align-items-center">
                  T???ng s??? ????n h??ng:
                  <span className="badge bg-info rounded-pill">
                    {totalOrder}
                  </span>
                </li>
                <li className="d-flex justify-content-between align-items-center">
                  S??? ????n ??ang th???c hi???n:
                  <span className="badge bg-info rounded-pill">
                    {totalOrder - totalSuccessOrder - totalCancelOrder}
                  </span>
                </li>
                <li className="d-flex justify-content-between align-items-center">
                  S??? ????n th??nh c??ng:
                  <span className="badge bg-info rounded-pill">
                    {totalSuccessOrder}
                  </span>
                </li>
                <li className="d-flex justify-content-between align-items-center">
                  S??? ????n b??? h???y:
                  <span className="badge bg-info rounded-pill">
                    {totalCancelOrder}
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
