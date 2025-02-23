import { useEffect, useState } from "react";
import axios from "axios";
import MoodFilter from "./MoodFilter";
import ContentList from "./ContentList";
import NavBar from "./NavBar";
import Footer from "./Footer";

export default function ContentContainer() {
    const [genres, setGenres] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedGenres, setSelectedGenres] = useState([]);
    const [showAnimeContent, setShowAnimeContent] = useState(false);
    const [animeList, setAnimeList] = useState([]);
    const [page, setPage] = useState(1);
    const [selectedMood, setSelectedMood] = useState('');
    const [hiddenAnime, setHiddenAnime] = useState(new Set());

    const fetchGenres = async (retryCount = 0) => {
        try {
            const response = await axios.get('https://api.jikan.moe/v4/genres/anime');
            setGenres(response.data.data);
        } catch (err) {
            console.error('Failed to fetch genres:', err);
            if (err.response && err.response.status === 429) {
                if (retryCount < 3) {
                    setTimeout(() => fetchGenres(retryCount + 1), Math.pow(2, retryCount) * 1000);
                } else {
                    setError('You have reached the API rate limit. Please try again later.');
                }
            } else {
                setError('Failed to fetch genres. Please try again later.');
            }
        }
    };

    const fetchAnimeList = async (retryCount = 0) => {
        setError(null);
        setLoading(true);

        try {
            const response = await axios.get('https://api.jikan.moe/v4/anime', {
                params: {
                    order_by: 'popularity',
                    sort: 'asc',
                    limit: 1,
                    min_score: 7.5,
                    page,
                    unapproved: false,
                    ...(selectedGenres.includes('Highrated Anime this year')
                        ? { start_date: `${new Date().getFullYear()}-01-01` }
                        : selectedGenres.length > 0
                            ? { genres: selectedGenres.join(',') }
                            : {})
                }
            });
            setAnimeList(response.data.data);
        } catch (err) {
            console.error('Failed to fetch AnimeList:', err);
            if (err.response && err.response.status === 429) {
                if (retryCount < 3) {
                    setTimeout(() => fetchAnimeList(retryCount + 1), Math.pow(2, retryCount) * 1000);
                } else {
                    setError('You have reached the API rate limit. Please try again later.');
                }
            } else {
                setError('Failed to fetch AnimeList. Please try again later.');
            }
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchGenres();
    }, []);

    useEffect(() => {
        fetchAnimeList();
    }, [page, selectedGenres]);

    // Genre toggle
    const toggleGenre = (moodName, genreName) => {
        setSelectedGenres((prev) => {
            if (genreName === 'Highrated Anime this year') {
                return prev.includes(genreName) ? prev.filter((item) => item !== genreName) : [...prev, genreName];
            }
            const genreId = genres.find((genre) => genre.name === genreName)?.mal_id;
            return genreId ? (prev.includes(genreId) ? prev.filter((id) => id !== genreId) : [...prev, genreId]) : prev;
        });
        setPage(1);
        setShowAnimeContent(true);
        setSelectedMood(moodName);
    };

    // Home button
    const handleBackButtonClick = () => {
        setShowAnimeContent(false);
        setSelectedGenres([]);
        setSelectedMood('');
    };

    // Page turn button
    const handleNextPage = () => setPage((p) => p + 1);
    const handlePrevPage = () => setPage((p) => Math.max(p - 1, 1));

    // Hide anime
    const handleHideClick = (animeId) => {
        setHiddenAnime((prev) => {
            const updatedSet = new Set(prev);
            updatedSet.has(animeId) ? updatedSet.delete(animeId) : updatedSet.add(animeId);
            return updatedSet;
        });

        const visibleAnimeCount = animeList.filter(anime => !hiddenAnime.has(anime.mal_id)).length;
        if (visibleAnimeCount === 1) {
            handleNextPage();
        }
    };

    return (
        <>
            <NavBar onBackClick={handleBackButtonClick} selectedMood={selectedMood} />

            {!showAnimeContent && <MoodFilter selectedGenre={selectedGenres} toggleGenre={toggleGenre} />}

            {showAnimeContent && (
                <>
                    <ContentList
                        animeList={animeList}
                        loading={loading}
                        error={error}
                        page={page}
                        handleNextPage={handleNextPage}
                        handlePrevPage={handlePrevPage}
                        hiddenAnime={hiddenAnime}
                        handleHideClick={handleHideClick}
                    />
                </>
            )}

            <Footer />
        </>
    );
}
