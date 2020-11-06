import React, { useState } from 'react';
import { useStore } from '../../store';

import './Filter.scss';

const stars: Array<number> = [1, 2, 3, 4, 5];

const Filter: React.FC<{}> = () => {
    const { dispatch } = useStore();
    const [selected, setSelected] = useState<number | null>(null);
    const handleClick = (rating: number) => (e: any) => {
        let value = null;
        setSelected(rating);
        if(selected !== rating) {
            value = rating;
        } else {
            setSelected(null);
        }
        dispatch({ type: 'FILTER', payload: value });
    }
    return (
        <div className="filter">
            <h2>Filter by rating:</h2>
            <span>
                {
                    stars
                        .map((n: number) => (<a className={`${selected === n ? 'selected' : ''}`} onClick={handleClick(n)} href="#"> * </a>))
                }
            </span>
        </div>
    );
}

export default Filter;