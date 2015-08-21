# Minimal Web Audio

A collection of easy examples for the Web Audio API http://webaudio.github.io/web-audio-api/

## The Audio Sources

[x] Minimal sinus oscillator: minimal.html

* Every audio node lives in an audio context, in the one it has been created by. 
* The audio context knows its destination, that is which speakers to send the audio data to.
* A freshly created oscillator produces a sine wave of 440 Hz. For another frequency, just set its 'frequency' property. (See, e.g., in the minimal PeriodicWave example.)
* A source has to be plugged into something, so you can hear it. Here we directly plug it into audioContext.destination.
* Sources have start and stop methods that do, well, exactly what you expect.
* ? What for is the detune property? (As I have frequency, this should be redundant.)
* ? The 'when' parameter of start and stop of the oscillator is marked as optional in the spec - but I had to provide it, otherwise it didn't work.
* ? Oscillator can create square, sawtooth, and triangle too. Test it!

[x] Minimal use of buffer - white noise: minimalNoise.html

* We take a buffer, and fill it with random numbers.
* Then we put the buffer into a buffer source, plug that into the destination, and are done.
* To get a noise of indefinite length, we make the buffer source loop.
* ? Is there a possibility to make it loop, say, trice?

[x] Minimal use of sound file: minimalUseSoundFile/liszt_minimal_filter.html

Notes: You need a webserver, otherwise the browser will get confused. See
minimalUseSoundFile/instructions.md

[ ] Minimal use of microphone

Quote from API: "Currently audio input is not specified in this document"

There are nevertheless extremely cool examples, like http://chromium.googlecode.com/svn/trunk/samples/audio/visualizer-live.html , and we will try to make a minimal example for it too. Be aware that this may be less common for other browsers.

[x] Minimal example for PeriodicWave

* An oscillator can be started with a more general wave for but providing it with a PeriodicWave object. This contains the fourier transform of the wave, given in two arrays containing the real and imaginary part of the fourier transform.
* If this was still to dense for you: Ignore the imaginary part, simply give it an all zero array (it just has to be of the same length as the real part), and see the real part as the overtone intensitiess of the instrument you want to model. I chose to provide only the odd overtones (the array starts with the zeroth element) to get an oboe like tone. For instruments, see e.g. here
https://courses.physics.illinois.edu/phys193/Student_Reports/Fall03/Tammy_Linne_Andy_Schurman_Ivy_Thomas/Tammy_Linne_Andy_Schurman_Ivy_Thomas_Phys199pom_Final_Report.pdf
* Note that the arrays have to be of type Float32Array.
* The periodic wave is simply set as property of the oscillator.



## The Audio Transformers

[x] Minimal example for Gain: minimalGain.html

* Staring from the oscillator example, we plug a gain node between oscillator and destination.
* The function 'play()' puts control events in the event queue of the gain node (stay at zero gain from now to 1 second later, then raise to 5 ending now + 2 secs, then go down to zero again ending now +3 secs.
* ? Do I get this event interpretation right?

[ ] Minimal example for Delay

[x] Minimal example for BiquadFilter: minimalUseSoundFile/liszt_minimal_filter.html

Note: see notes about minimal sound file.

[ ] Minimal example for Panning

[ ] Minimal example for convolution

## Misc

[ ] Minimal example for analyser (this thing can even FFT!), and visualisation.

[ ] Minimal example for AudioWorker (what is this?)

## Some Explanations

TODO