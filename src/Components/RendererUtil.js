
export const triggerKey = (key) => {
    if (document && document.hasFocus()){
        switch(key) {
            case 'ArrowUp':
                document.dispatchEvent(new KeyboardEvent('keydown', {'key': 'ArrowUp', 'keyCode': 38, 'bubbles': true}));
                break;
            case 'ArrowDown': 
                document.dispatchEvent(new KeyboardEvent('keydown', {'key': 'ArrowDown', 'keyCode': 40, 'bubbles': true}));
                break;
            case 'ArrowRight':
                document.dispatchEvent(new KeyboardEvent('keydown', {'key': 'ArrowRight', 'keyCode': 39, 'bubbles': true}));
                break;
            case 'ArrowLeft':
                document.dispatchEvent(new KeyboardEvent('keydown', {'key': 'ArrowLeft', 'keyCode': 37, 'bubbles': true})); 
                break;
            case 'Enter': 
                document.dispatchEvent(new KeyboardEvent('keydown', {'key': 'Enter', 'keyCode': 13, 'bubbles': true}));
                break;
        }
    }
} 