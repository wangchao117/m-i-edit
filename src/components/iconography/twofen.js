/**
 * An autogenerated component that renders the COS iconograpy in SVG.
 *
 * Generated with: https://gist.github.com/crm416/3c7abc88e520eaed72347af240b32590.
 */
const React = require('react');

class Twofen extends React.Component {
    static propTypes = {
        color: React.PropTypes.string.isRequired,
    };

    render() {
        return (
            <svg width="48" height="48" viewBox="0 0 48 48">
               <rect x="-0.5" y="-0.5" display="none" opacity="0.2" width="48" height="48"/>
                <rect x="13.5" y="13.5" display="none" opacity="0.2" width="20" height="20"/>
                <rect x="7.5" y="7.5" display="none" opacity="0.2" width="32" height="32"/>
                <g>
                    <path d="M28,18.612H14.8v13.2H28V18.612L28,18.612z M16,30.612v-10.8h10.8v10.8H16L16,30.612z"/>
                </g>
                {/* <circle display="none" fill="none" stroke="#000000" stroke-miterlimit="10" cx="30.992" cy="17.48" r="2"/> */}
                <g>
                    <path d="M29.436,19.358l0.937-3.075c0.138-0.427,0.294-0.709,0.469-0.845c0.174-0.136,0.387-0.204,0.639-0.204
                        c0.162,0,0.288,0.029,0.377,0.088c0.089,0.059,0.134,0.141,0.134,0.248c0,0.069-0.08,0.262-0.242,0.576l-1.644,3.131
                        c-0.099,0.192-0.231,0.288-0.397,0.288C29.486,19.567,29.395,19.497,29.436,19.358z"/>
                </g>
                <g>
                    <path d="M31.444,19.358l0.937-3.075c0.138-0.427,0.294-0.709,0.469-0.845c0.174-0.136,0.387-0.204,0.639-0.204
                        c0.162,0,0.288,0.029,0.377,0.088S34,15.464,34,15.571c0,0.069-0.08,0.262-0.242,0.576l-1.644,3.131
                        c-0.099,0.192-0.231,0.288-0.397,0.288C31.494,19.567,31.404,19.497,31.444,19.358z"/>
                </g>
			</svg>
        )
    }
}

module.exports = Twofen;
