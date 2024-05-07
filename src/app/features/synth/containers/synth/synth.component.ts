import { Component } from '@angular/core';
import { getContext, Envelope, Oscillator, Destination, Transport } from 'tone';

@Component({
  selector: 'app-synth-generator',
  templateUrl: './synth.component.html',
  styleUrl: './synth.component.css'
})
export class SynthComponent {
  osc1_unison: number = 0;
  osc1_wave: number = 0;
  osc2_level: number = 50;
  osc2_wave: number = 0;
  frequency_filter: number = 9500;
  resonance: number = 5;
  attack: number = 0.1;
  decay: number = 0.2;
  sustain: number = 0.5;
  release: number = 0.3;
  chorus: number = 50;
  reverb: number = 50;
  delay: number = 50;
  intervalId: any;
  intervalId2: any;
  intervalLFO: any;
  lfo_rate: number = 5;
  lfo_depth: number = 15;
  amplitude: number = 30;
  frequency: number = 10;
  time: number = 0;
  svgElement: any; 
  svgElement2: any;
  svgLFO: any;
  waveform: any = 'sine';
  waveform2: any = 'sine';

  constructor() { }

  ngOnInit(): void {
    this.svgElement = document.getElementById('wavePath');
    this.updateWave1();
    this.svgElement2 = document.getElementById('wavePath2');
    this.updateWave2();
    this.svgLFO = document.getElementById('wavePathLFO');
    this.updateWaveLFO();
  }

  playNote(note: string): void {
    const audioContext = new AudioContext();
    const osc1 = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    const filterNode = audioContext.createBiquadFilter();
    const lfo = audioContext.createOscillator(); // Crear el LFO
    const lfoGain = audioContext.createGain(); // Nodo de ganancia para el LFO
    osc1.connect(filterNode); // Conectar el oscilador al filtro
    filterNode.connect(gainNode); // Conectar el filtro al nodo de ganancia
    gainNode.connect(audioContext.destination); 
    // Conectar el LFO al oscilador principal
    lfo.connect(lfoGain);
    lfoGain.connect(osc1.frequency); // Conectar el LFO a la frecuencia del oscilador principal

    // Resto del código...

    // Configurar el LFO
    lfo.frequency.value = this.lfo_rate; // Aumenta el rango de frecuencia del LFO
    lfo.type = 'sine'; // Experimenta con diferentes formas de onda
    lfo.start();

    lfoGain.gain.value = this.lfo_depth * 10;

    interface FrequencyMap {
      [note: string]: number;
    }
  
    const frequencies: FrequencyMap = {
      'C2': 65.41,
      'Db2': 69.30,
      'D2': 73.42,
      'Eb2': 77.78,
      'E2': 82.41,
      'F2': 87.31,
      'Gb2': 92.50,
      'G2': 98.00,
      'Ab2': 103.83,
      'A2': 110.00,
      'Bb2': 116.54,
      'B2': 123.47,
      'C3': 130.81,
      'Db3': 138.59,
      'D3': 146.83,
      'Eb3': 155.56,
      'E3': 164.81,
      'F3': 174.61,
      'Gb3': 185.00,
      'G3': 196.00,
      'Ab3': 207.65,
      'A3': 220.00,
      'Bb3': 233.08,
      'B3': 246.94,
      'C4': 261.63,
      'Db4': 277.18,
      'D4': 293.66,
      'Eb4': 311.13,
      'E4': 329.63,
      'F4': 349.23,
      'Gb4': 369.99,
      'G4': 392.00,
      'Ab4': 415.30,
      'A4': 440.00,
      'Bb4': 466.16,
      'B4': 493.88,
      'C5': 523.25,
      'Db5': 554.37,
      'D5': 587.33,
      'Eb5': 622.25,
      'E5': 659.26,
      'F5': 698.46,
      'Gb5': 739.99,
      'G5': 783.99,
      'Ab5': 830.61,
      'A5': 880.00,
      'Bb5': 932.33,
      'B5': 987.77,
      'C6': 1046.50
    };
    const frequency = frequencies[note];

    osc1.type = this.waveform;
    osc1.frequency.value = frequency;
    osc1.start();

    filterNode.type = 'lowpass'; // Tipo de filtro (puedes cambiarlo según necesites)
    filterNode.frequency.value = this.frequency_filter; // Frecuencia del filtro (ajusta según lo necesites)
    filterNode.Q.value = this.resonance; // Resonancia del filtro (ajusta según lo necesites)

    const attackTime = this.attack;
    const decayTime = this.decay;
    const sustainLevel = this.sustain;
    const releaseTime = this.release;

    const now = audioContext.currentTime;
    gainNode.gain.setValueAtTime(0, now);
    gainNode.gain.linearRampToValueAtTime(1, now + attackTime);
    gainNode.gain.linearRampToValueAtTime(sustainLevel, now + attackTime + decayTime);
    gainNode.gain.setValueAtTime(sustainLevel, now + attackTime + decayTime);
    gainNode.gain.linearRampToValueAtTime(0, now + attackTime + decayTime + releaseTime);

    osc1.stop(audioContext.currentTime + attackTime + decayTime + releaseTime);

  }

  changeWaveform1(value: number): void {
    if (value <= 33) {
      this.waveform = 'sine';
    } else if (value <= 66) {
      this.waveform = 'triangle';
    } else {
      this.waveform = 'square';
    }
    this.updateWave1();
  }

  calculateWaveY1(x: number): number {
    let y = 0;
    if (this.waveform === 'sine') {
      y = Math.sin(2 * Math.PI * this.frequency * (x / 600) + this.time) * this.amplitude + 35;
    } else if (this.waveform === 'triangle') {
      const period = 800 / this.frequency; // Periodo de la onda triangular
      const phase = this.time * (600 / period); // Fase de la onda triangular
      const normalizedX = (x + phase) % period; // Posición normalizada dentro del período
      const halfPeriod = period / 2; // Mitad del período
      if (normalizedX <= halfPeriod) {
        y = (normalizedX / halfPeriod) * this.amplitude * 2 + 5; // Doble amplitud para emparejar con otras formas de onda
      } else {
        y = ((period - normalizedX) / halfPeriod) * this.amplitude * 2 + 5; // Doble amplitud para emparejar con otras formas de onda
      }
    } else if (this.waveform === 'square') {
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
      this.waveform2 = 'sine';
    } else if (value <= 66) {
      this.waveform2 = 'triangle';
    } else {
      this.waveform2 = 'square';
    }
    this.updateWave2();
  }

  calculateWaveY2(x: number): number {
    let y = 0;
    if (this.waveform2 === 'sine') {
      y = Math.sin(2 * Math.PI * this.frequency * (x / 600) + this.time) * this.amplitude + 35;
    } else if (this.waveform2 === 'triangle') {
      const period = 800 / this.frequency; // Periodo de la onda triangular
      const phase = this.time * (600 / period); // Fase de la onda triangular
      const normalizedX = (x + phase) % period; // Posición normalizada dentro del período
      const halfPeriod = period / 2; // Mitad del período
      if (normalizedX <= halfPeriod) {
        y = (normalizedX / halfPeriod) * this.amplitude * 2 + 5; // Doble amplitud para emparejar con otras formas de onda
      } else {
        y = ((period - normalizedX) / halfPeriod) * this.amplitude * 2 + 5; // Doble amplitud para emparejar con otras formas de onda
      }
    } else if (this.waveform2 === 'square') {
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
