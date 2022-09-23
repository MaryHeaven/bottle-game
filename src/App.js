import React, { useState, useRef, useEffect } from "react";
import { getPlayers, getRandomInt, animate } from './utils';
import kissSound from './KissSound.mp3';
import spinSound from './SpinSound.mp3';
import bottle from './img/Bottle.png';
import kiss from './img/Kiss.png';
import './App.css';
// use Audio constructor to create HTMLAudioElement

function App() {
  const countPlayers = 10;
  const [players, setPlayers] = useState(getPlayers(countPlayers));
  const [count, setCount] = useState(4);
  const button = useRef(null);
  const players_div = document.getElementById('players_div');
  const player = useRef(null);

  const timer_bot = document.getElementById('timer_bot');
  const kiss_anim = document.getElementById('kiss_anim');

  const audioKiss = new Audio(kissSound);
  const audioBottle = new Audio(spinSound);
  // const audio_prosto = new Audio('https://ruy.zvukofon.com/dl/275508189/LOBODA_-_Rodnojj_(musportal.org).mp3')
  // const audio_kiss = document.getElementsByClassName('audio_kiss');
  // const audio_bottle = document.getElementsByClassName('audio_bottle');

  // play audio sound
  const playSound = () => {
    // audioBottle.play();
    // audioKiss.play();
    // audio_prosto.play();
    audioBottle.load();
    audioKiss.load();
  }

  // const stopSound = () => {
  //   audioBottle.pause();
  //   audioKiss.pause();
  //   audioBottle.currentTime = 0;
  //   audioKiss.currentTime = 0
  // }

  useEffect(() => {
    if (count === 0) {
      timer_bot.style.display = 'none';
      audioBottle.load();
      audioKiss.load();
      handleClick()
      setTimeout(() => {
        setCount(4)
      }, 14950)
    } else {
      const timer =
        count > 0 && setInterval(() => setCount(count - 1), 1000);
      return () => clearInterval(timer);
    }
  }, [count]);


  console.log('count', count);

  const handleClick = (event) => {
    // event.preventDefault();
    let active = getRandomInt(countPlayers);
    const oldActive = players.findIndex((item) => item.active);
    const newArray = [...players];

    if (players[active].active) {
      active++;
    }

    if (active === 10) {
      active = 0;
    }

    // const { currentTarget } = event;
    const duration = 4000;
    const circle = 3600;
    const currentRotate = players[oldActive].angle;
    const angle = players[active].angle + circle - currentRotate;

    const player_1 = players[oldActive];
    const player_2 = players[active];
    const player_1_dom = document.getElementById(`player_${player_1.id}`);
    const player_2_dom = document.getElementById(`player_${player_2.id}`);
    const player_1_border = document.getElementById(`player_border_${player_1.id}`);
    const player_1_circle = document.getElementById(`player_circle_${player_1.id}`);
    const player_1_img = document.getElementById(`player_img_${player_1.id}`);
    const player_2_border = document.getElementById(`player_border_${player_2.id}`);
    const player_2_circle = document.getElementById(`player_circle_${player_2.id}`);
    const player_2_img = document.getElementById(`player_img_${player_2.id}`);

    animate({
      duration: duration,
      timing(timeFraction) {
        return timeFraction;
      },
      draw(progress) {
        audioBottle.play();
        const rotate = (progress * angle) + currentRotate + 'deg';
        button.current.style.transform = `rotate(${rotate})`;
        // button.style.transformOrigin = 'center 65%';
      }
    });

    const oldActiveLeft = 400 - players[oldActive].left;
    const oldActiveTop = 300 - players[oldActive].top;
    const activeLeft = 200 - players[active].left;
    const activeTop = 300 - players[active].top;

    setTimeout(() => {
      audioBottle.pause();

      players_div.style.zIndex = 4;
      player_1_dom.style.zIndex = 5;
      player_2_dom.style.zIndex = 5;
      button.current.style.zIndex = 1;
    }, duration + 100);

    animate({
      duration: duration,
      timing(timeFraction) {
        return timeFraction;
      },
      draw(progress) {
        setTimeout(() => {
          player_1_dom.style.animationDuration = '100ms';
          player_1_dom.style.animationTimingFunction = 'linear';
          player_1_border.style.animationDuration = '100ms';
          player_1_border.style.animationTimingFunction = 'linear';
          player_1_circle.style.animationDuration = '100ms';
          player_1_circle.style.animationTimingFunction = 'linear';
          player_1_img.style.animationDuration = '100ms';
          player_1_img.style.animationTimingFunction = 'linear';

          player_2_dom.style.animationDuration = '100ms';
          player_2_dom.style.animationTimingFunction = 'linear';
          player_2_border.style.animationDuration = '100ms';
          player_2_border.style.animationTimingFunction = 'linear';
          player_2_circle.style.animationDuration = '100ms';
          player_2_circle.style.animationTimingFunction = 'linear';
          player_2_img.style.animationDuration = '100ms';
          player_2_img.style.animationTimingFunction = 'linear';
          //-------------
          // const x_p1 = `${(progress * oldActiveLeft)}px`;
          // const y_p1 = `${(progress * oldActiveTop)}px`;
          // const x_p2 = `${(progress * activeLeft)}px`;
          // const y_p2 = `${(progress * activeTop)}px`;

          // const y = `${(progress * oldActiveLeft) - players[oldActive].left}px`;
          // const x = `${(progress * oldActiveTop) - players[oldActive].top}px`;

          // player_1_dom.style.transform = `translate(${x_p1}, ${y_p1})`;

          player_1_dom.style.left = `${(progress * oldActiveLeft) + players[oldActive].left}px`;
          player_1_dom.style.top = `${(progress * oldActiveTop) + players[oldActive].top}px`;
          // // ------------
          player_1_dom.style.width = `${(progress * 50) + 100}px`;
          player_1_dom.style.height = `${(progress * 50) + 100}px`;

          player_1_border.style.width = `${(progress * 50) + 100}px`;
          player_1_border.style.height = `${(progress * 50) + 100}px`;

          player_1_circle.style.width = `${(progress * 50) + 100}px`;
          player_1_circle.style.height = `${(progress * 50) + 100}px`;

          player_1_img.style.width = `${(progress * 50) + 100}px`;
          player_1_img.style.height = `${(progress * 50) + 100}px`;
          // //--------------
          // player_2_dom.style.transform = `translate(${x_p2}, ${y_p2})`;
          player_2_dom.style.left = `${(progress * activeLeft) + players[active].left}px`;
          player_2_dom.style.top = `${(progress * activeTop) + players[active].top}px`;
          // // -------------
          player_2_dom.style.width = `${(progress * 50) + 100}px`;
          player_2_dom.style.height = `${(progress * 50) + 100}px`;

          player_2_border.style.width = `${(progress * 50) + 100}px`;
          player_2_border.style.height = `${(progress * 50) + 100}px`;

          player_2_circle.style.width = `${(progress * 50) + 100}px`;
          player_2_circle.style.height = `${(progress * 50) + 100}px`;

          player_2_img.style.width = `${(progress * 50) + 100}px`;
          player_2_img.style.height = `${(progress * 50) + 100}px`;

        }, 4900);

        setTimeout(() => {
          // здесь должна появиться картинка поцелуя и звук
          kiss_anim.style.visibility = 'visible';
          kiss_anim.style.opacity = 1;
          kiss_anim.style.transition = 'all 1s ease';
          // audioKiss.volume = '100%';
          setTimeout(() => {
            audioKiss.play();
            kiss_anim.style.transform = 'scale(2)';
            // здесь должна исчезнуть картинка поцелуя и звук
            kiss_anim.style.opacity = 0;
            kiss_anim.style.visibility = 'hidden';
          }, 1000);
        }, 10000);

        setTimeout(() => {
          player_1_dom.style.animationDuration = '100ms';
          player_1_dom.style.animationTimingFunction = 'linear';
          player_1_border.style.animationDuration = '100ms';
          player_1_border.style.animationTimingFunction = 'linear';
          player_1_circle.style.animationDuration = '100ms';
          player_1_circle.style.animationTimingFunction = 'linear';
          player_1_img.style.animationDuration = '100ms';
          player_1_img.style.animationTimingFunction = 'linear';

          player_2_dom.style.animationDuration = '100ms';
          player_2_dom.style.animationTimingFunction = 'linear';
          player_2_border.style.animationDuration = '100ms';
          player_2_border.style.animationTimingFunction = 'linear';
          player_2_circle.style.animationDuration = '100ms';
          player_2_circle.style.animationTimingFunction = 'linear';
          player_2_img.style.animationDuration = '100ms';
          player_2_img.style.animationTimingFunction = 'linear';
          //-----------------
          // const x_p1 = `${(progress * oldActiveLeft)}px`;
          // const y_p1 = `${(progress * oldActiveTop)}px`;
          // const x_p2 = `${(progress * activeLeft)}px`;
          // const y_p2 = `${(progress * activeTop)}px`;
          // ----------------
          // pl1_center.style.transform = `translate(${x_p1}px, ${y_p1}px)`;
          player_1_dom.style.left = `${400 - (progress * oldActiveLeft)}px`;
          player_1_dom.style.top = `${300 - (progress * oldActiveTop)}px`;
          // ------------------------
          player_1_dom.style.width = `${150 - (progress * 50)}px`;
          player_1_dom.style.height = `${150 - (progress * 50)}px`;

          player_1_border.style.width = `${150 - (progress * 50)}px`;
          player_1_border.style.height = `${150 - (progress * 50)}px`;

          player_1_circle.style.width = `${150 - (progress * 50)}px`;
          player_1_circle.style.height = `${150 - (progress * 50)}px`;

          player_1_img.style.width = `${150 - (progress * 50)}px`;
          player_1_img.style.height = `${150 - (progress * 50)}px`;
          // --------------
          // pl2_center.style.transform = `translate(${x_p2}px, ${y_p2}px)`;
          // --------------
          player_2_dom.style.left = `${200 - (progress * activeLeft)}px`;
          player_2_dom.style.top = `${300 - (progress * activeTop)}px`;
          // --------------
          player_2_dom.style.width = `${150 - (progress * 50)}px`;
          player_2_dom.style.height = `${150 - (progress * 50)}px`;

          player_2_border.style.width = `${150 - (progress * 50)}px`;
          player_2_border.style.height = `${150 - (progress * 50)}px`;

          player_2_circle.style.width = `${150 - (progress * 50)}px`;
          player_2_circle.style.height = `${150 - (progress * 50)}px`;

          player_2_img.style.width = `${150 - (progress * 50)}px`;
          player_2_img.style.height = `${150 - (progress * 50)}px`;
        }, 11900);

        setTimeout(() => {
          players_div.style.zIndex = 1;
          player_1_dom.style.zIndex = 1;
          player_2_dom.style.zIndex = 1;
          button.current.style.zIndex = 12;
        }, 13950)
      }
    });

    // button.classList.add('spin');
    button.current.classList.add('spin')
    setTimeout(() => {
      button.current.classList.remove('spin');
      newArray[active].scope += 1;
      newArray[oldActive].scope += 1;
      newArray[oldActive].active = false;
      newArray[active].active = true;
      setTimeout(() => {
        timer_bot.style.display = 'flex';
      }, 4000)
      setPlayers(newArray);
    }, duration + 5000);
    return false;
  }

  return (
    <div className="game">
      <input type="button" className="btn btn-primary mr-2" onClick={playSound}></input>
      {/* <div className="div"></div> */}
      {/* <input type="button" className="btn_stop btn-primary mr-2" onClick={stopSound}></input> */}
      <div className="timer_bottle" id="timer_bot">
        {count}
        <audio className="audio_kiss" src={audioKiss} type='audio' />
      </div>
      <img src={kiss} className='kiss' id="kiss_anim" alt="kiss" />
      <div className="button__wrapper button" id="bottle" ref={button} /* onClick={handleClick} */>
        <img alt="button bottle" className="bottle" src={bottle} />
        <audio className="audio_bottle" src={audioBottle} type='audio' />
      </div>
      <div className="div_relative" id="players_div">
        {players.map((item) => {
          const classPlayers = `item${item.active ? ' item--active' : ''}`;
          return (
            <>
              <div className={classPlayers} id={`player_${item.id}`} ref={player} key={item.id} style={{ left: item.left, top: item.top }}>
                <div className="border" id={`player_border_${item.id}`} key={item.id}>
                  <div className="circle" id={`player_circle_${item.id}`}>
                    <img className="img" id={`player_img_${item.id}`} key={item.id} src={item.img} alt="Nature" />
                  </div>
                </div>
                <div className="item__scope"><span className="heart">❤</span>{item.scope}</div>
                <div className="item__title">{item.name}</div>
              </div>
            </>
          );
        })}
      </div>
    </div>
  );
}

export default App;
