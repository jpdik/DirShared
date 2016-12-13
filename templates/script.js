$(document).ready(function(){
	$('#upload').click(function(){
		$('#info').html('<img src="http://www.cacp.org.br/wp-content/themes/portalcacp1.0/images/loading.gif"></img>');

		var formData = new FormData();
		for(var i=0; i < $('#uploadFiles')[0].files.length; i++){
			var file = $('#uploadFiles').get(0).files[i];
			if(file.size > 10 * 1024 *1024)
				return $('#info').html('Nenhum arquivo pode ser maior que 10 MB');
			formData.append('file', file);
		}

		$.ajax({
			url: window.location.href+'/upload',
			    //Ajax events
			    success: function (e) {
			    	var resp = JSON.parse(e);
			       	$('#info').html(resp['msg']);
			       	obterArquivos();
			    },
			    error: function (e) {
			    	$('#info').html('error ' + e.message);
			       	location.reload();
			    },
			// Form data
			data: formData,
			type: 'POST',
			//Options to tell jQuery not to process data or worry about content-type.
			cache: false,
			contentType: false,
			processData: false
	   });
	});

	$('#apagarTudo').click(function(){
		$('#info2').html('<img src="http://www.cacp.org.br/wp-content/themes/portalcacp1.0/images/loading.gif"></img>');

		$.ajax({
			url: window.location.href+'/apagar',
				//Ajax events
				success: function (e) {
				    var resp = JSON.parse(e);
				    $('#info2').html(resp['msg']);
				    	obterArquivos();
				},
				error: function (e) {
				  	var resp = JSON.parse(e);
				   	$('#info2').html('error ' + resp['msg']);
				   	location.reload();
				},
			type: 'DELETE',
			//Options to tell jQuery not to process data or worry about content-type.
			cache: false,
			contentType: false,
			processData: false
		});
	});

	function obterArquivos(){
		$.ajax({
			url: window.location.href+'/obter',
			    //Ajax events
			    success: function (e) {
			      	var resp = JSON.parse(e);
			       	$('#arquivos').html('');
				   	for(var i in resp['arquivos'])
				   		$('#arquivos').append('<li><a href=\"'+resp['caminhos'][i]+'\">'+resp['arquivos'][i]+'</a></li>');
				},
				error: function (e) {
				    alert('Ocorreu um erro ao carregar os arquivos. A pagina será recarregada.');
				    location.reload();
				},
			type: 'GET',
			//Options to tell jQuery not to process data or worry about content-type.
			cache: false,
			contentType: false,
			processData: false
		});	
	}
});