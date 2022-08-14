import MathJax from "better-react-mathjax/MathJax";

/** Scan through the title string to $[content]$ with <MathJax>[content]</MathJax>  */
export default function ParseTex(dirtyStr: string): any {
    const res: JSX.Element[] = [];
    for (let i = 0; i < dirtyStr.length; i++) {
        if (dirtyStr[i] === '$') {
            let j = i + 1;
            while (dirtyStr[j] !== '$') j++;
            res.push(<strong><MathJax inline={true} >{dirtyStr.substring(i + 1, j)}</MathJax></strong>);
            i = j;
        } else {
            res.push(<span>{dirtyStr[i]}</span>);
        }
    }
    // return every item in res as one 
    return res.map((item, index) => {
        return <>{item}</>;
    }).reduce((prev, curr) => {
        return <>{prev}{curr}</>;
    }).props.children;
}