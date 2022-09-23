import gamer1 from './img/10_profile_pictures/face_1.png';
import gamer2 from './img/10_profile_pictures/face_2.png';
import gamer3 from './img/10_profile_pictures/face_3.png';
import gamer4 from './img/10_profile_pictures/face_4.png';
import gamer5 from './img/10_profile_pictures/face_5.png';
import gamer6 from './img/10_profile_pictures/face_6.png';
import gamer7 from './img/10_profile_pictures/face_7.png';
import gamer8 from './img/10_profile_pictures/face_8.png';
import gamer9 from './img/10_profile_pictures/face_9.png';
import gamer10 from './img/10_profile_pictures/face_10.png';

const picture_pllayer = [gamer1, gamer2, gamer3, gamer4, gamer5, gamer6, gamer7, gamer8, gamer9, gamer10];

const radians = (degrees) => {
  return degrees * (Math.PI/180);
}

export const getRandomInt = (max) => {
  return Math.floor(Math.random() * max);
}

export const getPlayers = (n) => {
  const array = [];
  const radius = 250;
  const step = 360 / n;
  for (let i = 0; i < n; i++) {
    const angle = step * i;
    array.push({
      id: i + 1,
      active: false,
      name: 'player_' + (i + 1),
      img: picture_pllayer[i],
      left: 300 + radius * Math.cos(radians(angle)),
      top: 300 + radius * Math.sin(radians(angle)),
      scope: 0,
      angle
    });
  }

  array[0].active = true;

  return array;
}

export const animate = ({timing, draw, duration}) => {

  let start = performance.now();

  requestAnimationFrame(function animate(time) {
    // timeFraction изменяется от 0 до 1
    let timeFraction = (time - start) / duration;
    if (timeFraction > 1) timeFraction = 1;

    // вычисление текущего состояния анимации
    let progress = timing(timeFraction);

    draw(progress); // отрисовать её

    if (timeFraction < 1) {
      requestAnimationFrame(animate);
    }

  });
}
