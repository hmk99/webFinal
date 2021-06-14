import React,{useEffect, useState} from 'react'
import './Abonnes.scss'
import SearchIcon from '@material-ui/icons/Search'
import InputBase from '@material-ui/core/InputBase'
import FilterListIcon from '@material-ui/icons/FilterList'
import ReorderIcon from '@material-ui/icons/Reorder'
import MoreVertIcon from '@material-ui/icons/MoreVert';
import $ from 'jquery'
import ReactPaginate from "react-paginate";
import Axios from 'axios'

function Abonne() {

    const [pageNum, setPageNum] = useState(0)
    const usersPerPage = 5
    const pageVis = pageNum * usersPerPage
    const[users,setUsers]= useState([
        
    ])

    useEffect(() => {
        Axios.get("http://localhost:5056/bill/all")
          .then((res) => {
            console.log(res.data);
            setUsers(res.data);
            console.log(users);
          })
          .catch((err) => {
            console.log(err);
          });
      }, []);

      const orderUsers= ()=> {
        const sorted = users.slice().slice().sort((a, b) =>  (new Date(b.creationDate) - new Date(a.creationDate)));
        setUsers(sorted);
      }
    

    /*
    const desactiveUser= ()=> {

    }

    const deleteUser =()=> {

    }

    */

    const displayOperation=()=> {
        var b=false;
        $('.abonneEtat').click(function (e) { 
            console.log('ldldk')
            e.preventDefault();
            $(this).find('ul').slideToggle(1000, ()=>{
                b=true;
            })
            if(b){
                $(this).find('ul').css({display:'flex'});
            }else{
                $(this).find('ul').css({display:'none'});
            }
        });
    }

    displayOperation();


    const pageCount = Math.ceil(users.length / usersPerPage)
    const pageChange = ({ selected }) => {
    setPageNum(selected)
    }

    const displayUsers = users
    .slice(pageVis, pageVis + usersPerPage)
    .map((val) => {
        return(
            <tr>
                <td>
                <div className="userInfo">
                    <img src="https://us.123rf.com/450wm/golubovy/golubovy1806/golubovy180600547/103613892-passport-document-id-photo-concept-business-man-portrait-young-handsome-stylish-guy-in-formal-wear-w.jpg?ver=6" alt="" id='avatar' />
                                    <div className="">
                        <p>{val.lastName} {val.firstName}</p>
                        <p>{new Date(val.creationDate).toLocaleDateString("FR-fr", { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit'}) }</p>
                    </div>
                </div>
                </td>
                <td>{val.userName}</td>
                <td>{val.address}</td>
                <td>{val.userType}</td>
                <td>{new Date(val.restitutionDate).toLocaleDateString("FR-fr", { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit'}) }</td>
                <td>
                <p id='etat'>{val.accountState}</p>
                </td>
                <td>
                    <div className="abonneEtat">
                        <MoreVertIcon id='moreIcon' />
                        <ul className='abonneEtatList'>
                            <li>Visualiser</li>
                            <li>Desactiver</li>
                            <li>Supprimer</li>
                        </ul>
                    </div>
                </td>
            </tr>
        )
    })


    return (
        <div className='Abonne'>
            <h1>Gestion Des Abonnes</h1>
            <div className="head">
                <div className="search">
                    <input type="text" placeholder="Recherche" />
                    <SearchIcon id="searchIcon" />  
                </div>
                <div className="operation">
                    <div>
                        <ReorderIcon id='orderIcon' onClick={orderUsers} />
                        <p>Ordonner</p>
                    </div>
                    <div>
                        <FilterListIcon id='filterIcon' />
                        <p>Filtrer</p>
                    </div>
                </div>
            </div>
            <br />
            <br />
            <center>
                <div className="main">
                    <table>
                        <tr>
                            <th>Utilisateur</th>
                            <th>Username</th>
                            <th>Adresse</th>
                            <th>Type d'abonnement</th>
                            <th>Date d'expiration</th>
                            <th>Etat</th>
                            <th></th>
                        </tr>
                        {
                            displayUsers
                        }
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
                </div>
            </center>
        </div>
    )
}

export default Abonne
