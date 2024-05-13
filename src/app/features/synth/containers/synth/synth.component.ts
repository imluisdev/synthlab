import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-synth-generator',
  templateUrl: './synth.component.html',
  styleUrl: './synth.component.css'
})
export class SynthComponent implements OnInit{
  osc_unison: number = 0;
  osc_wave: number = 0;
  frequency_filter: number = 70;
  resonance: number = 1;
  attack: number = 0.1;
  decay: number = 0.2;
  sustain: number = 0.5;
  release: number = 0.3;
  intervalId: any;
  intervalLFO: any;
  lfo_rate: number = 0;
  lfo_depth: number = 15;
  amplitude: number = 30;
  frequency: number = 10;
  time: number = 0;
  svgElement: HTMLElement | null; 
  svgLFO: HTMLElement | null;
  waveform: OscillatorType = 'sine';
  audioContext: AudioContext = new AudioContext();

  buttonStates: { [key: string]: boolean } = {};

  isHovered: boolean = false;
  hoveredElement: string = '¿Que elementos componen un sintetizador?';
  hoveredElementDescription: string = 'Coloca el mouse sobre un elemento del sintetizador para saber más sobre el';

  constructor(private router: Router, private activatedRoute: ActivatedRoute) { }

  public currentRoute: string;

  ngOnInit(): void {
    this.svgElement = document.getElementById('wavePath');
    this.updateWave();
    this.svgLFO = document.getElementById('wavePathLFO');
    this.updateWaveLFO();
    this.requestMIDIAccess();
    this.detectRouteChanges();
  }

  public goToDashboard(){
    this.router.navigate(['/dashboard']);
  }

  public detectRouteChanges(){
    this.router.events.subscribe((resp: any) => {
      this.currentRoute = resp.routerEvent?.url;
    })
  }

  handleMouseOver(element: string, description: string): void {
    this.isHovered = true;
    this.hoveredElement = element;
    this.hoveredElementDescription = description;
  }

  handleMouseLeave(): void {
    this.isHovered = false;
    this.hoveredElement = '¿Que elementos componen un sintetizador?';
    this.hoveredElementDescription = 'Coloca el mouse sobre un elemento del sintetizador para saber más sobre el';
  }

  async requestMIDIAccess() {
    try {
      const midiAccess = await navigator.requestMIDIAccess();

      midiAccess.inputs.forEach((input) => {
        input.onmidimessage = this.onMIDIMessage.bind(this);
      });
    } catch (error) {
      console.error('Error al acceder a los dispositivos MIDI:', error);
    }
  }

