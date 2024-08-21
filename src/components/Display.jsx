const Display = ({ inputValue, setInputValue, resultValue, setResultValue }) => {
    return (
        <div className="display">
            <input 
                type="text" 
                name="displayResult" 
                id="displayResult" 
                value={resultValue} 
                readOnly={true}
            />
            <input type="text" 
                name="displayInput" 
                id="displayInput" 
                value={inputValue} 
                readOnly={true}
                onChange={(e) => setInputValue(e.target.value)}
            />
        </div>
    )
}

export default Display