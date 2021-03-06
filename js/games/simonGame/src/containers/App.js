import React from "react";
import * as styles from "./App.styl";


class Button extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {

        return (
            <a onClick={this.props.click}
               id={this.props.id}
               className={`${(this.props.active(this.props.id)) ? styles.active : ''}
                            ${this.props.className}`
               }
            >
                {this.props.id}
            </a>
        )
    }
}

let Sounds = ()=> {
    return (
        <div>
            <audio id="audio1" src="/sounds/simonSound1.mp3"></audio>
            <audio id="audio2" src="/sounds/simonSound2.mp3"></audio>
            <audio id="audio3" src="/sounds/simonSound3.mp3"></audio>
            <audio id="audio4" src="/sounds/simonSound4.mp3"></audio>
        </div>
    )
};

class Board extends React.Component {

    constructor(props) {

        super(props);

        this.state = {
            score: 0,
            level: 0,
            active: 0,
            sequence: [],
            counter: 0,
            menuActive: 0,

        };

        this.handleClick = this.handleClick.bind(this);
        this.playSound = this.playSound.bind(this);
        this.computerStep = this.computerStep.bind(this);
        this.playSequence = this.playSequence.bind(this);
        this.activeButton = this.activeButton.bind(this);

    }

    handleClick(e) {

        let button = e.target;

        this.setState((prevState, props)=> {
            prevState.active = button.id;
        });

        this.playSound(button.id);


        setTimeout(()=> {


            let seqLength = this.state.sequence.length;

            let seq = this.state.sequence[this.state.counter];

            if (this.state.active == seq) {

                if (this.state.counter + 1 == seqLength) {

                    this.computerStep().then(()=> {
                        this.playSequence();
                        this.setState((prevState, props)=> {
                            prevState.counter = 0;
                            prevState.score +=1;
                        });
                    })

                }

                this.setState((prevState, props)=> {

                    prevState.counter += 1;

                });

            } else {

                alert('error');
                this.playSequence();
                this.setState((prevState, props)=> {
                    prevState.counter = 0;
                })

            }

            this.deactivateButton();

        }, 300)

    }

    activeButton(id) {
        return this.state.active == id;
    }

    playSound(sound) {

        let audio = document.getElementById('audio' + sound);
        audio.play();

    }

    computerStep() {

        return new Promise((resolve, reject)=> {

            this.setState((prevState, props)=> {
                prevState.sequence.push(parseInt((Math.random() * 4) + 1));
                prevState.level += 1;
                resolve(1);
            });

        });


    }

    playSequence() {

        let sequence = this.state.sequence;

        if (sequence) {

            let timeOut = 1000;

            for (let sound of sequence) {


                setTimeout(()=> {

                    this.setState((prevState, props)=> {
                        prevState.active = sound;
                        this.playSound(sound);
                        this.deactivateButton();
                    });

                }, timeOut);

                timeOut += 700;


            }

            timeOut = 0;

        }
    }

    deactivateButton() {

        setTimeout(()=> {
            this.setState((prevState, props)=> {
                prevState.active = 0;
            });
        }, 200);

    }


    componentDidMount() {

        this.computerStep().then(()=> {
            this.playSequence();
        });

    }


    render() {

        return (

            <div className={styles.board}>

                <div className={styles.panel}>

                    <span className={styles.pullLeft}>score: {this.state.score}</span>
                    <span className={styles.pullRight}>level: {this.state.level}</span>

                </div>

                <div className={`${styles.buttonGroup}`}>

                    <Button click={this.handleClick} active={this.activeButton} id="1"/>
                    <Button click={this.handleClick} active={this.activeButton} id="2"/>

                </div>
                <div className={`${styles.buttonGroup}`}>

                    <Button click={this.handleClick} active={this.activeButton} id="3"/>
                    <Button click={this.handleClick} active={this.activeButton} id="4"/>

                </div>

                <Sounds/>

            </div>

        )
    }
}

class Menu extends React.Component {

    render() {
        return(
          <div className={styles.menu}>
              <h1>Simon game</h1>
              <button className={styles.button} onClick={this.props.startGame}>Start</button>
          </div>
        );
    }
}

export default class App extends React.Component {

    constructor(props) {

        super(props);

        this.state = {
            menu: 1
        };

        this.startGame = this.startGame.bind(this);

    }


    startGame() {
        this.setState((prevState, props)=>{
            prevState.menu = 0;
        })
    }

    render() {
        return (
            <div className={styles.container}>
                {this.state.menu ? <Menu startGame={this.startGame}/> : <Board/>}
            </div>
        );
    }

}

// export default App;