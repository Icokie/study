import React from "react";
import * as styles from "./App.styl";


class Button extends React.Component {

    constructor(props) {
        super(props);
        this.state = {active: (this.props.active == this.props.id) ? 1 : 0}
    }

    render() {

        return (
            <a
                onClick={this.props.click}
                id={this.props.id}
                className={this.props.className}
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

export default class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            score: 0,
            level: 0,
            active: 0,
            sequence: [],
            counter: 0,

        };

        this.handleClick = this.handleClick.bind(this);
        this.playSound = this.playSound.bind(this);
        this.computerStep = this.computerStep.bind(this);
        this.playSequence = this.playSequence.bind(this);
    }

    handleClick(e) {

        let button = e.target;

        this.setState((prevState, props)=> {
            prevState.active = button.id;
        });

        this.playSound(button.id);


        setTimeout(()=>{


            let seqLength = this.state.sequence.length;

            let seq = this.state.sequence[this.state.counter];

            console.log(this.state.active, seq);


            if(this.state.active == seq) {

                if(this.state.counter + 1 == seqLength) {

                    this.computerStep().then(()=>{
                        this.playSequence();
                        this.setState((prevState, props)=>{
                            prevState.counter = 0;
                        });
                    })

                }

                this.setState((prevState,props)=>{

                    prevState.counter += 1;

                });

            } else {

                alert('error');
                this.playSequence();
                this.setState((prevState, props)=>{
                    prevState.counter = 0;
                    console.log('counter to 0')
                })

            }




            this.deactivateButton();

        }, 300)

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
        }, 500);

    }

    componentDidMount() {

        this.computerStep().then(()=> {
            this.playSequence();
        });

    }

    render() {

        return (
            <div className={styles.container}>
                <div>
                    <div className={`${styles.buttonGroup}`}>

                        <Button click={this.handleClick} active={this.state.active} id="1" className={`${styles.rounded} ${styles.topLeft}`}/>
                        <Button click={this.handleClick} active={this.state.active} id="2"/>


                    </div>
                    <div className={`${styles.buttonGroup}`}>

                        <Button click={this.handleClick} active={this.state.active} id="3" />
                        <Button click={this.handleClick} active={this.state.active} id="4" className={`${styles.rounded} ${styles.bottomRight}`}/>

                    </div>

                    <Sounds/>

                </div>

            </div>
        )
    }
}


// export default App;