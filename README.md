# Minimal Web Audio

A collection of easy examples for the Web Audio API http://webaudio.github.io/web-audio-api/#mixer-gain-structure


## The Sources

[x] Minimal sinus oscillator: minimal.html

* Every audio node lives in an audio context, in the one it has been created by. 
* The audio context knows its destination, that is which speakers to send the audio data to.
* A freshly created oscillator produces a sine wave of 440 Hz. For another frequency, just set its 'frequency' property. (See, e.g., in the minimal PeriodicWave example.)
* A source has to be plugged into something, so you can hear it. Here we directly plug it into context.destination.
* Sources have start and stop methods that do, well, exactly what you expect.
* ? What for is the detune property? (As I have frequency, this should be redundant.)
* ? The 'when' parameter of start and stop of the oscillator is marked as optional in the spec - but I had to provide it, otherwise it didn't work.
* ? Oscillator can create square, sawtooth, and triangle too. Test it!

[x] Minimal use of buffer - white noise: minimalNoise.html

* We take a buffer, and fill it with random numbers.
* Then we put the buffer into a buffer source, plug that into the destination, and are done.
* To get a noise of indefinite length, we make the buffer source loop.
* ? Is there a possibility to make it loop, say, trice?

[ ] Minimal use of sound file

[ ] Minimal use of microphone

[x] Minimal example for PeriodicWave

* An oscillator can be started with a more general wave for but providing it with a PeriodicWave object. This contains the fourier transform of the wave, given in two arrays containing the real and imaginary part of the fourier transform.
* If this was to dense for you: Give it an all zero imaginary part (just have to be of the same length as the real part), and see the real part as the overtone intensitiess of the instrument you want to model. I chose to provide only the odd overtones (the array starts with the zeroth element) to get an oboe like tone. For instruments, see e.g. here
https://courses.physics.illinois.edu/phys193/Student_Reports/Fall03/Tammy_Linne_Andy_Schurman_Ivy_Thomas/Tammy_Linne_Andy_Schurman_Ivy_Thomas_Phys199pom_Final_Report.pdf
* The periodic wave is simply set as property of the oscillator.



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