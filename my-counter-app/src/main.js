import './style.css';


document.querySelector('#app').innerHTML = `
  <h1>カウンター</h1>
  <p id="count">0</p>
  <button id="btn1">増やす</button>
  <button id="btn2">減らす</button>
  <button id="btn3">リセット</button>
`;

const countEl = document.querySelector('#count');
const btn1 = document.querySelector('#btn1');
const btn2 = document.querySelector('#btn2');
const btn3 = document.querySelector('#btn3');
let count = 0;

btn1.addEventListener('click', () => {
  count += 1;
  countEl.textContent = count;
});

btn2.addEventListener('click', () => {
  count -= 1;
  countEl.textContent = count;

});
btn3.addEventListener('click', () => {
  count = 0;
  countEl.textContent = count;
});