import axios from 'axios';
import React, { useState, useEffect } from 'react';
import PersonCard from '../common/RowCard';
import Loader from '../Loader/Loader';
import './TrendingPeople.css';


const TrendingPeople = () => {



  const [people, setPeople] = useState([]);
  const [loading, setLoading] = useState(true);

  
  const getPeople = async () => {
    try {
      const { data } = await axios
        .get(`https://api.themoviedb.org/3/trending/person/week?api_key=352f716e969ef97191556e88ef26f893`);
      setPeople(data.results.slice(0, 6));
      setTimeout(() => {
        setLoading(false)
      }, 100);
    } catch (e) {
      setPeople([]);
      setTimeout(() => {
        setLoading(false)
      }, 100);
    }
  }

  useEffect(() => {
    getPeople()

  }, []);



  return <>

{loading? <Loader/>:(  <div className='container'>
      <div className="tab-content" id="myTabContent">
        <div className="tab-pane fade show active" id="tab-1" role="tabpanel" aria-labelledby="1-tab">
          <div className="row">
            {people.map((person, index) => <PersonCard key={index} name={person.name} popularity={person.popularity}
              gender={person.gender} profile_path={person.profile_path} known_for_department={person.known_for_department} id={person.id} />)}
          </div>
        </div>
      </div>

    </div>)}
  </>
};

export default TrendingPeople;