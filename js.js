const $overlay = document.getElementById('overlay')
const $shield = document.getElementById('shield')
const $btnStart = document.getElementById('btn-start')
const $quarter1 = document.getElementById('quarter1')
const $quarter2 = document.getElementById('quarter2')
const $quarter3 = document.getElementById('quarter3')
const $quarter4 = document.getElementById('quarter4')


class Game {
  constructor () {
    this.turnOn()
    this.getSequence()
    this.nextLevel()
    
  }
  turnOn () {
    this.activeQuarter = this.activeQuarter.bind(this)  
    $btnStart.classList.add('in-game')
    $overlay.classList.add('in-game')
    
    
    this.quarters = {
      $quarter1,
      $quarter2,
      $quarter3,
      $quarter4
    }
    

  }
  getSequence () {
    this.maxLevel = 10
    this.sequence = new Array(this.maxLevel).fill(0).map( () => Math.floor(Math.random() * 4) + 1 )
    this.level = 1
    this.subLevel = 0
    
  }
  nextLevel (){
    
    if ( this.level < this.maxLevel + 1) {
      this.startLevel()
      this.clickQuarter()
    } else {

    swal('Has ganado', ' Quieres volver a jugar', 'success' , {
      buttons: {
        si: 'si',
        no: 'no'
      }
    } )
    .then( (value) => {

      if (value == 'si') {

        setTimeout( () => {
          this.getSequence()
          this.nextLevel()
        }, 500)

      } else {
        swal('Chao =)')
        $shield.style.visibility = 'visible'
        $shield.style.background = 'black'
      }

    })





    } 

  }
  
  num2quarter(num){
    switch (num) {
            case 1:
              return '$quarter1'
            case 2:
              return '$quarter2'
            case 3:
              return '$quarter3'
            case 4:
              return '$quarter4'
    }
  }
  
  startLevel() {
    
    $shield.style.visibility = 'visible'
    for ( let i = 0; i < this.level; i++ ) {
      
      let quarter =  this.num2quarter(this.sequence[i])
      setTimeout( () => this.highQuarter(quarter) , i * 1000)
      if ( i == this.level - 1) {
        setTimeout( () => $shield.style.visibility = 'hidden' , i * 1000)
      } 
      
    }
  }
  highQuarter(quarter) { 
    this.quarters[quarter].classList.add('high')
    setTimeout( () => this.lowQuarter(quarter), 800)
  }
  lowQuarter(quarter) {
    this.quarters[quarter].classList.remove('high')
  }  
 
  clickQuarter() {
    this.quarters['$quarter1'].addEventListener('click', this.activeQuarter )
    this.quarters['$quarter2'].addEventListener('click', this.activeQuarter )
    this.quarters['$quarter3'].addEventListener('click', this.activeQuarter )
    this.quarters['$quarter4'].addEventListener('click', this.activeQuarter )
  }
  activeQuarter (ev) {
  const numSelected =  ev.target.dataset.quarter
  let _this = this
  
  if ( numSelected == this.sequence[this.subLevel] ) {
    console.log('todo ok')
    
    this.subLevel++

    if (this.subLevel == this.level) {
      this.subLevel = 0
      this.level++
      
      if ( this.level < this.maxLevel + 1) {
        swal('Buen trabajo', `vamos al nivel ${this.level}`, 'warning', {
          buttons: {
            ok: 'ok'
          }
        })
        .then( (value) => {
          setTimeout( () => this.nextLevel(_this), 300)
        })
      }

      
      
      
      }
  } else {
    swal(':( Sorry perdiste', ' Quieres volver a jugar', 'error' , {
      buttons: {
        si: 'si',
        no: 'no'
      }
    } )
    .then( (value) => {

      if (value == 'si') {

        setTimeout( () => {
          this.getSequence()
          this.nextLevel()
        }, 500)

      } else {
        swal('Chao =)')
        $shield.style.visibility = 'visible'
        $shield.style.background = 'black'
      }

    })

  }
  
  
  }

} 
 

function startGame() { 
  game = new Game()
}