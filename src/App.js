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
            <div className="app">
                <table cellPadding={0} cellSpacing={0}>
                    <tr className="contrast-row">
                        <th className="contrast-row-head contrast-row-head-title">
                            <strong>UT Contrast Matrix</strong>
                        </th>
                        {columns}
                    </tr>
                    {rows}
                </table>
            </div>
        );
    }
}

export default App;
