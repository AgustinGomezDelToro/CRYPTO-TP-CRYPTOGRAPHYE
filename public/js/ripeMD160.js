

///HASHAGE MD5


$(document).ready(function(){
	//		
	
		$("#btnEncripta").on("click",function(){
			$.ajax({type: "GET",
				   url: "encriptar/encrip",
				   dataType: "json",
				   data: "frase="+$("#frase").val()+"&pass="+$("#pass").val(),
				   success: fnCallBack,
				   error:fnErrorCallBack
			});
		});
	
		$("#btnDecifra").on("click",function(){
			$.ajax({type: "GET",
				   url: "encriptar/decrip",
				   dataType: "json",
				   data: "resultado="+$("#resultado").text()+"&pass="+$("#pass").val(),
				   success: fnDecifraCallBack,
				   error:fnErrorCallBack
			});
		});
	
	 });
	
	
	function fnErrorCallBack(data){
		console.log(data.responseText);
	
		$("#resultadoOriginal").text(data.responseText);
	
	
	}
	
	function fnDecifraCallBack(data){
	
		$("#resultadoOriginal").text(data.respuesta);
	}
	
	function fnCallBack(data){
	
		$("#resultado").text(data.respuesta);
	}
	
	function calculateHash() {
		var input = document.getElementById("fileToUpload").files[0];
		var reader = new FileReader();
		reader.onload = function(event) {
		  var data = event.target.result;
            // hash RIPEMD160
            var hash = CryptoJS.RIPEMD160("Message");
		  document.getElementById("resultado2").innerHTML = "<p>" + hash.toString('') + "</p>";
		};
		reader.readAsBinaryString(input);
	  }