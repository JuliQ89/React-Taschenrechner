const ApiRequest = async (url='', Options=null, errMsg=null) => { 
    try {
        const response = await fetch(url, Options);
        if (!response.ok) throw new Error(errMsg ? errMsg :"Fehler bei dem Austauch mit der Api");
    } catch (err) { 
        return err;
    };
};

export default ApiRequest;