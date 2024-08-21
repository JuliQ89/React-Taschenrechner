import { RiDeleteBin5Fill, RiCloseFill, RiMenuFill } from "@remixicon/react";
import { useState, useEffect } from "react";
import ApiRequest from "./ApiRequest";

const History = ({ histories, setHistory, setInputValue, setResultValue, API_URL, fetchHistory }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [hideHistorySidebar, setHideHistorySidebar] = useState(false);

  useEffect(() => {
    (async () => fetchHistory())().then(() => {
      setTimeout(() => {
        setIsLoading(false);
      }, 1500);
    });
  }, []);

  // Clear Specific History Entry
  const handleHistorySpecificDelete = (id) => {
    setHistory(histories.filter((history) => history.id !== id));
    const deleteOptions = {
      method: 'DELETE'
    }
    // eslint-disable-next-line
    const apiResult = ApiRequest(`${API_URL}/histories/${id}`, deleteOptions );
  };

  // Clear Full History (Not Finisthed) ==
  const handleHistoryFullClear = () => {
    setHistory([]);
    const deleteOptions = {
      method: 'DELETE'
    }
    // eslint-disable-next-line
    for(let h = 0; h < histories.length; h++) {
      ApiRequest(`${API_URL}/histories/${histories[h].id}`, deleteOptions );
    };
  };

  // Append Specific History Entry Data to Calculator Display
  const appendHistoryDataToCalculator = (calculation, result) => {
    setInputValue(calculation);
    setResultValue(result);
  };

  return (
    <>
      {hideHistorySidebar && (<button onClick={() => {setHideHistorySidebar(!hideHistorySidebar)}}><RiMenuFill /></button>)}
      <div className={hideHistorySidebar ? "historyContainerActive historyContainer": "historyContainer"}>
        <div>
          <button onClick={() => {setHideHistorySidebar(!hideHistorySidebar)}}><RiCloseFill /></button>
          <h1>Verlauf</h1>
        </div>
        {isLoading ? 
          <span>is Loading...</span>
        : (
          histories.length > 0 ? (
          <div className="historyMainContainer">
            <ul className="historiesList">
              {histories.map(history => (
                <li key={ history.id }>
                  <span onClick={() => {appendHistoryDataToCalculator(history.calculation, history.result)}}>{ history.calculation } = { history.result }</span>
                  <button onClick={() => {handleHistorySpecificDelete(history.id)}}>
                    <RiDeleteBin5Fill />
                  </button>
                </li>
              ))}
            </ul>
            <button onClick={() => {handleHistoryFullClear()}}>Verlauf löschen</button>
          </div>
          ) : <span>Dein Verlauf ist leer</span>
        )}
      </div>
    </>
  )
}

export default History