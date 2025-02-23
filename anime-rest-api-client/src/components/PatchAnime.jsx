import axios from 'axios';

function PatchAnime({ formData, setResponse, API_URL }) {
  const handleClick = async (e) => {
    e.preventDefault();
    console.log("PatchAnime")

  };

  return (
    <button style={{ backgroundColor: '#f1c40f' }} onClick={handleClick}>
      PATCH
    </button>
  );
}

export default PatchAnime;
