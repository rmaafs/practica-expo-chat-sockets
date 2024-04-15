import React, { Component } from "react";
import { View, Button, Text, TextInput, StyleSheet } from "react-native";
import io from "socket.io-client";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      chatMessage: "",
      chatMessages: [],
    };
  }
  componentDidMount() {
    //Nos conectamos al socket
    this.socket = io.connect("http://192.168.1.100:3000");

    //Al recibir algún mensaje...
    this.socket.on("messages", (msg) => {
      //Quité el ...this.set porque no queremos guardar de nuevo todos los mensajes
      this.setState({ chatMessages: [msg] }); //Lo guardamos en el estado
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <Text> Mensaje(s)</Text>
        <Text>
          {/*Si el estado no es nulo, imprimiremos todos los mensajes*/}
          {this.state.chatMessages &&
            this.state.chatMessages[0]?.map((mensaje, i) => {
              //Ciclamos todos los mensajes
              return [
                <Text style={{ borderWidth: 2, top: 500 }} key={i}>
                  {mensaje.author}: {mensaje.text}
                  {"\n"}
                </Text>,
              ];
            })}
        </Text>

        <TextInput
          style={{ height: 40, borderWidth: 2, top: 300 }}
          autoCorrect={false}
          value={this.state.chatMessage}
          onSubmitEditing={() => this.submitChatMessage()}
          onChangeText={(chatMessage) => {
            this.setState({ chatMessage });
          }}
          placeholder="Escribe el mensaje"
        />
      </View>
    );
  }
  submitChatMessage() {
    //Creamos el objeto que será enviado al socket.
    let msg = {
      author: "React", //Por esto salía undefined
      text: this.state.chatMessage,
    };
    this.socket.emit("new-message", msg);
    this.setState({ chatMessage: "" });
  }
}
const styles = StyleSheet.create({
  container: {
    marginTop: 100,
    height: 100,
    flex: 1,
    backgroundColor: "#F5FCFF",
  },
});