  onMIDIMessage(event: any) {
    const [command, note] = event.data;

    if (command === 144) {
      switch (note) {
        case 48:
            this.playNote('C2');
            this.changeColor('C2', true);
            break;
        case 49:
            this.playNote('Db2');
            this.changeColor('Db2', true);
            break;
        case 50:
            this.playNote('D2');
            this.changeColor('D2', true);
            break;
        case 51:
            this.playNote('Eb2');
            this.changeColor('Eb2', true);
            break;
        case 52:
            this.playNote('E2');
            this.changeColor('E2', true);
            break;
        case 53:
            this.playNote('F2');
            this.changeColor('F2', true);
            break;
        case 54:
            this.playNote('Gb2');
            this.changeColor('Gb2', true);
            break;
        case 55:
            this.playNote('G2');
            this.changeColor('G2', true);
            break;
        case 56:
            this.playNote('Ab2');
            this.changeColor('Ab2', true);
            break;
        case 57:
            this.playNote('A2');
            this.changeColor('A2', true);
            break;
        case 58:
            this.playNote('Bb2');
            this.changeColor('Bb2', true);
            break;
        case 59:
            this.playNote('B2');
            this.changeColor('B2', true);
            break;
        case 60:
            this.playNote('C3');
            this.changeColor('C3', true);
            break;
        case 61:
            this.playNote('Db3');
            this.changeColor('Db3', true);
            break;
        case 62:
            this.playNote('D3');
            this.changeColor('D3', true);
            break;
        case 63:
            this.playNote('Eb3');
            this.changeColor('Eb3', true);
            break;
        case 64:
            this.playNote('E3');
            this.changeColor('E3', true);
            break;
        case 65:
            this.playNote('F3');
            this.changeColor('F3', true);
            break;
        case 66:
            this.playNote('Gb3');
            this.changeColor('Gb3', true);
            break;
        case 67:
            this.playNote('G3');
            this.changeColor('G3', true);
            break;
        case 68:
            this.playNote('Ab3');
            this.changeColor('Ab3', true);
            break;
        case 69:
            this.playNote('A3');
            this.changeColor('A3', true);
            break;
        case 70:
            this.playNote('Bb3');
            this.changeColor('Bb3', true);
            break;
        case 71:
            this.playNote('B3');
            this.changeColor('B3', true);
            break;
        case 72:
            this.playNote('C4');
            this.changeColor('C4', true);
            break;
        case 73:
            this.playNote('Db4');
            this.changeColor('Db4', true);
            break;
        case 74:
            this.playNote('D4');
            this.changeColor('D4', true);
            break;
        case 75:
            this.playNote('Eb4');
            this.changeColor('Eb4', true);
            break;
        case 76:
            this.playNote('E4');
            this.changeColor('E4', true);
            break;
        case 77:
            this.playNote('F4');
            this.changeColor('F4', true);
            break;
        case 78:
            this.playNote('Gb4');
            this.changeColor('Gb4', true);
            break;
        case 79:
            this.playNote('G4');
            this.changeColor('G4', true);
            break;
        case 80:
            this.playNote('Ab4');
            this.changeColor('Ab4', true);
            break;
        case 81:
            this.playNote('A4');
            this.changeColor('A4', true);
            break;
        case 82:
            this.playNote('Bb4');
            this.changeColor('Bb4', true);
            break;
        case 83:
            this.playNote('B4');
            this.changeColor('B4', true);
            break;
        case 84:
            this.playNote('C5');
            this.changeColor('C5', true);
            break;
        case 85:
            this.playNote('Db5');
            this.changeColor('Db5', true);
            break;
        case 86:
            this.playNote('D5');
            this.changeColor('D5', true);
            break;
        case 87:
            this.playNote('Eb5');
            this.changeColor('Eb5', true);
            break;
        case 88:
            this.playNote('E5');
            this.changeColor('E5', true);
            break;
        case 89:
            this.playNote('F5');
            this.changeColor('F5', true);
            break;
        case 90:
            this.playNote('Gb5');
            this.changeColor('Gb5', true);
            break;
        case 91:
            this.playNote('G5');
            this.changeColor('G5', true);
            break;
        case 92:
            this.playNote('Ab5');
            this.changeColor('Ab5', true);
            break;
        case 93:
            this.playNote('A5');
            this.changeColor('A5', true);
            break;
        case 94:
            this.playNote('Bb5');
            this.changeColor('Bb5', true);
            break;
        case 95:
            this.playNote('B5');
            this.changeColor('B5', true);
            break;
        case 96:
            this.playNote('C6');
            this.changeColor('C6', true);
            break;
        default:
            break;
      }
    }
    if (command === 128) {
      switch (note) {
        case 48:
            this.changeColor('C2', false);
            break;
        case 49:
            this.changeColor('Db2', false);
            break;
        case 50:
            this.changeColor('D2', false);
            break;
        case 51:
            this.changeColor('Eb2', false);
            break;
        case 52:
            this.changeColor('E2', false);
            break;
        case 53:
            this.changeColor('F2', false);
            break;
        case 54:
            this.changeColor('Gb2', false);
            break;
        case 55:
            this.changeColor('G2', false);
            break;
        case 56:
            this.changeColor('Ab2', false);
            break;
        case 57:
            this.changeColor('A2', false);
            break;
        case 58:
            this.changeColor('Bb2', false);
            break;
        case 59:
            this.changeColor('B2', false);
            break;
        case 60:
            this.changeColor('C3', false);
            break;
        case 61:
            this.changeColor('Db3', false);
            break;
        case 62:
            this.changeColor('D3', false);
            break;
        case 63:
            this.changeColor('Eb3', false);
            break;
        case 64:
            this.changeColor('E3', false);
            break;
        case 65:
            this.changeColor('F3', false);
            break;
        case 66:
            this.changeColor('Gb3', false);
            break;
        case 67:
            this.changeColor('G3', false);
            break;
        case 68:
            this.changeColor('Ab3', false);
            break;
        case 69:
            this.changeColor('A3', false);
            break;
        case 70:
            this.changeColor('Bb3', false);
            break;
        case 71:
            this.changeColor('B3', false);
            break;
        case 72:
            this.changeColor('C4', false);
            break;
        case 73:
            this.changeColor('Db4', false);
            break;
        case 74:
            this.changeColor('D4', false);
            break;
        case 75:
            this.changeColor('Eb4', false);
            break;
        case 76:
            this.changeColor('E4', false);
            break;
        case 77:
            this.changeColor('F4', false);
            break;
        case 78:
            this.changeColor('Gb4', false);
            break;
        case 79:
            this.changeColor('G4', false);
            break;
        case 80:
            this.changeColor('Ab4', false);
            break;
        case 81:
            this.changeColor('A4', false);
            break;
        case 82:
            this.changeColor('Bb4', false);
            break;
        case 83:
            this.changeColor('B4', false);
            break;
        case 84:
            this.changeColor('C5', false);
            break;
        case 85:
            this.changeColor('Db5', false);
            break;
        case 86:
            this.changeColor('D5', false);
            break;
        case 87:
            this.changeColor('Eb5', false);
            break;
        case 88:
            this.changeColor('E5', false);
            break;
        case 89:
            this.changeColor('F5', false);
            break;
        case 90:
            this.changeColor('Gb5', false);
            break;
        case 91:
            this.changeColor('G5', false);
            break;
        case 92:
            this.changeColor('Ab5', false);
            break;
        case 93:
            this.changeColor('A5', false);
            break;
        case 94:
            this.changeColor('Bb5', false);
            break;
        case 95:
            this.changeColor('B5', false);
            break;
        case 96:
            this.changeColor('C6', false);
            break;
        default:
            break;
      }
    }
  }

