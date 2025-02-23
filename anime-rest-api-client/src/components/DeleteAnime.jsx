import axios from 'axios';

function DeleteAnime({ formData, setResponse, API_URL}) {
  const handleClick = async (e) => {
    e.preventDefault();
    console.log("DeleteAnime")
  };

  return (
    <button style={{ backgroundColor: '#e74c3c' }} onClick={handleClick}>
      DELETE
    </button>
  );
}

export default DeleteAnime;
