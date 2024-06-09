 

let currentImageIndex = 0;
let tries = 0;
let roundOver = false;

document.addEventListener("DOMContentLoaded", () => {
  showNextImage();
});

function showNextImage() {

  resetOptionButtonColours()
  roundOver = false;

  tries = 0;
  let options = []

  for(let i = 0; i < 6; i++)
  {
    let rand = Math.floor(Math.random() * hiraganaImages.length)
    if(!options.includes(rand))
    {
      options.push(rand);
    }
    else
    {
      i--;
    }
  }

  currentImageIndex = options[Math.floor(Math.random() * options.length)];
  const currentImage = hiraganaImages[currentImageIndex];
  document.getElementById("hiragana-image").src = currentImage.src;
  document.getElementById("option-1").textContent = hiraganaImages[options[0]].correct;
  document.getElementById("option-2").textContent = hiraganaImages[options[1]].correct;
  document.getElementById("option-3").textContent = hiraganaImages[options[2]].correct;
  document.getElementById("option-4").textContent = hiraganaImages[options[3]].correct;
  document.getElementById("option-5").textContent = hiraganaImages[options[4]].correct;
  document.getElementById("option-6").textContent = hiraganaImages[options[5]].correct;

  document.getElementById("result").textContent = "What character is this?";

}

function checkAnswer(option) {
  if(roundOver) return;

  const correctAnswer = hiraganaImages[currentImageIndex].correct;
  if (option === correctAnswer) {
    document.getElementById("result").textContent = "Correct!";
    roundOver = true;
    setTimeout(() => {
      showNextImage();
    }, 1000);
    
  } else {
    document.getElementById("result").textContent = "Try again!";
    if(tries >= 3)
      {
        showCorrectAnswer();
      };

    tries++;
  }
}

function showCorrectAnswer(){
  if(roundOver) return;
  document.querySelectorAll('#options button').forEach(button => {
    if(button.textContent === hiraganaImages[currentImageIndex].correct) {
      button.style.backgroundColor = "#c1f0c1";
    }});
  document.getElementById("result").textContent = "The answer is: " + hiraganaImages[currentImageIndex].correct;
}

document.querySelectorAll('#options button').forEach(button => {
  button.addEventListener('click', ({ target }) => {
    checkAnswer(target.textContent);
  });
});

document.getElementById('answerButton').addEventListener('click', () => {
  showCorrectAnswer();
});

function resetOptionButtonColours()
{
  document.querySelectorAll('#options button').forEach(button => {
    if(button.textContent === hiraganaImages[currentImageIndex].correct) {
      button.style.backgroundColor = "";
      return;
    }});
}