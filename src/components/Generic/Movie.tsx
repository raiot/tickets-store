import React, { useState } from 'react';
import './Movie.scss';

const Movie: React.FC<IMovie> = ({ imageUrl, avg, rawImg, name, summary, releaseDate, index }) => {
    const [selected, setSelected] = useState<number | null>(null);

    const onMouseLeave = (e: any) => {
        const { target } = e;
        if(target) {
            const el = target.parentElement.getElementsByTagName("details")[0];
            if(el) {
                el.removeAttribute('open')
            }
        }
        setSelected(null);
    }

    const handleClick = (index: number) => (_e: any) => {
        setSelected(index);
    }

    return (<div className="movie" onClick={handleClick(index)} style={{['--i' as any]: index}} onMouseLeave={onMouseLeave} >
            <img alt={name} src={rawImg ? imageUrl : 'https://via.placeholder.com/400x600'} />
            <div className={`movie-data ${selected === index ? 'show': ''}`}>
                <h3>{name}</h3>
                <p>Release Date: <span>{releaseDate}</span></p>
                <div className="rating">
                    Rating:<span style={{['--rating' as any]: avg}} className="stars">*****</span>
                </div>
                <summary>
                    More...
                    <details>
                        <p>{summary}</p>
                    </details>
                </summary>
            </div>
        </div>);
}


export default Movie;