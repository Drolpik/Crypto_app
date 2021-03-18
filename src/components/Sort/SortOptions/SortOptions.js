import React from 'react';
import classes from './SortOptions.module.scss';
import SortBtn from '../SortBtn/SortBtn';

const sortOptions = (props) => (
    <div className={classes.Container}>
        <SortBtn 
            btnName={"Sort by name"}
            clicked={props.name_Click}
        />
        <SortBtn 
            btnName={"Sort by price"}
            clicked={props.price_Click}
        />
        <SortBtn 
            btnName={"Sort by day change"}
            clicked={props.dayChange_Click}
        />
    </div>
);

export default sortOptions;