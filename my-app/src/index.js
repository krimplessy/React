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

const listOfEducation = [
  {prof: "Программная инженерия",
   discr: `Благодаря данной программе вы станете специалистом, способным не только проектировать, 
   кодировать и тестировать программные средства, но и оптимизировать процессы разработки программ.`},
  {prof: "Технология программироания",
   discr: `Программа подойдет для тех, кто хочет научиться разрабатывать, тестировать 
   и сопровождать программные средства, руководить проектами в области разработки программного обеспечения.`},
  {prof: "Системное программирование",
   discr: `Программа будет интересна тем, кто планирует заниматься промышленным программированием
    — разработкой мобильных и оконных приложений, веб-дизайном, 1С-программированием.`}
]

const listProf = [
  {prof: "Web-разработчиков",
    discr:`Создают сложные и очень сложные сайты. Продумывают, чтобы
   пользователям было быстро и удобно.`},
  {prof: "Гейм-девелоперов",
    discr: `Создают видеоигры. Погружают всех нас в новые миры.`},
  {prof: "AI/ML-cпециалистов", 
    discr: `Используют в деле искусственный интеллект и машинное
    обучение. Фактами и прогнозами делает бизнесу хорошо.`},
  {prof: "Аналитиков данных",
    discr: `С помощью чисел решают, куда двигаться компаниям. Помогают
    бизнесу получать еще больше денег.` },
  {prof: "Мобильных разработчиков",   
    discr: `Создают мобильные приложения, которые найдут тебя везде.
    Умещают на маленьких экранах максимальный функционал.`}
]

const listImg = ["logo_dvfu.png", "logo_imct.png"]

/*Передаем в качестве пропса список с рисунками*/
function Head(props) {
  const logoImages = listImg.map((img, index) => 
    <img key={index} src={img} />
  ); 
  return(
    <div className="head"> 
      {logoImages}
    </div>
  )
}

function Tagline() {
  return(
    <h1>
      Хватит уже игр, <br/> пора <br/> разрабатывать и зарабатывать 
    </h1>
  ) 
}

function Button(props) {
  return (
      <input className="button" onClick={props.onClick} type="button" value={props.val} />
  )
}

function Professions (props) {
  const listProf = props.list.map((item, index) =>
      <ProfItem key={index} prof={item.prof} discr={item.discr} />
  ); 
  return (
    <div className="prof"> 
      <h2>{props.title} </h2> 
      <ul>
        {listProf} 
      </ul>
    </div> 
  )
}

function ProfItem(props) { 
  const [isOpen, setOpenClose] = React.useState(false); 

  const press = () => {
    setOpenClose(!isOpen); 
  }

  if (isOpen) {
    return(
      <li onClick={press}>
        <span className="left">{props.prof}</span>
        <span className="right">×</span>
        {isOpen &&
          <p> {props.discr}</p> 
          }
      </li> 
    )
  } else {
    return(
      <li onClick={press}>
        <span className="left">{props.prof}</span>
        <span className="right">+</span>
      </li> 
    )
  }
}

function Content() {

  const [page, setPage] = React.useState('prof');

  const openEducat = () => {
    setPage('educat');
  };

  const openProf = () => {
    setPage('prof');
  };

  let pageContent = <></>;

  if (page === 'prof') {
    pageContent = (
      <>
        <Button onClick={openEducat} val='Хочу учиться!' /> 
        <Professions title="Обучаем на:" list={listProf} />
      </>  
    );
  } else if (page === 'educat') {
    pageContent = ( 
      <>
        <Button onClick={openProf} val='Посмотреть профессии' /> 
        <Professions title="Программы подготовки:" list={listOfEducation} />
      </>  
    );
  }

  return (
    <>
      <Head listImg={listImg} />
      <Tagline />
      {pageContent}
    </>
  );
}

root.render(<Content />)