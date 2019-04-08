$(document).ready(function(){

	$('.modal').modal();

	function ativarLoader(){
		$('#load').removeClass('hide');
	}

	function desativarLoader(){
		$('#load').addClass('hide');
	}

	function getBaseURL(){
		return window.location.origin+window.location.pathname
	}

	$('#upload').click(function(){

		var formData = new FormData();
		for(var i=0; i < $('#uploadFiles')[0].files.length; i++){
			var file = $('#uploadFiles').get(0).files[i];
			if(file.size > 10 * 1024 *1024)
				return M.toast({html: 'Nenhum arquivo pode ser maior que 10 MB.'});
			formData.append('file', file);
		}

		ativarLoader();

		$.ajax({
			url: getBaseURL()+'/upload',
			    //Ajax events
			    success: function (e) {
			    	var resp = JSON.parse(e);
					M.toast({html: resp['msg']});
					desativarLoader();
			       	obterArquivos();
			    },
			    error: function (e) {
					M.toast({html: 'Erro no upload.'});
					desativarLoader();
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
		ativarLoader();

		$.ajax({
			url: getBaseURL()+'/apagar',
				//Ajax events
				success: function (e) {
				    var resp = JSON.parse(e);
					M.toast({html: resp['msg']});
					desativarLoader();
				    obterArquivos();
				},
				error: function (e) {
					var resp = JSON.parse(e);
					desativarLoader();
					M.toast({html: resp['msg']});
				   	location.reload();
				},
			type: 'DELETE',
			//Options to tell jQuery not to process data or worry about content-type.
			cache: false,
			contentType: false,
			processData: false
		});
	});

	$(document).on("click","#apagar",function() {
		ativarLoader();
		file = $(this).attr('href').split('/')[1];
		console.log(getBaseURL()+'/apagar/'+file);
		$.ajax({
			url: getBaseURL()+'/apagar/'+file,
				//Ajax events
				success: function (e) {
				    var resp = JSON.parse(e);
					M.toast({html: resp['msg']});
					desativarLoader();
				    obterArquivos();
				},
				error: function (e) {
					var resp = JSON.parse(e);
					desativarLoader();
					M.toast({html: resp['msg']});
				   	location.reload();
				},
			type: 'DELETE',
			//Options to tell jQuery not to process data or worry about content-type.
			cache: false,
			contentType: false,
			processData: false
		});

		return false;
	});

	function obterArquivos(){
		$.ajax({
			url: getBaseURL()+'/obter',
			    //Ajax events
			    success: function (e) {
			      	var resp = JSON.parse(e);
			       	$('#arquivos').html('');
				   	for(var i in resp['arquivos'])
						$('#arquivos').append(`
							<li class="collection-item">
								<div class="collection-item">
									<a href="${resp['caminhos'][i]}">${resp['arquivos'][i]}</a>
									<a id="apagar" href="#remove/${resp['arquivos'][i]}" class="secondary-content"><i
											class="material-icons">delete</i></a>
								</div>
							</li>
						`);
					if(resp['arquivos'].length < 1){
						$('#arquivos').append(`
							<li class="collection-item">Nenhum arquivo aqui.</li>
						`);
					}
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