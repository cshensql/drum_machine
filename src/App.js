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
  // props: url, id, text, playAudio

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
    power: true,
    l1: [
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

  playAudio = (event) => {
    //const ele = document.getElementById(this.props.text);
    if (this.state.power) {
      const drumPad = event.target;
      drumPad.lastChild.play();
      document.getElementById("display").textContent = drumPad.id;
    }
    //ele.play();
  };

  powerSwitch = () => {
    document.getElementById("display").textContent = "";
    this.setState({ power: !this.state.power });
  };

  render() {
    const padBank = [];
    for (let i = 0; i < 9; i++) {
      padBank.push(
        <DrumPad
          id={this.state.l1[i]}
          text={this.state.texts[i]}
          url={this.state.urls[i]}
          playAudio={this.playAudio}
        />
      );
    }
    return (
      <div id="drum-machine">
        <div id="pad-bank">{padBank}</div>
        <div id="controls">
          <button id="power-btn" onClick={this.powerSwitch}>
            {this.state.power? "Power: ON": "Power: OFF"}
          </button>
          <p id="display"></p>
        </div>
      </div>
    );
  }
}

export default App;
