const LOGS_LENGTH = 3;

export default function Log({ turns }) {
    return <ol id="log">
        {
            turns.map((turn, index) =>
                <>
                    {
                        turns.length - index <= LOGS_LENGTH &&
                        <li key={`${turn.square.row}${turn.square.col}`}>
                            {`Placed an ${turn.player} in row ${turn.square.row}, col ${turn.square.col}.`}
                        </li>
                    }
                </>
            )
        }
    </ol>
}