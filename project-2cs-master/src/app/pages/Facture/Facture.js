import React, { useState, useEffect } from "react";
import SearchIcon from "@material-ui/icons/Search";
import FilterListIcon from "@material-ui/icons/FilterList";
import ReorderIcon from "@material-ui/icons/Reorder";
import GetAppIcon from "@material-ui/icons/GetApp";
import "./Facture.scss";
import Axios from "axios";
import ReactPaginate from "react-paginate";
function Facture() {
  const [facture, setFacture] = useState([]);
  const [alloc, setAlloc] = useState([]);
  const [pageNum, setPageNum] = useState(0);
  const [pageNumAlloc, setPageNumAlloc] = useState(0);
  const facturePerPage = 5;
  const allocPerPage = 5;
  const pageVis = pageNum * facturePerPage;
  const pageVisAlloc = pageNumAlloc * allocPerPage;
  
  const changeColor=()=> {
    const etat=document.querySelectorAll('#factureEtat')
    const etatAlloc=document.querySelectorAll('#allocEtat')
    etat.forEach((e)=> {
      if(e.textContent==='Refused'){
        e.style.backgroundColor="red"
      }else{
        e.style.backgroundColor="green"
    }
    })
    etatAlloc.forEach((e)=> {
      if(e.textContent==='paid'){
        e.style.backgroundColor="green"
      }else{
        e.style.backgroundColor="red"
    }
    })
  }

  useEffect(() => {
    Axios.get("http://localhost:5056/bill/all")
      .then((res) => {
        setFacture(res.data);
        setAlloc(res.data);
        console.log(facture);
        console.log(res.data);
        changeColor()
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const orderFacture= ()=> {
    const sorted = facture.slice().slice().sort((a, b) =>  (new Date(b.creationDate) - new Date(a.creationDate)))
    const sortedAlloc = alloc.slice().slice().sort((a, b) =>  (new Date(b.creationDate) - new Date(a.creationDate)))
    setFacture(sorted)
    setAlloc(sorted)
  }

  const pageCount = Math.ceil(facture.length / facturePerPage);
  const pageCountAlloc = Math.ceil(alloc.length / allocPerPage);
  const pageChange = ({ selected }) => {
    setPageNum(selected);
  };
  const pageChangeAlloc = ({ selected }) => {
    setPageNumAlloc(selected);
  };

  const displayfacture = facture
    .slice(pageVis, pageVis + facturePerPage)
    .map((val) => {
      return (
        <tr>
            <td>
            <div className="userInfo">
              <img
                src="https://us.123rf.com/450wm/golubovy/golubovy1806/golubovy180600547/103613892-passport-document-id-photo-concept-business-man-portrait-young-handsome-stylish-guy-in-formal-wear-w.jpg?ver=6"
                alt=""
                id="avatar"
              />
              <div className="">
                <p>
                  {val.firstName} {val.lastName}
                </p>
                <p>{new Date(val.creationDate).toLocaleDateString("FR-fr", { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}</p>
              </div>
            </div>
          </td>
          <td>{val.userName}</td>
          <td>{val.idBill}</td>
          <td>
            <center>
              <p id="factureEtat">{val.accountState}</p>
            </center>
          </td>
          <td>
            <GetAppIcon id="factureDownload" />
          </td>
        </tr>
      );
    });
  const displayAlloc = alloc
    .slice(pageVisAlloc, pageVisAlloc + allocPerPage)
    .map((val) => {
      return (
        <tr>
            <td>
            <div className="userInfo">
              <img
                src="https://us.123rf.com/450wm/golubovy/golubovy1806/golubovy180600547/103613892-passport-document-id-photo-concept-business-man-portrait-young-handsome-stylish-guy-in-formal-wear-w.jpg?ver=6"
                alt=""
                id="avatar"
              />
              <div className="">
                <p>
                  {val.firstName} {val.lastName}
                </p>
                <p>{new Date(val.creationDate).toLocaleDateString("FR-fr", { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}</p>
              </div>
            </div>
          </td>
          <td>{val.userName}</td>
          <td>{val.idRental}</td>
          <td>{val.rentalType}</td>
          <td>{new Date(val.rentaldate).toLocaleDateString("FR-fr", { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}</td>
          <td>
            <center>
              <p id="allocEtat">{val.rentalstate}</p>
            </center>
          </td>
          <td>{val.rentaltime}</td>
        </tr>
      );
    });

  return (
    <div className="Facture">
      <h1>Facturation</h1>
      <div className="head">
        <div className="search">
          <input type="text" placeholder="Recherche" />
          <SearchIcon id="searchIcon" />
        </div>
        <div className="operation">
          <div>
            <ReorderIcon id="orderIcon" onClick={orderFacture} />
            <p>Ordonner</p>
          </div>
          <div>
            <FilterListIcon id="filterIcon" />
            <p>Filtrer</p>
          </div>
        </div>
      </div>
      <br />
      <br />
      <center>
        <table>
          <tr>
            <th>Utilisateur</th>
            <th>Username</th>
            <th>Numero de facture</th>
            <th>Etat</th>
            <th>Télécharger</th>
          </tr>
          {displayfacture}
        </table>

        <ReactPaginate
          previousLabel={"Previous"}
          nextLabel={"Next"}
          pageCount={pageCount}
          onPageChange={pageChange}
          containerClassName={"paginationBtns"}
          previousLinkClassName={"previousBtn"}
          nextLinkClassName={"nextBtn"}
          activeClassName={"pagintationActive"}
          disabledClassName={"pagintationDisabled"}
        />
        <div className="headAlloc">
          <h1>Allocations</h1>
        </div>
        <table>
          <tr>
            <th>Utilisateur</th>
            <th>Username</th>
            <th>Numero d'allocation</th>
            <th>Type</th>
            <th>Date</th>
            <th>State</th>
            <th>Time</th>
          </tr>
          {displayAlloc}
        </table>

        <ReactPaginate
          previousLabel={"Previous"}
          nextLabel={"Next"}
          pageCount={pageCountAlloc}
          onPageChange={pageChangeAlloc}
          containerClassName={"paginationBtns"}
          previousLinkClassName={"previousBtn"}
          nextLinkClassName={"nextBtn"}
          activeClassName={"pagintationActive"}
          disabledClassName={"pagintationDisabled"}
        />
      </center>
    </div>
  );
}

export default Facture;
