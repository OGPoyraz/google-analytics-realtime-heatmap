/**
 * Created by OGPoyraz on 22/07/16.
 */

import React from 'react';

class Header extends React.Component {

    logOut() {
        gapi.auth2.getAuthInstance().disconnect();
        location.reload();
    }

    render() {
        return (
            <nav id="main">
                <div className="item">
                    <h1 className="sitename">
                        Google Analytics <br/>
                        Realtime Heatmap
                    </h1>
                </div>
                <div className="right item">
                    <div id="view-selector">
                    </div>
                    <div id="auth-button">
                    </div>
                    <button id="logout" onClick={this.logOut} style={{display:'none'}}>
                        Logout
                    </button>
                    <div style={{marginLeft:'130px'}}>
                        <a href="https://github.com/OGPoyraz/ga-realtime-heatmap">
                            <img style={{position: 'absolute', top: '0', right: '0', border: '0'}}
                                                              src="https://camo.githubusercontent.com/52760788cde945287fbb584134c4cbc2bc36f904/68747470733a2f2f73332e616d617a6f6e6177732e636f6d2f6769746875622f726962626f6e732f666f726b6d655f72696768745f77686974655f6666666666662e706e67"
                                                              alt="Fork me on GitHub"
                                                              data-canonical-src="https://s3.amazonaws.com/github/ribbons/forkme_right_white_ffffff.png"/>
                        </a>
                    </div>
                </div>
            </nav>
        );
    }

}

export default Header;