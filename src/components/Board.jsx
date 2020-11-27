import React, { Component } from 'react';
import Square from './Square';
import {Grid} from '@material-ui/core'

class Board extends Component {

    renderSquares(i) {
        return <Square value={this.props.squares[i]} onClick={() => this.props.onClick(i)} />
    }

    render() {
        return (
            <Grid container direction="column" justify="center" alignItems="center">
                <Grid item>
                    {this.renderSquares(0)}
                    {this.renderSquares(1)}
                    {this.renderSquares(2)}
                </Grid>
                <Grid item>
                    {this.renderSquares(3)}
                    {this.renderSquares(4)}
                    {this.renderSquares(5)}
                </Grid>
                <Grid item>
                    {this.renderSquares(6)}
                    {this.renderSquares(7)}
                    {this.renderSquares(8)}
                </Grid>
            </Grid>
         );
    }
}
 
export default Board;