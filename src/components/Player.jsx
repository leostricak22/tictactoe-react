import {useState} from "react";

export default function Player({initialName, symbol, isActive, onChangeName}) {
    const [isEditing, setIsEditing] = useState(false);
    const [playerName, setPlayerName] = useState(initialName);

    function handleButtonClick() {
        setIsEditing((editing) => !editing)

        if (isEditing)
            onChangeName(symbol, playerName);
    }

    return (
        <li className={isActive ? 'active' : undefined}>
            <span className="player">
                {
                    !isEditing ?
                        <span className="player-name">{playerName}</span>
                    :
                        <input className="player-name" type="text" value={playerName} onChange={(event) => setPlayerName(event.target.value)}  required />
                }
                <span className="player-symbol">{symbol}</span>
            </span>
            <button onClick={handleButtonClick}>{!isEditing ? "Edit" : "Save"}</button>
        </li>
    );
}