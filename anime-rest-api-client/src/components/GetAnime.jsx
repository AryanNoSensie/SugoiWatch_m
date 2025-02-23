import axios from 'axios';

function GetAnime({ setResponse, API_URL }) {
  const handleClick = async (e) => {
    e.preventDefault();
    console.log("GetAnime")
  };

  return (
    <button style={{ backgroundColor: '#2ecc71' }} onClick={handleClick}>
      GET
    </button>
  );
}

export default GetAnime;
