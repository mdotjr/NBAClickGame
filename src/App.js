import React, { Component } from "react";
import PlayersCard from "./components/PlayersCard";
import Nav from "./components/Nav";
import Wrapper from "./components/Wrapper";
import Title from "./components/Title";
import Container from "./Container";
// import Row from "./row";
// import Column from "./Column";
import players from "./players.json";
import "./App.css";
import GridList from '@material-ui/core/GridList'

// Random shuffle
function shufflePlayers(player) {
  console.log(shufflePlayers);
  let i = players.length - 1;
  while (i > 0) {
    const j =  Math.floor(Math.random() * (i + 1));
    const p = players[i];
    players[i] = players[j];
    players[j] = p;
    i--;
  }
  return players;
};
//   for (let i = player.length - 1; i > 0; i--) {
//     let p = Math.floor(Math.random() * (i + 1));
//     [player[i], player[p]] = [player[p], player[i]];
//   }
//   return player;
// };

// shufflePlayer = players => {
//   let i = players.length - 1;
//   while (i > 0) {
//     const j = Math.floor(Math.random() * (i + 1));
//     const p = players[i];
//     players[i] = player[j];
//     players[j] = p;
//     i--;
//   }
//   return players;
// };

class App extends Component {
  // Set this.state
  state = {
    players,
    currentScore: 0,
    topScore: 0,
    correctIncorrect: "",
    clicked: [],
  };

  handleClick = id => {
    if (this.state.clicked.indexOf(id) === -1) {
      this.handleIncrement();
      this.setState({ clicked: this.state.clicked.concat(id) });
    } else {
      this.handleReset();
    }
  };

  handleIncrement = () => {
    const newScore = this.state.currentScore + 1;
    this.setState({
      currentScore: newScore,
      correctIncorrect: "Correct!"
    });
    if (newScore >= this.state.topScore) {
      this.setState({ topScore: newScore });
    }
    else if (newScore === 12) {
      this.setState({ correctIncorrect: "You win!" });
    }
    this.handleShuffle();
  };

  handleReset = () => {
    this.setState({
      currentScore: 0,
      topScore: this.state.topScore,
      correctIncorrect: "Sorry, you're wrong man!",
      clicked: []
    });
    this.handleShuffle();
  };


  handleShuffle = (player) => {
    let shuffledPlayers = shufflePlayers(player);
    this.setState({ players: shuffledPlayers });
  };

   render() {
    return (
      <Wrapper>
        <Nav
          title="NBA Clicky Game"
          score={this.state.currentScore}
          topScore={this.state.topScore}
          correctIncorrect={this.state.correctIncorrect}
        />
        

<Title>
          Click each image once to earn points. Clicking the same image twice causes you to lose!
        </Title>
        <Container>
         <GridList item cols={1}>
            {this.state.players.map(player => (
              
                <PlayersCard
                  key={player.id}
                  handleClick={this.handleClick}
                  handleIncrement={this.handleIncrement}
                  handleReset={this.handleReset}
                  handleShuffle={this.handleShuffle}
                  id={player.id}
                  image={player.image}
                />
             
            ))}
          </GridList>
        </Container>
        </Wrapper>
    );
  }
}
export default App;
      // <div className="App">
      //   <header className="App-header">
      //     <img src={logo} className="App-logo" alt="logo" />
      //     <h1 className="App-title">Clicky Game</h1>
      //   </header>
        
      // </div>
  


