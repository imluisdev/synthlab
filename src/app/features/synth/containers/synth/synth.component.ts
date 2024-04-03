import { Component } from '@angular/core';

@Component({
  selector: 'app-synth-generator',
  templateUrl: './synth.component.html',
  styleUrl: './synth.component.css'
})
export class SynthComponent {
  osc1_level: number = 50;
  osc1_wave: number = 0;
  osc2_level: number = 50;
  osc2_wave: number = 0;
  frequency_filter: number = 50;
  resonance: number = 50;
  attack: number = 50;
  decay: number = 50;
  sustain: number = 50;
  release: number = 50;
  chorus: number = 50;
  reverb: number = 50;
  delay: number = 50;
  intervalId: any;
  intervalId2: any;
  intervalLFO: any;
  lfo_rate: number = 10;
  lfo_depth: number = 30;
  amplitude: number = 30; // Amplitud de la onda sinusoidal
  frequency: number = 10; // Frecuencia de la onda sinusoidal en Hz
  time: number = 0; // Tiempo en segundos
  svgElement: any; 
  svgElement2: any;
  svgLFO: any;
  waveform: string = 'sinusoidal';
  waveform2: string = 'sinusoidal';

  constructor() { }

  ngOnInit(): void {
    this.svgElement = document.getElementById('wavePath');
    this.updateWave1();
    this.svgElement2 = document.getElementById('wavePath2');
    this.updateWave2();
    this.svgLFO = document.getElementById('wavePathLFO');
    this.updateWaveLFO();
  }

  changeWaveform1(value: number): void {
    if (value <= 33) {
      this.waveform = 'sinusoidal';
    } else if (value <= 66) {
      this.waveform = 'triangular';
    } else {
      this.waveform = 'cuadrada';
    }
    this.updateWave1();
  }

  calculateWaveY1(x: number): number {
    let y = 0;
    if (this.waveform === 'sinusoidal') {
      y = Math.sin(2 * Math.PI * this.frequency * (x / 600) + this.time) * this.amplitude + 35;
    } else if (this.waveform === 'triangular') {
      const period = 800 / this.frequency; // Periodo de la onda triangular
      const phase = this.time * (600 / period); // Fase de la onda triangular
      const normalizedX = (x + phase) % period; // Posición normalizada dentro del período
      const halfPeriod = period / 2; // Mitad del período
      if (normalizedX <= halfPeriod) {
        y = (normalizedX / halfPeriod) * this.amplitude * 2 + 5; // Doble amplitud para emparejar con otras formas de onda
      } else {
        y = ((period - normalizedX) / halfPeriod) * this.amplitude * 2 + 5; // Doble amplitud para emparejar con otras formas de onda
      }
    } else if (this.waveform === 'cuadrada') {
      y = Math.sign(Math.sin(2 * Math.PI * this.frequency * (x / 600) + this.time)) * this.amplitude * 1.1 + 35;
    }
    return y;
  }

  updateWave1(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId); // Detener el intervalo existente
    }
  
    this.intervalId = setInterval(() => {
      this.time += 0.05; // Incrementa el tiempo para avanzar en la onda sinusoidal
      let path = '';
      for (let x = 0; x <= 600; x += 5) {
        const y = this.calculateWaveY1(x);
        path += `${x},${y} `;
      }
      this.svgElement.setAttribute('d', `M 0 100 ${path}`);
    }, 10); // Intervalo de actualización en milisegundos
  }

  changeWaveform2(value: number): void {
    if (value <= 33) {
      this.waveform2 = 'sinusoidal';
    } else if (value <= 66) {
      this.waveform2 = 'triangular';
    } else {
      this.waveform2 = 'cuadrada';
    }
    this.updateWave2();
  }

  calculateWaveY2(x: number): number {
    let y = 0;
    if (this.waveform2 === 'sinusoidal') {
      y = Math.sin(2 * Math.PI * this.frequency * (x / 600) + this.time) * this.amplitude + 35;
    } else if (this.waveform2 === 'triangular') {
      const period = 800 / this.frequency; // Periodo de la onda triangular
      const phase = this.time * (600 / period); // Fase de la onda triangular
      const normalizedX = (x + phase) % period; // Posición normalizada dentro del período
      const halfPeriod = period / 2; // Mitad del período
      if (normalizedX <= halfPeriod) {
        y = (normalizedX / halfPeriod) * this.amplitude * 2 + 5; // Doble amplitud para emparejar con otras formas de onda
      } else {
        y = ((period - normalizedX) / halfPeriod) * this.amplitude * 2 + 5; // Doble amplitud para emparejar con otras formas de onda
      }
    } else if (this.waveform2 === 'cuadrada') {
      y = Math.sign(Math.sin(2 * Math.PI * this.frequency * (x / 600) + this.time)) * this.amplitude * 1.1 + 35;
    }
    return y;
  }

  updateWave2(): void {
    if (this.intervalId2) {
      clearInterval(this.intervalId2); // Detener el intervalo existente
    }
  
    this.intervalId2 = setInterval(() => {
      this.time += 0.05; // Incrementa el tiempo para avanzar en la onda sinusoidal
      let path = '';
      for (let x = 0; x <= 600; x += 5) {
        const y = this.calculateWaveY2(x);
        path += `${x},${y} `;
      }
      this.svgElement2.setAttribute('d', `M 0 100 ${path}`);
    }, 10); // Intervalo de actualización en milisegundos
  }

  calculateWaveYLFO(x: number): number {
    let y = 0;
    y = Math.sin(2 * Math.PI * this.lfo_rate * (x / 600) + this.time) * this.lfo_depth + 35;
    return y;
  }

  updateWaveLFO(): void {
    if (this.intervalLFO) {
      clearInterval(this.intervalLFO); // Detener el intervalo existente
    }
  
    this.intervalLFO = setInterval(() => {
      this.time += 0.05; // Incrementa el tiempo para avanzar en la onda sinusoidal
      let path = '';
      for (let x = 0; x <= 600; x += 5) {
        const y = this.calculateWaveYLFO(x);
        path += `${x},${y} `;
      }
      this.svgLFO.setAttribute('d', `M 0 100 ${path}`);
    }, 10); // Intervalo de actualización en milisegundos
  }
}
