import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { faArrowDown, faArrowUp } from '@fortawesome/free-solid-svg-icons';
import { useDispatch, useSelector } from "react-redux";
import { breakActions } from "../store/breakSlice";
import { sessionActions } from "../store/sessionSlice";
import { timerActions } from "../store/timerSlice";

const Title = () => {
    const breakReducer = useSelector(state => state.breakReducer);
    const sessionReducer =  useSelector(state => state.sessionReducer);
    let duration = sessionReducer.duration;
    const dispatch = useDispatch();
    const handleIncreaseBreak = () =>{
        if(breakReducer.isEnabled){
            dispatch(breakActions.increase());

        }
    }
    const handleDecreaseBreak = () =>{
        if(breakReducer.isEnabled){
            dispatch(breakActions.decrease());
        }

    }
    const handleIncreaseSession = () =>{
        if(sessionReducer.isEnabled){
            dispatch(sessionActions.increase());
            if(duration < 60){
                ++duration;
                dispatch(timerActions.changeSecondsLeft(duration * 60));
            }
        }

    }
    const handleDecreaseSession = () =>{
        if(sessionReducer.isEnabled){
            dispatch(sessionActions.decrease());
            if(duration > 1){
                --duration;
                dispatch(timerActions.changeSecondsLeft(duration * 60));
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
                    <p>{breakReducer.timeout}</p>
                    <FontAwesomeIcon id="break-increment" className="controller" onClick={handleIncreaseBreak} icon={faArrowUp} />
                </div>

            </div>
            <div className="rightController">
                <label id="session-label">Session Length</label>
                <div className="rightDuration">
                    <FontAwesomeIcon id="session-decrement" className="controller" onClick={handleDecreaseSession} icon={faArrowDown} />
                    <p>{sessionReducer.duration}</p>
                    <FontAwesomeIcon id="session-increment" className="controller" onClick={handleIncreaseSession} icon={faArrowUp} />
                </div>


            </div>
        </div>
    </div> );
}

export default Title;
