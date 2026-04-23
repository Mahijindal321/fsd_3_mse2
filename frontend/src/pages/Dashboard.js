
// import axios from "axios";
// import { useEffect, useState } from "react";
// const [filter, setFilter] = useState("");
// //const total = items.reduce((sum, i) => sum + (i.amount || 0), 0);
// const total = items.length;
// const filteredItems = filter
//   ? items.filter(i => i.category === filter)
//   : items;

// function Dashboard() {
//   const [items, setItems] = useState([]);
//   const [data, setData] = useState({
//     name: "",
//     category: "",
//     description: "",
//     location: ""
//   });

//   const token = localStorage.getItem("token");

//   // 🔐 protect route
//   if (!token) {
//     window.location = "/";
//   }
// //const total = items.reduce((sum, i) => sum + (i.amount || 0), 0);
//   // 📋 GET ITEMS
//   const fetchItems = async () => {
//     const res = await axios.get("http://localhost:5000/api/items", {
//       headers: { Authorization: token }
//     });
//     setItems(res.data);
//   };

//   useEffect(() => {
//     fetchItems();
//   }, []);

//   // ➕ ADD ITEM
//   const addItem = async () => {
//     await axios.post("http://localhost:5000/api/items", data, {
//       headers: { Authorization: token }
//     });
//     fetchItems();
//   };
//   const [search, setSearch] = useState("");

// const searchItem = async () => {
//   const res = await axios.get(
//     `http://localhost:5000/api/items/search?name=${search}`,
//     { headers: { Authorization: token } }
//   );
//   setItems(res.data);
// };

//   // ❌ DELETE
//   const deleteItem = async (id) => {
//     await axios.delete(`http://localhost:5000/api/items/${id}`, {
//       headers: { Authorization: token }
//     });
//     fetchItems();
//   };

//   // 🚪 LOGOUT
//   const logout = () => {
//     localStorage.removeItem("token");
//     window.location = "/";
//   };

//   return (
//     <div className="container">
//       <h2>Dashboard</h2>
//       <h3>Total Items: {total}</h3>

//       <button onClick={logout}>Logout</button>

//       <h3>Add Item</h3>
//       <select onChange={e => setFilter(e.target.value)}>
//   <option value="">All</option>
//   <option value="Personal">Personal</option>
//   <option value="Electronics">Electronics</option>
// </select>

//       <input placeholder="Name"
//         onChange={e => setData({...data, name: e.target.value})} />

//       <input placeholder="Category"
//         onChange={e => setData({...data, category: e.target.value})} />

//       <input placeholder="Description"
//         onChange={e => setData({...data, description: e.target.value})} />

//       <input placeholder="Location"
//         onChange={e => setData({...data, location: e.target.value})} />

//       <button onClick={addItem}>Add</button>
//       <input onChange={e => setSearch(e.target.value)} />
// <button onClick={searchItem}>Search</button>

//       <h3>All Items</h3>

//       {filteredItems.map(item => (
//         <div className="card" key={item._id}>
//   <h4>{item.name}</h4>
//   <p>Category: {item.category}</p>
//   <p>Location: {item.location}</p>

//   <button onClick={() => deleteItem(item._id)}>Delete</button>
// </div>
//       ))}
//     </div>
//   );
// }

// export default Dashboard;

import axios from "axios";
import { useEffect, useState } from "react";

function Dashboard() {

  const [items, setItems] = useState([]);
  const [filter, setFilter] = useState("");
  const [data, setData] = useState({
    name: "",
    category: "",
    description: "",
    location: ""
  });

  const token = localStorage.getItem("token");

  // 🔐 protect
  if (!token) {
    window.location = "/";
  }

  // 📋 fetch items
  const fetchItems = async () => {
    const res = await axios.get("http://localhost:5000/api/items", {
      headers: { Authorization: token }
    });
    setItems(res.data);
  };

  useEffect(() => {
    fetchItems();
  }, []);

  // ➕ add item
  const addItem = async () => {
    await axios.post("http://localhost:5000/api/items", data, {
      headers: { Authorization: token }
    });
    fetchItems();
  };

  // ❌ delete
  const deleteItem = async (id) => {
    await axios.delete(`http://localhost:5000/api/items/${id}`, {
      headers: { Authorization: token }
    });
    fetchItems();
  };

  // 🔍 search
  const [search, setSearch] = useState("");

  const searchItem = async () => {
    const res = await axios.get(
      `http://localhost:5000/api/items/search?name=${search}`,
      { headers: { Authorization: token } }
    );
    setItems(res.data);
  };

  // 🧠 UI LOGIC
  const total = items.length;

  const filteredItems = filter
    ? items.filter(i => i.category === filter)
    : items;

  // 🚪 logout
  const logout = () => {
    localStorage.removeItem("token");
    window.location = "/";
  };

  return (
    <div className="container">
      <h2>Dashboard</h2>

      <button onClick={logout}>Logout</button>

      <h3>Total Items: {total}</h3>

      <input
        placeholder="Search"
        onChange={e => setSearch(e.target.value)}
      />
      <button onClick={searchItem}>Search</button>

      <select onChange={e => setFilter(e.target.value)}>
        <option value="">All</option>
        <option value="Personal">Personal</option>
        <option value="Electronics">Electronics</option>
      </select>

      <h3>Add Item</h3>

      <input placeholder="Name"
        onChange={e => setData({...data, name: e.target.value})} />

      <input placeholder="Category"
        onChange={e => setData({...data, category: e.target.value})} />

      <input placeholder="Description"
        onChange={e => setData({...data, description: e.target.value})} />

      <input placeholder="Location"
        onChange={e => setData({...data, location: e.target.value})} />

      <button onClick={addItem}>Add</button>

      <h3>All Items</h3>

      {filteredItems.map(item => (
        <div key={item._id} className="card">
          <h4>{item.name}</h4>
          <p>{item.category}</p>
          <p>{item.location}</p>

          <button onClick={() => deleteItem(item._id)}>Delete</button>
        </div>
      ))}

    </div>
  );
}

export default Dashboard;