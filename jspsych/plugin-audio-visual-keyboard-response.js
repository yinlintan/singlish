var jsPsychAudioVisualKeyboardResponse = (function (jspsych) {
    'use strict';

    const info = {
        name: "audio-visual-keyboard-response",
        parameters: {
            /** The audio files to be played. */
            stimulus_1: {
                type: jspsych.ParameterType.AUDIO,
                pretty_name: 'Stimulus 1',
                default: undefined,
                //description: 'The audio to be played.'
            },
            stimulus_2: {
                type: jspsych.ParameterType.AUDIO,
                pretty_name: 'Stimulus 2',
                default: undefined,
                //description: 'The audio to be played.'
            },
            /** Array containing the key(s) the subject is allowed to press to respond to the stimulus. */
            choices: {
                type: jspsych.ParameterType.KEYS,
                pretty_name: "Choices",
                default: "ALL_KEYS",
            },
            /** Any content here will be displayed below the stimulus. */
            prompt: {
                type: jspsych.ParameterType.HTML_STRING,
                pretty_name: "Prompt",
                default: null,
            },
            /** The HTML string to be displayed during each stimulus. */
            stimulus_1_html: {
                type: jspsych.ParameterType.HTML_STRING,
                pretty_name: 'Stimulus 1 HTML',
                default: '',
                //description: 'The HTML content to be displayed during stimulus 1.'
            },
            stimulus_2_html: {
                type: jspsych.ParameterType.HTML_STRING,
                pretty_name: 'Stimulus 2 HTML',
                default: '',
                //description: 'The HTML content to be displayed during stimulus 2.'
            },
            /** The maximum duration to wait for a response. */
            trial_duration: {
                type: jspsych.ParameterType.INT,
                pretty_name: "Trial duration",
                default: null,
            },
            /** If true, the trial will end when user makes a response. */
            response_ends_trial: {
                type: jspsych.ParameterType.BOOL,
                pretty_name: "Response ends trial",
                default: true,
            },
            /** If true, then the trial will end as soon as the audio file finishes playing. */
            trial_ends_after_audio: {
                type: jspsych.ParameterType.BOOL,
                pretty_name: "Trial ends after audio",
                default: false,
            },
            /** If true, then responses are allowed while the audio is playing. If false, then the audio must finish playing before a response is accepted. */
            response_allowed_while_playing: {
                type: jspsych.ParameterType.BOOL,
                pretty_name: "Response allowed while playing",
                default: true,
            },
        },
    };

    class AudioVisualKeyboardResponsePlugin {
        constructor(jsPsych) {
            this.jsPsych = jsPsych;
        }
        trial(display_element, trial, on_load) {
            // hold the .resolve() function from the Promise that ends the trial
            let trial_complete;
            // setup stimulus
            var context = this.jsPsych.pluginAPI.audioContext();
            // store response
            var response = {
                rt: null,
                key: null,
            };
 
            var startTime;
            
            const setupTrial = () => {
                // set up end event if trial needs it
                if (trial.trial_ends_after_audio) {
                    this.audio.addEventListener("ended", end_trial);
                }

                // start audio 1
                this.jsPsych.pluginAPI.getAudioBuffer(trial.stimulus_1).then((buffer1) => {
                    if (context !== null) {
                        this.audio = context.createBufferSource();
                        this.audio.buffer = buffer1;
                        var duration = buffer1.duration;
                        this.audio.connect(context.destination);
                        startTime = context.currentTime;
                        this.audio.start(startTime);
                    } else {
                        console.log("duration of first clip", buffer1.duration);
                        var duration = buffer1.duration;
                        console.log("duration variable", duration);
                        this.audio = buffer1;
                        console.log("audio duration var", this.audio.duration)
                        this.audio.currentTime = 0;
                        this.audio.play();
                    }

                    // show first prompt
                    if (trial.stimulus_1_html !== null) {
                        display_element.innerHTML = trial.stimulus_1_html;
                    }

                    // wait 500ms before showing second prompt
                    this.jsPsych.pluginAPI.setTimeout(() => {
                        // show second prompt
                        if (trial.stimulus_2_html !== null) {
                            display_element.innerHTML = trial.stimulus_2_html;
                        }
                        
                        // start audio 2
                        this.jsPsych.pluginAPI.getAudioBuffer(trial.stimulus_2).then((buffer2) => {
                            if (context !== null) {
                                this.audio2 = context.createBufferSource();
                                this.audio2.buffer = buffer2;
                                this.audio2.connect(context.destination);
                                console.log("audio2 start", startTime + this.audio.duration + 0.5)
                                this.audio2.start(startTime + this.audio.duration + 0.5);
                            } else {
                                this.audio2 = buffer2;
                                this.audio2.currentTime = 0;
                                this.audio2.play();
                            }

                            // start keyboard listener when trial starts or sound ends
                            if (trial.response_allowed_while_playing) {
                                setup_keyboard_listener();
                            } else if (!trial.trial_ends_after_audio) {
                                this.audio2.addEventListener("ended", setup_keyboard_listener);
                            }

                            // end trial if time limit is set
                            if (trial.trial_duration !== null) {
                                this.jsPsych.pluginAPI.setTimeout(() => {
                                    end_trial();
                                }, trial.trial_duration);
                            }

                            on_load();
                        }).catch((err) => {
                            console.error(`Failed to load audio file "${trial.stimulus_2}". Try checking the file path. We recommend using the preload plugin to load audio files.`);
                            console.error(err);
                        });
                    }, 500);
                }).catch((err) => {
                    console.error(`Failed to load audio file "${trial.stimulus_1}". Try checking the file path. We recommend using the preload plugin to load audio files.`);
                    console.error(err);
                });
            };
            setupTrial();
            
            // function to end trial when it is time
            const end_trial = () => {
                // kill any remaining setTimeout handlers
                this.jsPsych.pluginAPI.clearAllTimeouts();
                // stop the audio file if it is playing
                // remove end event listeners if they exist
                if (context !== null) {
                    this.audio.stop();
                    this.audio2.stop();
                }
                else {
                    this.audio.pause();
                    this.audio2.pause();
                }
                this.audio.removeEventListener("ended", end_trial);
                this.audio.removeEventListener("ended", setup_keyboard_listener);
                // kill keyboard listeners
                this.jsPsych.pluginAPI.cancelAllKeyboardResponses();
                // gather the data to store for the trial
                var trial_data = {
                    rt: response.rt,
                    stimulus: trial.stimulus,
                    response: response.key,
                };
                // clear the display
                display_element.innerHTML = "";
                // move on to the next trial
                this.jsPsych.finishTrial(trial_data);
                trial_complete();
            };
            // function to handle responses by the subject
            function after_response(info) {
                // only record the first response
                if (response.key == null) {
                    response = info;
                }
                if (trial.response_ends_trial) {
                    end_trial();
                }
            }
            const setup_keyboard_listener = () => {
                // start the response listener
                if (context !== null) {
                    this.jsPsych.pluginAPI.getKeyboardResponse({
                        callback_function: after_response,
                        valid_responses: trial.choices,
                        rt_method: "audio",
                        persist: false,
                        allow_held_key: false,
                        audio_context: context,
                        audio_context_start_time: startTime,
                    });
                }
                else {
                    this.jsPsych.pluginAPI.getKeyboardResponse({
                        callback_function: after_response,
                        valid_responses: trial.choices,
                        rt_method: "performance",
                        persist: false,
                        allow_held_key: false,
                    });
                }
            };
            return new Promise((resolve) => {
                trial_complete = resolve;
            });
        }
        simulate(trial, simulation_mode, simulation_options, load_callback) {
            if (simulation_mode == "data-only") {
                load_callback();
                this.simulate_data_only(trial, simulation_options);
            }
            if (simulation_mode == "visual") {
                this.simulate_visual(trial, simulation_options, load_callback);
            }
        }
        simulate_data_only(trial, simulation_options) {
            const data = this.create_simulation_data(trial, simulation_options);
            this.jsPsych.finishTrial(data);
        }
        simulate_visual(trial, simulation_options, load_callback) {
            const data = this.create_simulation_data(trial, simulation_options);
            const display_element = this.jsPsych.getDisplayElement();
            const respond = () => {
                if (data.rt !== null) {
                    this.jsPsych.pluginAPI.pressKey(data.response, data.rt);
                }
            };
            this.trial(display_element, trial, () => {
                load_callback();
                if (!trial.response_allowed_while_playing) {
                    this.audio.addEventListener("ended", respond);
                }
                else {
                    respond();
                }
            });
        }
        create_simulation_data(trial, simulation_options) {
            const default_data = {
                stimulus: trial.stimulus,
                rt: this.jsPsych.randomization.sampleExGaussian(500, 50, 1 / 150, true),
                response: this.jsPsych.pluginAPI.getValidKey(trial.choices),
            };
            const data = this.jsPsych.pluginAPI.mergeSimulationData(default_data, simulation_options);
            this.jsPsych.pluginAPI.ensureSimulationDataConsistency(trial, data);
            return data;
        }
    }
    AudioVisualKeyboardResponsePlugin.info = info;

    return AudioVisualKeyboardResponsePlugin;

})(jsPsychModule);