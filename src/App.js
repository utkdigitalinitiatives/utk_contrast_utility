import React, {Component} from 'react';
import './App.css';
import palette from "./data/Palette";
import {Cell} from "./components/Cell";

var contrast = require('get-contrast');

class App extends Component {
    render() {

        const columns = palette.map((color, index) => {
            return (
                <th className="contrast-col-head contrast-cell">
                    <strong>{color.name}</strong>
                    <div className="color" style={{backgroundColor: color.hex}}></div>
                </th>
            );
        });

        const rows = palette.map((color, index) => {
            let matchAgainst = palette.map((color2, index) => {
                let ratio = Math.floor(contrast.ratio(color.hex, color2.hex) * 100) / 100;
                let score = contrast.score(color.hex, color2.hex);
                return (
                    <Cell foreground={color} background={color2} ratio={ratio}/>
                )
            });
            return (
                <div className="contrast-row">
                    <div className="contrast-row-head">
                        <div className="color-box" style={{backgroundColor: color.hex}}></div>
                        {color.name}
                        <span className="color-hex">{color.hex}</span>
                    </div>
                    {matchAgainst}
                </div>
            );
        });

        return (
            <section>
                <div className="key">
                    <h1>UT Knoxville Contrast Matrix</h1>
                    <p>Following <a href="https://www.w3.org/WAI/standards-guidelines/wcag/" target="_blank">WCAG 2.0 AA</a></p>
                    <ul>
                        <li><strong>Any:</strong> Has contrast ratio of <em>4.5:1</em> or higher. Can be used in any situation within reason.</li>
                        <li><strong>Large:</strong> Has contrast ratio of <em>3:1</em> or higher and should be used on bold text 19px or larger OR on normal text 24px or larger. Abiding by WCAG 2.1, non-text elements (icons) without accompanying text-based descriptors can be used as well.</li>
                    </ul>
                </div>
                <div className="app">
                    <div className="contrast-row">
                        <div className="contrast-row-head contrast-row-head-title">
                        </div>
                        {columns}
                    </div>
                    {rows}
                </div>
            </section>
        );
    }
}

export default App;
