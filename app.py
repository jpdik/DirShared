# coding: utf-8

import os
if os.path.isfile('.env'):
  import settings

import json
import sys
sys.stdout = open(sys.stdout.fileno(), mode='w', encoding='utf8', buffering=1)
import requests
import dropbox
import logging

from flask import Flask, Response, render_template, url_for
from flask import request

app = Flask(__name__)

PATH_DOWNLOAD = os.getenv('DIR_DOWNLOAD')

NOT_ALLOWED_EXTENSIONS = set(['mp3', 'wma', 'wav', 'm4a', 'mov', 'avi', 'mpg', 'mpeg', 'ogg'])

client = dropbox.Dropbox(os.getenv('TOKEN')) 

@app.context_processor
def override_url_for():
    return dict(url_for=dated_url_for)

def dated_url_for(endpoint, **values):
    if endpoint == 'static':
        filename = values.get('filename', None)
        if filename:
            file_path = os.path.join(app.root_path,
                                     endpoint, filename)
            values['q'] = int(os.stat(file_path).st_mtime)
    return url_for(endpoint, **values)

def get_size(fobj):
    if fobj.content_length:
        return fobj.content_length

    try:
        pos = fobj.tell()
        fobj.seek(0, 2)  #seek to end
        size = fobj.tell()
        fobj.seek(pos)  # back to original position
        return size
    except (AttributeError, IOError):
        pass

    # in-memory file object that doesn't support seeking or tell
    return 0  #assume small enough

def arquivo_negado(filename):
    return '.' in filename and \
           filename.rsplit('.', 1)[1] in NOT_ALLOWED_EXTENSIONS

@app.route('/', methods=['GET', 'POST', 'PUT', 'DELETE'])
def api():
  if request.method == 'GET':
    return render_template('index.html')  
  else:
    return json.dumps({'erro': 'Método inválido'})


@app.route('/<nome_diretorio>', methods=['GET'])
def exibirArquivo(nome_diretorio):
  if request.method == 'GET':
    if nome_diretorio.find('.') != -1:
      return render_template('erro.html', erro='O diretorio nao pode conter ponto.', nome=nome_diretorio)  
    else:
      try:
        client.files_create_folder('/%s' % nome_diretorio)
        info = client.files_list_folder('/%s' % nome_diretorio).entries
      except Exception:
        info = client.files_list_folder('/%s' % nome_diretorio).entries
    
      return render_template('arquivos.html', arquivos=info, nome=nome_diretorio)

@app.route('/<nome_diretorio>/obter', methods=['GET'])
def obterArquivos(nome_diretorio):
  if request.method == 'GET':
    try:
      client.files_create_folder('/%s' % nome_diretorio)
      info = client.files_list_folder('/%s' % nome_diretorio)
    except Exception:
      info = client.files_list_folder('/%s' % nome_diretorio)
    
    arquivos = []
    caminhos = []
    for i in info.entries:
      arquivos.append(i.name)
      caminhos.append(i.path_display)

    return json.dumps({'arquivos' : arquivos, 'caminhos': caminhos})

@app.route('/<nome_diretorio>/upload', methods=['GET', 'POST'])
def uploadArquivo(nome_diretorio):
  if 'file' not in request.files:
    return json.dumps({'msg': 'Nenhum arquivo encontrado'})
  file = request.files['file']
  uploaded_files = request.files.getlist("file")
  # if user does not select file, browser also
  # submit a empty part without filename
  if file.filename == '':
    return json.dumps({'msg': 'Nenhum arquivo foi selecionado'})
  
  for i in uploaded_files:
    if get_size(i) > 10 * 1024 * 1024:
      return json.dumps({'msg': 'Nenhum arquivo pode ser maior que 10 MB'})
    if arquivo_negado(i.filename):
      npermitidos = ""
      for i in NOT_ALLOWED_EXTENSIONS:
        npermitidos = npermitidos + " " + i
      return json.dumps({'msg': 'Não são permitidos: ' + npermitidos})

  info = client.files_list_folder('/%s' % nome_diretorio).entries
  if len(uploaded_files) + len(info) > 15:
    return json.dumps({'msg': 'Limite de 15 arquivos por dir.'})

  if file:
    for i in uploaded_files:
      client.files_upload(i.read(), ("/" + nome_diretorio + "/" + i.filename))
    return json.dumps({'msg': str(len(uploaded_files))+' arquivos foram carregados.'})

@app.route('/<nome_diretorio>/apagar', methods=['DELETE'])
def apagarArquivos(nome_diretorio):
  info = client.files_list_folder('/%s' % nome_diretorio)
  for i in info.entries:
    client.files_delete(i.path_display)
  return json.dumps({'msg': str(len(info.entries))+' arquivos foram apagados.'}) 

@app.route('/<nome_diretorio>/apagar/<arquivo>', methods=['DELETE'])
def apagarArquivo(nome_diretorio, arquivo):
  client.files_delete('/{}/{}'.format(nome_diretorio, arquivo))
  return json.dumps({'msg': 'O arquivo "{}" foi apagado.'.format(arquivo)}) 

def checarDiretorio():
  if os.path.isdir(PATH_DOWNLOAD) == False:
    os.makedirs(PATH_DOWNLOAD)

@app.route('/<nome_diretorio>/<nome>', methods=['GET'])
def downloadArquivo(nome_diretorio, nome):
  if request.method == 'GET':
    checarDiretorio()
    try:
      folder = PATH_DOWNLOAD+nome_diretorio+"-"+nome
      client.files_download_to_file(folder, "/"+nome_diretorio+"/"+nome)
      with open(folder, 'rb') as arquivo:
        csv = arquivo.read()
      os.remove(folder)
      return Response(
          csv,
          mimetype="text/csv",
          headers={"Content-disposition":
                   "attachment; filename="+nome})
    except Exception as err:
      print(err)
      return render_template('erro.html', erro='O arquivo foi movido ou removido.',nome=nome_diretorio)


if __name__ == "__main__":
  app.run(debug=True)
