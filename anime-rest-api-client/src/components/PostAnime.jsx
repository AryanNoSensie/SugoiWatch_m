import axios from 'axios';

function PostAnime({ formData, setResponse , API_URL }) {
  const handleClick = async (e) => {
    e.preventDefault();
    console.log("PostAnime")

  };

  return (
    <button style={{ backgroundColor: '#3498db' }} onClick={handleClick}>
      POST
    </button>
  );
}

export default PostAnime;
