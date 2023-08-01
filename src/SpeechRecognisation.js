import SpeechRecognition,{ useSpeechRecognition } from "react-speech-recognition";
import {CopyToClipboard} from 'react-copy-to-clipboard';
import { useState } from "react";
import Mic from './mic.png';
import MicOff from './mic off.png';
import './SpeechRecognition.css'
import Siriwave from 'react-siriwave';
import languageArr from './Language Array';
import Clipboard from './Clipboard.png';
import Reset from './reset.png';




export default function Speech()
{
   
    let{
        transcript,
        listening,
        resetTranscript,
        browserSupportsSpeechRecognition
      }=useSpeechRecognition();

    

      let[languageState,setLanguageState]=useState('en-IN');

      if(!browserSupportsSpeechRecognition)
     {
           console.log("Your browser dont support speeech recoginition");    
     }

     
     function forStart()
     {
        SpeechRecognition.startListening({continous:true ,language:languageState});
     }

     function forReset()
     {
        resetTranscript();
        // setIsCopy(false)
     }
    return(
        <>
        <div className="parent">
            
            <div className="one">
            {/* <span>microphone: {listening ? 'ON':'OFF'}</span> */}

           <div className="forSelect"> 
            <span>Select Language : </span>
            <select name='language' className="select" value={languageState} onChange={(e)=>{setLanguageState(e.target.value)}}>
                {
                    languageArr.map((element,index)=>{
                return  <option key={index} value={element.code}  >{element.contry}</option>
                    })
                }
                
            </select>
            </div>

                    {(!listening) ?
                        <CopyToClipboard text={transcript}>
                            <img src={Clipboard} width='30px' height='35px' title="Copy To Clipboard" className="clipboard"/>
                        {/* <button onClick={() => { setIsCopy(!isCopy) }}> {(isCopy) ? 'copied' : 'copy'}  </button> */}
                        </CopyToClipboard>
                        : null
                    }
                   
           
            </div>

           < div className="transcript">
                {transcript}
            </div>


            <div className="three">
            {/* <button onClick={forStart}>Start</button> */}
            <div className="forCenter">
            <img src={Mic} alt="mic" width='30px' height='40px' onClick={forStart}/>
                    <span>Tap to Speak</span>
            </div>
            {/* <button onClick={SpeechRecognition.stopListening}>stop</button> */}

            <div className="forCenter">
            <img src={MicOff} alt="mic" width='30px' height='40px'  onClick={SpeechRecognition.stopListening}/>
                    <span>Tap to Stop</span>
            </div>

            <div className="forCenter">
            <img src={Reset} alt="reset" width='40px' height='40px'  onClick={forReset}/>
                    <span>Tap to Reset</span>
            </div>

            {/* <button onClick={forReset}>reset</button> */}
            </div>
           
           {/* <div className="four"> */}
            {(listening)? <Siriwave theme="ios9"/> : null}
           {/* </div> */}
            

        </div>      
        
        
        </>
    )
}