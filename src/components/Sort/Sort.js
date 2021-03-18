import React from 'react';

const sort = (props) => {
    if(!props.by) {
        return props.children;
    }

    // descending and ascending function
    const sortNumDec = (a, b) => {
        return b.props[props.by] - a.props[props.by];
    }
    const sortNumAsc = (a, b) => {
        return a.props[props.by] - b.props[props.by];
    }
    const alphabetically = (a, b) => {
        return a.props[props.by].localeCompare(b.props[props.by]);
    }
    const notAlphabetically = (a, b) => {
        return b.props[props.by].localeCompare(a.props[props.by]);
    }


    if(props.by === 'price') {
        if(props.order === 'descending') {
            return React.Children.toArray(props.children).sort(sortNumDec);
        }
        else if(props.order === 'ascending') {
            return React.Children.toArray(props.children).sort(sortNumAsc);
        }
    }
    else if(props.by ==='name') {
        if(props.order === 'alphabetically') {
            return React.Children.toArray(props.children).sort(alphabetically);
        }
        else if(props.order === 'not_alphabetically') {
            return React.Children.toArray(props.children).sort(notAlphabetically);
        }

    }
    else if(props.by ==='priceChange') {
        if(props.order === 'descending') {
            return React.Children.toArray(props.children).sort(sortNumDec);
        }
        else if(props.order === 'ascending') {
            return React.Children.toArray(props.children).sort(sortNumAsc);
        }
    }  
}

export default sort;