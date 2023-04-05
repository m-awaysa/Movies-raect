import axios from 'axios';
import React, { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next';
import cookie from 'react-cookies'
import {Link} from 'react-router-dom'
function RowCard({ type='person',name = 'unknown', popularity = 'unknown', gender = 'unknown', profile_path, known_for_department = 'unknown', id,translate }) {
    const { t } = useTranslation();

    const [lang, setLang] = useState(cookie.load('i18next'));
  const [biography, setBiography] = useState('unKnow');

    const getDesc = async (id) => {
        const { data } = await axios.get(`https://api.themoviedb.org/3/person/${id}?api_key=352f716e969ef97191556e88ef26f893&language=${t('languageCode')}`);
        setBiography(data.biography);

    }

    useEffect(() => {
        getDesc(id)

        setLang(cookie.load('i18next'))
    }, [t]);


    return (
        <>
            <Link className="col-6 col-sm-12 col-lg-6" to={`/${type}/${id}`}>
                <div className="people_card people_card--list" >
                    <div className="row">
                        <div className="col-12 col-sm-4">
                            <div className="people_card__cover">
                                <img src={profile_path ? `https://image.tmdb.org/t/p/w500/` + profile_path : '/img/section/movie.jpg'} />
                                <a href="#" className="people_card__play">
                                    <i className="icon ion-ios-play" />
                                </a>
                            </div>
                        </div>
                        <div className="col-12 col-sm-8">
                            <div className="people_card__content">
                                <h3 className="people_card__title"><a href="#">{name}</a></h3>
                                <span className="people_card__category">
                                    <a href="#">{known_for_department}</a>
                                    <a href="#">{gender === 1 ? 'female' : 'male'}</a>
                                </span>
                                <div className="people_card__wrap">
                                    <span className="people_card__rate"><i className="icon ion-ios-star" />Popularity:</span>
                                    <ul className="people_card__list">

                                        <li>{popularity}</li>
                                    </ul>
                                </div>
                                <div className="people_card__description">
                                    <p>{biography?biography:"No information available at this moment"}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Link>
        </>
    )
}

export default RowCard