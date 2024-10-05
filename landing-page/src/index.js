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

function Title() {
  return (
    <h1>Хочешь подготовиться к ОГЭ <br /> лекго и быстро? <br /> Тогда тебе к нам!</h1>
  )  
} 

function Main() {

  const [userValue, setUserValue] = React.useState("");

  const onChange = (event) => {
    setUserValue(event.target.value);
  }

  const [game, setGame] = React.useState(
    {
      value1: Math.floor(Math.random()*900) + 100,
      value2: Math.floor(Math.random()*900) + 100,
      arrRandomValues: [],//Массив для запоминания суммы рандомных чисел
      arrValues: [],//Массив значений пользователя
      arrTrueValues: [],//Массив верных ответов пользователя
      isEnd: false
    }
  )

  const handleSubmit = (event) => {
    event.preventDefault();
    setUserValue("");
   
    if ((game.value1 + game.value2) == userValue) {//Если пользователь ответил верно
      setGame({
          value1: Math.floor(Math.random()*900) + 100,
          value2: Math.floor(Math.random()*900) + 100,
          arrRandomValues: [...game.arrRandomValues, game.value1 + game.value2],
          arrValues: [...game.arrValues, userValue],
          arrTrueValues: [...game.arrTrueValues, userValue],//добавляю в массив его верный ответ
          isEnd: game.arrValues.length == 4
        }
      )
    } else if ((game.value1 + game.value2) != userValue) {
      setGame({ 
        value1: Math.floor(Math.random()*900) + 100,
        value2: Math.floor(Math.random()*900) + 100,
        arrRandomValues: [...game.arrRandomValues, game.value1 + game.value2],
        arrValues: [...game.arrValues, userValue],
        arrTrueValues: [...game.arrTrueValues],//ничего не добавляю
        isEnd: game.arrValues.length == 4
      }
    )
    }
  }

  const newGame = () => {
    setUserValue("")
    setGame({
      value1: Math.floor(Math.random()*900) + 100,
      value2: Math.floor(Math.random()*900) + 100,
      arrRandomValues: [],
      arrValues: [],
      arrTrueValues: [],
      isEnd: false
    })
  }

  console.log(game.value1 + game.value2);//Для вывода верного числа в консоль (Для проверки)

  return (
    <>
      <div>
        <h2>Давай проверим твои <br />математические навыки. <br /> Сможешь ответить без <br /> ошибок на 5 примеров?</h2>
        <h3>{game.value1} + {game.value2} =</h3>
        <form onSubmit={handleSubmit}>
          <label>
            <b>Ответ:</b>
            <input type="number" value={userValue} onChange={onChange} />
          </label>
          <input type="submit" value="OK" />
          <GameStep listLog={game} />
          {game.isEnd && 
            <>
              <ResultGame resGame={game} />
              <input type="button" value="Пройти тест еще раз?" onClick={newGame} />
            </>
          }
        </form>
      </div>
    </>
  )
};

function GameStep(props) {

  //Здесь я сравниваю каждое число массива значений пользователя со значениями массива суммы рандомных чисел
  //для того, чтобы у меня сохранялись ПРАВИЛЬНО все пункты с прояснением верно/неверно 
  const listLog = props.listLog.arrValues.map((val, index) =>
    <p key={index}>{index + 1}.
      Ответ {val}
      {Number(val) == props.listLog.arrRandomValues[index] ? " верный! Так держать!" : " неверный. Попробуй еще раз!"}
    </p>
  )

  return (
    <div className="log">
      {listLog}
    </div>
  )

};

function ResultGame(props) {
  const result = props.resGame.arrTrueValues.length == 5 ? `Поздравляю, ты справился! Ваш уровень поражает! Вам подойдет обычный курс` : "К сожалению, твой уровень знаний не совершенен. Вам нужен углубленный курс математики.";

  return (
    <>
      <h3>
        <b>{result}</b>
      </h3>
      <input type="button" value="Записаться на курс" className="but" />
    </>
  )

}

function Content() {
  return(
    <>
      <Title />
      <Main />
    </>
  )
}

root.render(<Content />)
