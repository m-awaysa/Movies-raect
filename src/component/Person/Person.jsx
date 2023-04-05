import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams, Link, Outlet } from 'react-router-dom';
import './Person.css';



const Person = ({ currentLngCode, t }) => {

  let navigate = useNavigate();
  const { id } = useParams();
  const [person, setPerson] = useState({});
  const [pathName, setPathName] = useState(window.location.pathname);
  const [ids, setIds] = useState({});


  const getPerson = async () => {
    try {
      const result = await axios.get(`https://api.themoviedb.org/3/person/${id}?language=${currentLngCode}`, {
        params: {
          api_key: '352f716e969ef97191556e88ef26f893',
          append_to_response: 'videos'
        }
      })
      setPerson(result.data);
    } catch (error) {
      navigate('/NotFound')
    }
  }
  const getExternalIds = async () => {

    try {
      const { data } = await axios.get(`https://api.themoviedb.org/3/person/${id}/external_ids?language=en-US`, {
        params: {
          api_key: '352f716e969ef97191556e88ef26f893',
        }
      })
      setIds(data)
    } catch (error) {
      setIds({})
    }

  }

  const changeToMovie = () => {
    setPathName(`/person/${id}`)
  }

  const changeToTv = () => {
    setPathName(`/person/${id}/TvShowsCredits`)
  }

  // useLayoutEffect(() => {
  //   window.scrollTo(0, 0)
  // });
  useEffect(() => {
    getPerson()
    getExternalIds()
  }, [currentLngCode, t, id]);


  return <>
    <section className="h-100 gradient-custom-2">
      <div className="container py-5 h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col col-lg-9">
            <div className="card">
              <div className="rounded-top text-white d-flex flex-row" style={{ backgroundColor: '#000', height: 200 }}>
                <div className="ms-4 mt-5 d-flex flex-column" style={{ width: 150 }}>
                  <img src={person.profile_path ? `https://image.tmdb.org/t/p/w500/${person.profile_path}` : "/img/section/movie.jpg"}
                    className="img-fluid img-thumbnail mt-4 mb-2" style={{ width: 150, zIndex: 1 }} />
                </div>
                <div className="ms-3" style={{ marginTop: 120 }}>
                  <h5>{person.name}</h5>
                </div>
              </div>
              <div className="p-4 text-black person_info" style={{ backgroundColor: '#f8f9fa' }}>
                <div className="d-flex justify-content-end text-center py-1">
                  <div>
                    <p className="mb-1 h5 text-success">{person.popularity}</p>
                    <p className="small text-muted mb-0">{t('popularity')}</p>
                  </div>
                  <div className="px-3">
                    <Link className="mb-1 h5"
                      to={`https://www.imdb.com/name/${person.imdb_id}/`}
                    >
                      <img
                        style={{ height: '29px', display: 'block', WebkitUserSelect: 'none', margin: 'auto', backgroundColor: 'hsl(0, 0%, 90%)', transition: 'background-color 300ms' }}
                        src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/IMDB_Logo_2016.svg/64px-IMDB_Logo_2016.svg.png" />
                    </Link>
                    <p className="small text-muted mb-0">IMDb</p>
                  </div>
                  <div>
                    <p className="mb-1 h5 text-success">{person.gender === 2 ? t("male") : person.gender === 1 ? t("female") : t('unknown')}</p>
                    <p className="small text-muted mb-0 ">{t('gender')}</p>
                  </div>
                </div>
              </div>
              <div className="card-body p-4 text-black">
                <div className="mb-5" dir={currentLngCode === 'ar' ? 'rtl' : 'ltr'}>
                  <p className="lead fw-normal mb-1">{t('about')}</p>
                  <div className="p-4" style={{ backgroundColor: '#f8f9fa' }}>

                    <p className="font-italic mb-1">
                      <span className='fw-bold'>{t('place_of_birth')}: </span>
                      {person.place_of_birth ? person.place_of_birth : t("unknown")}
                    </p>
                    <p className="font-italic mb-1">
                      <span className='fw-bold'>{t('birthday')}: </span>
                      {person.birthday ? person.birthday : t("unknown")}
                    </p>
                    <p className="font-italic mb-1">
                      <span className='fw-bold'>{t('department')}: </span>
                      {person.known_for_department ? person.known_for_department : t("unknown")}
                    </p>

                    <h4>{t('profiles')}</h4>
                    <ul className='d-flex flex-row'>
                      {ids.wikidata_id ? <li className="font-italic mb-1"><Link to={`https://www.wikidata.org/wiki/${ids.wikidata_id}`}>
                        <img className='d-inline'
                          style={{ width: '40px', display: 'block', WebkitUserSelect: 'none', margin: 'auto', backgroundColor: 'hsl(0, 0%, 90%)', transition: 'background-color 300ms' }}
                          src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/ff/Wikidata-logo.svg/64px-Wikidata-logo.svg.png" />
                      </Link></li> : <></>}

                      {ids.instagram_id ? <li className="font-italic mb-1"><Link to={`https://www.instagram.com/${ids.instagram_id}/`}>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="30px" height="30px"><radialGradient id="yOrnnhliCrdS2gy~4tD8ma" cx="19.38" cy="42.035" r="44.899" gradientUnits="userSpaceOnUse"><stop offset={0} stopColor="#fd5" /><stop offset=".328" stopColor="#ff543f" /><stop offset=".348" stopColor="#fc5245" /><stop offset=".504" stopColor="#e64771" /><stop offset=".643" stopColor="#d53e91" /><stop offset=".761" stopColor="#cc39a4" /><stop offset=".841" stopColor="#c837ab" /></radialGradient><path fill="url(#yOrnnhliCrdS2gy~4tD8ma)" d="M34.017,41.99l-20,0.019c-4.4,0.004-8.003-3.592-8.008-7.992l-0.019-20 c-0.004-4.4,3.592-8.003,7.992-8.008l20-0.019c4.4-0.004,8.003,3.592,8.008,7.992l0.019,20 C42.014,38.383,38.417,41.986,34.017,41.99z" /><radialGradient id="yOrnnhliCrdS2gy~4tD8mb" cx="11.786" cy="5.54" r="29.813" gradientTransform="matrix(1 0 0 .6663 0 1.849)" gradientUnits="userSpaceOnUse"><stop offset={0} stopColor="#4168c9" /><stop offset=".999" stopColor="#4168c9" stopOpacity={0} /></radialGradient><path fill="url(#yOrnnhliCrdS2gy~4tD8mb)" d="M34.017,41.99l-20,0.019c-4.4,0.004-8.003-3.592-8.008-7.992l-0.019-20 c-0.004-4.4,3.592-8.003,7.992-8.008l20-0.019c4.4-0.004,8.003,3.592,8.008,7.992l0.019,20 C42.014,38.383,38.417,41.986,34.017,41.99z" /><path fill="#fff" d="M24,31c-3.859,0-7-3.14-7-7s3.141-7,7-7s7,3.14,7,7S27.859,31,24,31z M24,19c-2.757,0-5,2.243-5,5 s2.243,5,5,5s5-2.243,5-5S26.757,19,24,19z" /><circle cx="31.5" cy="16.5" r="1.5" fill="#fff" /><path fill="#fff" d="M30,37H18c-3.859,0-7-3.14-7-7V18c0-3.86,3.141-7,7-7h12c3.859,0,7,3.14,7,7v12 C37,33.86,33.859,37,30,37z M18,13c-2.757,0-5,2.243-5,5v12c0,2.757,2.243,5,5,5h12c2.757,0,5-2.243,5-5V18c0-2.757-2.243-5-5-5H18z" /></svg>
                      </Link></li> : <></>}

                      {ids.facebook_id ? <li className="font-italic mb-1"><Link to={`https://www.facebook.com/${ids.facebook_id}/`}>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="30px" height="30px"><path fill="#039be5" d="M24 5A19 19 0 1 0 24 43A19 19 0 1 0 24 5Z" /><path fill="#fff" d="M26.572,29.036h4.917l0.772-4.995h-5.69v-2.73c0-2.075,0.678-3.915,2.619-3.915h3.119v-4.359c-0.548-0.074-1.707-0.236-3.897-0.236c-4.573,0-7.254,2.415-7.254,7.917v3.323h-4.701v4.995h4.701v13.729C22.089,42.905,23.032,43,24,43c0.875,0,1.729-0.08,2.572-0.194V29.036z" /></svg>
                      </Link></li> : <></>}

                    </ul>

                    <p className="font-italic mb-1">
                      <span className='fw-bold'>{t('overview')}: </span> {person.biography ? person.biography : t("unknown")}</p>
                  </div>
                </div>

                <div className="d-flex justify-content-between flex-column mb-4">
                  <p className={`lead fw-normal mb-2 ` + t('flex_end_or_start')}>{t('credits')}</p>
                  <div className={`navbar-nav d-flex flex-row ` + t('flex_end_or_start')}>
                    <div onClick={changeToMovie} >
                      <Link
                        className={"nav-link mx-2 p-2 " + ((pathName === `/person/${id}`) ? "bg-warning rounded" : " ")}
                        to={`/person/${id}`}>{t('movies')}
                      </Link>
                    </div>
                    <div onClick={changeToTv} >
                      <Link
                        className={"nav-link mx-2 p-2 " + ((pathName === `/person/${id}/TvShowsCredits`) ? "bg-warning rounded" : " ")}
                        to={`/person/${id}/TvShowsCredits`}>{t('tvshows')}
                      </Link>
                    </div>
                  </div>
                </div>

                <Outlet id={id} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </>
};

export default Person;