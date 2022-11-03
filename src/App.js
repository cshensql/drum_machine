import React from "react";
import "./App.css";

const {
  Heater1,
  Heater2,
  Heater3,
  Heater4,
  Heater6,
  CevH2,
  DscOh,
  KicknHat,
  RP4Kick,
} = require("./drum-sounds/sounds");

class DrumPad extends React.Component {
  // props: url, id, text, playAudio, handleKeyDown

  render() {
    return (
      <div
        id={this.props.id}
        className="drum-pad"
        onClick={this.props.playAudio}
      >
        {this.props.text}
        <audio
          id={this.props.text}
          src={this.props.url}
          type="audio/mp3"
          className="clip"
        >
          Your brower does not support the audio element.
        </audio>
      </div>
    );
  }
}

class App extends React.Component {
  state = {
    power: false,
    display: "",
    ids: [
      "Heater-1",
      "Heater-2",
      "Heater-3",
      "Heater-4",
      "Clap",
      "Kick-n'-Hat",
      "Open-HH",
      "Kick",
      "Closed-HH",
    ],
    texts: ["Q", "W", "E", "A", "S", "D", "Z", "X", "C"],
    urls: [
      Heater1,
      Heater2,
      Heater3,
      Heater4,
      Heater6,
      CevH2,
      DscOh,
      KicknHat,
      RP4Kick,
    ],
  };

  playDrum = (drumPad) => {
    drumPad.lastChild.play();
    //document.getElementById("display").textContent = drumPad.id;
    drumPad.className += " keyDown";
    setTimeout(()=> drumPad.className="drum-pad",100);
    this.setState({ display: drumPad.id });
  };
  playAudio = (event) => {
    //const ele = document.getElementById(this.props.text);
    if (this.state.power) {
      const drumPad = event.target;
      this.playDrum(drumPad);
    }
    //ele.play();
  };
  handleKeyDown = (event) => {
    //console.log(event.key);
    if (this.state.power) {
      const key = event.key;
      //console.log(key, typeof key);
      if (key.match(/^[qweasdzxc]$/i)) {
        //console.log("succeed!");
        const index = this.state.texts.indexOf(key.toUpperCase());
        const drumPad = document.getElementById(this.state.ids[index]);
        drumPad.click();
        /*this.playDrum(drumPad);
        drumPad.className += " keyDown";*/
      }
    }
  };
  /*handleKeyUp = (event) =>{
    document.getElementById(this.state.display).className = "drum-pad";
  };*/
  powerSwitch = () => {
    //document.getElementById("display").textContent = "";
    this.setState({ power: !this.state.power, display: "" });
  };
  componentDidMount() {
    document.getElementById("drum-machine").focus();
  }
  /*componentDidUpdate() {
    document.getElementById("drum-machine").focus();
  }*/
  render() {
    const padBank = [];
    for (let i = 0; i < 9; i++) {
      padBank.push(
        <DrumPad
          id={this.state.ids[i]}
          key= {this.state.ids[i]}
          text={this.state.texts[i]}
          url={this.state.urls[i]}
          playAudio={this.playAudio}
          //handleKeyDown={this.handleKeyDown}
        />
      );
    }
    console.log("the focused element:", document.activeElement);
    return (
      <div
        id="drum-machine" tabIndex="0"
        onKeyDown={this.handleKeyDown}
        onKeyUp={this.handleKeyUp}
      >
        <div id="pad-bank">{padBank}</div>
        <div id="controls">
          <span>{this.state.power ? "Power: ON" : "Power: OFF"}</span>
          <label className="switch">
            <input type="checkbox" onClick={this.powerSwitch} />
            <span className="slider"></span>
          </label>
          <p id="display">{this.state.display}</p>
        </div>
      </div>
    );
  }
}

export default App;
