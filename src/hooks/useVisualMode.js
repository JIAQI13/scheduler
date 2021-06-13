import { useState } from "react";

export default function useVisualMode(initial) {
    const [mode, setMode] = useState(initial);
    const [history, setHistory] = useState([initial]);

    const transition = function (mode, replace) {
        if (replace) {
            history.pop();
            setHistory(() => [...history, mode]);
            return setMode(mode);
        } else {
            setHistory(prev => [...prev, mode]);
            return setMode(mode);
        }
    };
    const back = function () {
        history.pop();
        return setMode(history[history.length - 1]);
    }
    return { mode, transition, back };
}