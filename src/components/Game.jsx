import React, { Component } from 'react';
import {Grid, Chip, Button, Card, CardContent} from '@material-ui/core';
import Board from './Board';
import HistoryMenu from './HistoryMenu'

class Game extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            history: [
                {
                    squares: Array(9).fill(null)
                }
            ],
            stepNumber: 0,
            xIsNext: true
        };

        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(i) {
        const history = this.state.history.slice(0, this.state.stepNumber + 1);
        const current = history[history.length - 1];
        const squares = current.squares.slice();
        if (calculateWinner(squares) || squares[i]) {
            return;
        }
        squares[i] = this.state.xIsNext ? "X" : "O";
        this.setState({
            history: history.concat([
                {
                    squares: squares
                }
            ]),
            stepNumber: history.length,
            xIsNext: !this.state.xIsNext
        });
    }

    jumpTo(step) {
        this.setState({
            stepNumber: step,
            xIsNext: (step % 2) === 0
        });
    }

    render() {
        const history = this.state.history;
        const current = history[this.state.stepNumber];
        const winner = calculateWinner(current.squares);

        const moves = history.map((step, move) => {
            const desc = move ?
            'Go to move #' + move :
            'Go to game start';
            
            return (
                <Button key={move} variant="outlined" color={move % 2 === 1 && move > 0 ? "secondary" : "primary"} onClick={() => this.jumpTo(move)}>{desc}</Button>
            );
        });

        let status;
        if (winner) {
            status = "Winner: " + winner;
        }
        else if (!current.squares.includes(null)) {
            status = "It's a tie!";
        }
        else {
            status = "Next player: " + (this.state.xIsNext ? "X" : "O");
        }

        return (
            <Card>
                <CardContent>
                    <Grid container direction="row" justify="center">
                        <Grid item>
                            <CardContent>
                                <Board squares={current.squares} onClick={i => this.handleClick(i)} />
                            </CardContent>
                        </Grid>
                        <Grid item>
                            <CardContent>
                                <Grid container direction="column" justify="center" alignItems="center">
                                    <Grid item>
                                        <Chip
                                            variant="outlined"
                                            color={(!current.squares.includes(null)) && !winner ? "default" : (this.state.xIsNext && !winner) || (winner === "X") ? "primary" : "secondary"}
                                            label={status} />
                                    </Grid>
                                    <Grid item>
                                        <HistoryMenu first={moves[0]} items={moves.slice(1)}/>
                                    </Grid>
                                </Grid>
                            </CardContent>
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>
        );
    }
}

function calculateWinner(squares) {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  }
 
export default Game;