import React, { useEffect, useState } from 'react'
import "./assets/styles/SortVisualizer.scss"

import { Element } from "../types/Types"
import {BubbleSort} from "./algorithms/BubbleSort"

export default function SortVisualizer() {


    
    function sleep(ms: number) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
    const [sorting, setSorting] = useState(false);
    const [speed, setSpeed] = useState(100);
    const [algorithm, setAlgorithm] = useState("bubble");
    const [elements, setElements] = useState<Element[]>([]);

    const swap = async (elements: Element[], first: number, second: number, condition: boolean) => {
        elements[first].color = "green";
        elements[second].color = "green";
        setElements(elements.slice());
        await sleep(speed)
        if (condition) {
            elements[first].color = "red";
            elements[second].color = "red";
            setElements(elements.slice());
            await sleep(speed)
            let temp = elements[first];
            elements[first] = elements[second];
            elements[second] = temp;
            setElements(elements.slice());
            setElements(elements)
        }
        elements[first].color = "pink";
        elements[second].color = "pink";
        await sleep(speed)
        setElements(elements.slice());

    }

    async function bubbleSort(elements: Element[]) {
        for (let index = 0; index < elements.length - 1; index++) {
            for (let index = 0; index < elements.length - 1; index++) {
                await swap(elements, index, index + 1, elements[index].value > elements[index + 1].value);
            }
        }
        return elements;
    }

    const handleChange = (algo: string) => {
        setAlgorithm(algo);
    }

    const reset = () => {
        const elements: Element[] = [];
        for (let index = 0; index < 10; index++) {
            elements.push(
                {
                    id: index,
                    value: Math.floor(Math.random() * 30),
                    color: "pink"
                }
            )
        }

        setElements(elements);
        setSorting(false);
    }
    const sort = async (algorithm: string) => {
        setSorting(true);

        let x = document.getElementById("algo");
        switch (algorithm) {
            case "bubble":
                await bubbleSort(elements.slice());
                break;
        }
        for (const element of elements) {
            element.color = "green"
        }

        setSorting(false);

    }

    useEffect(() => {//every time rendered
        reset()
    }, [])
    return (

        <div className='SortVisualizer'>
            <div className='header'>
                <button onClick={() => sort(algorithm)} disabled={sorting}>sort</button>
                <button onClick={() => reset()} disabled={sorting}>reset</button>
                <select name="sort-algo" id="algo" onChange={(e) => handleChange(e.target.value)} disabled={sorting}>
                    <option value="bubble">BubbleSort</option>
                    <option value="heap">HeapSort</option>
                    <option value="quick">QuickSort</option>
                </select>

            </div>
            <div className='bar-container'>
                {elements.map((e) => {
                    return (
                        <div className='bar' style={{ height: (e.value / elements.reduce(function (sum, element) { return sum + element.value; }, 0)) * 1000, background: e.color }}>
                            {e.value}
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

