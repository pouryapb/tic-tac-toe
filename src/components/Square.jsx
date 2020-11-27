import React from 'react';
import {Button, makeStyles} from '@material-ui/core';

const Square = ({value, onClick}) => {

    const useStyle = makeStyles({
        squared: {
            borderRadius: 0,
            minWidth: '64px',
            minHeight: '64px'
        }
    });

    const classes = useStyle();
    return <Button variant="outlined" className={classes.squared} onClick={onClick}>{value}</Button>;
}
 
export default Square;