document.addEventListener("DOMContentLoaded", () => {
    const userInput = document.getElementById("userInput");
    const countdownDiv = document.getElementById("countdown");
    const resultDiv = document.getElementById("result");
    const restartButton = document.getElementById("restart");
  
    let countdown;
    let timeout;
  
    function startCountdown() {
      return new Promise((resolve) => {
        let timeLeft = 5;
        countdownDiv.textContent = `Tiempo restante: ${timeLeft}`;
  
        countdown = setInterval(() => {
          timeLeft -= 1;
          countdownDiv.textContent = `Tiempo restante: ${timeLeft}`;
  
          if (timeLeft < 0) {
            clearInterval(countdown);
            resolve();
          }
        }, 1000);
      });
    }
  
    function evaluateInput() {
      const userValue = parseInt(userInput.value);
      if (userValue >= 1 && userValue <= 3) {
        resultDiv.textContent = "¡Has salvado el mundo!";
      } else {
        resultDiv.textContent = "¡La bomba ha estallado!";
      }
    }
  
    function resetGame() {
      clearInterval(countdown);
      clearTimeout(timeout);
      userInput.value = "";
      countdownDiv.textContent = "";
      resultDiv.textContent = "";
      startGame();
    }
  
    function startGame() {
      startCountdown().then(() => {
        evaluateInput();
      });
  
      timeout = setTimeout(() => {
        evaluateInput();
      }, 5000);
    }
  
    userInput.addEventListener("blur", () => {
      clearTimeout(timeout);
      evaluateInput();
    });
  
    restartButton.addEventListener("click", resetGame);
  
    startGame();
  });
  