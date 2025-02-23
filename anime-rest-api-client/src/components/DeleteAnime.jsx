import axios from 'axios';

function DeleteAnime({ formData, setResponse, API_URL}) {
  const handleClick = async (e) => {
    e.preventDefault();
    try {
     
      const result  = await axios.delete(`${API_URL}/${formData.id}`);
      setResponse(JSON.stringify(result.data));
      
    } catch (error) {
      console.log(error);
      setResponse(JSON.stringify(error));
    }
  };

  return (
    <button style={{ backgroundColor: '#e74c3c' }} onClick={handleClick}>
      DELETE
    </button>
  );
}

export default DeleteAnime;
