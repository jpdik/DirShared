# coding: utf-8
import json
import os
import requests
import dropbox

from flask import Flask, Response
from flask import request

app = Flask(__name__)

TOKEN = 'clRIL4yey9UAAAAAAAAIKOVmPHWzIB0I3rcwhuOtXCft0D1v-WohFKGgN4DofZRA'

URL = 'http://127.0.0.1:5000/'

client = dropbox.client.DropboxClient(TOKEN) 

from jinja2 import Environment, PackageLoader
env = Environment(loader=PackageLoader(__name__, 'templates'))

@app.route('/', methods=['GET', 'POST', 'PUT', 'DELETE'])
def api():
  if request.method == 'GET':
    template = env.get_template('index.html')
    return template.render()  
  else:
    return json.dumps({'erro': 'Método inválido'})


@app.route('/<nome_diretorio>', methods=['GET'])
def exibirArquivo(nome_diretorio):
  if request.method == 'GET':
    try:
      folder_metadata = client.file_create_folder('/%s' % nome_diretorio)
      info = client.metadata('/%s' % nome_diretorio)
    except dropbox.rest.ErrorResponse as err:
      info = client.metadata('/%s' % nome_diretorio)
    template = env.get_template('arquivos.html')
    return template.render(arquivos=info['contents'],nome=nome_diretorio)

@app.route('/<nome_diretorio/obter', methods=['GET'])
def obterArquivos(nome_diretorio):
  if request.method == 'GET':
    try:
      folder_metadata = client.file_create_folder('/%s' % nome_diretorio)
      info = client.metadata('/%s' % nome_diretorio)
    except dropbox.rest.ErrorResponse as err:
      info = client.metadata('/%s' % nome_diretorio)
    
    arquivos = []
    caminhos = []
    for i in info['contents']:
      arquivos.append(i['path'].split('/')[-1]);
      caminhos.append(i['path']);
    return json.dumps({'arquivos' : arquivos, 'caminhos' : caminhos})

@app.route('/<nome_diretorio>/upload', methods=['GET', 'POST'])
def uploadArquivo(nome_diretorio):
  template = env.get_template('erro.html')
  carregado = env.get_template('uploaded.html')
  if 'file' not in request.files:
    return json.dumps({'msg': 'Nenhum arquivo encontrado'})
    #return template.render(erro='Nenhum arquivo encontrado', nome=nome_arquivo, url = URL + nome_arquivo)
  file = request.files['file']
  uploaded_files = request.files.getlist("file")
  # if user does not select file, browser also
  # submit a empty part without filename
  if file.filename == '':
    return json.dumps({'msg': 'Nenhum arquivo foi selecionado'})
    #return template.render(erro='Nenhum arquivo foi selecionado', nome=nome_arquivo, url = URL + nome_arquivo)
  
  for i in uploaded_files:
    if len(i.read()) > 10 * 1024 * 1024:
      return json.dumps({'msg': 'Nenhum arquivo pode ser maior que 10 MB'})
      #return template.render(erro='Nenhum arquivo pode ser maior que 10 MB', nome=nome_arquivo, url = URL + nome_arquivo)

  info = client.metadata('/%s' % nome_diretorio)
  if len(uploaded_files) + len(info['contents']) > 15:
    return json.dumps({'msg': 'Limite de 15 arquivos por dir.'})

  if file:
    for i in uploaded_files:
      response = client.put_file(nome_diretorio + "/" + i.filename, i)
    return json.dumps({'msg': str(len(uploaded_files))+' arquivos foram carregados.'})
    #return carregado.render(num_arquivos=len(uploaded_files), arquivos=uploaded_files, nome=nome_arquivo, url = URL + nome_arquivo)

@app.route('/<nome_diretorio>/apagar', methods=['DELETE'])
def apagarArquivos(nome_diretorio):
  apagado = env.get_template('apagado.html')
  info = client.metadata('/%s' % nome_diretorio)
  for i in info['contents']:
    client.file_delete(i['path'])
  return json.dumps({'msg': str(len(info['contents']))+' arquivos foram apagados.'}) 

@app.route('/<nome_diretorio>/<nome>', methods=['GET'])
def downloadArquivo(nome_diretorio, nome):
  if request.method == 'GET':
    try:
      f, metadata = client.get_file_and_metadata(nome_diretorio+"/"+nome)
      csv = f.read()
      return Response(
          csv,
          mimetype="text/csv",
          headers={"Content-disposition":
                   "attachment; filename="+nome})
    except dropbox.rest.ErrorResponse as err:
      template = env.get_template('erro.html')
      return template.render(erro='O arquivo foi movido ou removido.',nome=nome_diretorio)


if __name__ == "__main__":
   app.run(debug=True)
