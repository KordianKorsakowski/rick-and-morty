import { useEffect, useState } from 'react';
import axios from 'axios';

import classes from './Location.module.css';

const Location = ({ url, name }) => {
  const [type, setType] = useState();
  const [loading, setLoading] = useState(false);
  const [fetch, setFetch] = useState(false);

  useEffect(() => {
    const fetchOrignType = async () => {
      if (fetch) {
        if (url) {
          try {
            const data = await axios.get(url);
            setType(data.data.type);
          } catch (e) {
            console.log(e);
          }
          setLoading(false);
        }
      }
    };
    fetchOrignType();
    setFetch(true);
  }, [url, fetch]);
  return (
    <>
      {loading && (
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      )}
      {!loading && (
        <div className={classes.location}>
          <p>Location</p>
          <p className={classes.name}>{name}</p>
          <p>{type}</p>
        </div>
      )}
    </>
  );
};

export default Location;