  initButtonStates() {
    const buttons = ['C2', 'Db2', 'D2', 'Eb2', 'E2', 'F2', 'Gb2', 'G2', 'Ab2', 'A2', 'Bb2', 'B2', 'C3', 'Db3', 'D3', 'Eb3', 'E3', 'F3', 'Gb3', 'G3', 'Ab3', 'A3', 'Bb3', 'B3', 'C4', 'Db4', 'D4', 'Eb4', 'E4', 'F4', 'Gb4', 'G4', 'Ab4', 'A4', 'Bb4', 'B4', 'C5', 'Db5', 'D5', 'Eb5', 'E5', 'F5', 'Gb5', 'G5', 'Ab5', 'A5', 'Bb5', 'B5', 'C6'];

    buttons.forEach(button => {
      this.buttonStates[button] = false;
    });
  }

  changeColor(button: string, pressed: boolean) {
    this.buttonStates[button] = pressed;
  }

  isPressed(button: string) {
    return this.buttonStates[button];
  }

  playNote(note: string): void {
    const oscBank = new Array(3);
    
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

    const createOscillators = (osc_unison: number) => {
      const frequency = frequencies[note];
      const osc = this.audioContext.createOscillator();
      const gainNode = this.audioContext.createGain();
      const filterNode = this.audioContext.createBiquadFilter();
      const lfo = this.audioContext.createOscillator();
      const lfoGain = this.audioContext.createGain();
      osc.connect(filterNode);
      filterNode.connect(gainNode);
      gainNode.connect(this.audioContext.destination); 

      lfo.connect(lfoGain);
      lfoGain.connect(osc.frequency);

      lfo.frequency.value = this.lfo_rate;
      lfo.type = 'sine';
      lfo.start();

      lfoGain.gain.value = this.lfo_depth * 10;

      osc.type = this.waveform;
      osc.frequency.value = frequency;
      osc.detune.value = osc_unison;
      osc.start();

      filterNode.type = 'lowpass';
      filterNode.frequency.value = this.frequency_filter;
      filterNode.Q.value = this.resonance;

      const now = this.audioContext.currentTime;
      gainNode.gain.setValueAtTime(0, now);
      gainNode.gain.linearRampToValueAtTime(1, now + this.attack);
      gainNode.gain.linearRampToValueAtTime(this.sustain, now + this.attack + this.decay);
      gainNode.gain.setValueAtTime(this.sustain, now + this.attack + this.decay);
      gainNode.gain.linearRampToValueAtTime(0, now + this.attack + this.decay + this.release);

      osc.stop(this.audioContext.currentTime + this.attack + this.decay + this.release);

      return osc;
    }

    oscBank[0] = createOscillators(0);
    oscBank[1] = createOscillators(this.osc_unison*50);
    oscBank[2] = createOscillators(-this.osc_unison*50);
  }

