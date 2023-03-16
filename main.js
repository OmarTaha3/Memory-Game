let yourName;
document.querySelector('.control-button span').onclick =() => {
  yourName = prompt(`What's Your Name?`)

  if(yourName == '' || yourName == null){
    yourName = 'Guest'
    document.querySelector('.name span').innerHTML = yourName
  }else{
    document.querySelector('.name span').innerHTML = yourName
  }
  document.querySelector('.control-button').remove()
}

let duration = 1000;
let matchedBoxes = 0;
let memoryContainer = document.querySelector('.memory-container');
let boxes = Array.from(memoryContainer.children);
let orderRange = [...Array(boxes.length).keys()];
shuffle(orderRange)

boxes.forEach((box,index) =>{
  box.style.order = orderRange[index];
  box.addEventListener('click',()=>{
    flipBox(box)
    if(matchedBoxes === 10){
      let finishedOverlay = document.createElement('div')
      finishedOverlay.className = 'control-button'
      let span = document.createElement('span')
      span.innerHTML = `Congrats ${yourName}, You Have ${document.querySelector('.tries span').innerHTML} Wrong Tries, Play again`
      finishedOverlay.appendChild(span)
      document.body.appendChild(finishedOverlay)
      span.onclick = ()=>{
        location.reload()
      }
    }
  })

})

function shuffle(arr){
  let current = arr.length,
  temp,
  random;

  while(current > 0){
    random = Math.floor(Math.random()*current);
    current--;
    temp = arr[current];
    arr[current] = arr[random];
    arr[random] = temp
  }

  return arr;
}

function flipBox(box){
  box.classList.add('is-flipped')
  let allFlippedBoxes = boxes.filter(flippedBox => flippedBox.classList.contains('is-flipped'))
  if(allFlippedBoxes.length === 2){
    stopClicking();
    checkMatchedBoxes(allFlippedBoxes[0],allFlippedBoxes[1]);
  }
}

function stopClicking(){
  memoryContainer.classList.add('no-clicking')
  setTimeout(()=>{
    memoryContainer.classList.remove('no-clicking')
  },duration)
}

function checkMatchedBoxes(firstBox,secondBox){
  let tries = document.querySelector('.tries span')
  if(firstBox.dataset.tech === secondBox.dataset.tech){
    matchedBoxes++;

    firstBox.classList.remove('is-flipped')
    secondBox.classList.remove('is-flipped')

    firstBox.classList.add('has-match')
    secondBox.classList.add('has-match')

    document.getElementById('success').play();
  }else{
    tries.innerHTML = parseInt(tries.innerHTML) + 1;
    
    setTimeout(()=>{
      firstBox.classList.remove('is-flipped')
      secondBox.classList.remove('is-flipped')
    },duration)

    document.getElementById('fail').play();

  }
}

