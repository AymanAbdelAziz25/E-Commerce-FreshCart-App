import { createContext, useState } from "react";





export let CounterContext = createContext();

export function CounterContextProvider(props) {
    const [counter, setCounter] = useState(22);

    return <CounterContext.Provider value={{ counter, setCounter }}>
        {props.children}

    </CounterContext.Provider>
}
