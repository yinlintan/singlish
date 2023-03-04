let timeline = [];

var preload_trial = {
    type: jsPsychPreload,
    audio: preload_exp,
    max_load_time: 120000 // 2 minutes
};
timeline.push(preload_trial)

var instructions = {
    type: jsPsychHtmlButtonResponse,
    stimulus: `
        <div class="text" id="instruction">
            <img src="./images/stanford_logo.png" alt="stanford logo" width="180" height="80">
            <p>Welcome! In this experiment, you will be listening to pairs of audio clips.</p>
            <p>Each pair of audio clips will be played once in consecutive order. Your task is to decide which one of the clips sounds more Singlish.</p>
            <p>Please ensure that you use earphones or headphones for the duration of this experiment.</p>
            <p>This experiment should be completed on a desktop or laptop.</p>
            <p>The experiment will take approximately 40 minutes and you will compensated for your time.</p>
        </div>
      `,
    choices: ["Continue"],
    button_html: `<button class="continue-btn">%choice%</button>`,
};
timeline.push(instructions);    /* define welcome message trial */

var legalInfo = {
    type: jsPsychHtmlButtonResponse,
    stimulus: `
        <div class="text" id="irb">
            
                <h3>Nonmedical Human Participants Consent Form and Waiver of Documentation</h3>
                <p>
                    <strong>STUDY TITLE:</strong> Language Production and Comprehension Studies
                </p>
                <p><strong>PROTOCOL DIRECTOR:</strong> Meghan Sumner</p>
                <p>		
                    <strong>DESCRIPTION:</strong> We invite you to participate in a research study on language production and comprehension. In this experiment, you will complete a linguistic task online such as reading sentences or words, naming pictures or describing scenes, making up sentences of your own, or participating in a simple language game.
                    </p>
                <p>		
                    <strong>RISKS AND BENEFITS:</strong> There are no known risks, costs, or discomforts in this study and this judgment is based on a large body of experience with the same or similar procedures with people of similar ages, sex, origins, etc. We cannot and do not guarantee or promise that you will receive any benefits from this study. You will help us to understand how people recognize and perceive auditory stimuli.
                </p>	
                <p>	
                    <strong>TIME INVOLVEMENT:</strong> Your participation in this experiment will take less than one hour.
                </p>
                <p>	
                    <strong>PAYMENTS:</strong> You will be paid for your participation at the posted rate, consisted with online payment standards.
                    </p>
                <p>		
                    <strong>SUBJECT'S RIGHTS:</strong> If you have read this form and have decided to participate in this project, please understand your participation is voluntary and you have the right to withdraw your consent or discontinue participation at any time without penalty or loss of benefits to which you are otherwise entitled. You have the right to refuse to answer particular questions. Your individual privacy will be maintained in all published and written data resulting from the study.
                </p>
                <p>			
                    <strong>CONTACT INFORMATION:</strong><BR>
                    Questions, Concerns, or Complaints: If you have any questions, concerns or complaints about this research study, its procedures, risks and benefits, please contact Prof. Meghan Sumner at (650) 723-4284.
                </p>	
                <p>
                    Independent Contact: If you are not satisfied with how this study is being conducted, or if you have any concerns, complaints, or general questions about the research or your rights as a participant, please contact the Stanford Institutional Review Board (IRB) to speak to someone independent of the research team at (650)-723-2480 or toll free at 1-866-680-2906. You can also write to the Stanford IRB, Stanford University, Stanford, CA 94305-5401 or email irbnonmed@stanford.edu.
                </p>	
                <p>	
                    <strong>WAIVER OF DOCUMENTATION:</strong><BR>
                    If you agree to participate in this research, please continue to begin the study. 
                </p>	
                <p style="font-size: 80%">
                Approval Date: June, 30, 2021<BR>
                Expiration Date: Does Not Expire
                </p>
                
        </div>
      `,
    choices: ["Continue"],
    button_html: `<button class="continue-btn">%choice%</button>`,
};
timeline.push(legalInfo);

/*
var soundcheck = {
    type: jsPsychIatHtml,
    stimulus: `<center><audio controls src="./audio/JOHN_01.wav"></audio></center>`,
    stim_key_association: 'left',
    html_when_wrong: `
    <div id="trial" style="margin-top: -200px"><span style="color: red; font-size: 80px">X</span>
    <p><strong>Please try again! Make sure that you are wearing headphones or earphones.</strong></p></div>
    `,
    bottom_instructions: `
    <div id="trial">Listen carefully to the audio clip above and select the correct option to continue.</div>
    `,
    force_correct_key_press: true,
    display_feedback: true,
    left_category_key: 'S',
    right_category_key: 'L',
    left_category_label: ['HIGH'],
    right_category_label: ['LOW'],
    response_ends_trial: true
    };
timeline.push(soundcheck);
*/

