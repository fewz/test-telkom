import React from 'react';
import './Repo.css';
import { faTerminal, faStar, faDownload } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const RepoComponent = (props) => {
    return (
        <div className="repo-item">
            <div className="header"><FontAwesomeIcon icon={faTerminal} />{props.title}</div>
            <div className="description">{props.description}</div>
            <div className="decoration">
                <div className="language"><div className="circle"></div><label>{props.language}</label></div>
                <div className="star"><FontAwesomeIcon icon={faStar} /> {props.star}</div>
                <div className="fork"><FontAwesomeIcon icon={faDownload} /> {props.download}</div>
            </div>
        </div >
    )
}

export default RepoComponent