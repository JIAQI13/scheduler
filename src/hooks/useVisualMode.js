import { useState } from "react";

export default function useVisualMode(initial) {
    const [mode, setMode] = useState(initial);
    const [history, setHistory] = useState([initial]);

    const transition = function (mode, replace) {
        if (replace) {
            // history.pop();
            history.pop();
            setHistory(prev => [...prev, mode]);
            return setMode(mode);
        } else {
            setHistory(prev => [...prev, mode]);
            return setMode(mode);
        }
    };

    const back = function () {
        const last = history.pop();
        if (last === "ERROR_DELETE" || last === "ERROR_SAVE") history.pop();
        return setMode(history[history.length - 1]);
    }

    return { mode, transition, back };
}