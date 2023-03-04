// NUM_TRIALS = 20; // per block
// NUM_CLIPS = 40; // per block
// NUM_BLOCKS = 6;

// NUM_SPEAKERS = 10;
// NUM_CLIP_SPEAKER = 4;

// Fisher-Yates shuffle
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        let temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    return array;
} 

function createArray(num) {
    let arr = [];
    for (let i = 0; i < num; i++) {
        arr.push(i);
    }
    return arr;
}

// generate random trial order for one block:
function generateTrialOrder(trial_ord, stimuliData, num_clips, num_trials) {
    clip_nums = createArray(num_clips);
    shuffle(clip_nums);
    for (let i = 0; i < num_trials; i++) {
        clip1 = clip_nums.pop();
        clip2 = clip_nums.pop();
        trial = [stimuliData[clip1], stimuliData[clip2]];
        trial_ord.push(trial);
    }
    return trial_ord; // lst of [id1, id2]
}

// create deep copy of audio templates to generate blank trials
function generateBlankTrials(num_trials, audio_array, response_array, audio_template, response_template, audio_data_template, response_data_template) {
    for (let i = 0; i < num_trials; i++) {
        // for audio; two clips
        trial_copy = []
        for (let i = 0; i < 2; i++) {
            let audio_copy = {};
            for (let key in audio_template) {
                audio_copy[key] = audio_template[key];
            }
            let audio_data_copy = {};
            for (let key in audio_data_template) {
                audio_data_copy[key] = audio_data_template[key];
            }
            audio_data_copy.Order = i + 1;
            audio_copy.data = audio_data_copy;
            trial_copy.push(audio_copy);
        }
        audio_array.push(trial_copy);
        
        // for response
        let response_copy = {};
        for (let key in response_template) {
            response_copy[key] = response_template[key];
        }
        let response_data_copy = {};
        for (let key in response_data_template) {
            response_data_copy[key] = response_data_template[key];
        }
        response_data_copy.Order = i + 1;
        response_copy.data = response_data_copy;
        response_array.push(response_copy);
    }
}

// create trials for audio and response trials that are both arrays of empty templates
function generateTrials(trial_ord, audio_trials, response_trials) {
    firstPrompt = ``; // visual stimuli for clip 1, tbd
    secondPrompt = ``; // visual stimuli for clip 2, tbd

    for (let i = 0; i < trial_ord.length; i++){
        let [firstClip, secondClip] = trial_ord[i]; 
        let [firstAudio, secondAudio] = audio_trials[i]; // blank template to fill
        let response = response_trials[i]; // tbd
        
        // stich together audio path for stimulus
        let firstAudioPath = 'audio/' + firstClip['Clip ID'] + firstClip;
        let secondAudioPath = 'audio/' + secondClip['Clip ID'] + secondClip;

        // update data into template
        firstAudio.stimulus = firstAudioPath;
        firstAudio.prompt = firstPrompt;
        firstAudio.data.ID = firstClip['Clip ID'];
        firstAudio.data.talker = firstClip['Speaker ID'];
        firstAudio.data.gender = firstClip['Gender'];
        firstAudio.data.order = 1;
        firstAudio.data.duration = firstClip['Duration (s)'];
        firstAudio.order.speech_rate = firstClip['Speech rate (words per s)'];
        firstAudio.order.transcript = firstClip['Transcription'];

        secondAudio.stimulus = secondAudioPath;
        secondAudio.prompt = secondPrompt;
        secondAudio.data.ID = secondClip['Clip ID'];
        secondAudio.data.talker = secondClip['Speaker ID'];
        secondAudio.data.gender = secondClip['Gender'];
        secondAudio.data.order = 2;
        secondAudio.data.duration = secondClip['Duration (s)'];
        secondAudio.order.speech_rate = secondClip['Speech rate (words per s)'];
        secondAudio.order.transcript = secondClip['Transcription'];
    }
}




