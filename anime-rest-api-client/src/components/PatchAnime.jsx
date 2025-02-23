import axios from 'axios';

function PatchAnime({ formData, setResponse, API_URL }) {
  const handleClick = async (e) => {
    e.preventDefault();
    try {
      const AnimesData = {name: formData.name, rating: formData.rating};
      const result  = await axios.patch(`${API_URL}/${formData.id}`, AnimesData);
      setResponse(JSON.stringify(result.data));
      
    } catch (error) {
      console.log(error);
      setResponse(JSON.stringify(error));
    }

  };

  return (
    <button style={{ backgroundColor: '#f1c40f' }} onClick={handleClick}>
      PATCH
    </button>
  );
}

export default PatchAnime;
