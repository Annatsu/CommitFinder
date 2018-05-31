/**
 * Document Ready Event.
 */
document.addEventListener('DOMContentLoaded', event => {
    /**
     * Object to hold commit data.
     */
    const commit = {};

    /**
     * The user nickname.
     */
    const nick = document.getElementById('nick');
    
    /**
     * The selected repository.
     */
    const repo = document.getElementById('repo');

    /**
     * The selected commit by a number.
     */
    const commitNumber = document.getElementById('commitNumber');
    
    /**
     * The button to trigger 'onclick' event.
     */
    const submitBtn = document.getElementById('submit-btn');

    /**
     * @function trimValues
     * 
     * Trim all selected elements.
     * 
     * @param {HTMLElement} elements The selected elements to be trimmed.
     */
    const trimValues = (...elements) => {
        elements.forEach(element => {
            element.value.trim();
        });
    };
    
    /**
     * @function isValid
     * 
     * Check if the forms are all valid.
     * 
     * @returns {boolean} Returns if it's valid or not.
     */
    const isValid = () => {
        nick.value.length < 1 ||
        repo.value.length < 1 ||
        commitNumber.value.length < 1 ?
        false : true
    };

    submitBtn.onclick = () => {
        trimValues(nick, repo);
        if (isValid) {
            // Create a new xhttp request.
            const xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = function() {
                if(this.readyState == 4 && this.status == 200) {
                    const response = xhttp.responseText;
                    const data = JSON.parse(response);
    
                    data.reverse();

                    if (commitNumber.value > data.length){
                        alert(`Only exists ${data.length} commits on this repository.`);
                        return;
                    } else {
                        Object.assign(commit, data[commitNumber.value - 1]);
                        open(commit['html_url']);
                    }
                }
            }
            xhttp.open('GET', `https://api.github.com/repos/${nick.value}/${repo.value}/commits`, true);
            xhttp.send();
        } 
        else return;
    }
});
