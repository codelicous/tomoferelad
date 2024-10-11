import React from 'react';

type TurnManagerProps = ChildProps & {};
function TurnManager({className}: TurnManagerProps): React.JSX.Element {
    return <div className={className}>
        <div>Turn Manager</div>
    </div>;
}

export default TurnManager;