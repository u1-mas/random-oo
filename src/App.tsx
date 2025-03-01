import { ReactP5Wrapper, type Sketch } from "@p5-wrapper/react";
import "./App.css";
import { useState } from "react";

// biome-ignore lint/style/useNamingConvention: <explanation>
type OO = {
    x: number;
    y: number;
    lifetime: number;
    text: string;
    textSize: number;
    alpha: number;
};
const sketch: Sketch = (p5) => {
    let oos: OO[] = [];
    let text = "おお";
    let limit = 30;
    p5.updateWithProps = (props) => {
        text = props.text as string;
        limit = props.limit as number;
    };
    p5.setup = () => {
        p5.createCanvas(1200, 600);
    };
    p5.draw = () => {
        p5.background(255, 50);
        p5.fill(0);
        if (oos.length < limit) {
            oos.push({
                x: p5.random(p5.width),
                y: p5.random(p5.height),
                lifetime: p5.random(100),
                textSize: p5.random(10, 100),
                text,
                alpha: p5.map(p5.random(), 0, 1, 20, 100),
            });
        }

        for (const oo of oos) {
            p5.textSize(oo.textSize);
            p5.fill(0, oo.alpha);
            p5.text(oo.text, oo.x, oo.y);
            oo.lifetime--;
        }
        oos = oos.filter((oo) => oo.lifetime > 0);
    };
};

export default function App() {
    const [text, setText] = useState("おお");
    const [limit, setLimit] = useState(30);
    return (
        <>
            <input
                type="text"
                value={text}
                onChange={(e) => setText(e.currentTarget.value)}
                placeholder="おお"
            />
            <input
                type="number"
                value={limit}
                onChange={(e) =>
                    setLimit(Number.parseInt(e.currentTarget.value))
                }
            />
            <ReactP5Wrapper sketch={sketch} text={text} limit={limit} />
        </>
    );
}
