import { Fragment, useEffect, useState } from "react";
import AddNewMessage from "./AddNewMessage";
import { formatDate } from "../formatDate";
import Axios from "axios";
import ReactHtmlParser from "react-html-parser";
import Modal from "../Components/Modal";

export default function Message() {
  const [messages, setMessages] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);

  const deleteMessage = (message_id) => {
    Axios.post("https://luanvan-server.herokuapp.com/admin/message/delete-message", {
      message_id,
    }).then((res) => {
      getMessages();
    });
  };

  const getTotalMessage = () => {
    Axios.get("https://luanvan-server.herokuapp.com/admin/message/get-total-messages").then(
      (res) => {
        setTotalPage(Math.ceil(res.data[0].totalMessage / 5));
      }
    );
  };

  const getMessages = () => {
    Axios.get("https://luanvan-server.herokuapp.com/admin/message/get-messages").then(
      (res) => {
        setMessages(res.data);
      }
    );
  };

  const changePage = (page) => {
    setPage(page);
  };

  useEffect(() => {
    getMessages();
    getTotalMessage();
  }, []);

  function pagination(c, m) {
    var current = c,
      last = m,
      delta = 2,
      left = current - delta,
      right = current + delta + 1,
      range = [],
      rangeWithDots = [],
      l;

    for (let i = 1; i <= last; i++) {
      if (i === 1 || i === last || (i >= left && i < right)) {
        range.push(i);
      }
    }

    for (let i of range) {
      if (l) {
        if (i - l === 2) {
          rangeWithDots.push(l + 1);
        } else if (i - l !== 1) {
          rangeWithDots.push(<span key={`pagination-dot-${i}`}>...</span>);
        }
      }
      rangeWithDots.push(
        <li
          className={page === i ? "page-item active" : "page-item"}
          key={`pagination-button-${i}`}
        >
          <button className="page-link" onClick={() => changePage(i)}>
            {i}
          </button>
        </li>
      );
      l = i;
    }
    return rangeWithDots;
  }

  return (
    <Fragment>
      <div className="bg-light">
        <div className="px-5 py-4 border rounded bg-white">
          <h1 className="display-2">Th??ng b??o</h1>
          <div className="mt-3" id="messages">
            <table className="table pt-4 border" id="orderdetails">
              <thead className="table-secondary">
                <tr>
                  <th>#</th>
                  <th>Th??ng b??o</th>
                  <th>Th???i gian th??ng b??o</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {messages.map((message) => (
                  <tr className="border-bottom">
                    <td>{message.message_id}</td>
                    <td className="message-text">
                      {ReactHtmlParser(message.message)}
                    </td>
                    <td>{formatDate(message.modified_date)}</td>
                    <td>
                      <button
                        className="material-icons-outlined btn btn-danger"
                        data-bs-toggle="modal"
                        data-bs-target="#deleteMessageModal"
                      >
                        delete
                      </button>

                      <Modal
                        id="deleteMessageModal"
                        label="deleteMessageModalLabel"
                        title="X??c nh???n x??a th??ng b??o"
                        text="B???n ?????ng ?? mu???n x??a th??ng b??o n??y ch????"
                        closeBtn="H???y b???"
                        saveBtn="?????ng ??"
                        save={() => deleteMessage(message.message_id)}
                      />
                    </td>
                  </tr>
                ))}
                {messages.length === 0 && (
                  <tr>
                    <td colSpan="4" className="text-center">
                      Ch??a c?? th??ng b??o n??o
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
            {messages.length > 0 && (
              <nav aria-label="Page navigation" className="mt-4">
                <ul className="pagination justify-content-center">
                  {pagination(page, totalPage)}
                </ul>
              </nav>
            )}
          </div>
        </div>
      </div>
      <AddNewMessage getMessages={getMessages} />
    </Fragment>
  );
}
