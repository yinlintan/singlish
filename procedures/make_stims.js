const NUM_TRIALS = 20; // per block
const NUM_CLIPS = 40; // per block
const NUM_BLOCKS = 6;

const NUM_SPEAKERS = 10;
const NUM_CLIP_SPEAKER = 4;

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
    post_trial_gap: 500,
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
    stimulus: `    
    <center>
        <div class="visual">Clip 1<p>Press "S"</p></div>
        <div class="visual">Clip 2<p>Press "L"</p></div></center>
        <p style="text-align:center">Which clip sounded more Singlish? Please make your response within 2 seconds.</p>
    </div>`,
    trial_duration: 4000,
    response_ends_trial: true,
    post_trial_gap: 1500, // 1.5s between trials
    data: {},
}

// Create random test orders
// let practice_trial_order = generateTrialOrder(practice_id_list, talker_ids);
// do this for each block!!! how to keep track......

let all_trial_audio_objects = [];
let all_trial_response_objects = [];

for (let i = 0; i < NUM_BLOCKS; i++){
    let exp_trial_order = [];
    generateTrialOrder(exp_trial_order, stimuliData, NUM_CLIPS, NUM_TRIALS);
    // generate the trial objects
    let exp_audio_objects = [];
    let exp_response_objects = [];
    generateBlankTrials(NUM_TRIALS, exp_audio_objects, exp_response_objects, audio_temp, response_temp, audio_data, response_data);
    generateTrials(exp_trial_order, exp_audio_objects, exp_response_objects);
    
    all_trial_audio_objects.push(...exp_audio_objects);
    all_trial_response_objects.push(...exp_response_objects);
}

// Create preload array
let preload_exp = [];

// preload clips from one block (since its the same clips)
for (let i = 0; i < NUM_TRIALS; i++) {
    preload_exp.push(all_trial_audio_objects[i][0].stimulus);
    preload_exp.push(all_trial_audio_objects[i][1].stimulus);
}