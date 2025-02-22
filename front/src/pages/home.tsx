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
        axios.get('https://tododiaumamusica.onrender.com/musicas')
          .then(response => {
            setMusicas(response.data);
            console.log(response.data)
          })
          .catch(error => {
            console.error('Erro ao buscar músicas:', error);
            console.log("não deu")
          });
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