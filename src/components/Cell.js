import React, {Component} from 'react';

export class Cell extends Component {

    render () {

        const {ratio, foreground, background} = this.props;

        let accessibilityClass = '';
        let accessibilityAllow = '';

        if (ratio >= 3) {
            accessibilityClass = accessibilityClass + ' aa-large-text';
            accessibilityAllow = 'Large';
        } else {
            accessibilityClass = accessibilityClass + ' not-accessible';
        }

        if (ratio >= 4.5) {
            accessibilityClass = accessibilityClass + ' aa-small-text';
            accessibilityAllow = 'Any';
        }

        if (ratio === 1) {

            return (
                <div className="contrast-cell">
                    -
                </div>
            )
        } else {
            return (
                <div className={`contrast-cell${accessibilityClass}`}>
                    {ratio} <span className="color-badge">{accessibilityAllow}</span>
                    <div className="hover">
                        <div className="color-box" style={{backgroundColor: foreground.hex}}><em>{foreground.name}</em></div>
                        <div className="color-box" style={{backgroundColor: background.hex}}><em>{background.name}</em></div>
                    </div>
                </div>
            )
        }
    }

}