let setMessageFunction = null; 

export function registerAuthMessageSetter(fn) {
    setMessageFunction = fn;
}

export function sendSessionExpiredMessage(message) {
    if (setMessageFunction) setMessageFunction(msg);
}
