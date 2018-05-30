document.addEventListener('DOMContentLoaded', event => {

    const commit = {};

	const nick = document.getElementById('nick');
	const repo = document.getElementById('repo');
	const commitNumber = document.getElementById('commitNumber');
    const submitBtn = document.getElementById('submit-btn');

    const trimValues = (...elements) => {
        elements.forEach(element => {
            element.value.trim();
        });
    };
    
    const isValid = () => {
        nick.value.length < 1 ||
        repo.value.length < 1 ||
        commitNumber.value.length < 1 ?
        false : true
    };

    submitBtn.onclick = () => {
        trimValues(nick, repo);
        if (isValid) {
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
                        // commit = data[commitNumber.value - 1];
                        // console.log(Object.assign(commit, data[commitNumber.value - 1]))
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
