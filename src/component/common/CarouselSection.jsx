import React from 'react'
import Carousel from "react-multi-carousel";
import {Link} from 'react-router-dom'
function CarouselSection({responsive, items,name,poster_path,type}) {
    return (
        <>
            <div className='container'>
                <Carousel
                    responsive={responsive}>
                    {items.map((item,index) => (
                        <Link key={index} className='m-2'   to={`/${type}/${item['id']}`}>        
                            <img src={item[poster_path] ? `https://image.tmdb.org/t/p/w500/${item[poster_path]}` : "/img/section/movie.jpg"} width={250} height={300} alt="" />
                            <h5 className='text-center text-light me-4 pe-4 pt-2'>{item[name]}</h5>
                        </Link>
                    ))}
                </Carousel>
            </div>
        </>
    )
}

export default CarouselSection