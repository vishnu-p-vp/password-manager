import { useDispatch } from "react-redux";
import { deletePassword } from "../redux/passwordSlice";
import API from "../services/API";

function PasswordList({ data }) {
  const dispatch = useDispatch(); 

  const handleDelete = async (id) => {
    await API.delete(`/password/${id}`);

    dispatch(deletePassword(id));
  };

  return (
    <div>
      {data.map((item) => (
        <div key={item._id}>
          <p>{item.site}</p>
          <p>{item.username}</p>
          <p>{item.password}</p>

          <button onClick={() => handleDelete(item._id)}>
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}

export default PasswordList;