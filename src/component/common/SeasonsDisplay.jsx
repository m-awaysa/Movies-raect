import React from 'react'
import { Link } from 'react-router-dom'
function SeasonsDisplay({ season,id,t ,currentLngCode}) {

    return (
        <div>
            <div className="accordion__card">
                <div className="card-header" id="headingOne">
                    <Link to={`/tv/${id}/season/${season.season_number}/episode/1`}>
                    <button className="navbar-toggler">
                        <span className='mb-2'>{season.name}</span>
                        <span dir={(currentLngCode==='ar')? "rtl":"ltr"}>{season.episode_count} {t('episode_plural')} {t('from')} {season.air_date}</span>
                    </button>
                    </Link>
                </div>
            </div>
        </div>


    )
}

export default SeasonsDisplay