import { useEffect, useState } from 'react';

function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
const getEpsiodeName = async (episodeURL) => {
  const res = await fetch(`${episodeURL}`);
  const data = await res.json();
  return { episdeName: data.name, episdeId: data.id };
};

const RandomEpisode = ({ episode }) => {
  const [episdeArr, setEpisodeArr] = useState([]);
  const [fetch, setFetch] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchEpisodeRandomName = async () => {
      if (fetch) {
        setLoading(true);
        try {
          const episodeArrLength = episode.length;
          //episdeName ***********
          if (episodeArrLength === 1) {
            const firstEpisodeData = await getEpsiodeName(episode[0]);
            setEpisodeArr((prev) => [...prev, firstEpisodeData]);
          }
          if (episodeArrLength > 2) {
            let firstEpisodeIndex;
            let secondEpisodeIndex;
            const pickEpsiode = () => {
              firstEpisodeIndex = getRandomIntInclusive(1, episodeArrLength) - 1;
              secondEpisodeIndex = getRandomIntInclusive(1, episodeArrLength) - 1;
              if (firstEpisodeIndex === secondEpisodeIndex) {
                pickEpsiode();
              } else {
                return;
              }
            };
            pickEpsiode();
            const firstEpisodeData = await getEpsiodeName(episode[firstEpisodeIndex]);
            const secondEpisodeData = await getEpsiodeName(episode[secondEpisodeIndex]);
            setEpisodeArr((prev) => [...prev, firstEpisodeData, secondEpisodeData]);
          }
          if (episodeArrLength === 2) {
            const firstEpisodeData = await getEpsiodeName(episode[0]);
            const secondEpisodeData = await getEpsiodeName(episode[1]);
            setEpisodeArr((prev) => [...prev, firstEpisodeData, secondEpisodeData]);
          }
          setLoading(false);
        } catch (e) {
          console.log(e);
        }
      }
    };
    fetchEpisodeRandomName();
    setFetch(true);
    return () => {};
  }, [episode, fetch]);

  return (
    <>
      {loading && (
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      )}
      {!loading && (
        <div>
          {episdeArr.map((el) => (
            <p key={el.episdeId}>{el.episdeName}</p>
          ))}
        </div>
      )}
    </>
  );
};

export default RandomEpisode;
