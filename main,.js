const synth=window.speechSynthesis;
const textform=document.querySelector("form");
const textinput=document.querySelector("#text-input");
const voiceselect=document.querySelector("#voice-select");
const rate=document.querySelector("#rate");
const ratevalue=document.querySelector("#rate-value");
const pitch=document.querySelector("#pitch");
const pitchvalue=document.querySelector("#pitch-value");
let voices=[];
const getVoices=()=>{
    voices=synth.getVoices();
    voices.forEach(voice=>{
        const option=document.createElement('option');
        option.textContent=voice.name+'('+voice.lang+')';
        option.setAttribute('data-lang',voice.lang)
        option.setAttribute('data-name',voice.name)
        voiceselect.appendChild(option);
    })
}
getVoices();
if(synth.onvoiceschanged!==undefined){
    synth.onvoiceschanged=getVoices;
}
const speak=()=>{
    if(synth.speaking){
        console.error("already speaking");
        return;
    }
    if(textinput.value!=''){
        const speaktext=new SpeechSynthesisUtterance(textinput.value);
        speaktext.onend=e=>{
            console.log('done speaking');
        }
        speaktext.onerror=e=>{
            console.error("something went wrong");
        }
        const selectedvoice=voiceselect.selectedOptions[0].getAttribute('data-name');
        voices.forEach(voice=>{
            if(voice.name===selectedvoice){
                speaktext.voice=voice;
            }
        })
        speaktext.rate=rate.value;
        speaktext.pitch=pitch.value;
        synth.speak(speaktext);
    }
}
textform.addEventListener("submit",e=>{
    e.preventDefault();
    speak();
    textinput.blur();
})
rate.addEventListener("change",e=>{
    ratevalue.textContent=rate.value
})
pitch.addEventListener("change",e=>{
    pitchvalue.textContent=pitch.value
})
voiceselect.addEventListener("change",e=>{
    speak();
})