/* practice trial instructions*/
var practice1Instructions = {
    type: jsPsychHtmlButtonResponse,
    stimulus: `
        <div class="text" id="trial">
        <p>You will now start two practice trials.</p>
        <p>On the next page, two audio clips will play one after another. Each audio clip will only be played once and you will not be able to replay them.</p>
        <p>Your task is to decide <strong>which clip sounds more Singlish</strong> as quickly as possible.</p>
        <p>Please place your left index finger on the "S" key and your right index finger on the "L" key.</p>
        <p>IMAGE OF HANDS ON KEYBOARD</p>
        <p>If the <strong>first clip</strong> sounds more Singlish, please press <strong>S</strong>.</p>
        <p>If the <strong>second clip</strong> sounds more Singlish, please press <strong>L</strong>.</p>
        <p>Please do your best to respond as quickly as possible.</p>
        </div>
        `,
    choices: ["Continue"],
    button_html: `<button class="continue-btn">%choice%</button>`,
};
timeline.push(practice1Instructions);

// push trial objects here

/* survey 1: demographic questions*/
var survey1 = {
    type: jsPsychSurvey,
    pages: [
        [
            {
                type: 'html',
                prompt: `<p style="color: #000000">Please answer the following questions:</p>`,
            },
            {
                type: 'multi-choice',
                prompt: "What is your citizenship status?",
                name: 'citizenship',
                options: ['Singaporean', 'Singapore PR', 'None of the above'],
                required: true
            },
            {
                type: 'multi-choice',
                prompt: "What is your gender?",
                name: 'gender',
                options: ['Male', 'Female', 'Non-binary', 'Other'],
                required: false,
            },
            {
                type: 'drop-down',
                prompt: "What year were you born?",
                name: 'age',
                options: ['2002', '2001', '2000', '1999', '1998', '1997', '1996', '1995', '1994', '1993', '1992', '1991', '1990', '1989', '1988', '1987', '1986', '1985', '1984', '1983', '1982', '1981', '1980', '1979', '1978', '1977', '1976', '1975', '1974', '1973', '1972', '1971', '1970', '1969', '1968', '1967', '1966', '1965', '1964', '1963', '1962', '1961', '1960', '1959', '1958', '1957', '1956', '1955', '1954', '1953', '1952', '1951', '1950', '1949', '1948', '1947', '1946', '1945', '1944', '1943', '1942', '1941', '1940', '1939', '1938', '1937', '1936', '1935', '1934', '1933'],
                required: true,
            },
            {
                type: 'multi-select',
                prompt: "What is your ethnicity? Please select all that apply.",
                name: 'ethnicity',
                options: ['Chinese', 'Malay', 'Indian', 'Other'],
                required: true,
            },
            {
                type: 'text',
                prompt: "What is your estimated total monthly household income (in Singapore dollars)?",
                name: 'income',
                textbox_columns: 8,
                input_type: "number",
                required: true,
            },
            {
                type: 'multi-choice',
                prompt: "What is your highest level of education?",
                name: 'education',
                options: ['No qualification', 'Primary school', 'Secondary school', 'Junior college/Polytechnic', 'Undergraduate degree', 'Postgraduate degree'],
                required: false,
            }
        ]
    ],
    button_label_finish: 'Continue',
};
timeline.push(survey1);

/* survey 2: language background questions */
var survey2 = {
    type: jsPsychSurvey,
    pages: [
        [
            {
                type: 'multi-choice',
                prompt: "Do you speak Singlish?",
                name: 'singlish',
                options: ['Yes', 'No'],
                required: true,
            },
            {
                type: 'text',
                prompt: "How many hours a day do you spend interacting in Singlish?",
                name: 'singlish_hours',
                input_type: "number",
                required: true,
            },
            {
                type: 'multi-choice',
                prompt: "placeholder question for friends",
                name: 'singlish_friends',
                options: ['Yes', 'No'],
                required: true,
            },
            {
                type: 'multi-choice',
                prompt: "placeholder question for family",
                name: 'singlish_family',
                options: ['Yes', 'No'],
                required: true,
            },
        ]
    ],
    button_label_finish: 'Continue',
};
timeline.push(survey2);

/* survey 3: open-ended singlish questions */
var survey3 = {
    type: jsPsychSurvey,
    pages: [
        [
            {
                type: 'text',
                prompt: "What are three words that come to mind when you think of Singlish?",
                name: 'singlish_description',
                required: true,
            },
            {
                type: 'text',
                prompt: "In your opinion, when and/or where is it acceptable to use Singlish? When and/or where is it not acceptable to use Singlish?",
                name: 'singlish_acceptability',
                required: true,
            },
            {
                type: 'text',
                prompt: "What is Singlish? Give a definition.",
                name: 'singlish_definition',
                required: true,
            },
            {
                type: 'multi-choice',
                prompt: "How important do you think Singlish is?",
                name: 'singlish_important',
                options: ['Very important', 'Important', 'Neutral', 'Not important', 'Not important at all'],
                required: true,
            }
        ]
    ],
    button_label_finish: 'Continue',
};
timeline.push(survey3);