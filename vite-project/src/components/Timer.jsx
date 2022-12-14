import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowsRotate } from "@fortawesome/free-solid-svg-icons";
import { faPlay } from "@fortawesome/free-solid-svg-icons";
import { faPause } from "@fortawesome/free-solid-svg-icons";
import { timerActions } from "../store/timerSlice";
import { useEffect } from "react";
import { sessionActions } from "../store/sessionSlice";
import { breakActions } from "../store/breakSlice";
import sound from "../assets/mixkit-alarm-digital-clock-beep-989.wav";
import "./Timer.css";

let  interval;


const Timer = () => {

    const timer = useSelector(state => state.timerReducer);
    const breakReducer = useSelector(state => state.breakReducer);
    const session = useSelector(state => state.sessionReducer);
    const minutes = Math.floor(timer.secondsLeft/60);
    const seconds = timer.secondsLeft % 60;

    const dispatch = useDispatch();
    window.onbeforeunload = () => {
        dispatch(timerActions.changeIsRunning(false));
        dispatch(sessionActions.handleIsEnabled(true));
        dispatch(breakActions.handleIsEnabled(true));
    }
    const handleStop = () =>{
        dispatch(timerActions.changeIsRunning(false));
        dispatch(sessionActions.handleIsEnabled(true));
        dispatch(breakActions.handleIsEnabled(true));
        clearInterval(interval);
        document.getElementById("sound").pause();
        document.getElementById("sound").currentTime = 0;
    }

    const handleStart = () => {
        dispatch(timerActions.changeIsRunning(true));
        dispatch(sessionActions.handleIsEnabled(false));
        dispatch(breakActions.handleIsEnabled(false));
        interval = setInterval(() => {
            dispatch(timerActions.reduceSecondsLeft());
       }, 1000);
    }

    const handleReset = () => {
        dispatch(timerActions.changeIsRunning(false));
        dispatch(timerActions.changeIsSession(true));
        dispatch(breakActions.handleReset());
        dispatch(sessionActions.handleReset());
        dispatch(timerActions.changeSecondsLeft(25 * 60));
        clearInterval(interval);
        document.getElementById("sound").pause();
        document.getElementById("sound").currentTime = 0;
    }


    useEffect(() => {
        document.getElementById("sound").ontimeupdate = () => {
            if(document.getElementById("sound").currentTime > 4) document.getElementById("sound").pause();
        }
        if(timer.secondsLeft === -1 && timer.isSession){
            dispatch(timerActions.changeIsSession(false));
            dispatch(timerActions.changeSecondsLeft(timer.timeoutSeconds));
            document.getElementById("sound").load();
            document.getElementById("sound").play();
        }
        else if(timer.secondsLeft === -1 && !timer.isSession){
            dispatch(timerActions.changeIsSession(true));
            dispatch(timerActions.changeSecondsLeft(timer.sessionSeconds));
            document.getElementById("sound").load();
            document.getElementById("sound").play();
        }
        else if(timer.secondsLeft < 60){
            document.getElementById("timer-label").classList.add("red-text");
            document.getElementById("time-left").classList.add("red-text");
        }
        else if(timer.secondsLeft >= 60){
            document.getElementById("timer-label").classList.remove("red-text");
            document.getElementById("time-left").classList.remove("red-text");
        }

        document.getElementById("minutes").textContent = minutes.toString().padStart(2, "0");
        document.getElementById("seconds").textContent = seconds.toString().padStart(2, "0");
    }, [timer.isSession, breakReducer.timeout, session.duration, timer.secondsLeft]);


    return (
    <div className="timer-div">
        <div className="time-div">
            {timer.isSession?(
                <div>
                    <h2 id="timer-label">Session</h2>
                    <p id="time-left"><span id="minutes">{minutes}</span>:<span id="seconds">{seconds}</span></p>
                </div>
            ): (
                <div>
                    <h2 id="timer-label">Break</h2>
                    <p id="time-left"><span id="minutes">{minutes}</span>:<span id="seconds">{seconds}</span></p>
                </div>
            )}
        </div>
        <div className="controllers">
            {timer.isRunning? <FontAwesomeIcon onClick={handleStop} id="start_stop" icon={faPause}/>:<FontAwesomeIcon onClick={handleStart} id="start_stop" icon={faPlay}/>}
            <FontAwesomeIcon id="reset" onClick={handleReset} icon={faArrowsRotate} />
        </div>
        <audio id="sound" src={sound}/>
    </div>
    );
}

export default Timer;
