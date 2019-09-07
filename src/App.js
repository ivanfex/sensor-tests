import React from 'react';
import { AbsoluteOrientationSensor, Gyroscope } from './Absolute'
import { RelativeOrientationSensor } from './Relative'
import qtor from 'quaternion-to-euler'

class App extends React.Component {
  constructor() {
    super()
    this.sensor = new AbsoluteOrientationSensor()
  }

  componentDidMount() {
      
  
  }

  initSensor = () => {
    const options = { frequency: 1 }
    console.log('options passed into AOS constructor:', JSON.stringify(options))
    this.sensor = new RelativeOrientationSensor(options)
    // sensor = relative ? new RelativeOrientationSensor(options) : new AbsoluteOrientationSensor(options)
    // 'nah, AOS' , relative is false therefore we're using the Absolute Orientation Sensor
    // sensor is NOT an array but an object that has onreading, onactivate and onerror keys
      this.sensor.onreading = () => {
        // console.log('within onreading:', 'sensor:', JSON.stringify(sensor))
        // quaternion IS an array of numbers corresponding to x, y, z, w
        // console.log('within onreading:', 'quaternion:', JSON.stringify(this.sensor.quaternion))
        console.log(qtor(this.sensor.quaternion))
      }

      // this.sensor.addEventListener('reading', console.log)
      this.sensor.onerror = (event) => {
        if (event.error.name == 'NotReadableError') {
          console.log("Sensor is not available.")
        }
      }
      this.sensor.start()
  }

  render() {
    this.initSensor()
    // console.log(this.sensor)
    return (
      <div>
        <h1>Hey there!</h1>
      </div>
    )
  }
}

export default App;
