import React, { useState } from 'react';

const Flashcard = (props) => {
    const [isFlipped, setIsFlipped] = useState(false);

    const handleFlip = () => {
        setIsFlipped(!isFlipped);
    };

    return (
        <div id={props.id} className={`flashcard ${isFlipped ? 'flipped' : ''}`} onClick={handleFlip}>
            <div className="content">        
                {isFlipped ? <div className="back">{props.answer}</div> : <div className="front">{props.question}</div>}
            </div>
        </div>
    );
};

export default Flashcard;