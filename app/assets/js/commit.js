$( document ).ready( function(){
	
	let nick = $( '#nick' );
	let repo = $( '#repo' );
	let commitNumber = $( '#commitNumber' );
	let submitBtn = $( '#submit-btn' );
			
	let commit = {};
			
	function isValid(){
		if ( nick.val().length < 1 || repo.val().length < 1 || commitNumber.val().length < 1 ) {
			window.alert( 'Nick, Repositório or commits number invalid.' );
			return false;
		} else return true;
	}			
	
	submitBtn.on({
		'click': function(){
			
			nick.val().trim();
			repo.val().trim();
			
			if ( isValid() ) {
				$.get( `https://api.github.com/repos/${nick.val()}/${repo.val()}/commits`, ( data ) => {
					data.reverse();
			
					if ( commitNumber.val() > data.length ){
						alert( `Only exists ${data.length} commits on this repository.` );
						return;
					}
					else {
						commit = data[ commitNumber.val() - 1 ];
						window.open( commit[ 'html_url' ] );
					}
				});
			} else return;
		}
	});
});