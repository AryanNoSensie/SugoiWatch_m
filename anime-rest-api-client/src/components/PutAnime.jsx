import axios from 'axios';

function PutAnime({ formData, setResponse, API_URL}) {
  const handleClick = async (e) => {
    e.preventDefault();
    try {
      const AnimesData = {name: formData.name, rating: formData.rating};
      const result  = await axios.put(`${API_URL}/${formData.id}`, AnimesData);
      setResponse(JSON.stringify(result.data));
      
    } catch (error) {
      console.log(error);
      setResponse(JSON.stringify(error));
    }
  };

  return (
    <button style={{ backgroundColor: '#9b59b6' }} onClick={handleClick}>
      PUT
    </button>
  );
}

export default PutAnime;
