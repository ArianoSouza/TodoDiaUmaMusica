from flask import Flask, jsonify
import json
from flask_cors import CORS
import json
import random
import schedule
import time
import threading

# Inicializa o Flask
app = Flask(__name__)
CORS(app)

# Caminho para o arquivo JSON
ALL_DATA_FILE = 'allSongs.json'
TODAY_DATA_FILE = 'todaySong.json'


def carregar_dados(arquivo):
    """Carrega os dados de um arquivo JSON."""
    try:
        with open(arquivo, 'r', encoding='utf-8') as f:
            return json.load(f)
    except FileNotFoundError:
        print(f"Erro: Arquivo {arquivo} não encontrado.")
        return []
    except json.JSONDecodeError:
        print(f"Erro: Falha ao decodificar o arquivo {arquivo}.")
        return []

def salvar_dados(arquivo, dados):
    """Salva os dados em um arquivo JSON."""
    try:
        with open(arquivo, 'w', encoding='utf-8') as f:
            json.dump(dados, f, ensure_ascii=False, indent=4)
        print(f"Dados salvos com sucesso em {arquivo}.")
    except Exception as e:
        print(f"Erro ao salvar o arquivo {arquivo}: {e}")

def escolher_dado_aleatorio(dados):
    """Escolhe um dado aleatório da lista."""
    if dados:
        return random.choice(dados)
    return None

def atualizar_today_data():
    """Atualiza o arquivo todayData.json com um dado aleatório de allData.json."""
    dados = carregar_dados(ALL_DATA_FILE)
    if dados:
        dado_aleatorio = escolher_dado_aleatorio(dados)
        if dado_aleatorio:
            salvar_dados(TODAY_DATA_FILE, dado_aleatorio)
            print("dado atualizado")
        else:
            print("Nenhum dado disponível para salvar.")
    else:
        print("Nenhum dado carregado de allData.json.")

# Função para ler o arquivo JSON
def ler_json():
    try:
        with open(TODAY_DATA_FILE, 'r', encoding='utf-8') as arquivo:
            dados = json.load(arquivo)
            return dados
    except FileNotFoundError:
        return {"erro": "Arquivo JSON não encontrado"}
    except json.JSONDecodeError:
        return {"erro": "Erro ao decodificar o JSON"}


@app.route('/musicas', methods=['GET'])
def get_musica_por_id():
    dados = ler_json()
    if dados:
        return jsonify(dados)
    return jsonify({"erro": "Música não encontrada"}), 404

# Função para rodar o agendador em uma thread separada
def agendador():
    """Executa o agendador em uma thread separada."""
    schedule.every().day.do(atualizar_today_data)
    while True:
        schedule.run_pending()
        time.sleep(1)

# Inicia o agendador em uma thread separada
threading.Thread(target=agendador, daemon=True).start()


# Inicia o servidor Flask
if __name__ == '__main__':
    app.run(debug=True)