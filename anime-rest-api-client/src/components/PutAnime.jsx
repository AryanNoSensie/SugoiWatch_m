import axios from 'axios';

function PutAnime({ formData, setResponse, API_URL}) {
  const handleClick = async (e) => {
    e.preventDefault();
    console.log("PutAnime")
  };

  return (
    <button style={{ backgroundColor: '#9b59b6' }} onClick={handleClick}>
      PUT
    </button>
  );
}

export default PutAnime;
