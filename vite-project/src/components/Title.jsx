import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { faArrowDown, faArrowUp } from '@fortawesome/free-solid-svg-icons';
import { useDispatch, useSelector } from "react-redux";
import { breakActions } from "../store/breakSlice";
import { sessionActions } from "../store/sessionSlice";
import { timerActions } from "../store/timerSlice";
import "./Title.css";

const Title = () => {
    const breakReducer = useSelector(state => state.breakReducer);
    const sessionReducer =  useSelector(state => state.sessionReducer);
    let duration = sessionReducer.duration;
    let timeout = breakReducer.timeout;
    const isSession = useSelector(state => state.timerReducer.isSession);
    const dispatch = useDispatch();
    const handleIncreaseBreak = () =>{
        if(breakReducer.isEnabled){
            dispatch(breakActions.increase());
            if(timeout < 60){
                ++timeout;
                dispatch(timerActions.changeTimeoutSeconds(timeout*60));
                if(!isSession){
                    dispatch(timerActions.changeSecondsLeft(timeout * 60))
                }
            }
        }

    }
    const handleDecreaseBreak = () =>{
        if(breakReducer.isEnabled){
            dispatch(breakActions.decrease());
            if(timeout > 1){
                --timeout;
                dispatch(timerActions.changeTimeoutSeconds(timeout*60));
                if(!isSession){
                    dispatch(timerActions.changeSecondsLeft(timeout * 60))
                }
            }
        }

    }
    const handleIncreaseSession = () =>{
        if(sessionReducer.isEnabled){
            dispatch(sessionActions.increase());
            if(duration < 60){
                ++duration;
                dispatch(timerActions.changeSessionSeconds(duration * 60));
                if(isSession){
                    dispatch(timerActions.changeSecondsLeft(duration * 60))
                }
            }
        }

    }
    const handleDecreaseSession = () =>{
        if(sessionReducer.isEnabled){
            dispatch(sessionActions.decrease());
            if(duration > 1){
                --duration;
                dispatch(timerActions.changeSessionSeconds(duration * 60));
                if(isSession){
                    dispatch(timerActions.changeSecondsLeft(duration * 60))
                }
            }
        }
    }
    return (
    <div>
        <h1>Pomodoro Timer</h1>
        <div className="controllers">
            <div className="leftController">
                <label id="break-label">Break Length</label>
                <div className="leftDuration">
                    <FontAwesomeIcon id="break-decrement" className="controller" onClick={handleDecreaseBreak} icon={faArrowDown} />
                    <p id="break-length">{breakReducer.timeout}</p>
                    <FontAwesomeIcon id="break-increment" className="controller" onClick={handleIncreaseBreak} icon={faArrowUp} />
                </div>
            </div>
            <div className="rightController">
                <label id="session-label">Session Length</label>
                <div className="rightDuration">
                    <FontAwesomeIcon id="session-decrement" className="controller" onClick={handleDecreaseSession} icon={faArrowDown} />
                    <p id="session-length">{sessionReducer.duration}</p>
                    <FontAwesomeIcon id="session-increment" className="controller" onClick={handleIncreaseSession} icon={faArrowUp} />
                </div>
            </div>
        </div>
    </div> );
}

export default Title;
