import React,{useState, useEffect} from 'react'
import SearchIcon from '@material-ui/icons/Search'
import FilterListIcon from '@material-ui/icons/FilterList'
import ReorderIcon from '@material-ui/icons/Reorder'
import MoreVertIcon from '@material-ui/icons/MoreVert'
import GetAppIcon from '@material-ui/icons/GetApp'
import AddIcon from '@material-ui/icons/Add'
import DeleteIcon from '@material-ui/icons/Delete';
import UpdateIcon from '@material-ui/icons/Update';
import './Promo.scss'
import $ from 'jquery'
import ReactDOM from 'react-dom';
import Modal from 'react-modal';
import Axios from 'axios'
import ReactPaginate from "react-paginate";


function Promo() {

    const[nom,setNom]= useState('')
    const[type,setType]= useState('')
    const[code,setCode]= useState('')
    const[montant,setMontant]= useState('')
    const[utilisation,setUtilisation]= useState('')
    const[desc,setDesc]= useState('')
    const[dateFin,setDateFin]= useState('')
    const[pourcentage,setPourcentage]= useState('')

    const [pageNum, setPageNum] = useState(0);
    const promosPerPage = 5;
    const pageVis = pageNum * promosPerPage;

    const[modalIsOpen,setModalIsOpen]= useState(false)
    const[updateIsOpen,setUpdateIsOpen]= useState(false)
    const[promos, setPromos]=useState([])

    const[price, setPrice]= useState('')
    const[newPrice, setNewPrice]= useState('')
    const[reduction, setReduction]= useState('')
    const[newReduction, setNewReduction]= useState('')

    useEffect(() => {
        Axios.get("http://54.37.87.85:5090/promocode/getPromoCodes")
          .then((res) => {
            console.log(res.data.promoCodes);
            setPromos(res.data.promoCodes);
          })
          .catch((err) => {
            console.log(err);
          });
      }, []);

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


    const addPromo= ()=>{
        Axios.post("http://54.37.87.85:5090/promocode/addPromoCode", {price: price, reductRate:reduction}
      ).then(()=>{
        console.log('SUCCESS')
      })
      setPrice('')
      setReduction('')
      setModalIsOpen(false)
    }

    const delPromo= (idPromoCode)=> {
        Axios.post("http://54.37.87.85:5090/promocode/deletePromoCode/"+idPromoCode,{idPromoCode: idPromoCode}
        ).then((res)=>{
          setPromos(
            promos.filter((val)=>{
              return val.idPromoCode != idPromoCode;
            })
          )
        })
      }

      const updatePromo = (idPromoCode) => {
        Axios.post("http://54.37.87.85:5090/promocode/updatePromoCode", {pricePoints: newPrice, reductionRate:newReduction, idPromoCode:idPromoCode}).then(
          (response) => {
            setPromos(
              promos.map((val) => {
                return val.idPromoCode == idPromoCode
                  ? {
                      idPromoCode: val.idPromoCode,
                      pricePoints: newPrice,
                      reductionRate:newReduction
                    }
                  : val
              })
            )
          }
        ).catch(err=> {
            console.log(err)
        })
        setNewPrice('')
        setNewReduction('')
        setUpdateIsOpen(false)
      }
    /*
    const orderFacture= ()=> {
        const sorted = facture.slice().sort((a, b) => b.creationDate - a.creationDate);
        setFacture(sorted);
      }
    */
    
    const pageCount = Math.ceil(promos.length / promosPerPage);
    const pageChange = ({ selected }) => {
        setPageNum(selected)
    }

    const displayPromos= promos
    .slice(pageVis, pageVis + promosPerPage)
    .map((val) => {
        return(
            <tr>
                <td>
                    {val.idPromoCode}
                </td>
               <td>
                   Code Promo
               </td>
                <td>{val.pricePoints}</td>
                <td>{val.reductionRate}</td>
                <td>
                    <div className="promoOperation">
                        <DeleteIcon id='moreIcon' onClick={()=>{delPromo(val.idPromoCode)}}/>
                        <UpdateIcon id='moreIcon' onClick={()=> {setUpdateIsOpen(true)}} />
                    </div>
                </td>
                <center>
                    <div className="modal">
                        <Modal id='promoModal' isOpen={updateIsOpen} onRequestClose={()=>setUpdateIsOpen(false)}>
                        <h3>
                            Modifier Code
                        </h3>
                        <form action="">
                            <div className="">
                                <h4>Nouveau Nom: </h4> <input type="text"/> <br />
                            </div>
                            <div className="">
                                <h4>Nouveau Prix: </h4> <input type="text" value={newPrice} onChange={e=> setNewPrice(e.target.value)} /> <br />
                            </div>
                            <div className="">
                                <h4>Nouvelle Reduction: </h4> <input type="text" value={newReduction} onChange={e=> setNewReduction(e.target.value)} /> <br />
                            </div>
                        </form>
                        <br />
                        <br />
                        <center>
                            <button id='promoModalBtn' onClick={()=> {updatePromo(val.idPromoCode)}}>Valider</button>
                        </center>
                        <br />
                        </Modal>
                    </div>
                </center>
            </tr>
        )
    })

    

    return (
        <div className='Promo'>
            <header>
                <h1>Codes Promos</h1>
                <div className="">
                    <AddIcon onClick={()=> {setModalIsOpen(true)}} id='promoAddIcon' />
                    <button id='promoAddBtn' onClick={()=> {setModalIsOpen(true)}}>Ajoute un code promo</button>
                </div>
            </header>
            <div className="head">
                <div className="search">
                    <input type="text" placeholder="Recherche" />
                    <SearchIcon id="searchIcon" />  
                </div>
                <div className="operation">
                    <div>
                        <ReorderIcon id='orderIcon' />
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
                <table>
                    <tr>
                        <th>Id</th>
                        <th>Nom</th>
                        <th>Points</th>
                        <th>Reduction</th>
                        <th>Operations</th>
                    </tr>
                    {
                      displayPromos
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

            </center>
            
            <center>
                <div className="modal">
                    <Modal id='promoModal' isOpen={modalIsOpen} onRequestClose={()=>setModalIsOpen(false)}>
                        <h3>
                            Code promotionnel
                        </h3>
                        <form action="">
                            <div className="">
                                <h4>Nom: </h4> <input type="text"/> <br />
                            </div>
                            <div className="">
                                <h4>Prix: </h4> <input type="text" value={price} onChange={e=> setPrice(e.target.value)} /> <br />
                            </div>
                            <div className="">
                                <h4>Reduction: </h4> <input type="text" value={reduction} onChange={e=> setReduction(e.target.value)} /> <br />
                            </div>
                        </form>
                        <br />
                        <br />
                        <center>
                            <button id='promoModalBtn' onClick={addPromo}>Valider</button>
                        </center>
                        <br />
                        
                    </Modal>
                </div>
            </center>
        </div>
    )
}

export default Promo
