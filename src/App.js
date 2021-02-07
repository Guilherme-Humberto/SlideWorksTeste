import React, { useState } from "react";
import api from "./services/api";
import secret from './secrets/index.json'

import "./App.css";


function App() {
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [pos, setPos] = useState("");
  const [idList, setIdList] = useState("");
  const [top, setTop] = useState(false);
  const [bottom, setBottom] = useState(false);
  const [clear, setClear] = useState(false);

  const handleCreateNewCard = () => {
    api
      .post(`cards?key=${secret.key}&token=${secret.token}&idList=${idList}`, {
        name,
        desc,
        pos,
      })
      .then(() => setClear(true))
      .catch(err => console.log(err));
  };

  const handleCheckedTop = (value) => {
    setTop(true);
    setBottom(false);
    setPos(value);
  };

  const handleCheckedBottom = (value) => {
    setBottom(true);
    setTop(false);
    setPos(value);
  };

  return (
    <div className="App">
      <div className="wrapperOne">
        <label className="label">Nome</label>
        <input
          className="input"
          onChange={(e) => setName(e.target.value)}
          type="text"
          value={clear ? "" : name}
          placeholder="Name"
        />
        <label className="label">Descrição</label>
        <textarea
          className="textarea"
          value={clear ? "" : desc}
          onChange={(e) => setDesc(e.target.value)}
          placeholder="Type Something"
        ></textarea>
      </div>

      <div className="wrapperTwo">
        <div className="checkBox">
          <div className="wrappercheck">
            <input
              className="inputcheck"
              value={"top"}
              checked={clear ? false : top}
              onChange={(e) => handleCheckedTop(e.target.value)}
              type="checkbox"
            />
            <label className="labelcheck">Topo</label>
          </div>
          <div className="wrappercheck">
            <input
              className="inputcheck"
              value={"bottom"}
              checked={clear ? false : bottom}
              onChange={(e) => handleCheckedBottom(e.target.value)}
              type="checkbox"
            />
            <label className="labelcheck">Fundo</label>
          </div>
        </div>

        <div className="selectedwrapper">
          <label className="label">Escolher lista</label>
          <select
            className="selectedList"
            value={clear ? "" : idList}
            onChange={(e) => setIdList(e.target.value)}
          >
            <option className="options" value="" disabled>
              Selecione a lista
            </option>
            <option className="options" value="601d7889c7a1eb48c08ced15">
              Lista 1
            </option>
            <option className="options" value="601f14ec061db0598582943f">
              Lista 2
            </option>
            <option className="options" value="601f14f09433f971b7c69cc4">
              Lista 3
            </option>
          </select>
          <button onClick={handleCreateNewCard} className="button">
            Enviar
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
