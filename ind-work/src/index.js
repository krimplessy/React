import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

let listOfChanges = [
  {"Q": ""},
  {"X": ""},
  {"W": ""},
  {"Ё": "Е"}
];

function TextForm(props) {

  const listOfChanges = props.list;

  const toUpper = (item) => item.toUpperCase();//Для перевода в верхний регистр
  const toLower = (item) => item.toLowerCase();//Для перевода в нижний регистр

  const [text, setText] = React.useState("");

  const onChange = (event) => {
    listOfChanges.map((letter) => {//Работаю с массивом
      if (toUpper(event.target.value.slice(-1)) === Object.keys(letter)[0]) {
        if (event.target.value.slice(-1) === toUpper(event.target.value.slice(-1))) {
          event.target.value = event.target.value.slice(0, -1) + Object.values(letter)[0];
        } else {
          event.target.value = event.target.value.slice(0, -1) + toLower(Object.values(letter)[0]);
        }
      } 
    }
    )
    setText(event.target.value);
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    alert("Текст: " + text);
  }

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Текст: 
        <input type="text" value={text} onChange={onChange} />
      </label>
      <input type='submit' value="Отправить" />
    </form>
  )
}

root.render(<TextForm list={listOfChanges} />)