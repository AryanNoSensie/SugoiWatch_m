import axios from 'axios';

function GetAnime({ setResponse, API_URL }) {
  const handleClick = async (e) => {
    e.preventDefault();
    try {
      const result  =await axios.get(API_URL);
      setResponse(JSON.stringify(result.data));
      console.log(result.data);


    } catch (error) {
      console.log(error);
      setResponse(JSON.stringify(error));

      
    }
  };

  return (
    <button style={{ backgroundColor: '#2ecc71' }} onClick={handleClick}>
      GET
    </button>
  );
}

export default GetAnime;
