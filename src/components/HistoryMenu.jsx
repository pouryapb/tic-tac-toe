import React from 'react'
import {Button, Menu, MenuItem, CardContent, Snackbar} from '@material-ui/core'

const HistoryMenu = ({first, items}) => {

    const [anchorEl, setAnchorEl] = React.useState(null);
    const [state, setState] = React.useState({
        open: false,
        vertical: 'top',
        horizontal: 'center',
    });
    
    const { vertical, horizontal, open } = state;
    
    const handleClickSnack = (newState) => () => {
        setState({ open: true, ...newState });
    };
    
    const handleCloseSnack = () => {
        setState({ ...state, open: false });
    };

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const menuItems = items.map((item) => {
        return (
            <MenuItem key={item.key} onClick={handleClose}>{item}</MenuItem>
        )
    })

    return (
        <CardContent>
            <CardContent>
                {first}
            </CardContent>
            <CardContent>
                <Button
                    variant="outlined"
                    aria-controls="simple-menu"
                    aria-haspopup="true"
                    onClick={menuItems.length !== 0 ? handleClick : handleClickSnack({ vertical: 'bottom', horizontal: 'right' })}
                >
                    History
                </Button>
                <Snackbar
                    anchorOrigin={{ vertical, horizontal }}
                    open={open}
                    onClose={handleCloseSnack}
                    message="History is Empty!"
                    key={vertical + horizontal}
                />
                <Menu
                    id="simple-menu"
                    anchorEl={anchorEl}
                    keepMounted
                    open={menuItems.length !== 0 ? Boolean(anchorEl) : false}
                    onClose={handleClose}
                >
                    <CardContent>
                        {menuItems}
                    </CardContent>
                </Menu>
            </CardContent>
        </CardContent>
    );
}
 
export default HistoryMenu;