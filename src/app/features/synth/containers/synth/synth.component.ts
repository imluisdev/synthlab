import { Component } from '@angular/core';

@Component({
  selector: 'app-synth-generator',
  templateUrl: './synth.component.html',
  styleUrl: './synth.component.css'
})
export class SynthComponent {
  osc1_level: number = 50;
  osc1_pan: number = 50;
  osc2_level: number = 50;
  osc2_pan: number = 50;
  frequency: number = 50;
  resonance: number = 50;
  attack: number = 50;
  decay: number = 50;
  sustain: number = 50;
  release: number = 50;
  chorus: number = 50;
  reverb: number = 50;
  delay: number = 50;
}
