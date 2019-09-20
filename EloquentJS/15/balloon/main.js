document.body.onload = () => {
  const body = document.body;
  body.style = `
    width: 100vw;
    height: 100vh;
    text-align: center;
    margin: 0;
    line-height: 100vh;
    font-size: 20px;
    overflow-x: hidden;
    overflow-y: hidden;
  `;

  const emoji = document.createTextNode(`🎈`);

  body.appendChild(emoji);

  function balloon(event) {
    const fontSize = parseFloat(body.style.fontSize);

    if (event.key === `ArrowUp`) {
      body.style.fontSize = fontSize * 1.1 + `px`;
      event.preventDefault;
    } else if (event.key === `ArrowDown`) {
      body.style.fontSize = fontSize * 0.9 + `px`;
      event.preventDefault;
    }

    if (body.scrollHeight - 25 > innerHeight) {
      emoji.textContent = `💥`;
      body.style.fontSize = `${innerHeight * 0.75}px`;
      window.removeEventListener(`keydown`, balloon);
    }
  }

  window.addEventListener(`keydown`, balloon);
};
