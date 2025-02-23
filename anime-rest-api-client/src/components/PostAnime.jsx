import axios from 'axios';

function PostAnime({ formData, setResponse , API_URL }) {
  const handleClick = async (e) => {
    e.preventDefault();
    try {
      const AnimesData = {name: formData.name, rating: formData.rating};
      const result  =await axios.post(API_URL, AnimesData);
      setResponse(JSON.stringify(result.data));
      
    } catch (error) {
      console.log(error);
      setResponse(JSON.stringify(error));
    }

  };

  return (
    <button style={{ backgroundColor: '#3498db' }} onClick={handleClick}>
      POST
    </button>
  );
}

export default PostAnime;
