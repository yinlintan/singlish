import stimuliData from '../stimuli/convert_csv';

NUM_TRIALS = 20; // per block
NUM_CLIPS = 40; // per block
NUM_BLOCKS = 6;

NUM_SPEAKERS = 10;
NUM_CLIP_SPEAKER = 4;

let audio_data = {
    ID: 'UNKNOWN', 
    talker: 'UNKNOWN',
    gender: 'UNKNOWN',
    order: 0, // 1 or 2
    duration: 0,
    speech_rate: 0,
    transcript: 'UNKNOWN',
}

let audio_temp = {
    stimulus: 'UNKNOWN',
    type: jsPsychAudioKeyboardResponse,
    prompt: 'UNKNOWN',
    trial_ends_after_audio: true,
    post_trial_gap: 0,
    response_allowed_while_playing: false,
    choices: [],
    data: {}
}

// what to put here?
let response_data = {
}

let response_temp = {
    type: jsPsychHtmlKeyboardResponse,
    choices: ['s', 'l'],
    stimulus: 'UNKNOWN',
    trial_duration: 4000,
    response_ends_trial: true,
    post_trial_gap: 1000, // 1s between trials
    data: {},
}

// Create random test orders
// let practice_trial_order = generateTrialOrder(practice_id_list, talker_ids);
let exp_trial_order = [];
generateTrialOrder(exp_trial_order, stimuliData, NUM_CLIPS, NUM_TRIALS);

// generate the trial objects
let exp_audio_objects = [];
let exp_response_objects = [];

generateBlankTrials(NUM_TRIALS, exp_audio_objects, exp_response_objects, audio_temp, response_temp, audio_data, response_data);
generateTrials(exp_trial_ord, exp_audio_objects, exp_response_objects);

// Create preload array
let preload_exp = [];

for (let i = 0; i < exp_audio_objects.length; i++) {
    if (!(exp_audio_objects[i].data.Same_Talker && exp_audio_objects[i].data.Presentation == "OLD")) {
        preload_exp.push(exp_audio_objects[i].stimulus);
    }
}