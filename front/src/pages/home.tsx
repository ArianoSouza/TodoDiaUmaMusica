import axios from 'axios';
import { useState, useEffect } from 'react';
import styles from './home.module.css'

export default function Home() {
    interface Musica{
      id:Number,
      nome:String,
      artista:String
    }

    const [musicas, setMusicas] = useState<Musica>();

    useEffect(() => {
      const cachedMusica = localStorage.getItem('musica');
      const timestamp = localStorage.getItem('timestamp');
      const tempoMaximoCache = 60 * 60 * 1000;
      const agora = new Date().getTime();
  
      if (cachedMusica && timestamp && agora - Number(timestamp) < tempoMaximoCache) {
        setMusicas(JSON.parse(cachedMusica));
      } else {

        axios.get('https://tododiaumamusica.onrender.com/musicas')
          .then(response => {
            setMusicas(response.data);
            localStorage.setItem('musica', JSON.stringify(response.data));
            localStorage.setItem('timestamp', String(agora)); 
          })
          .catch(error => {
            console.error('Erro ao buscar músicas:', error);
          });
      }
      }, []);

    return (
    <>
    <div className={styles.container}>
        <img src= { musicas?.id == 6 ? "https://upload.wikimedia.org/wikipedia/en/b/b0/Brockhampton_-_Saturation.png": ""} alt="capa" />
        <h2 className={styles.titulo}>{musicas?.nome}</h2>
        <p className={styles.artist}>{musicas?.artista}</p>
        <a href={musicas?.id == 6 ? 'https://www.youtube.com/watch?v=94nuoYQORDw':""} target="_blank">{musicas?.id == 6 ? "https://www.youtube.com/watch?v=94nuoYQORDw" : ""}</a>
    </div>
    </>
    );
  }