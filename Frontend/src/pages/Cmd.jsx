import React, { useEffect, useRef } from "react";
import { Terminal } from "xterm";
import "xterm/css/xterm.css";

import socketio from "socket.io-client";
import { SOCKET_URL } from "../config";

const Cmd = () => {
  const termDOM = useRef();

  useEffect(() => {
    // init
    const socket = socketio.connect(SOCKET_URL, { transports: ["websocket"] });
    const term = new Terminal();

    // config
    term.open(termDOM.current);
    term.resize(90, 25);
    socket.emit("resize", 90, 25);
    term.focus();

    // input
    term.onData((data) => {
      socket.emit("in", data);
    });

    // output
    socket.on("out", (data) => {
      term.write(data);
    });

    // exit
    socket.on("exit", (data) => {
      term.dispose();
      socket.emit("kill");
    });

    // focus
    window.addEventListener("focus", () => {
      term.focus();
    });

    return () => {
      term?.dispose?.();
      socket.emit("kill");
      window.removeEventListener("focus", window);
    };
  }, []);

  return (
    <div className="term-wrapper">
      <div ref={termDOM} className="terminal"></div>
    </div>
  );
};

export default Cmd;
