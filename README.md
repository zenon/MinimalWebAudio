# Minimal Web Audio

A collection of easy examples for the Web Audio API http://webaudio.github.io/web-audio-api/#mixer-gain-structure


## The Sources

[x] Minimal sinus oscillator: minimal.html

* Every audio node lives in an audio context, in the one it has been created by. 
* The audio context knows its destination, that is which speakers to send the audio data to.
* A freshly created oscillator produces a sine wave of 440 Hz. For another frequency, just set its 'frequency' property.
* A source has to be plugged into something, so you can hear it. Here we directly plug it into context.destination.
* Sources have start and stop methods that do, well, exactly what you expect.
* ? What for is the detune property? (As I have frequency, this should be redundant.)
* ? The 'when' parameter of start and stop of the oscillator is marked as optional in the spec - but I had to provide it, otherwise it didn't work.

[x] Minimal use of buffer - white noise: minimalNoise.html

* We take a buffer, and fill it with random numbers.
* Then we put the buffer into a buffer source, plug that into the destination, and are done.
* To get a noise of indefinite length, we make the buffer source loop.
* ? Is there a possibility to make it loop, say, trice?

[ ] Minimal use of sound file

[ ] Minimal use of microphone

[ ] Minimal example for PeriodicWave (If I get this right, it is realy powerful for generating sounds)

## The Transformers

[ ] Minimal example for Gain

[ ] Minimal example for BiquadFilter

[ ] Minimal example for Panning

[ ] Minimal example for convolution

## Misc

[ ] Minimal example for analyser (this thing can even FFT!), and visualisation.

[ ] Minimal example for AudioWorker (what is this?)

## Some Explanations

TODO