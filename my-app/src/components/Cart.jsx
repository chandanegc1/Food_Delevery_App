import React , {useEffect ,useState} from "react";
import axios from "axios"
const Card = () => {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    axios.get('http://127.0.0.1:3002/')
      .then(users => setUsers(users.data))
      .catch((err) => console.log(err));
  }, []);

  const [plate , setPlate] = useState();
  function handleclick(e){
    setPlate(e.data);
  }
  return (
    <>
    <div className='m-3 dispflx'>
      {users.map(Product =>
         <div className="card mt-3" style={{ width: "16rem", maxHeight: "450px" }}>
         <img
           src={Product.img}
           className="card-img-top"
           alt="..."
           style={{ width: "16rem", maxHeight: "220px" }}
         />
         <div className="card-body">
           <h5 className="card-title">{Product.CategoryName}</h5>
           <h6 className="card-title">{Product.name}</h6>
           <p className="card-text">{Product.description}</p>
           <div className="cotainer w-100">
             <select className="m-2 h-100 bg-success rounded" name="" id="">
               {Array.from(Array(5), (e, i) => {
                 return (
                   <option key={i + 1} value={i + 1}>
                     {i + 1}
                   </option>
                 );
               })}
             </select>
             <select className="m-2 h-100 bg-success rounded" name="" id="">
               <option value={Product.options[0].half} onClick={handleclick}>Half </option>
               <option value={Product.options[0].full} onClick={handleclick}>Full </option>
             </select>
             <div className="d-inline">Total price {plate}</div>
           </div>
         </div>
       </div>
      )}
      </div>
    </>
  );
};

export default Card;
