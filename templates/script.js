$(document).ready(function(){

	$('#upload').click(function(){
		var files = $("#files")[0].files;
		for (var i = 0; i < files.length; i++){
			alert(files[i].size);
			if(files[i].size > (10 * 1024 * 1024)){
				alert("Não é possivel fazer upload de arquivos maiores que 10 MB");	
				return;
			}
		    alert(files[i].name);
		    $.post(window.location.href + "/upload", function(resp){
				alert(resp);
			});
		}

		/*$.post(window.location.href + "/upload", function(resp){
			alert(resp);
		});*/	
	});	
});
