import React, {Component} from 'react';
import './App.css';
import palette from "./data/Palette";
import {Cell} from "./components/Cell";

var contrast = require('get-contrast');

class App extends Component {
    render() {

        const columns = palette.map((color, index) => {
            return (
                <th className="contrast-col-head">
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
                <tr className="contrast-row">
                    <td className="contrast-row-head">
                        <div className="color-box" style={{backgroundColor: color.hex}}></div>
                        {color.name}
                        <em className="color-hex">{color.hex}</em>
                    </td>
                    {matchAgainst}
                </tr>
            );
        });

        return (
            <section>
                <div className="key">
                    <h1>UT Knoxvile Contrast Matrix</h1>
                    <h2>Following WCAG 2.1 AA</h2>
                    <ul>
                        <li><strong>All:</strong> Has contrast ratio of <em>4.5:1</em> or higher. Can be used in any situation within reason.</li>
                        <li><strong>Large:</strong> Has contrast ratio of <em>3:1</em> or higher and should be used on bold text 19px or larger OR on normal text 24px or larger. Abiding by WCAG 2.1, non-text elements (icons) without accompanying text-based descriptors can be used as well.</li>
                    </ul>
                </div>
                <div className="app">
                    <table cellPadding={0} cellSpacing={0}>
                        <tr className="contrast-row">
                            <th className="contrast-row-head contrast-row-head-title">
                                <strong>Matrix</strong>
                            </th>
                            {columns}
                        </tr>
                        {rows}
                    </table>
                    <div className="references"><a href="https://www.w3.org/WAI/standards-guidelines/wcag/" target="_blank">https://www.w3.org/WAI/standards-guidelines/wcag/</a></div>
                </div>
            </section>
        );
    }
}

export default App;
