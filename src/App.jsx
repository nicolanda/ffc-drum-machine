import React, { useEffect, useState } from 'react'
import './App.css'
import { drumList } from './components/list'

function App () {
  // name of the drum pad
  const [name, setName] = useState('')
  // color of the drum pad
  const [color, setColor] = useState(null)
  // keyboard sound
  useEffect(() => {
    const keyboardSound = document.addEventListener('keydown', (e) => {
      const findKey = drumList.find((drumPad) => drumPad.name === e.key.toUpperCase())
      if (!findKey) return
      setColor(findKey.keyCode)
      playSound(findKey)
    })
    return () => {
      document.removeEventListener('keydown', keyboardSound)
    }
  }, [])
  // play sound on click
  const playSound = (e) => {
    const audio = document.getElementById(e.name)
    audio.play()
    setName(e.dumpName)
  }
  return (
    <div className="App">
      <div
      id='drum-machine'
      className='drum-machine'>
        <div
        className='drumTitle'>
          <h1>Drum machine</h1>
        </div>
        <div
        className='containerOne'>
          <div className='drum-container'>
              {drumList.map((drumPad) => {
                return (
                <div
                onClick={() => {
                  setColor(drumPad.keyCode)
                  playSound(drumPad)
                }}
                key={drumPad.id}
                id={drumPad.id}
                className={`drum-pad ${drumPad.keyCode === color && 'drum-pad-active'}`}>
                  <audio
                  id={drumPad.name}
                  src={drumPad.src}
                  className='clip'
                  />
                  {drumPad.name}
                </div>
                )
              })}
            </div>
            <div
            id='display'
            className='display'>
              <b>Code:</b><a target={'_blank'} href='google.com'>Github</a>
              <p>
                Instructions:
              </p>
              <p>
                Click or press the key on your keyboard to play the sound
              </p>
              <p>
                Sound played:
              </p>
              <span
              className='soundName'>{name}</span>
            </div>
          </div>

        </div>
      </div>
  )
}

export default App