  changeWaveform(value: number): void {
    if (value <= 33) {
      this.waveform = 'sine';
    } else if (value <= 66) {
      this.waveform = 'triangle';
    } else {
      this.waveform = 'square';
    }
    this.updateWave();
  }

  calculateWaveY(x: number): number {
    let y = 0;
    if (this.waveform === 'sine') {
      y = Math.sin(2 * Math.PI * this.frequency * (x / 600) + this.time) * this.amplitude + 35;
    } else if (this.waveform === 'triangle') {
      const period = 800 / this.frequency;
      const phase = this.time * (600 / period);
      const normalizedX = (x + phase) % period;
      const halfPeriod = period / 2;
      if (normalizedX <= halfPeriod) {
        y = (normalizedX / halfPeriod) * this.amplitude * 2 + 5;
      } else {
        y = ((period - normalizedX) / halfPeriod) * this.amplitude * 2 + 5;
      }
    } else if (this.waveform === 'square') {
      y = Math.sign(Math.sin(2 * Math.PI * this.frequency * (x / 600) + this.time)) * this.amplitude * 1.1 + 35;
    }
    return y;
  }

  updateWave(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  
    this.intervalId = setInterval(() => {
      this.time += 0.05;
      let path = '';
      for (let x = 0; x <= 600; x += 5) {
        const y = this.calculateWaveY(x);
        path += `${x},${y} `;
      }
      if (this.svgElement) {
        this.svgElement.setAttribute('d', `M 0 100 ${path}`);
      } else {
        console.error('this.svgElement is null or undefined');
      }
    }, 10);
  }

  calculateWaveYLFO(x: number): number {
    let y = 0;
    y = Math.sin(2 * Math.PI * this.lfo_rate * (x / 600) + this.time) * this.lfo_depth + 35;
    return y;
  }

  updateWaveLFO(): void {
    if (this.intervalLFO) {
      clearInterval(this.intervalLFO);
    }
  
    this.intervalLFO = setInterval(() => {
      this.time += 0.05;
      let path = '';
      for (let x = 0; x <= 600; x += 5) {
        const y = this.calculateWaveYLFO(x);
        path += `${x},${y} `;
      }
      if (this.svgLFO) {
        this.svgLFO.setAttribute('d', `M 0 100 ${path}`);
      } else {
        console.error('this.svgElement is null or undefined');
      }
    }, 10);
  }
}
